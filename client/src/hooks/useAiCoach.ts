import { useState, useCallback, useRef, useMemo } from 'react';
import type { CoachMessage } from '../types';
import { sendChatMessage } from '../services/api';
import { useCarbonData } from './useCarbonData';

/**
 * Hook managing AI Coach conversation state.
 *
 * KEY DESIGN DECISIONS to prevent duplicate requests:
 * 1. carbonInput is stored in a ref (carbonInputRef) so sendMessage does NOT
 *    depend on it in its useCallback deps array. This keeps sendMessage
 *    referentially stable across renders, avoiding StrictMode double-invoke issues.
 * 2. An isSendingRef guard prevents concurrent/duplicate requests.
 * 3. initialAssistant is defined in useMemo (stable reference) so clearChat
 *    does not re-close over a stale object.
 */
export function useAiCoach() {
  const { latestEntry } = useCarbonData();

  // Store carbon data in a ref so sendMessage closure never goes stale
  // and never needs carbonInput in its dependency array.
  const carbonInputRef = useRef(latestEntry?.input);
  carbonInputRef.current = latestEntry?.input;

  const carbonResult = latestEntry?.result;

  // Stable initial greeting — defined once via useMemo
  const initialAssistant = useMemo<CoachMessage>(
    () => ({
      role: 'assistant',
      content:
        'Hello! 👋 I am your CarbonWise AI Sustainability Coach. Ask me about reducing your carbon footprint, understanding your biggest impact areas, or getting personalized eco-recommendations!',
      timestamp: new Date(),
    }),
    [],
  );

  const [messages, setMessages] = useState<CoachMessage[]>([initialAssistant]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Tracks the last user message content for retry
  const lastUserMessageRef = useRef<string>('');
  // In-flight guard: prevents duplicate concurrent requests
  const isSendingRef = useRef(false);

  const sendMessage = useCallback(async (content: string) => {
    // Guard: if already sending, drop the duplicate call immediately
    if (isSendingRef.current) return;
    isSendingRef.current = true;

    lastUserMessageRef.current = content;

    const userMsg: CoachMessage = {
      role: 'user',
      content,
      timestamp: new Date(),
    };

    // Append user message and set loading in a single batch
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setError(null);

    try {
      // Use the ref so this function never re-creates due to carbonInput changes
      const response = await sendChatMessage(content, carbonInputRef.current);
      const assistantMsg: CoachMessage = {
        role: 'assistant',
        content: response.message,
        timestamp: new Date(response.timestamp),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (e: any) {
      let errMsg = e?.message || 'An unexpected error occurred.';
      if (errMsg === 'Failed to fetch' || errMsg === 'NetworkError') {
        errMsg = 'Unable to connect to the AI Coach service. Please check that the backend is running and try again.';
      } else if (errMsg.startsWith('AI Coach Error: ')) {
        errMsg = errMsg.replace('AI Coach Error: ', '');
      }
      
      setError(errMsg);
      const errorAssistant: CoachMessage = {
        role: 'assistant',
        content: errMsg,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorAssistant]);
    } finally {
      setIsLoading(false);
      isSendingRef.current = false;
    }
  }, []); // No deps — uses refs for external values, making this fully stable

  const retryLast = useCallback(() => {
    if (lastUserMessageRef.current && !isSendingRef.current) {
      setMessages((prev) => {
        const newMessages = [...prev];
        const lastMsg = newMessages[newMessages.length - 1];
        
        // Remove the error message
        if (
          lastMsg?.role === 'assistant' && 
          (lastMsg.content.includes('temporarily rate-limited') || 
           lastMsg.content.includes('authentication failed') || 
           lastMsg.content.includes('temporarily unavailable') || 
           lastMsg.content.includes('Unable to connect') ||
           lastMsg.content === 'Sorry, I encountered an error. Please try again.')
        ) {
          newMessages.pop();
        }
        
        // Also remove the previous user message since sendMessage will add it again
        const previousMsg = newMessages[newMessages.length - 1];
        if (previousMsg?.role === 'user' && previousMsg.content === lastUserMessageRef.current) {
          newMessages.pop();
        }
        
        return newMessages;
      });
      sendMessage(lastUserMessageRef.current);
    }
  }, [sendMessage]);

  const clearChat = useCallback(() => {
    // Reset to welcome state — does NOT send any API request
    setMessages([initialAssistant]);
    setError(null);
    setIsLoading(false);
    lastUserMessageRef.current = '';
    isSendingRef.current = false;
  }, [initialAssistant]);

  return {
    messages,
    isLoading,
    error,
    carbonData: latestEntry?.input,
    carbonResult,
    sendMessage,
    retryLast,
    clearChat,
  };
}

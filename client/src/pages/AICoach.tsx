import { useEffect, useRef } from 'react';
import { AiCoachHeader } from '../components/ai-coach/AiCoachHeader';
import { WelcomeArea } from '../components/ai-coach/WelcomeArea';
import { ChatMessage as ChatMessageComponent } from '../components/ai-coach/ChatMessage';
import { ChatInput } from '../components/ai-coach/ChatInput';
import { LoadingIndicator } from '../components/ai-coach/LoadingIndicator';
import { ErrorMessage } from '../components/ai-coach/ErrorMessage';
import { CarbonInsightCard } from '../components/ai-coach/CarbonInsightCard';
import { useAiCoach } from '../hooks/useAiCoach';

/**
 * New AI Coach page – completely replaces the old implementation.
 * Utilises the fresh ai‑coach component library and the useAiCoach hook.
 */
export function AICoach() {
  const {
    messages,
    isLoading,
    error,
    carbonData,
    carbonResult,
    sendMessage,
    retryLast,
    clearChat,
  } = useAiCoach();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Quick prompts (fixed list as per requirements)
  const quickPrompts = [
    'Analyze my carbon footprint',
    'What affects my footprint most?',
    'How can I reduce my emissions?',
    'Give me a sustainability challenge',
    'How can I reduce electricity usage?',
    'How can I reduce waste?',
  ];

  const handlePromptClick = (prompt: string) => {
    sendMessage(prompt);
  };

  const handleSend = (msg: string) => {
    sendMessage(msg);
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6">
      <AiCoachHeader onClear={clearChat} />

      {/* Welcome screen – only show when we have only the initial assistant message */}
      {messages.length === 1 && (
        <WelcomeArea prompts={quickPrompts} onPrompt={handlePromptClick} disabled={isLoading} />
      )}

      {/* Carbon insight – show if we have carbon data */}
      {carbonData && carbonResult && (
        <CarbonInsightCard carbonData={carbonData} carbonResult={carbonResult} />
      )}

      {/* Chat stream */}
      <div
        className="space-y-4 overflow-y-auto p-4 min-h-[500px]"
        role="log"
        aria-label="Chat messages"
        aria-live="polite"
      >
        {messages.map((msg, idx) => (
          <ChatMessageComponent
            key={idx}
            role={msg.role}
            content={msg.content}
            timestamp={msg.timestamp instanceof Date ? msg.timestamp.toISOString() : undefined}
          />
        ))}
        {isLoading && <LoadingIndicator />}
        {error && <ErrorMessage onRetry={retryLast} />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area – always present */}
      <ChatInput onSend={handleSend} disabled={isLoading} />
    </div>
  );
}

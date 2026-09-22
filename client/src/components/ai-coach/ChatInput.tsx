import React, { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  disabled,
  placeholder = 'Ask your sustainability coach...',
}) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
    }
  }, [input]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !disabled) {
        onSend(input.trim());
        setInput('');
      }
    }
  };

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <div className="mt-6 sticky bottom-0 left-0 w-full bg-white border-t border-gray-200 pt-4 pb-6">
      <div className="flex gap-3 items-end">
        <textarea
          ref={textareaRef}
          className="flex-1 rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-slate-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white disabled:opacity-50 resize-none transition-colors shadow-sm"
          rows={1}
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-label="Chat input"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className="flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm flex-shrink-0"
          aria-label="Send message"
        >
          <RiSendPlaneFill size={20} />
        </button>
      </div>
      <p className="text-xs text-gray-400 mt-2 text-center">
        Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Enter</kbd> to send &nbsp;·&nbsp;
        <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Shift+Enter</kbd> for new line
      </p>
    </div>
  );
};

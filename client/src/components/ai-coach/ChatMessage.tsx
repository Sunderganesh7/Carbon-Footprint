import React from 'react';
import ReactMarkdown from 'react-markdown';
import { RiUserFill, RiLeafFill } from 'react-icons/ri';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, content, timestamp }) => {
  const isUser = role === 'user';
  return (
    <div className={`flex mb-5 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {/* AI icon — left side */}
      {!isUser && (
        <div className="flex-shrink-0 flex flex-col items-center mr-3">
          <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center shadow-sm">
            <RiLeafFill size={18} className="text-emerald-600" />
          </div>
          {timestamp && (
            <span className="text-xs text-gray-400 mt-1">
              {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>
      )}

      {/* Message bubble */}
      <div
        className={`
          rounded-2xl px-5 py-4 shadow-sm leading-relaxed text-sm
          ${isUser
            ? 'bg-emerald-500 text-white max-w-[70%]'
            : 'bg-white border border-gray-200 text-slate-800 w-full max-w-[85%]'
          }
        `}
        style={{ lineHeight: '1.7' }}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{content}</p>
        ) : (
          <ReactMarkdown
            className="prose prose-sm max-w-none prose-headings:text-emerald-800 prose-headings:font-semibold prose-strong:text-slate-800 prose-li:my-0.5 prose-p:my-1"
            components={{
              h1: ({ node, ...props }) => <h1 className="text-xl font-bold text-emerald-800 mt-3 mb-1" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-lg font-bold text-emerald-800 mt-3 mb-1" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-base font-semibold text-emerald-700 mt-2 mb-1" {...props} />,
              p: ({ node, ...props }) => <p className="mb-2 text-slate-700" {...props} />,
              ul: ({ node, ...props }) => <ul className="list-disc ml-5 mb-2 space-y-0.5" {...props} />,
              ol: ({ node, ...props }) => <ol className="list-decimal ml-5 mb-2 space-y-0.5" {...props} />,
              li: ({ node, ...props }) => <li className="text-slate-700" {...props} />,
              strong: ({ node, ...props }) => <strong className="font-semibold text-slate-800" {...props} />,
              code: ({ node, ...props }) => <code className="bg-gray-100 text-emerald-700 px-1 rounded text-xs" {...props} />,
            }}
          >
            {content}
          </ReactMarkdown>
        )}
      </div>

      {/* User icon — right side */}
      {isUser && (
        <div className="flex-shrink-0 flex flex-col items-center ml-3">
          <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
            <RiUserFill size={18} className="text-white" />
          </div>
          {timestamp && (
            <span className="text-xs text-gray-400 mt-1">
              {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

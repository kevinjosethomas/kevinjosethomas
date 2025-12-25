'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Trash2, Bot, User } from 'lucide-react';

export default function ChatPage() {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, isLoading, error } = useChat({
    api: '/api/dashboard/chat',
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    sendMessage({ text: input });
    setInput('');
  };

  const suggestedQuestions = [
    "How has my sleep quality been this month?",
    "What are my most productive work subjects?",
    "How many calories have I burned working out?",
    "What am I spending the most money on?",
    "Is there a correlation between my sleep and productivity?",
  ];

  return (
    <div className="flex flex-col h-screen max-h-screen bg-black">
      {/* Header */}
      <div className="p-6 border-b border-[#1f1f1f]">
        <h1 className="text-2xl font-bold text-white mb-1">AI Chat Assistant</h1>
        <p className="text-sm text-[#aaaaaa]">Ask questions about your analytics data</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 && (
          <div className="max-w-2xl mx-auto text-center py-12">
            <Bot size={48} className="mx-auto text-[#aaaaaa] mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Start a conversation</h2>
            <p className="text-[#aaaaaa] mb-6">
              Ask me anything about your sleep, work, workouts, spending, or screen time.
            </p>

            <div className="space-y-2">
              <p className="text-sm text-[#aaaaaa] mb-3">Try asking:</p>
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInput(question);
                  }}
                  className="block w-full p-3 text-left text-sm bg-[#1f1f1f] text-white rounded-lg hover:bg-white hover:text-black transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              message.role === 'user' ? 'bg-white' : 'bg-[#1f1f1f]'
            }`}>
              {message.role === 'user' ? (
                <User size={16} className="text-black" />
              ) : (
                <Bot size={16} className="text-white" />
              )}
            </div>

            {/* Message Content */}
            <div className={`flex-1 max-w-2xl ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-4 rounded-lg ${
                message.role === 'user'
                  ? 'bg-white text-black'
                  : 'bg-[#1f1f1f] text-white'
              }`}>
                {message.parts.map((part, index) => {
                  if (part.type === 'text') {
                    return (
                      <p key={index} className="whitespace-pre-wrap leading-relaxed">
                        {part.text}
                      </p>
                    );
                  }

                  if (part.type.startsWith('tool-')) {
                    const toolName = part.type.replace('tool-', '');
                    return (
                      <div key={index} className="mt-2 p-3 bg-black bg-opacity-20 rounded text-xs">
                        <p className="font-semibold mb-1">🔧 {toolName}</p>
                        {part.state === 'output-available' && part.output && (
                          <pre className="text-xs opacity-70 overflow-x-auto">
                            {JSON.stringify(part.output, null, 2)}
                          </pre>
                        )}
                      </div>
                    );
                  }

                  return null;
                })}
              </div>

              <p className="text-xs text-[#aaaaaa] mt-2 px-1">
                {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1f1f1f] flex items-center justify-center">
              <Bot size={16} className="text-white" />
            </div>
            <div className="flex-1 max-w-2xl">
              <div className="inline-block p-4 rounded-lg bg-[#1f1f1f]">
                <Loader2 size={16} className="animate-spin text-white" />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="max-w-2xl mx-auto p-4 bg-red-500 bg-opacity-10 border border-red-500 rounded-lg">
            <p className="text-red-500 text-sm">Error: {error.message}</p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-6 border-t border-[#1f1f1f]">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about your data..."
              className="flex-1 px-4 py-3 bg-[#1f1f1f] border border-[#1f1f1f] rounded-lg text-white placeholder:text-[#aaaaaa] focus:outline-none focus:border-white"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-6 py-3 bg-white text-black rounded-lg hover:bg-[#aaaaaa] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  <Send size={20} />
                  Send
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

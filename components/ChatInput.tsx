'use client';

import React, { useState } from 'react';

interface ChatInputProps {
  onSubmit?: (message: string) => Promise<void>;
}

export function ChatInput({ onSubmit }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim() || isLoading) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: message }],
        }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      if (onSubmit) {
        await onSubmit(message);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black">
      <div className="max-w-6xl mx-auto p-6">
        <div className="relative flex items-center">
          <div className="absolute left-4">
            <svg
              className="w-5 h-5 text-blue-500 hover:text-blue-400 cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3 3m0 0l-3-3m3 3V8"
              />
            </svg>
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share your n8n workflow or describe what you want to achieve..."
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-4 pl-12 pr-12 text-white placeholder-zinc-500 focus:outline-none focus:border-green-500"
          />
          <button
            onClick={handleSubmit}
            disabled={isLoading || !message.trim()}
            className="absolute right-4"
          >
            <svg
              className={`w-5 h-5 ${
                isLoading || !message.trim() ? 'text-zinc-600' : 'text-green-500 hover:text-green-400'
              } cursor-pointer`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

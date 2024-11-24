'use client';

import React from 'react';

interface CategoryCardProps {
  title: string;
  items: string[];
}

export function CategoryCard({ title, items }: CategoryCardProps) {
  const handleItemClick = async (item: string) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: item }],
        }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      // Let the ChatContainer handle the streaming response
      const event = new CustomEvent('n8n-chat-message', {
        detail: { message: item }
      });
      window.dispatchEvent(event);

    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="bg-zinc-900/50 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-green-400">{title}</h2>
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item}
            onClick={() => handleItemClick(item)}
            className="text-sm text-zinc-300 hover:text-white cursor-pointer transition-colors"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

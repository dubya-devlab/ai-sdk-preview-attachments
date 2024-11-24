'use client';

import React from 'react';

interface CategoryCardProps {
  title: string;
  items: string[];
}

export function CategoryCard({ title, items }: CategoryCardProps) {
  const handleItemClick = (item: string) => {
    // Here we would trigger the chat with the selected prompt
    console.log('Selected prompt:', item);
  };

  return (
    <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800">
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

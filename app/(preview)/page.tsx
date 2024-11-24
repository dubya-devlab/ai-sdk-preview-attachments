'use client';

import React from 'react';
import { CategoryCard } from '../../components/CategoryCard';
import { ChatInput } from '../../components/ChatInput';

const categories = [
  {
    title: "Agents",
    items: [
      "I want to create an n8n agent that can help me with workflow automation",
      "I need an agent that can monitor my workflows and handle errors",
      "Help me build an agent that can integrate multiple APIs",
      "I want to create an agent for data transformation tasks"
    ]
  },
  {
    title: "Assistants",
    items: [
      "I need an assistant to help me optimize my n8n workflows",
      "Create an assistant that can help me with n8n node configurations",
      "I want an assistant for debugging n8n workflow issues",
      "Help me build an assistant for n8n best practices"
    ]
  },
  {
    title: "Automations",
    items: [
      "I want to automate data synchronization between my systems",
      "Help me create a workflow for automated error notifications",
      "I need to build an automated reporting workflow",
      "Create an automation for API endpoint monitoring"
    ]
  }
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-black">
      <div className="pb-24">
        <div className="max-w-6xl mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.title}
                title={category.title}
                items={category.items}
              />
            ))}
          </div>
        </div>
      </div>
      <ChatInput />
    </div>
  );
}

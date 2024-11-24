import type { NextPage } from 'next';
import { CategoryCard } from '../../components/CategoryCard';

const categories = [
  {
    title: "Agents",
    items: [
      "Let's get started creating an Agent",
      "Create a custom agent with specific skills",
      "Build an agent to handle customer support",
      "Design an agent for data analysis"
    ]
  },
  {
    title: "Assistants",
    items: [
      "Let's get started creating an Assistant",
      "Build a specialized writing assistant",
      "Create a research and analysis assistant",
      "Design a coding assistant"
    ]
  },
  {
    title: "Automations",
    items: [
      "Let's get started creating an Automation",
      "Set up a workflow automation",
      "Create a data processing pipeline",
      "Build an integration workflow"
    ]
  }
];

const Page: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-6xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.title}
                title={category.title}
                items={category.items}
              />
            ))}
          </div>
          
          <div className="relative mt-8">
            <input
              type="text"
              placeholder="Share your n8n workflow or describe what you want to achieve..."
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-4 px-5 text-white placeholder-zinc-500 focus:outline-none focus:border-green-500"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg
                className="w-5 h-5 text-zinc-500"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

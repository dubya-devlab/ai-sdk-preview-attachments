import React from 'react';

interface FeatureSection {
  title: string;
  items: string[];
}

interface FeaturesProps {
  sections: FeatureSection[];
}

export function Features({ sections }: FeaturesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sections.map((section) => (
        <div
          key={section.title}
          className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-4 text-green-400">
            {section.title}
          </h2>
          <ul className="space-y-3">
            {section.items.map((item) => (
              <li
                key={item}
                className="text-sm text-zinc-300 hover:text-white"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

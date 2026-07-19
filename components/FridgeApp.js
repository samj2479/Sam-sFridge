'use client';

import { useState } from 'react';
import { useFridgeStore } from '@/lib/useFridgeStore';
import FridgeSection from './FridgeSection';
import RecipesSection from './RecipesSection';
import SuggestionsSection from './SuggestionsSection';

const TABS = ['suggestions', 'fridge', 'recipes'];

export default function FridgeApp({ dict }) {
  const [activeTab, setActiveTab] = useState('suggestions');
  const { fridge, recipes, addFridgeItem, removeFridgeItem, addRecipe, removeRecipe } = useFridgeStore();

  return (
    <div>
      <header className="pt-6 pb-2 text-center px-4">
        <h1 className="text-2xl font-bold mb-1">🧊 {dict.title}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{dict.subtitle}</p>
      </header>

      <nav className="flex justify-center gap-2 flex-wrap py-4">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm border ${
              activeTab === tab
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
            }`}
          >
            {dict.tabs[tab]}
          </button>
        ))}
        <a
          href={dict.langSwitchHref}
          className="px-4 py-2 rounded-full text-sm border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-blue-600 dark:text-blue-400"
        >
          {dict.langSwitchLabel}
        </a>
      </nav>

      <main className="max-w-xl mx-auto px-4 pb-12">
        {activeTab === 'suggestions' && <SuggestionsSection dict={dict} fridge={fridge} recipes={recipes} />}
        {activeTab === 'fridge' && (
          <FridgeSection dict={dict} fridge={fridge} onAdd={addFridgeItem} onRemove={removeFridgeItem} />
        )}
        {activeTab === 'recipes' && (
          <RecipesSection dict={dict} recipes={recipes} onAdd={addRecipe} onRemove={removeRecipe} />
        )}
      </main>
    </div>
  );
}

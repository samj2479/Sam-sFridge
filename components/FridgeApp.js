'use client';

import { useState } from 'react';
import { useFridgeStore } from '@/lib/useFridgeStore';
import Nav from './Nav';
import Hero from './Hero';
import Footer from './Footer';
import FridgeSection from './FridgeSection';
import RecipesSection from './RecipesSection';
import SuggestionsSection from './SuggestionsSection';

const TABS = ['suggestions', 'fridge', 'recipes'];

export default function FridgeApp({ dict }) {
  const [activeTab, setActiveTab] = useState('suggestions');
  const { fridge, recipes, addFridgeItem, removeFridgeItem, addRecipe, removeRecipe } = useFridgeStore();

  function goToTab(tab) {
    setActiveTab(tab);
    document.getElementById('tool-section')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <Nav dict={dict} activeTab={activeTab} onTabClick={goToTab} />
      <Hero dict={dict} onEnter={() => goToTab('suggestions')} />

      <section id="tool-section" className="snap-start min-h-screen w-full bg-cream pt-28">
        <div className="max-w-2xl mx-auto px-6 pb-20">
          <nav className="flex justify-center gap-2 flex-wrap mb-10 md:hidden">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full border px-5 py-2 text-xs uppercase tracking-widest transition-colors ${
                  activeTab === tab
                    ? 'bg-black text-white border-black'
                    : 'border-neutral-300 text-neutral-600 hover:border-accent hover:text-accent'
                }`}
              >
                {dict.tabs[tab]}
              </button>
            ))}
          </nav>

          {activeTab === 'suggestions' && <SuggestionsSection dict={dict} fridge={fridge} recipes={recipes} />}
          {activeTab === 'fridge' && (
            <FridgeSection dict={dict} fridge={fridge} onAdd={addFridgeItem} onRemove={removeFridgeItem} />
          )}
          {activeTab === 'recipes' && (
            <RecipesSection dict={dict} recipes={recipes} onAdd={addRecipe} onRemove={removeRecipe} />
          )}
        </div>
      </section>

      <Footer dict={dict} onTabClick={goToTab} />
    </>
  );
}

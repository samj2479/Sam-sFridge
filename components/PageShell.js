'use client';

import { useFridgeStore } from '@/lib/useFridgeStore';
import Nav from './Nav';
import Footer from './Footer';
import FridgeSection from './FridgeSection';
import RecipesSection from './RecipesSection';

export default function PageShell({ dict, page }) {
  const { fridge, recipes, addFridgeItem, removeFridgeItem, addRecipe, removeRecipe } = useFridgeStore();

  return (
    <>
      <Nav dict={dict} activePage={page} />

      <main className="min-h-screen w-full bg-cream pt-28">
        <div className="max-w-2xl mx-auto px-6 pb-20">
          {page === 'fridge' && (
            <FridgeSection dict={dict} fridge={fridge} onAdd={addFridgeItem} onRemove={removeFridgeItem} />
          )}
          {page === 'recipes' && (
            <RecipesSection dict={dict} recipes={recipes} onAdd={addRecipe} onRemove={removeRecipe} />
          )}
        </div>
      </main>

      <Footer dict={dict} />
    </>
  );
}

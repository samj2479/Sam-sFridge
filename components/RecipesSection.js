'use client';

import { useState } from 'react';

function emptyRow() {
  return { name: '', qty: '' };
}

export default function RecipesSection({ dict, recipes, onAdd, onRemove }) {
  const [name, setName] = useState('');
  const [rows, setRows] = useState([emptyRow()]);

  function updateRow(index, field, value) {
    setRows(prev => prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  }

  function addRow() {
    setRows(prev => [...prev, emptyRow()]);
  }

  function removeRow(index) {
    setRows(prev => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    const ingredients = rows
      .map(row => ({ name: row.name.trim(), qty: row.qty.trim() }))
      .filter(ing => ing.name);
    if (ingredients.length === 0) return;

    onAdd({ name: name.trim(), ingredients });
    setName('');
    setRows([emptyRow()]);
  }

  return (
    <section>
      <h2 className="font-serif text-2xl md:text-3xl tracking-tight mb-6">{dict.recipes.heading}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white border border-neutral-200 p-6 mb-8">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder={dict.recipes.namePlaceholder}
          required
          className="px-4 py-2.5 border border-neutral-300 bg-white focus:outline-none focus:border-accent"
        />

        <div className="flex flex-col gap-2">
          {rows.map((row, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={row.name}
                onChange={e => updateRow(i, 'name', e.target.value)}
                placeholder={dict.recipes.ingredientPlaceholder}
                required
                className="flex-1 min-w-0 px-4 py-2.5 border border-neutral-300 bg-white focus:outline-none focus:border-accent"
              />
              <input
                type="text"
                value={row.qty}
                onChange={e => updateRow(i, 'qty', e.target.value)}
                placeholder={dict.recipes.ingredientQtyPlaceholder}
                className="flex-1 min-w-0 px-4 py-2.5 border border-neutral-300 bg-white focus:outline-none focus:border-accent"
              />
              <button
                type="button"
                onClick={() => removeRow(i)}
                className="text-neutral-400 bg-transparent hover:text-neutral-900 px-2 transition-colors"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addRow}
          className="self-start px-4 py-2 border border-dashed border-neutral-300 uppercase text-xs tracking-widest text-accent hover:border-accent transition-colors"
        >
          {dict.recipes.addIngredient}
        </button>

        <button
          type="submit"
          className="self-start rounded-full bg-black text-white uppercase text-xs tracking-widest font-bold px-8 py-2.5 hover:bg-accent transition-colors"
        >
          {dict.recipes.save}
        </button>
      </form>

      {recipes.length === 0 ? (
        <p className="text-neutral-400 italic text-sm">{dict.recipes.empty}</p>
      ) : (
        <div className="flex flex-col gap-4">
          {recipes.map(recipe => (
            <div key={recipe.id} className="bg-white border border-neutral-200 p-6">
              <h3 className="flex justify-between items-center font-serif text-xl mb-2">
                <span>
                  <span className="text-neutral-400 font-sans font-normal text-sm mr-2">#{recipe.num}</span>
                  {recipe.name}
                </span>
                <button
                  onClick={() => onRemove(recipe.id)}
                  className="text-neutral-400 bg-transparent hover:text-neutral-900 px-2 transition-colors"
                  title={dict.recipes.delete}
                >
                  ✕
                </button>
              </h3>
              <ul className="list-disc pl-5 text-sm text-neutral-600">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i}>
                    {ing.name}
                    {ing.qty && ` (${ing.qty})`}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

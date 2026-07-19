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
      <h2 className="text-lg font-semibold mt-6 mb-3">{dict.recipes.heading}</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-5"
      >
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder={dict.recipes.namePlaceholder}
          required
          className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
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
                className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
              />
              <input
                type="text"
                value={row.qty}
                onChange={e => updateRow(i, 'qty', e.target.value)}
                placeholder={dict.recipes.ingredientQtyPlaceholder}
                className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
              />
              <button
                type="button"
                onClick={() => removeRow(i)}
                className="text-red-600 bg-transparent hover:opacity-70 px-2"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addRow}
          className="self-start px-3 py-2 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 text-blue-600 dark:text-blue-400 bg-transparent"
        >
          {dict.recipes.addIngredient}
        </button>

        <button type="submit" className="self-start px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white">
          {dict.recipes.save}
        </button>
      </form>

      {recipes.length === 0 ? (
        <p className="text-gray-500 italic text-sm">{dict.recipes.empty}</p>
      ) : (
        <div className="flex flex-col gap-3">
          {recipes.map(recipe => (
            <div
              key={recipe.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4"
            >
              <h3 className="flex justify-between items-center font-semibold mb-1">
                <span>
                  <span className="text-gray-500 font-normal text-sm mr-1">#{recipe.num}</span>
                  {recipe.name}
                </span>
                <button
                  onClick={() => onRemove(recipe.id)}
                  className="text-red-600 bg-transparent hover:opacity-70 px-2"
                  title={dict.recipes.delete}
                >
                  ✕
                </button>
              </h3>
              <ul className="list-disc pl-5 text-sm">
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

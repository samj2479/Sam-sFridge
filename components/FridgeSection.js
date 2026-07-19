'use client';

import { useState } from 'react';

export default function FridgeSection({ dict, fridge, onAdd, onRemove }) {
  const [name, setName] = useState('');
  const [qty, setQty] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({ name: name.trim(), qty: qty.trim() });
    setName('');
    setQty('');
  }

  return (
    <section>
      <h2 className="text-lg font-semibold mt-6 mb-3">{dict.fridge.heading}</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 flex-wrap mb-4">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder={dict.fridge.namePlaceholder}
          required
          className="flex-1 min-w-[120px] px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        />
        <input
          type="text"
          value={qty}
          onChange={e => setQty(e.target.value)}
          placeholder={dict.fridge.qtyPlaceholder}
          className="flex-1 min-w-[120px] px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        />
        <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white">
          {dict.fridge.add}
        </button>
      </form>

      {fridge.length === 0 ? (
        <p className="text-gray-500 italic text-sm">{dict.fridge.empty}</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {fridge.map(item => (
            <li
              key={item.id}
              className="flex justify-between items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2"
            >
              <span>
                {item.name}
                {item.qty && <span className="text-gray-500 text-sm ml-2">{item.qty}</span>}
              </span>
              <button
                onClick={() => onRemove(item.id)}
                className="text-red-600 bg-transparent hover:opacity-70 px-2"
                title={dict.fridge.delete}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

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
      <h2 className="font-serif text-2xl md:text-3xl tracking-tight mb-6">{dict.fridge.heading}</h2>
      <form onSubmit={handleSubmit} className="flex gap-3 flex-wrap mb-8">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder={dict.fridge.namePlaceholder}
          required
          className="flex-1 min-w-[140px] px-4 py-2.5 border border-neutral-300 bg-white focus:outline-none focus:border-accent"
        />
        <input
          type="text"
          value={qty}
          onChange={e => setQty(e.target.value)}
          placeholder={dict.fridge.qtyPlaceholder}
          className="flex-1 min-w-[140px] px-4 py-2.5 border border-neutral-300 bg-white focus:outline-none focus:border-accent"
        />
        <button
          type="submit"
          className="rounded-full bg-black text-white uppercase text-xs tracking-widest font-bold px-8 py-2.5 hover:bg-accent transition-colors"
        >
          {dict.fridge.add}
        </button>
      </form>

      {fridge.length === 0 ? (
        <p className="text-neutral-400 italic text-sm">{dict.fridge.empty}</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {fridge.map(item => (
            <li
              key={item.id}
              className="flex justify-between items-center bg-white border border-neutral-200 px-5 py-3"
            >
              <span>
                {item.name}
                {item.qty && <span className="text-neutral-400 text-sm ml-2">{item.qty}</span>}
              </span>
              <button
                onClick={() => onRemove(item.id)}
                className="text-neutral-400 bg-transparent hover:text-neutral-900 px-2 transition-colors"
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

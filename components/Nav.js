'use client';

import { useEffect, useState } from 'react';

const TABS = ['suggestions', 'fridge', 'recipes'];

export default function Nav({ dict, activeTab, onTabClick }) {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    function onScroll() {
      setSolid(window.scrollY > window.innerHeight * 0.7);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const textColor = solid ? 'text-neutral-900' : 'text-white';

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        solid ? 'bg-cream/95 backdrop-blur shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`font-serif font-bold text-lg tracking-tight ${textColor}`}
        >
          {dict.title}
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => onTabClick(tab)}
              className={`font-serif text-sm uppercase tracking-wide transition-colors ${textColor} ${
                activeTab === tab ? 'text-accent' : 'hover:text-accent'
              }`}
            >
              {dict.tabs[tab]}
            </button>
          ))}
        </nav>

        <a
          href={dict.langSwitchHref}
          className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-widest font-sans transition-colors ${textColor} ${
            solid ? 'border-neutral-300 hover:border-accent' : 'border-white/30 hover:border-accent'
          } hover:text-accent`}
        >
          {dict.langSwitchLabel}
        </a>
      </div>
    </header>
  );
}

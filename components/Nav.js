import Link from 'next/link';

const TABS = ['fridge', 'recipes'];

function hrefFor(tab, lang) {
  if (tab === 'fridge') return lang === 'ko' ? '/' : '/en';
  return lang === 'ko' ? '/recipes' : '/en/recipes';
}

export default function Nav({ dict, activePage }) {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-cream/95 backdrop-blur shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <Link href={hrefFor('fridge', dict.lang)} className="font-serif font-bold text-lg tracking-tight text-neutral-900">
          {dict.title}
        </Link>

        <nav className="flex items-center gap-4 sm:gap-8">
          {TABS.map(tab => (
            <Link
              key={tab}
              href={hrefFor(tab, dict.lang)}
              className={`font-serif text-sm uppercase tracking-wide transition-colors text-neutral-900 ${
                activePage === tab ? 'text-accent' : 'hover:text-accent'
              }`}
            >
              {dict.tabs[tab]}
            </Link>
          ))}
        </nav>

        <a
          href={dict.langSwitchHref}
          className="rounded-full border px-4 py-1.5 text-xs uppercase tracking-widest font-sans transition-colors text-neutral-900 border-neutral-300 hover:border-accent hover:text-accent"
        >
          {dict.langSwitchLabel}
        </a>
      </div>
    </header>
  );
}

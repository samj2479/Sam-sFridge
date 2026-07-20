import Link from 'next/link';

const TABS = ['fridge', 'recipes'];

function hrefFor(tab, lang) {
  if (tab === 'fridge') return lang === 'ko' ? '/' : '/en';
  return lang === 'ko' ? '/recipes' : '/en/recipes';
}

export default function Footer({ dict }) {
  return (
    <footer id="footer" className="w-full bg-ink text-white px-6 md:px-16 py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto w-full">
        <div>
          <h3 className="font-serif text-2xl mb-3">{dict.title}</h3>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs break-keep">{dict.footer.blurb}</p>
        </div>

        <div>
          <p className="uppercase text-xs tracking-widest text-white/30 mb-4">{dict.footer.linksLabel}</p>
          <ul className="space-y-2">
            {TABS.map(tab => (
              <li key={tab}>
                <Link
                  href={hrefFor(tab, dict.lang)}
                  className="font-serif text-lg text-white/70 hover:text-accent transition-colors"
                >
                  {dict.tabs[tab]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="uppercase text-xs tracking-widest text-white/30 mb-4">{dict.footer.langLabel}</p>
          <a href={dict.langSwitchHref} className="font-serif text-lg text-white/70 hover:text-accent transition-colors">
            {dict.langSwitchLabel}
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full border-t border-white/15 mt-16 pt-6 flex flex-col sm:flex-row justify-between gap-2">
        <p className="text-white/30 text-xs">{dict.footer.legal}</p>
        <p className="text-white/30 text-xs italic font-serif">{dict.footer.tagline}</p>
      </div>
    </footer>
  );
}

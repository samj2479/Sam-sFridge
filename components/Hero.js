import Reveal from './Reveal';

export default function Hero({ dict, onEnter }) {
  return (
    <section
      id="hero"
      className="snap-start h-screen w-full bg-ink text-white flex flex-col items-center justify-center text-center px-6 relative overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(23,76,53,0.28),transparent_60%)] animate-pulse-slow" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      <div className="relative z-10 flex flex-col items-center">
        <Reveal>
          <p className="uppercase text-xs sm:text-sm tracking-[0.3em] text-white/50 mb-4">{dict.hero.eyebrow}</p>
        </Reveal>

        <Reveal delay={120}>
          <h1
            className="font-serif font-bold leading-[0.95] tracking-tight text-white"
            style={{ fontSize: 'clamp(2.8rem, 14vw, 9rem)' }}
          >
            {dict.title}
          </h1>
        </Reveal>

        <Reveal delay={240}>
          <p className="mt-6 max-w-md text-white/70 text-base sm:text-lg break-keep">{dict.hero.sub}</p>
        </Reveal>

        <Reveal delay={360}>
          <button
            onClick={onEnter}
            className="mt-10 rounded-full bg-white text-black uppercase text-xs tracking-widest font-bold px-10 py-3.5 hover:bg-accent hover:text-white transition-colors"
          >
            {dict.hero.cta}
          </button>
        </Reveal>
      </div>
    </section>
  );
}

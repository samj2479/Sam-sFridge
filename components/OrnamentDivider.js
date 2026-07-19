'use client';

import { useEffect, useRef, useState } from 'react';

export default function OrnamentDivider() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex items-center justify-center gap-4 my-10">
      <span className={`h-px bg-neutral-300 transition-all duration-700 ${visible ? 'w-16' : 'w-0'}`} />
      <span className="text-accent text-sm">✦</span>
      <span className={`h-px bg-neutral-300 transition-all duration-700 ${visible ? 'w-16' : 'w-0'}`} />
    </div>
  );
}

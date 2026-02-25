'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

type LenisControlEvent = CustomEvent<{
  action: 'start' | 'stop';
}>;

export function SmoothScrollProvider() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      syncTouch: false,
      prevent: (node) => {
        return node instanceof HTMLElement
          ? !!node.closest('[data-lenis-prevent]')
          : false;
      },
    });

    const handleLenisControl = (event: Event) => {
      const customEvent = event as LenisControlEvent;

      if (customEvent.detail?.action === 'stop') {
        lenis.stop();
        return;
      }

      lenis.start();
    };

    window.addEventListener('odyssey:lenis-control', handleLenisControl);

    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.removeEventListener('odyssey:lenis-control', handleLenisControl);
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}

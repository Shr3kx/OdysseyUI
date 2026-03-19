'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

export type CharacterPreset = 'default' | 'binary' | 'cyberpunk' | 'minimal';

const PRESETS: Record<CharacterPreset, string> = {
  default: '#$%&@!?',
  binary: '01',
  cyberpunk: '░▒▓█◣◥',
  minimal: '·+×÷',
};

export interface TextRevealProps {
  children: string;
  speed?: number;
  delay?: number;
  className?: string;
  triggerOnView?: boolean;
  once?: boolean;
  characters?: string;
  preset?: CharacterPreset;
}

function pickRandom(chars: string, exclude?: string): string {
  const pool = exclude ? [...chars].filter((c) => c !== exclude) : [...chars];
  const source = pool.length > 0 ? pool : [...chars];
  return source[Math.floor(Math.random() * source.length)];
}

export function TextReveal({
  children: text,
  speed = 20,
  delay = 0,
  className = '',
  triggerOnView = false,
  once = true,
  characters,
  preset = 'default',
}: TextRevealProps) {
  const chars = characters ?? PRESETS[preset];
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: '-100px' });
  const active = triggerOnView ? inView : true;

  const [display, setDisplay] = useState('\u00A0'.repeat(text.length));
  const phaseRef = useRef<'scramble' | 'reveal'>('scramble');
  const stepRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const delayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) return;

    const clearAll = () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (delayRef.current) clearTimeout(delayRef.current);
      timerRef.current = null;
      delayRef.current = null;
    };

    const start = () => {
      phaseRef.current = 'scramble';
      stepRef.current = 0;
      setDisplay('\u00A0'.repeat(text.length));

      timerRef.current = setInterval(() => {
        const step = stepRef.current;

        if (phaseRef.current === 'scramble') {
          const len = Math.min(step + 1, text.length);
          const buf: string[] = [];
          for (let i = 0; i < len; i++) {
            buf.push(pickRandom(chars, i > 0 ? buf[i - 1] : undefined));
          }
          for (let i = len; i < text.length; i++) buf.push('\u00A0');
          setDisplay(buf.join(''));

          if (step < text.length * 2 - 1) {
            stepRef.current++;
          } else {
            phaseRef.current = 'reveal';
            stepRef.current = 0;
          }
        } else {
          const revealed = Math.floor(step / 2);
          const buf: string[] = text
            .slice(0, Math.min(revealed, text.length))
            .split('');

          if (revealed < text.length) {
            buf.push(step % 2 === 0 ? '_' : pickRandom(chars));
          }
          while (buf.length < text.length) buf.push(pickRandom(chars));
          setDisplay(buf.join(''));

          if (step < text.length * 2 - 1) {
            stepRef.current++;
          } else {
            setDisplay(text);
            clearAll();
          }
        }
      }, speed);
    };

    if (delay > 0) {
      delayRef.current = setTimeout(start, delay * 1000);
    } else {
      start();
    }

    return clearAll;
  }, [active, text, speed, delay, chars]);

  return (
    <span
      ref={ref}
      className={`inline-flex h-4.5 font-mono leading-5 font-medium ${className}`}
    >
      {display}
    </span>
  );
}

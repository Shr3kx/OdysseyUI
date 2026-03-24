'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface LogoItem {
  name: string;
  svg: React.ReactNode;
}

interface LogoCloudProps {
  logos: LogoItem[];
  label?: string;
  duration?: number;
}

export default function LogoCloud({
  logos,
  label,
  duration = 2.5,
}: LogoCloudProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const groups: LogoItem[][] = [];
  for (let i = 0; i < logos.length; i += 3) {
    groups.push(logos.slice(i, i + 3));
  }

  useEffect(() => {
    if (groups.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % groups.length);
    }, duration * 1000);
    return () => clearInterval(interval);
  }, [groups.length, duration]);

  const currentGroup = groups[currentIndex] ?? [];

  return (
    <section className="bg-background py-12 w-full">
      {label && (
        <p className="text-center text-muted-foreground text-sm tracking-widest uppercase font-light mb-8">
          {label}
        </p>
      )}
      <div className="mx-auto max-w-5xl px-6">
        <div
          className={`mx-auto grid max-w-2xl items-center gap-8 ${
            currentGroup.length === 1
              ? 'grid-cols-1 place-items-center'
              : currentGroup.length === 2
                ? 'grid-cols-2'
                : 'grid-cols-3'
          }`}
        >
          <AnimatePresence initial={false} mode="popLayout">
            {currentGroup.map((logo, i) => (
              <motion.div
                key={`${currentIndex}-${i}`}
                className="flex flex-row items-center justify-center gap-2"
                initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: 12, filter: 'blur(6px)', scale: 0.5 }}
                transition={{
                  delay: i * 0.1,
                  duration: 1.5,
                  type: 'spring',
                  bounce: 0.2,
                }}
              >
                {logo.svg}
                <span className="text-lg font-semibold text-foreground tracking-tight whitespace-nowrap">
                  {logo.name}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

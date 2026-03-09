'use client';

import React, { useMemo, useRef } from 'react';
import { motion, useInView, UseInViewOptions } from 'motion/react';
import { cn } from '@/lib/utils';

interface ShimmerTextProps {
  text: string;
  duration?: number;
  delay?: number;
  repeat?: boolean;
  repeatDelay?: number;
  className?: string;
  startOnView?: boolean;
  once?: boolean;
  inViewMargin?: UseInViewOptions['margin'];
  spread?: number;
  color?: string;
  shimmerColor?: string;
}

export function ShimmerText({
  text,
  duration = 1,
  delay = 0,
  repeat = true,
  repeatDelay = 0.5,
  className,
  startOnView = true,
  once = false,
  inViewMargin,
  spread = 2,
  color,
  shimmerColor,
}: ShimmerTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: inViewMargin });

  const dynamicSpread = useMemo(() => text.length * spread, [text, spread]);

  const shouldAnimate = !startOnView || isInView;

  return (
    <motion.span
      ref={ref}
      className={cn(
        'relative inline-block bg-[length:250%_100%,auto] bg-clip-text text-transparent',
        '[--base-color:var(--muted-foreground)] [--shimmer-color:var(--foreground)]',
        '[background-repeat:no-repeat,padding-box]',
        '[--shimmer-bg:linear-gradient(90deg,transparent_calc(50%-var(--spread)),var(--shimmer-color),transparent_calc(50%+var(--spread)))]',
        'dark:[--base-color:var(--muted-foreground)] dark:[--shimmer-color:var(--foreground)]',
        className,
      )}
      style={
        {
          '--spread': `${dynamicSpread}px`,
          ...(color && { '--base-color': color }),
          ...(shimmerColor && { '--shimmer-color': shimmerColor }),
          backgroundImage: `var(--shimmer-bg), linear-gradient(var(--base-color), var(--base-color))`,
        } as React.CSSProperties
      }
      initial={{ backgroundPosition: '100% center', opacity: 0 }}
      animate={
        shouldAnimate ? { backgroundPosition: '0% center', opacity: 1 } : {}
      }
      transition={{
        backgroundPosition: {
          repeat: repeat ? Infinity : 0,
          duration,
          delay,
          repeatDelay,
          ease: 'linear',
        },
        opacity: { duration: 0.3, delay },
      }}
    >
      {text}
    </motion.span>
  );
}

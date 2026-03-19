'use client';

import { useMemo, type JSX } from 'react';
import { motion, type Transition } from 'motion/react';
import { cn } from '@/lib/utils';

export type TextShimmerWaveProps = {
  children: string;
  as?: React.ElementType;
  className?: string;
  color?: string;
  shimmerColor?: string;
  duration?: number;
  zDistance?: number;
  xDistance?: number;
  yDistance?: number;
  spread?: number;
  scaleDistance?: number;
  rotateYDistance?: number;
  transition?: Transition;
};

export function TextShimmerWave({
  children,
  as: Tag = 'p',
  className,
  color = '#a1a1aa',
  shimmerColor = '#ffffff',
  duration = 1,
  zDistance = 10,
  xDistance = 2,
  yDistance = -2,
  spread = 1,
  scaleDistance = 1.1,
  rotateYDistance = 10,
  transition,
}: TextShimmerWaveProps) {
  const MotionTag = useMemo(
    () =>
      motion.create(Tag as keyof JSX.IntrinsicElements) as React.ComponentType<{
        className?: string;
        style?: React.CSSProperties;
        children?: React.ReactNode;
      }>,
    [Tag],
  );

  const repeatDelay = (children.length * 0.05) / spread;

  return (
    <MotionTag
      className={cn('relative inline-block perspective-normal', className)}
      style={{ color }}
    >
      {children.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block whitespace-pre transform-3d"
          initial={{ translateZ: 0, scale: 1, rotateY: 0, color }}
          animate={{
            translateZ: [0, zDistance, 0],
            translateX: [0, xDistance, 0],
            translateY: [0, yDistance, 0],
            scale: [1, scaleDistance, 1],
            rotateY: [0, rotateYDistance, 0],
            color: [color, shimmerColor, color],
          }}
          transition={{
            duration,
            repeat: Infinity,
            repeatDelay,
            delay: (i * duration) / (children.length * spread),
            ease: 'easeInOut',
            ...transition,
          }}
        >
          {char}
        </motion.span>
      ))}
    </MotionTag>
  );
}

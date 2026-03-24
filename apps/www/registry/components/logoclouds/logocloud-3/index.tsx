'use client';

import { cn } from '@/lib/utils';
import { animate, HTMLMotionProps, motion, useMotionValue } from 'motion/react';
import { useEffect, useRef } from 'react';
import useMeasure from 'react-use-measure';

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  speed?: number;
  pauseOnHover?: boolean;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
};

function InfiniteSlider({
  children,
  gap = 16,
  speed = 100,
  pauseOnHover = false,
  direction = 'horizontal',
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    const size = direction === 'horizontal' ? width : height;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    animationRef.current = animate(translation, [from, to], {
      ease: 'linear',
      duration: Math.abs(to - from) / speed,
      repeat: Infinity,
      repeatType: 'loop',
      repeatDelay: 0,
      onRepeat: () => translation.set(from),
    });

    return () => animationRef.current?.stop();
  }, [translation, speed, width, height, gap, direction, reverse]);

  const hoverProps = pauseOnHover
    ? {
        onHoverStart: () => animationRef.current?.pause(),
        onHoverEnd: () => animationRef.current?.play(),
      }
    : {};

  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        ref={ref}
        className="flex w-max"
        style={{
          ...(direction === 'horizontal'
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
        }}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

const GRADIENT_ANGLES = { top: 0, right: 90, bottom: 180, left: 270 } as const;

type ProgressiveBlurProps = {
  direction?: keyof typeof GRADIENT_ANGLES;
  blurLayers?: number;
  className?: string;
  blurIntensity?: number;
} & HTMLMotionProps<'div'>;

function ProgressiveBlur({
  direction = 'bottom',
  blurLayers = 8,
  className,
  blurIntensity = 0.25,
  ...props
}: ProgressiveBlurProps) {
  const layers = Math.max(blurLayers, 2);
  const segmentSize = 1 / (blurLayers + 1);
  const angle = GRADIENT_ANGLES[direction];

  return (
    <div className={cn('relative', className)}>
      {Array.from({ length: layers }).map((_, i) => {
        const stops = [i, i + 1, i + 2, i + 3]
          .map(
            (n, j) =>
              `rgba(255,255,255,${j === 1 || j === 2 ? 1 : 0}) ${n * segmentSize * 100}%`,
          )
          .join(', ');
        const gradient = `linear-gradient(${angle}deg, ${stops})`;
        return (
          <motion.div
            key={i}
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              maskImage: gradient,
              WebkitMaskImage: gradient,
              backdropFilter: `blur(${i * blurIntensity}px)`,
              WebkitBackdropFilter: `blur(${i * blurIntensity}px)`,
            }}
            {...props}
          />
        );
      })}
    </div>
  );
}

type LogoItem = {
  name: string;
  svg: React.ReactNode;
};

type LogoCloudProps = {
  logos: LogoItem[];
  label?: string;
  speed?: number;
  gap?: number;
  reverse?: boolean;
};

export default function LogoCloud({
  logos,
  label,
  speed = 40,
  gap = 112,
  reverse = false,
}: LogoCloudProps) {
  return (
    <section className="overflow-hidden bg-background py-16">
      <div className="group relative m-auto max-w-7xl px-6">
        <div className="flex flex-col items-center md:flex-row">
          {label && (
            <div className="md:max-w-44 md:border-r md:pr-6">
              <p className="text-end text-sm text-muted-foreground">{label}</p>
            </div>
          )}
          <div
            className={cn(
              'relative w-full py-6',
              label && 'md:w-[calc(100%-11rem)]',
            )}
          >
            <InfiniteSlider
              speed={speed}
              gap={gap}
              reverse={reverse}
              pauseOnHover
            >
              {logos.map(({ name, svg }) => (
                <span
                  key={name}
                  aria-label={name}
                  className="flex items-center"
                >
                  {svg}
                </span>
              ))}
            </InfiniteSlider>

            <div
              aria-hidden
              className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-background"
            />
            <div
              aria-hidden
              className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-background"
            />
            <ProgressiveBlur
              className="pointer-events-none absolute top-0 left-0 h-full w-20"
              direction="left"
              blurIntensity={1}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute top-0 right-0 h-full w-20"
              direction="right"
              blurIntensity={1}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

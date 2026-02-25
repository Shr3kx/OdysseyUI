'use client';

import { cn } from '@workspace/ui/lib/utils';
import { motion, type SVGMotionProps } from 'motion/react';

const pathVariants = {
  hidden: {
    pathLength: 0,
    fillOpacity: 0,
  },
  visible: {
    pathLength: 1,
    fillOpacity: 1,
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
    },
  },
} as const;

const sizes = {
  xs: 'h-5.5',
  sm: 'h-7',
  md: 'h-8',
  lg: 'h-12',
  xl: 'h-14',
};

export const Logo = ({
  draw = false,
  size = 'sm',
  className,
  containerClassName,
  ...props
}: {
  containerClassName?: string;
  draw?: boolean;
  size?: keyof typeof sizes;
} & SVGMotionProps<SVGSVGElement>) => {
  return (
    <div className={cn('flex items-center gap-2', containerClassName)}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 54 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="26.999"
          cy="27.1006"
          r="26.2295"
          fill="url(#paint0_radial_278_381)"
        />
        <defs>
          <radialGradient
            id="paint0_radial_278_381"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(0.769531 0.871094) rotate(45) scale(74.1882)"
          >
            <stop offset="0.352001" stopColor="#090909" />
            <stop offset="0.591494" stopColor="#4a5565" />
            <stop offset="0.793825" stopColor="#5d6a7c" /> {/* lighter */}
            <stop offset="0.972489" stopColor="#7b889a" /> {/* lightest */}
          </radialGradient>
        </defs>
      </svg>
      <span
        className="text-md font-medium tracking-wide"
        style={{ fontFamily: 'var(--font-geist-pixel-line)' }}
      >
        Odyssey UI
      </span>
    </div>
  );
};

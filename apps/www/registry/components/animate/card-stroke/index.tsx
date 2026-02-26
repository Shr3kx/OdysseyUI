'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { cn } from '@workspace/ui/lib/utils';

gsap.registerPlugin(SplitText);

type CardStrokeProps = {
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  accentStrokeColor?: string;
  baseStrokeColor?: string;
  textColor?: string;
  className?: string;
};

export default function CardStroke({
  title = 'Card Title',
  description = 'A small two line paragraph passed by prop.',
  imageSrc = '/templateImages/placeholder.png',
  imageAlt = 'Card background',
  accentStrokeColor = '#E0E0E0',
  baseStrokeColor = '#FE5E41',
  textColor = '#F5F5F5',
  className,
}: CardStrokeProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) {
      return;
    }

    const paths = card.querySelectorAll<SVGPathElement>('.svg-stroke path');
    const titleElement = card.querySelector<HTMLElement>('.card-title h3');
    const descriptionElement = card.querySelector<HTMLElement>('.card-title p');

    if (!titleElement || !descriptionElement || paths.length === 0) {
      return;
    }

    const splitTitle = SplitText.create(titleElement, {
      type: 'words',
      mask: 'words',
    });

    const splitDescription = SplitText.create(descriptionElement, {
      type: 'words',
      mask: 'words',
    });

    gsap.set(splitTitle.words, { yPercent: 100 });
    gsap.set(splitDescription.words, { yPercent: 100 });

    paths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = String(length);
      path.style.strokeDashoffset = String(length);
    });

    let timeline: gsap.core.Timeline | null = null;

    const onMouseEnter = () => {
      timeline?.kill();
      timeline = gsap.timeline();

      paths.forEach((path) => {
        timeline?.to(
          path,
          {
            strokeDashoffset: 0,
            attr: { 'stroke-width': 700 },
            duration: 1.5,
            ease: 'power2.inOut',
          },
          0,
        );
      });

      timeline.to(
        splitTitle.words,
        {
          yPercent: 0,
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.075,
        },
        0.35,
      );

      timeline.to(
        splitDescription.words,
        {
          yPercent: 0,
          duration: 0.65,
          ease: 'power3.out',
          stagger: 0.03,
        },
        0.45,
      );
    };

    const onMouseLeave = () => {
      timeline?.kill();
      timeline = gsap.timeline();

      paths.forEach((path) => {
        const length = path.getTotalLength();
        timeline?.to(
          path,
          {
            strokeDashoffset: length,
            attr: { 'stroke-width': 200 },
            duration: 1,
            ease: 'power2.inOut',
          },
          0,
        );
      });

      timeline.to(
        splitDescription.words,
        {
          yPercent: 100,
          duration: 0.35,
          ease: 'power3.in',
          stagger: { each: 0.02, from: 'end' },
        },
        0,
      );

      timeline.to(
        splitTitle.words,
        {
          yPercent: 100,
          duration: 0.5,
          ease: 'power3.in',
          stagger: { each: 0.05, from: 'end' },
        },
        0.05,
      );
    };

    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mouseleave', onMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', onMouseEnter);
      card.removeEventListener('mouseleave', onMouseLeave);
      timeline?.kill();
      splitTitle.revert();
      splitDescription.revert();
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        'card-container relative aspect-square w-full overflow-hidden rounded-2xl',
        className,
      )}
    >
      <div className="card-img absolute inset-0">
        <img src={imageSrc} alt={imageAlt} className="size-full object-cover" />
      </div>

      <div className="svg-stroke svg-stroke-1 pointer-events-none absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 scale-150">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 2453 2273"
          className="size-full"
        >
          <path
            strokeLinecap="round"
            strokeWidth="200"
            stroke={accentStrokeColor}
            d="M227.549 1818.76 C227.549 1818.76 406.016 2207.75 569.049 2130.26 C843.431 1999.85 -264.104 1002.3 227.549 876.262 C552.918 792.849 773.647 2456.11 1342.05 2130.26 C1885.43 1818.76 14.9644 455.772 760.548 137.262 C1342.05 -111.152 1663.5 2266.35 2209.55 1972.76 C2755.6 1679.18 1536.63 384.467 1826.55 137.262 C2013.5 -22.1463 2209.55 381.262 2209.55 381.262"
          />
        </svg>
      </div>

      <div className="svg-stroke svg-stroke-2 pointer-events-none absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 scale-150">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 2250 2535"
          className="size-full"
        >
          <path
            strokeLinecap="round"
            strokeWidth="200"
            stroke={baseStrokeColor}
            d="M1661.28 2255.51 C1661.28 2255.51 2311.09 1960.37 2111.78 1817.01 C1944.47 1696.67 718.456 2870.17 499.781 2255.51 C308.969 1719.17 2457.51 1613.83 2111.78 963.512 C1766.05 313.198 427.949 2195.17 132.281 1455.51 C-155.219 736.292 2014.78 891.514 1708.78 252.012 C1437.81 -314.29 369.471 909.169 132.281 566.512 C18.1772 401.672 244.781 193.012 244.781 193.012"
          />
        </svg>
      </div>

      <div
        className="card-title absolute bottom-8 left-8 z-10 max-w-[22ch]"
        style={{ color: textColor }}
      >
        <h3 className="text-3xl font-bold leading-none tracking-tight sm:text-4xl">
          {title}
        </h3>
        <p className="mt-2 text-xs leading-[1.3] opacity-90 sm:text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}

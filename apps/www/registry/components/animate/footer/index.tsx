'use client';

import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

type FooterColorProps = {
  text?: string;
  gradient?: string[];
};

type FooterProps = {
  colors?: FooterColorProps;
  copyrightText?: string;
};

const DEFAULT_FOOTER_COLORS = {
  text: '#451A03',
  gradient: [
    '#1E40AF',
    '#3B82F6',
    '#60A5FA',
    '#FFFFFF',
    '#FED7AA',
    '#FB923C',
    '#EA580C',
    '#9A3412',
  ],
};

const currentYear = new Date().getFullYear();

export default function Footer({ colors, copyrightText }: FooterProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const resolvedColors = useMemo(() => {
    const gradient = Array.from({ length: 8 }, (_, index) => {
      return (
        colors?.gradient?.[index] ??
        DEFAULT_FOOTER_COLORS.gradient[index] ??
        '#9A3412'
      );
    });

    return {
      text: colors?.text ?? DEFAULT_FOOTER_COLORS.text,
      gradient,
    };
  }, [colors]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    if (typeof gsap === 'undefined') {
      console.error('GSAP is not loaded. Cannot proceed with animations.');
      const elements = root.querySelectorAll<Element>(
        '.svg-container, .main-title',
      );
      elements.forEach((el: Element) => {
        (el as HTMLElement).style.opacity = '1';
      });
      return;
    }

    const ctx = gsap.context(() => {
      const svg = root.querySelector('svg');
      if (svg) {
        for (let i = 0; i < 9; i++) {
          const gradient = svg.getElementById?.(
            `grad${i}`,
          ) as SVGLinearGradientElement | null;
          if (gradient) {
            gradient
              .querySelectorAll<SVGStopElement>('stop')
              .forEach((stop: SVGStopElement, idx: number) => {
                if (idx < resolvedColors.gradient.length) {
                  stop.setAttribute('stop-color', resolvedColors.gradient[idx]);
                } else if (
                  resolvedColors.gradient[resolvedColors.gradient.length - 1]
                ) {
                  stop.setAttribute(
                    'stop-color',
                    resolvedColors.gradient[resolvedColors.gradient.length - 1],
                  );
                }
              });
          }
        }
      }

      const animationSection = root.querySelector('.animation-section') ?? root;
      const mainTitle = root.querySelector<Element>('.main-title');
      const allSplitLines: gsap.TweenTarget[] = [];

      if (mainTitle) {
        const mainTitleSplit = new SplitText(mainTitle, { type: 'lines' });
        gsap.set(mainTitleSplit.lines, {
          opacity: 0,
          y: 30,
          filter: 'blur(8px)',
        });
        allSplitLines.push(...mainTitleSplit.lines);
      }

      gsap
        .timeline({
          scrollTrigger: {
            trigger: animationSection,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 1,
          },
        })
        .to('.svg-container', { autoAlpha: 1, duration: 0.01 }, 0)
        .to('.main-title', { autoAlpha: 1, duration: 0.01 }, 0)
        .to(
          '.svg-container',
          {
            transform: 'scaleY(0.05) translateY(-30px)',
            duration: 0.3,
            ease: 'power2.out',
          },
          0,
        )
        .to(
          '.svg-container',
          {
            transform: 'scaleY(1) translateY(0px)',
            duration: 1.2,
            ease: 'power2.out',
          },
          0.3,
        )
        .to(
          allSplitLines,
          {
            duration: 0.8,
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            stagger: 0.08,
            ease: 'power2.out',
          },
          0.9,
        );
    }, root);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, [resolvedColors]);

  const footerCopy = copyrightText ?? `copyright © ${currentYear} — Sahil Rana`;

  return (
    <div ref={rootRef} className="overflow-x-hidden mt-[40vh]">
      <div className="scroll-space bg-background transition-colors duration-300" />
      <div className="animation-section relative h-screen bg-background transition-colors duration-300">
        <div className="footer-container pointer-events-none fixed inset-x-0 bottom-0 z-10 h-screen">
          <div className="svg-container pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-screen origin-bottom opacity-0 will-change-[transform,opacity,filter] [transform:scaleY(0.05)_translateY(100vh)]">
            <svg
              className="spectrum-svg size-full"
              viewBox="0 0 1567 584"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip)" filter="url(#blur)">
                <path d="M1219 584H1393V184H1219V584Z" fill="url(#grad0)" />
                <path d="M1045 584H1219V104H1045V584Z" fill="url(#grad1)" />
                <path
                  d="M348 584H174L174 184H348L348 584Z"
                  fill="url(#grad2)"
                />
                <path
                  d="M522 584H348L348 104H522L522 584Z"
                  fill="url(#grad3)"
                />
                <path d="M697 584H522L522 54H697L697 584Z" fill="url(#grad4)" />
                <path d="M870 584H1045V54H870V584Z" fill="url(#grad5)" />
                <path d="M870 584H697L697 0H870L870 584Z" fill="url(#grad6)" />
                <path
                  d="M174 585H0.000183105L-3.75875e-06 295H174L174 585Z"
                  fill="url(#grad7)"
                />
                <path d="M1393 584H1567V294H1393V584Z" fill="url(#grad8)" />
              </g>
              <defs>
                <filter
                  id="blur"
                  x="-30"
                  y="-30"
                  width="1627"
                  height="644"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="15"
                    result="effect1_foregroundBlur"
                  />
                </filter>
                {Array.from({ length: 9 }, (_, i) => {
                  const coords: {
                    x1: string;
                    y1: string;
                    x2: string;
                    y2: string;
                  } = {
                    0: { x1: '1306', y1: '584', x2: '1306', y2: '184' },
                    1: { x1: '1132', y1: '584', x2: '1132', y2: '104' },
                    2: { x1: '261', y1: '584', x2: '261', y2: '184' },
                    3: { x1: '435', y1: '584', x2: '435', y2: '104' },
                    4: { x1: '609.501', y1: '584', x2: '609.501', y2: '54' },
                    5: { x1: '957.5', y1: '584', x2: '957.5', y2: '54' },
                    6: { x1: '783.501', y1: '584', x2: '783.501', y2: '0' },
                    7: { x1: '87.0003', y1: '585', x2: '87.0003', y2: '295' },
                    8: { x1: '1480', y1: '584', x2: '1480', y2: '294' },
                  }[i] || { x1: '1306', y1: '584', x2: '1306', y2: '184' };

                  return (
                    <linearGradient
                      key={`grad${i}`}
                      id={`grad${i}`}
                      x1={coords.x1}
                      y1={coords.y1}
                      x2={coords.x2}
                      y2={coords.y2}
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor={resolvedColors.gradient[0]} />
                      <stop
                        offset="0.182709"
                        stopColor={resolvedColors.gradient[1]}
                      />
                      <stop
                        offset="0.283673"
                        stopColor={resolvedColors.gradient[2]}
                      />
                      <stop
                        offset="0.413484"
                        stopColor={resolvedColors.gradient[3]}
                      />
                      <stop
                        offset="0.586565"
                        stopColor={resolvedColors.gradient[4]}
                      />
                      <stop
                        offset="0.682722"
                        stopColor={resolvedColors.gradient[5]}
                      />
                      <stop
                        offset="0.802892"
                        stopColor={resolvedColors.gradient[6]}
                      />
                      <stop
                        offset="1"
                        stopColor={resolvedColors.gradient[7]}
                        stopOpacity="0"
                      />
                    </linearGradient>
                  );
                })}
                <clipPath id="clip">
                  <rect width="1567" height="584" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div
            className="main-title pointer-events-none absolute bottom-1/2 left-1/2 z-20 -translate-x-1/2 translate-y-1/2 bg-transparent text-center text-foreground leading-[1.4] opacity-0 transition-colors duration-300 font-serif"
            style={colors?.text ? { color: resolvedColors.text } : undefined}
          >
            {footerCopy}
          </div>
        </div>
      </div>
    </div>
  );
}

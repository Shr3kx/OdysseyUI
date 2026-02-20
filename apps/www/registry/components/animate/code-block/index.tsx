'use client';

import * as React from 'react';
import { cn } from '@workspace/ui/lib/utils';
import { CopyButton } from '../../buttons/copy';

const languageIcons: Record<string, React.ReactNode> = {
  javascript: (
    <svg viewBox="0 0 1052 1052" className="w-4 h-4">
      <path fill="#f0db4f" d="M0 0h1052v1052H0z" />
      <path
        d="M965.9 801.1c-7.7-48-39-88.3-131.7-125.9-32.2-14.8-68.1-25.399-78.8-49.8-3.8-14.2-4.3-22.2-1.9-30.8 6.9-27.9 40.2-36.6 66.6-28.6 17 5.7 33.1 18.801 42.8 39.7 45.4-29.399 45.3-29.2 77-49.399-11.6-18-17.8-26.301-25.4-34-27.3-30.5-64.5-46.2-124-45-10.3 1.3-20.699 2.699-31 4-29.699 7.5-58 23.1-74.6 44-49.8 56.5-35.6 155.399 25 196.1 59.7 44.8 147.4 55 158.6 96.9 10.9 51.3-37.699 67.899-86 62-35.6-7.4-55.399-25.5-76.8-58.4-39.399 22.8-39.399 22.8-79.899 46.1 9.6 21 19.699 30.5 35.8 48.7 76.2 77.3 266.899 73.5 301.1-43.5 1.399-4.001 10.6-30.801 3.199-72.101zm-394-317.6h-98.4c0 85-.399 169.4-.399 254.4 0 54.1 2.8 103.7-6 118.9-14.4 29.899-51.7 26.2-68.7 20.399-17.3-8.5-26.1-20.6-36.3-37.699-2.8-4.9-4.9-8.7-5.601-9-26.699 16.3-53.3 32.699-80 49 13.301 27.3 32.9 51 58 66.399 37.5 22.5 87.9 29.4 140.601 17.3 34.3-10 63.899-30.699 79.399-62.199 22.4-41.3 17.6-91.3 17.4-146.6.5-90.2 0-180.4 0-270.9z"
        fill="#323330"
      />
    </svg>
  ),
  js: (
    <svg viewBox="0 0 1052 1052" className="w-4 h-4">
      <path fill="#f0db4f" d="M0 0h1052v1052H0z" />
      <path
        d="M965.9 801.1c-7.7-48-39-88.3-131.7-125.9-32.2-14.8-68.1-25.399-78.8-49.8-3.8-14.2-4.3-22.2-1.9-30.8 6.9-27.9 40.2-36.6 66.6-28.6 17 5.7 33.1 18.801 42.8 39.7 45.4-29.399 45.3-29.2 77-49.399-11.6-18-17.8-26.301-25.4-34-27.3-30.5-64.5-46.2-124-45-10.3 1.3-20.699 2.699-31 4-29.699 7.5-58 23.1-74.6 44-49.8 56.5-35.6 155.399 25 196.1 59.7 44.8 147.4 55 158.6 96.9 10.9 51.3-37.699 67.899-86 62-35.6-7.4-55.399-25.5-76.8-58.4-39.399 22.8-39.399 22.8-79.899 46.1 9.6 21 19.699 30.5 35.8 48.7 76.2 77.3 266.899 73.5 301.1-43.5 1.399-4.001 10.6-30.801 3.199-72.101zm-394-317.6h-98.4c0 85-.399 169.4-.399 254.4 0 54.1 2.8 103.7-6 118.9-14.4 29.899-51.7 26.2-68.7 20.399-17.3-8.5-26.1-20.6-36.3-37.699-2.8-4.9-4.9-8.7-5.601-9-26.699 16.3-53.3 32.699-80 49 13.301 27.3 32.9 51 58 66.399 37.5 22.5 87.9 29.4 140.601 17.3 34.3-10 63.899-30.699 79.399-62.199 22.4-41.3 17.6-91.3 17.4-146.6.5-90.2 0-180.4 0-270.9z"
        fill="#323330"
      />
    </svg>
  ),
  python: (
    <svg fill="none" viewBox="16 16 32 32" className="w-4 h-4">
      <path
        fill="url(#python__a)"
        d="M31.885 16c-8.124 0-7.617 3.523-7.617 3.523l.01 3.65h7.752v1.095H21.197S16 23.678 16 31.876c0 8.196 4.537 7.906 4.537 7.906h2.708v-3.804s-.146-4.537 4.465-4.537h7.688s4.32.07 4.32-4.175v-7.019S40.374 16 31.885 16zm-4.275 2.454a1.394 1.394 0 1 1 0 2.79 1.393 1.393 0 0 1-1.395-1.395c0-.771.624-1.395 1.395-1.395z"
      />
      <path
        fill="url(#python__b)"
        d="M32.115 47.833c8.124 0 7.617-3.523 7.617-3.523l-.01-3.65H31.97v-1.095h10.832S48 40.155 48 31.958c0-8.197-4.537-7.906-4.537-7.906h-2.708v3.803s.146 4.537-4.465 4.537h-7.688s-4.32-.07-4.32 4.175v7.019s-.656 4.247 7.833 4.247zm4.275-2.454a1.393 1.393 0 0 1-1.395-1.395 1.394 1.394 0 1 1 1.395 1.395z"
      />
      <defs>
        <linearGradient
          id="python__a"
          x1="19.075"
          x2="34.898"
          y1="18.782"
          y2="34.658"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#387EB8" />
          <stop offset="1" stopColor="#366994" />
        </linearGradient>
        <linearGradient
          id="python__b"
          x1="28.809"
          x2="45.803"
          y1="28.882"
          y2="45.163"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFE052" />
          <stop offset="1" stopColor="#FFC331" />
        </linearGradient>
      </defs>
    </svg>
  ),
  java: (
    <svg
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 256 346"
      className="w-4 h-4"
    >
      <path
        d="M83 267s-14 8 9 11c27 3 41 2 71-3 0 0 8 5 19 9-67 29-153-2-99-17M74 230s-15 11 8 13c29 3 52 3 92-4 0 0 6 5 15 8-82 24-173 2-115-17"
        fill="#5382A1"
      />
      <path
        d="M144 166c17 19-4 36-4 36s42-22 22-49c-18-26-32-38 44-82 0 0-119 29-62 95"
        fill="#E76F00"
      />
      <path
        d="M233 295s10 8-10 15c-39 12-163 15-197 0-12-5 11-13 18-14l12-2c-14-9-89 19-38 28 138 22 251-10 215-27M89 190s-63 15-22 21c17 2 51 2 83-1 26-2 52-7 52-7l-16 9c-64 16-187 8-151-9 30-14 54-13 54-13M202 253c64-33 34-66 13-61l-7 2s2-3 6-5c41-14 73 43-14 66l2-2"
        fill="#5382A1"
      />
      <path
        d="M162 0s36 36-34 91c-56 45-12 70 0 99-32-30-56-56-40-80 23-35 89-53 74-110"
        fill="#E76F00"
      />
      <path
        d="M95 345c62 4 158-3 160-32 0 0-4 11-51 20-53 10-119 9-158 2 0 0 8 7 49 10"
        fill="#5382A1"
      />
    </svg>
  ),
};

type CodeFrameProps = {
  code: string;
  language?: string;
  className?: string;
};

export function CodeFrame({
  code,
  language = 'javascript',
  className,
}: CodeFrameProps) {
  const [html, setHtml] = React.useState('');

  React.useEffect(() => {
    async function loadHighlightedCode() {
      try {
        const { codeToHtml } = await import('shiki');
        const highlighted = await codeToHtml(code, {
          lang: language,
          themes: {
            light: 'one-dark-pro',
            dark: 'one-dark-pro',
          },
        });
        setHtml(highlighted);
      } catch (error) {
        console.error('Error highlighting code:', error);
      }
    }
    loadHighlightedCode();
  }, [code, language]);

  const languageKey = language.toLowerCase();
  const icon = languageIcons[languageKey];

  return (
    <div
      className={cn(
        'group bg-muted border border-border/60 max-w-full w-full rounded-2xl p-1 pt-0 relative',
        className,
      )}
    >
      <div className="flex items-center justify-between bg-transparent px-3 py-1">
        <div className="flex min-w-0 items-center gap-2">
          {icon ? (
            <div className="inline-flex items-center justify-center rounded-sm  px-1.5 py-1">
              {icon}{' '}
              <span className="inline-flex items-center rounded-sm px-1.5 py-0.5 text-[12px] font-semibold leading-none tra text-muted-foreground capitalize">
                {language}
              </span>
            </div>
          ) : (
            <span className="inline-flex items-center rounded-sm border border-border/70 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-muted-foreground">
              {language.toUpperCase()}
            </span>
          )}
        </div>

        <CopyButton variant="secondary" content={code} />
      </div>

      <div
        className="relative bg-card border border-border/60 rounded-lg overflow-hidden max-h-96 [&>pre]:m-0 [&>pre]:p-4 [&>pre]:bg-transparent"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

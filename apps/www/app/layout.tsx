import { RootProvider } from 'fumadocs-ui/provider';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Outfit } from 'next/font/google';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import {
  GeistPixelSquare,
  GeistPixelGrid,
  GeistPixelCircle,
  GeistPixelTriangle,
  GeistPixelLine,
} from 'geist/font/pixel';
import './globals.css';
import { jsonLd } from '@/lib/json-ld';
import { cn } from '@workspace/ui/lib/utils';
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider';

export const metadata: Metadata = {
  title: {
    template: '%s - Odyssey UI',
    default: 'Odyssey UI - Animated React Components',
  },
  description:
    'Fully animated, open-source component distribution built with React, TypeScript, Tailwind CSS, Motion and Shadcn CLI. Browse a list of components you can install, modify, and use in your projects.',
  keywords: [
    'Odyssey UI',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Framer Motion',
    'Open-source components',
    'Animated UI components',
    'UI library',
  ],
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/apple-touch-icon.png',
    },
  ],
  authors: [
    {
      name: 'imskyleen',
      url: 'https://github.com/imskyleen',
    },
  ],
  publisher: 'Odyssey UI',
  openGraph: {
    title: 'Odyssey UI',
    description:
      'Fully animated, open-source component distribution built with React, TypeScript, Tailwind CSS, Motion and Shadcn CLI. Browse a list of components you can install, modify, and use in your projects.',
    url: 'https://odysseyui.com',
    siteName: 'Odyssey UI',
    images: [
      {
        url: 'https://odysseyui.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Odyssey UI',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@animate_ui',
    title: 'Odyssey UI',
    description:
      'Fully animated, open-source component distribution built with React, TypeScript, Tailwind CSS, Motion and Shadcn CLI. Browse a list of components you can install, modify, and use in your projects.',
    images: [
      {
        url: 'https://odysseyui.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Odyssey UI',
      },
    ],
  },
};

const outfit = Outfit({ subsets: ['latin'] });

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(
        outfit.className,
        GeistPixelSquare.variable,
        GeistPixelGrid.variable,
        GeistPixelCircle.variable,
        GeistPixelTriangle.variable,
        GeistPixelLine.variable,
      )}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body
        className={cn(
          'flex flex-col min-h-screen',
          // Allows to make more attractive video recordings
          // 'screenshot-mode',
        )}
      >
        <RootProvider theme={{ defaultTheme: 'dark' }}>
          <SmoothScrollProvider />
          <NuqsAdapter>{children}</NuqsAdapter>
        </RootProvider>
      </body>
    </html>
  );
}

'use client';

import { Footer } from '@/components/footer';
import { LandingNav } from '@/components/landing-nav';
import { motion } from 'motion/react';
import Silk from '@/components/Silk';

export default function HomePage() {
  return (
    <>
      <LandingNav />
      <div className="relative h-dvh w-full overflow-hidden">
        {/* Light mode silk */}
        <div className="block dark:hidden absolute inset-0 opacity-75">
          <Silk
            speed={5}
            scale={1}
            // color="#8f9db0"
            color="#8f9db0"
            noiseIntensity={1.5}
            rotation={0}
          />
        </div>
        {/* Dark mode silk */}
        <div className="hidden dark:block absolute inset-0">
          <Silk
            speed={5}
            scale={1}
            color="#4a5565"
            noiseIntensity={1.5}
            rotation={0}
          />
        </div>

        {/* Hero overlay */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
        >
          <p className="mb-5 text-md uppercase tracking-wide text-neutral-700 dark:text-neutral-500 font-medium select-none">
            Odyssey UI
          </p>

          <h1
            className="text-center font-black leading-[0.9] text-black dark:text-white select-none"
            style={{
              fontSize: 'clamp(3.5rem, 10vw, 9rem)',
              fontFamily: 'var(--font-geist-pixel-line)',
            }}
            // style={{  }}
          >
            Good design
            <br />
            <span className="italic text-neutral-700 dark:text-neutral-400">
              shouts.
            </span>
          </h1>

          <p className="mt-7 max-w-104 text-center text-base text-black dark:text-neutral-400 font-normal leading-relaxed select-none px-6">
            Animated primitives and components built for
            React&nbsp;&amp;&nbsp;Next.js.
          </p>

          <div className="pointer-events-auto mt-10 flex items-center gap-3">
            <a
              href="/docs/components"
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-neutral-900 dark:bg-white px-6 text-sm font-semibold text-white dark:text-neutral-900 shadow-md transition-all duration-200 hover:bg-neutral-700 dark:hover:bg-neutral-100 hover:shadow-lg active:scale-95"
            >
              Explore Components
              <svg
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
            <a
              href="/docs"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/60 px-6 text-sm font-semibold text-neutral-800 dark:text-neutral-200 backdrop-blur-sm transition-all duration-200 hover:bg-white dark:hover:bg-neutral-800 hover:shadow-sm active:scale-95"
            >
              Read Docs
            </a>
          </div>
          <div className="absolute bottom-0 left-0 w-full">
            <Footer />
          </div>
        </motion.div>
      </div>
    </>
  );
}

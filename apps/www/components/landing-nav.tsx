'use client';

import Link from 'next/link';
import { StarIcon } from 'lucide-react';
import { Logo } from '@/components/logo';
import { ThemeSwitcher } from './animate/theme-switcher';
import {
  GithubStars,
  GithubStarsIcon,
  GithubStarsLogo,
  GithubStarsNumber,
  GithubStarsParticles,
} from '@/registry/primitives/animate/github-stars';
import { cn } from '@workspace/ui/lib/utils';

const NAV_LINKS = [
  { title: 'Components', href: '/docs/components' },
  { title: 'Templates', href: '/docs/templates' },
  { title: 'Pricing', href: '/pricing' },
];

export const LandingNav = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit',
        className,
      )}
    >
      <nav className="flex items-center gap-x-1 rounded-2xl border border-black/8 dark:border-white/10 bg-slate-200 dark:bg-neutral-950/85 px-3 py-2 shadow-lg shadow-black/8 dark:shadow-black/40 backdrop-blur-xl">
        {/* Logo */}
        <Link
          href="/"
          className="mr-2 flex items-center gap-x-2 px-1 select-none"
          aria-label="OdysseyUI home"
        >
          <Logo size="xs" />
        </Link>

        {/* Divider */}
        <div className="h-4 w-px bg-black/10 dark:bg-white/10 mx-1" />

        {/* Nav links */}
        <div className="flex items-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-neutral-500 dark:text-neutral-400 transition-colors duration-150 hover:bg-black/6 dark:hover:bg-white/8 hover:text-neutral-900 dark:hover:text-white"
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="h-4 w-px bg-black/10 dark:bg-white/10 mx-1" />

        {/* Right actions */}
        <div className="flex items-center gap-x-1">
          {/* GitHub Stars */}
          <GithubStars username="shr3kx" repo="odysseyUI" asChild>
            <a
              href="https://github.com/shr3kx/odysseyUI"
              rel="noreferrer noopener"
              target="_blank"
              className="group flex cursor-pointer items-center gap-x-1.5 rounded-lg p-1.5 text-sm font-medium text-neutral-500 dark:text-neutral-400 transition-colors duration-150 hover:bg-black/6 dark:hover:bg-white/8 hover:text-neutral-900 dark:hover:text-white [&_svg]:size-4"
            >
              <GithubStarsLogo className="size-4 shrink-0" />
              <span className="flex items-center gap-x-1 rounded-lg bg-black/5 dark:bg-white/6 px-1.5 py-0.5 text-xs select-none group-hover:bg-black/10 dark:group-hover:bg-white/10">
                <GithubStarsNumber />
                <GithubStarsParticles>
                  <GithubStarsIcon
                    icon={StarIcon}
                    className="size-3!"
                    activeClassName="text-neutral-400 group-hover:text-yellow-500 dark:group-hover:text-yellow-400"
                  />
                </GithubStarsParticles>
              </span>
            </a>
          </GithubStars>

          {/* Theme Switcher */}
          <ThemeSwitcher className="ml-0.5" />
        </div>
      </nav>
    </div>
  );
};

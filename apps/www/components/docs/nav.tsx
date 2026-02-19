'use client';

import { Navbar } from 'fumadocs-ui/layouts/docs-client';
import Link from 'next/link';
import React from 'react';
import { IconLogo } from '../icon-logo';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { cn } from '@workspace/ui/lib/utils';
import { CommandIcon, StarIcon } from 'lucide-react';
import { useSidebar } from 'fumadocs-ui/provider';
import { ThemeSwitcher } from '../animate/theme-switcher';
import XIcon from '@workspace/ui/components/icons/x-icon';
import {
  GithubStars,
  GithubStarsIcon,
  GithubStarsLogo,
  GithubStarsNumber,
  GithubStarsParticles,
} from '@/registry/primitives/animate/github-stars';
import { Menu } from '@/registry/icons/menu';
import { ComponentSearch } from './component-search';

export const NAV_ITEMS = [
  {
    title: 'Docs',
    url: '/docs',
  },
  {
    title: 'Components',
    url: '/docs/components',
  },
  {
    title: 'Templates',
    url: '/docs/templates',
  },
];

const NavItem = ({ title, url }: { title: string; url: string }) => {
  return (
    <Link
      href={url}
      className={buttonVariants({
        color: 'ghost',
        size: 'sm',
        className: cn(
          '!text-sm !font-normal text-neutral-700 dark:text-neutral-200 hover:text-black dark:hover:text-white !h-8 !px-3 transition-colors duration-200 ease-in-out',
        ),
      })}
    >
      {title}
    </Link>
  );
};

export const Nav = () => {
  const { open, setOpen } = useSidebar();
  const [searchOpen, setSearchOpen] = React.useState(false);

  // Add Cmd/Ctrl+K keyboard shortcut. Use capture-phase listener and stop propagation
  // so fumadocs' own shortcut doesn't also open.
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        // prevent other listeners (like fumadocs) from opening their dialog
        e.preventDefault();
        e.stopPropagation();
        // stopImmediatePropagation exists on the event
        try {
          (e as any).stopImmediatePropagation();
        } catch {}
        setSearchOpen(true);
      }
    };

    // capture:true to run before non-capture listeners and block them
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, []);

  return (
    <>
      <Navbar className="md:h-17 h-14 border bg-background/70 backdrop-blur-lg rounded-b-2xl md:px-5 px-3 flex items-center gap-3 max-w-410 w-full mx-auto">
        <Link
          href="/"
          className={buttonVariants({
            color: 'ghost',
            size: 'icon-sm',
            className:
              '[&_svg]:!size-5 md:[&_svg]:!size-4.5 !p-0 !size-8 transition-colors duration-200 ease-in-out',
          })}
        >
          <IconLogo size="sm" />
        </Link>

        <div className="flex items-center md:justify-between justify-end gap-2 flex-1">
          <div className="md:flex hidden items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <NavItem key={item.title} title={item.title} url={item.url} />
            ))}
          </div>

          <div className="flex items-center md:gap-3 gap-2">
            <button
              className="pl-3 pr-1.5 h-8 w-48 lg:w-56 xl:w-64 bg-accent hover:bg-accent/70 transition-colors duration-200 ease-in-out text-sm text-muted-foreground rounded-md flex items-center justify-between"
              onClick={() => setSearchOpen(true)}
            >
              <span className="font-normal">Search...</span>

              <div className="flex items-center gap-1">
                <kbd className="inline-flex h-4 min-w-4 items-center justify-center rounded border border-border bg-background px-1 font-mono">
                  <CommandIcon className="size-2.5" />
                </kbd>

                <kbd className="inline-flex h-4 min-w-4 items-center justify-center rounded border border-border bg-background px-1 font-mono">
                  <span className="leading-none text-[0.625rem] pt-px">K</span>
                </kbd>
              </div>
            </button>

            <div className="flex items-center gap-1 max-md:hidden">
              <GithubStars
                username="shr3kx"
                repo="odysseyUI"
                delay={2000}
                asChild
              >
                <a
                  href="https://github.com/shr3kx/odysseyUI"
                  rel="noreferrer noopener"
                  target="_blank"
                  className="group cursor-pointer justify-center rounded-md text-sm group font-medium transition-colors duration-300 ease-in-out disabled:pointer-events-none disabled:opacity-50 hover:bg-fd-accent hover:text-fd-accent-foreground p-1.5 [&_svg]:size-5 text-fd-muted-foreground sm:[&_svg]:size-5.5 flex items-center gap-x-2"
                >
                  <GithubStarsLogo className="size-4!" />

                  <span className="rounded-lg flex items-center gap-x-1 select-none bg-accent dark:group-hover:bg-neutral-900 group-hover:bg-white text-sm py-1 pl-1.5 pr-1.25">
                    <GithubStarsNumber />{' '}
                    <GithubStarsParticles>
                      <GithubStarsIcon
                        icon={StarIcon}
                        className="size-4!"
                        activeClassName="group-hover:text-yellow-600 text-yellow-500 transition-all duration-300"
                      />
                    </GithubStarsParticles>
                  </span>
                </a>
              </GithubStars>

              <a
                href="https://x.com/iam-sahil"
                rel="noreferrer noopener"
                target="_blank"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors duration-100 disabled:pointer-events-none disabled:opacity-50 hover:bg-fd-accent hover:text-fd-accent-foreground size-8 [&_svg]:size-5 text-fd-muted-foreground"
                data-active="false"
              >
                <XIcon className="size-5!" />
              </a>
            </div>

            <ThemeSwitcher className="max-md:hidden" />

            <button
              className={cn(
                buttonVariants({
                  color: 'ghost',
                  size: 'icon-sm',
                  className:
                    '!size-8 [&_svg]:!size-5 text-fd-muted-foreground md:hidden',
                }),
              )}
              onClick={() => setOpen((prev) => !prev)}
            >
              <Menu animate={open} />
            </button>
          </div>
        </div>
      </Navbar>
      <ComponentSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
};

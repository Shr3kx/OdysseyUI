'use client';

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from '@workspace/ui/components/ui/sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@workspace/ui/components/ui/breadcrumb';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@workspace/ui/components/ui/dropdown-menu';
import {
  Avatar as UIAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Separator } from '@workspace/ui/components/ui/separator';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  SearchIcon,
  CommandLineIcon,
  RobotIcon,
  BookOpen01Icon,
  Settings02Icon,
  FramerIcon,
  PieChartIcon,
  MapsIcon,
  ArrowRight01Icon,
  Logout01Icon,
  User02Icon,
  UnfoldMoreIcon,
  KeyboardIcon,
} from '@hugeicons/core-free-icons';
import OdysseyAvatar, {
  type AvatarColor,
} from '@/registry/components/primitives/avatar';
import { cn } from '@/lib/utils';

import Image from 'next/image';
import type { AppShell1Config, SidebarSection } from './app-shell-1.config';
import { appShell1Config as defaultConfig } from './app-shell-1.config';

// ─── Kbd ──────────────────────────────────────────────────────────────────────

function Kbd({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <kbd
      className={cn(
        'inline-flex h-5 min-w-5 items-center justify-center rounded border bg-muted px-1 text-[11px] font-medium text-muted-foreground',
        className,
      )}
    >
      {children}
    </kbd>
  );
}

// ─── Icon map ─────────────────────────────────────────────────────────────────

const iconMap: Record<string, any> = {
  SquareTerminal: CommandLineIcon,
  Bot: RobotIcon,
  BookOpen: BookOpen01Icon,
  Settings2: Settings02Icon,
  Frame: FramerIcon,
  PieChart: PieChartIcon,
  Map: MapsIcon,
};

// ─── Avatar color helper ──────────────────────────────────────────────────────

const AVATAR_COLORS: AvatarColor[] = [
  'blue',
  'orange',
  'red',
  'green',
  'purple',
  'yellow',
  'cyan',
  'pink',
  'indigo',
  'lime',
  'turquoise',
  'violet',
];

function getAvatarColor(seed: string): AvatarColor {
  const n = seed.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return AVATAR_COLORS[n % AVATAR_COLORS.length];
}

// ─── Shortcuts Modal ──────────────────────────────────────────────────────────

const SHORTCUTS = [
  { label: 'Open search', keys: ['⌘', 'K'] },
  { label: 'Toggle sidebar', keys: ['⌘', 'B'] },
] as const;

function ShortcutsModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader className="sr-only">
        <DialogTitle>Keyboard shortcuts</DialogTitle>
        <DialogDescription>Available keyboard shortcuts</DialogDescription>
      </DialogHeader>
      <DialogContent className="sm:max-w-xs">
        <div className="mb-4 flex flex-col gap-1">
          <p className="text-sm font-semibold">Keyboard shortcuts</p>
          <p className="text-xs text-muted-foreground">
            Navigate faster with these shortcuts
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {SHORTCUTS.map((s) => (
            <div key={s.label} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <span className="flex items-center gap-0.5">
                {s.keys.map((k) => (
                  <Kbd key={k}>{k}</Kbd>
                ))}
              </span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Shared user avatar + menu ────────────────────────────────────────────────

function UserAvatar({
  src,
  name,
  color,
}: {
  src: string;
  name: string;
  color: AvatarColor;
}) {
  return (
    <UIAvatar className="size-8">
      <AvatarImage src={src} alt={name} />
      <AvatarFallback className="overflow-hidden bg-transparent p-0">
        <OdysseyAvatar color={color} size="sm" />
      </AvatarFallback>
    </UIAvatar>
  );
}

function UserMenuContent({
  src,
  name,
  email,
  color,
  profileHref,
  onLogout,
  onShortcuts,
}: {
  src: string;
  name: string;
  email: string;
  color: AvatarColor;
  profileHref: string;
  onLogout?: () => void;
  onShortcuts: () => void;
}) {
  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <UserAvatar src={src} name={name} color={color} />
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{name}</span>
              <span className="truncate text-xs text-muted-foreground">
                {email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem render={<Link href={profileHref} />}>
          <HugeiconsIcon icon={User02Icon} strokeWidth={2} />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onShortcuts}>
          <HugeiconsIcon icon={KeyboardIcon} strokeWidth={2} />
          Shortcuts
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive" onClick={onLogout}>
        <HugeiconsIcon icon={Logout01Icon} strokeWidth={2} />
        Log out
      </DropdownMenuItem>
    </>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SidebarUserInfo {
  name?: string;
  email?: string;
  avatar?: string;
}

export interface AppShell1SearchProps {
  config: AppShell1Config;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface AppShell1PageHeaderProps {
  pageName: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  actions?: React.ReactNode;
  user?: SidebarUserInfo;
  profileHref?: string;
  onLogout?: () => void;
}

export interface AppShell1Props {
  config?: AppShell1Config;
  collapsibleSubsections?: boolean;
  user?: SidebarUserInfo;
  profileHref?: string;
  onLogout?: () => void;
}

// ─── Search Modal ─────────────────────────────────────────────────────────────

export function AppShell1Search({
  config,
  open,
  onOpenChange,
}: AppShell1SearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return config.sections;
    const q = query.toLowerCase();
    return config.sections
      .map((section) => ({
        ...section,
        items: section.items.filter(
          (item) =>
            item.title.toLowerCase().includes(q) ||
            item.keywords?.some((kw) => kw.toLowerCase().includes(q)) ||
            section.label.toLowerCase().includes(q),
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [config.sections, query]);

  const runCommand = useCallback(
    (command: () => unknown) => {
      onOpenChange(false);
      setQuery('');
      command();
    },
    [onOpenChange],
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        )
          return;
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogHeader className="sr-only">
        <DialogTitle>Search pages</DialogTitle>
        <DialogDescription>Navigate to a page quickly</DialogDescription>
      </DialogHeader>
      <DialogContent
        className="top-1/4 translate-y-0 gap-0 overflow-hidden rounded-xl border-none p-0 shadow-2xl sm:max-w-xl"
        showCloseButton={false}
      >
        <div className="flex items-center border-b px-3">
          <HugeiconsIcon
            icon={SearchIcon}
            strokeWidth={2}
            className="mr-2 size-4 shrink-0 opacity-50"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages..."
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="relative max-h-72 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted-foreground">
              No results found.
            </p>
          ) : (
            filtered.map((section) => (
              <div key={section.label} className="overflow-hidden p-1">
                <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                  {section.label}
                </div>
                {section.items.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => runCommand(() => router.push(item.href))}
                    className="relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                  >
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      strokeWidth={2}
                      className="size-4"
                    />
                    {item.title}
                  </button>
                ))}
              </div>
            ))
          )}
        </div>
        <div className="flex h-9 items-center justify-between border-t px-4 text-xs text-muted-foreground">
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5">
              <Kbd>↩</Kbd>
              <span>Select</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Kbd>↑↓</Kbd>
              <span>Navigate</span>
            </span>
          </div>
          <span className="flex items-center gap-1.5">
            <Kbd>Esc</Kbd>
            <span>Close</span>
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Page Header ──────────────────────────────────────────────────────────────

export function AppShell1PageHeader({
  pageName,
  breadcrumbs,
  actions,
  user,
  profileHref = '/profile',
  onLogout,
}: AppShell1PageHeaderProps) {
  const userName = user?.name || 'User';
  const userEmail = user?.email || 'user@example.com';
  const avatarSrc = user?.avatar || '';
  const avatarColor = getAvatarColor(userName);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
        <div className="flex flex-1 items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-vertical:h-4 data-vertical:self-auto"
          />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs && breadcrumbs.length > 0 ? (
                breadcrumbs.map((crumb, index) => {
                  const isLast = index === breadcrumbs.length - 1;
                  return (
                    <React.Fragment key={index}>
                      <BreadcrumbItem>
                        {!isLast && crumb.href ? (
                          <BreadcrumbLink href={crumb.href}>
                            {crumb.label}
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                      {!isLast && <BreadcrumbSeparator />}
                    </React.Fragment>
                  );
                })
              ) : (
                <BreadcrumbItem>
                  <BreadcrumbPage>{pageName}</BreadcrumbPage>
                </BreadcrumbItem>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex items-center gap-2">
          {actions}
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring">
              <UserAvatar src={avatarSrc} name={userName} color={avatarColor} />
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end" sideOffset={4}>
              <UserMenuContent
                src={avatarSrc}
                name={userName}
                email={userEmail}
                color={avatarColor}
                profileHref={profileHref}
                onLogout={onLogout}
                onShortcuts={() => setShortcutsOpen(true)}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <ShortcutsModal open={shortcutsOpen} onOpenChange={setShortcutsOpen} />
    </>
  );
}

// ─── Nav User (sidebar footer) ────────────────────────────────────────────────

function SidebarNavUser({
  user,
  profileHref = '/profile',
  onLogout,
}: {
  user?: SidebarUserInfo;
  profileHref?: string;
  onLogout?: () => void;
}) {
  const { isMobile } = useSidebar();
  const userName = user?.name || 'User';
  const userEmail = user?.email || 'user@example.com';
  const avatarSrc = user?.avatar || '';
  const avatarColor = getAvatarColor(userName);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <SidebarMenuButton
                  size="lg"
                  className="aria-expanded:bg-sidebar-accent"
                />
              }
            >
              <UserAvatar src={avatarSrc} name={userName} color={avatarColor} />
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-medium">{userName}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {userEmail}
                </span>
              </div>
              <HugeiconsIcon
                icon={UnfoldMoreIcon}
                strokeWidth={2}
                className="ml-auto size-4 group-data-[collapsible=icon]:hidden"
              />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side={isMobile ? 'bottom' : 'right'}
              align="end"
              sideOffset={4}
            >
              <UserMenuContent
                src={avatarSrc}
                name={userName}
                email={userEmail}
                color={avatarColor}
                profileHref={profileHref}
                onLogout={onLogout}
                onShortcuts={() => setShortcutsOpen(true)}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <ShortcutsModal open={shortcutsOpen} onOpenChange={setShortcutsOpen} />
    </>
  );
}

// ─── Section Group ────────────────────────────────────────────────────────────

function SidebarSectionGroup({
  section,
  pathname,
  collapsible,
}: {
  section: SidebarSection;
  pathname: string;
  collapsible: boolean;
}) {
  const [open, setOpen] = useState(true);

  return (
    <SidebarGroup>
      <SidebarGroupLabel
        className={cn(collapsible && 'cursor-pointer select-none')}
        onClick={collapsible ? () => setOpen((v) => !v) : undefined}
      >
        <span className="flex-1">{section.label}</span>
        {collapsible && (
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            strokeWidth={2}
            className={cn(
              'size-3.5 shrink-0 text-sidebar-foreground/50 transition-transform duration-200',
              open && 'rotate-90',
            )}
          />
        )}
      </SidebarGroupLabel>

      {/* Smooth height animation via CSS grid-rows trick */}
      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-200 ease-in-out',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <SidebarGroupContent>
            <SidebarMenu>
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = iconMap[item.icon];
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      {Icon && (
                        <HugeiconsIcon
                          icon={Icon}
                          strokeWidth={2}
                          className="size-4 shrink-0"
                        />
                      )}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </div>
      </div>
    </SidebarGroup>
  );
}

// ─── Main Sidebar ─────────────────────────────────────────────────────────────

export function AppShell1({
  config = defaultConfig,
  collapsibleSubsections = false,
  user,
  profileHref = '/profile',
  onLogout,
}: AppShell1Props) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <>
      <Sidebar collapsible="icon" variant="inset">
        {/* ── Company header + Search (always visible, never scrolls) ── */}
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <Image
                  src={config.company.logo || '/placeholder.png'}
                  alt={config.company.name}
                  width={32}
                  height={32}
                  className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
                />
                <div className="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden">
                  <span className="text-sm font-semibold">
                    {config.company.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {config.company.subtitle}
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          {/* Search – lives in header so it stays fixed above the scroll area */}
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setSearchOpen(true)}
                variant="outline"
                tooltip="Search"
                className="border text-muted-foreground"
              >
                <HugeiconsIcon
                  icon={SearchIcon}
                  strokeWidth={2}
                  className="size-4 shrink-0"
                />
                <span className="flex-1 group-data-[collapsible=icon]:hidden">
                  Search
                </span>
                {!isCollapsed && (
                  <span className="ml-auto flex items-center gap-0.5 group-data-[collapsible=icon]:hidden">
                    <Kbd>⌘</Kbd>
                    <Kbd>K</Kbd>
                  </span>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        {/* ── Scrollable sections wrapped with top/bottom mask fades ── */}
        <div className="relative flex min-h-0 flex-1 overflow-hidden pt-1">
          {/* Top fade */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-4 bg-linear-to-b from-sidebar to-transparent" />
          {/* Bottom fade */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-6 bg-linear-to-t from-sidebar to-transparent" />
          <SidebarContent>
            {/* Render standalone items */}
            {config.items && config.items.length > 0 && (
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {config.items.map((item) => {
                      const isActive = pathname === item.href;
                      const Icon = iconMap[item.icon];
                      return (
                        <SidebarMenuItem key={item.href}>
                          <SidebarMenuButton
                            render={<Link href={item.href} />}
                            isActive={isActive}
                            tooltip={item.title}
                          >
                            {Icon && (
                              <HugeiconsIcon
                                icon={Icon}
                                strokeWidth={2}
                                className="size-4 shrink-0"
                              />
                            )}
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
            {/* Render sectioned items */}
            {config.sections.map((section) => (
              <SidebarSectionGroup
                key={section.label}
                section={section}
                pathname={pathname}
                collapsible={collapsibleSubsections}
              />
            ))}
          </SidebarContent>
        </div>

        {/* ── Nav User footer ── */}
        <SidebarFooter>
          <SidebarNavUser
            user={user}
            profileHref={profileHref}
            onLogout={onLogout}
          />
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      {/* ── Search modal ── */}
      <AppShell1Search
        config={config}
        open={searchOpen}
        onOpenChange={setSearchOpen}
      />
    </>
  );
}

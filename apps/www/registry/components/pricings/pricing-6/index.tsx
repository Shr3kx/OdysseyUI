'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Tick02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Avatar from '@/registry/components/primitives/avatar';

type Palette6 = 'blue' | 'purple' | 'amber' | 'teal' | 'rose' | 'slate';

export type Plan6 = {
  id: string;
  name: string;
  description: string;
  palette: Palette6;
  price: string;
  originalPrice: string;
  priceNote?: string;
  ctaLabel: string;
  ctaHref: string;
  featuredLabel?: string;
  features: string[];
  footerNote?: string;
  footerDesc?: string;
  ctaDark?: boolean;
};

const CARD_PALETTES: Record<
  Palette6,
  {
    base: string;
    blobA: string;
    blobB: string;
    avatarColor:
      | 'blue'
      | 'orange'
      | 'red'
      | 'green'
      | 'purple'
      | 'yellow'
      | 'cyan'
      | 'pink'
      | 'indigo'
      | 'lime'
      | 'turquoise'
      | 'violet';
  }
> = {
  blue: {
    base: 'bg-sky-50 dark:bg-blue-950',
    blobA: 'bg-blue-500 dark:bg-blue-500',
    blobB: 'bg-sky-200 dark:bg-sky-600',
    avatarColor: 'blue',
  },
  purple: {
    base: 'bg-violet-50 dark:bg-violet-950',
    blobA: 'bg-violet-500 dark:bg-violet-500',
    blobB: 'bg-fuchsia-200 dark:bg-fuchsia-600',
    avatarColor: 'purple',
  },
  amber: {
    base: 'bg-amber-50 dark:bg-amber-950',
    blobA: 'bg-amber-500 dark:bg-amber-500',
    blobB: 'bg-yellow-200 dark:bg-yellow-600',
    avatarColor: 'yellow',
  },
  teal: {
    base: 'bg-teal-50 dark:bg-teal-950',
    blobA: 'bg-teal-500 dark:bg-teal-500',
    blobB: 'bg-emerald-200 dark:bg-emerald-600',
    avatarColor: 'turquoise',
  },
  rose: {
    base: 'bg-rose-50 dark:bg-rose-950',
    blobA: 'bg-rose-500 dark:bg-rose-500',
    blobB: 'bg-pink-200 dark:bg-pink-600',
    avatarColor: 'red',
  },
  slate: {
    base: 'bg-slate-100 dark:bg-slate-900',
    blobA: 'bg-slate-400 dark:bg-slate-500',
    blobB: 'bg-zinc-200 dark:bg-zinc-600',
    avatarColor: 'blue',
  },
};

const INDIVIDUALS_PLANS: Plan6[] = [
  {
    id: 'web-hero',
    name: 'Web Hero',
    description: 'Get access to React library components and features',
    palette: 'blue',
    originalPrice: '$299',
    price: '$149',
    priceNote: 'One-time payment',
    ctaLabel: 'Get Web edition',
    ctaHref: '/checkout/web',
    features: [
      'Pro React components',
      'Premium templates',
      'Advanced AI (Skills and MCPs)',
      'Premium design systems',
      'Advanced theme builder',
      'Private Discord channel',
      'Prioritized issues',
      'Priority support',
    ],
    footerNote: 'Optional renewal at $99/yr',
    footerDesc:
      'Get another year of updates or keep using without renewing. No pressure.',
  },
  {
    id: 'mobile-hero',
    name: 'Mobile Hero',
    description: 'Get access to React Native library components and features',
    palette: 'purple',
    originalPrice: '$299',
    price: '$149',
    priceNote: 'One-time payment',
    ctaLabel: 'Get Mobile edition',
    ctaHref: '/checkout/mobile',
    features: [
      'Pro React Native components',
      'Premium templates',
      'Advanced AI (Skills and MCPs)',
      'Premium design systems',
      'Advanced theme builder',
      'Private Discord channel',
      'Prioritized issues',
      'Priority support',
    ],
    footerNote: 'Optional renewal at $99/yr',
    footerDesc:
      'Get another year of updates or keep using without renewing. No pressure.',
  },
  {
    id: 'super-hero',
    name: 'Super Hero',
    description: 'The full system. React and React Native, together',
    palette: 'amber',
    originalPrice: '$399',
    price: '$199',
    priceNote: 'One-time payment',
    ctaLabel: 'Get Super edition',
    ctaHref: '/checkout/super',
    featuredLabel: 'Save $99 with bundle',
    ctaDark: true,
    features: [
      'All Pro components (React + React Native)',
      'Premium templates',
      'Advanced AI (Skills and MCPs)',
      'Premium design systems',
      'Advanced theme builder',
      'Private Discord channels',
      'Prioritized issues',
      'Priority support',
    ],
    footerNote: 'Optional renewal at $129/yr',
    footerDesc:
      'Get another year of updates or keep using without renewing. No pressure.',
  },
];

const TEAMS_PLANS: Plan6[] = [
  {
    id: 'team-starter',
    name: 'Team Starter',
    description: 'Shared components and collaboration tools for small teams',
    palette: 'teal',
    originalPrice: '$599',
    price: '$299',
    priceNote: 'One-time payment',
    ctaLabel: 'Get Team Starter',
    ctaHref: '/checkout/team-starter',
    features: [
      'Up to 5 seats',
      'Shared component library',
      'Team Discord channel',
      'Priority support',
      'Premium templates',
      'Advanced AI (Skills and MCPs)',
      'Prioritized issues',
      'Quarterly updates',
    ],
    footerNote: 'Optional renewal at $149/yr',
    footerDesc:
      "Keep your team's access or keep using without renewing. No pressure.",
  },
  {
    id: 'team-pro',
    name: 'Team Pro',
    description: 'Everything your team needs to ship faster, together',
    palette: 'rose',
    originalPrice: '$999',
    price: '$499',
    priceNote: 'One-time payment',
    ctaLabel: 'Get Team Pro',
    ctaHref: '/checkout/team-pro',
    featuredLabel: 'Most popular for teams',
    features: [
      'Up to 15 seats',
      'Shared component library',
      'Dedicated Discord channel',
      'Priority support',
      'Advanced AI (Skills and MCPs)',
      'Premium design systems',
      'Prioritized issues',
      'Monthly updates',
    ],
    footerNote: 'Optional renewal at $249/yr',
    footerDesc:
      "Keep your team's access or keep using without renewing. No pressure.",
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Custom licensing and white-glove support for large orgs',
    palette: 'slate',
    originalPrice: '$2499',
    price: '$1299',
    priceNote: 'One-time payment',
    ctaLabel: 'Contact sales',
    ctaHref: '/contact',
    ctaDark: true,
    features: [
      'Unlimited seats',
      'Custom component library',
      'Dedicated support manager',
      'SLA guarantee',
      'Custom AI integrations',
      'White-label option',
      'Prioritized issues',
      'Weekly syncs',
    ],
    footerNote: 'Custom renewal terms',
    footerDesc:
      'We work with your procurement and legal teams to define renewal terms.',
  },
];

type TabKey = 'individuals' | 'teams';

function PlanCard({ plan }: { plan: Plan6 }) {
  const pal = CARD_PALETTES[plan.palette];

  return (
    <div className="flex flex-col rounded-2xl border bg-card p-1">
      <div
        className={cn(
          'relative overflow-hidden rounded-xl border border-black/6 p-5 dark:border-white/10',
          pal.base,
        )}
      >
        <div
          className={cn(
            'pointer-events-none absolute -top-12 -right-12 size-52 rounded-full opacity-55 blur-3xl dark:opacity-70',
            pal.blobA,
          )}
        />
        <div
          className={cn(
            'pointer-events-none absolute top-1/3 -left-8 size-60 rounded-full opacity-25 blur-3xl dark:opacity-35',
            pal.blobB,
          )}
        />

        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.4] mix-blend-overlay dark:opacity-[0.1]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id={`grain-${plan.id}`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.68"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#grain-${plan.id})`} />
        </svg>

        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Avatar shape="squircle" size="sm" color={pal.avatarColor} />
            {plan.featuredLabel && (
              <span className="rounded-full bg-black/10 px-2.5 py-0.5 text-xs font-medium text-foreground/70 backdrop-blur-sm dark:bg-white/15 dark:text-foreground/70">
                {plan.featuredLabel}
              </span>
            )}
          </div>

          <div className="space-y-0.5">
            <h3 className="text-xl font-bold tracking-tight">{plan.name}</h3>
            <p className="text-sm text-foreground/60">{plan.description}</p>
          </div>

          <div className="space-y-0.5">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight">
                {plan.price}
              </span>
              <span className="text-base text-foreground/45 line-through">
                {plan.originalPrice}
              </span>
            </div>
            {plan.priceNote && (
              <p className="text-xs text-foreground/50">{plan.priceNote}</p>
            )}
          </div>

          <Button
            className={cn(
              'w-full rounded-full font-semibold',
              plan.ctaDark
                ? 'bg-foreground text-background hover:bg-foreground/85'
                : 'bg-white/70 text-foreground backdrop-blur-sm hover:bg-white/90 dark:bg-white/15 dark:text-foreground dark:hover:bg-white/25',
            )}
            asChild
          >
            <Link href={plan.ctaHref}>{plan.ctaLabel}</Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-1 pt-5">
        <ul className="space-y-2.5">
          {plan.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm">
              <HugeiconsIcon
                icon={Tick02Icon}
                className="size-3.5 shrink-0 text-foreground/40"
                strokeWidth={2}
              />
              {f}
            </li>
          ))}
        </ul>

        {(plan.footerNote || plan.footerDesc) && (
          <div className="space-y-0.5 border-t border-border p-2">
            {plan.footerNote && (
              <p className="text-xs font-semibold">{plan.footerNote}</p>
            )}
            {plan.footerDesc && (
              <p className="text-xs text-muted-foreground">{plan.footerDesc}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Pricing6({
  individualPlans = INDIVIDUALS_PLANS,
  teamsPlans = TEAMS_PLANS,
  individualsLabel = 'Individuals',
  teamsLabel = 'Teams & Enterprise',
  defaultTab = 'individuals',
  title = 'Simple, transparent pricing',
  subtitle = 'No hidden fees. Choose the plan that works for you.',
}: {
  individualPlans?: Plan6[];
  teamsPlans?: Plan6[];
  individualsLabel?: string;
  teamsLabel?: string;
  defaultTab?: TabKey;
  title?: string;
  subtitle?: string;
}) {
  const [activeTab, setActiveTab] = useState<TabKey>(defaultTab);

  const plans = activeTab === 'individuals' ? individualPlans : teamsPlans;

  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex items-center gap-0.5 rounded-full border border-border bg-muted p-1">
          {(
            [
              ['individuals', individualsLabel],
              ['teams', teamsLabel],
            ] as [TabKey, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200',
                activeTab === key
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}

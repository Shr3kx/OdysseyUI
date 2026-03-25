'use client';

import Link from 'next/link';
import {
  Tick02Icon,
  SecurityCheckIcon,
  MoneyBag01Icon,
  Coins01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export type Plan3 = {
  id: string;
  name: string;
  price?: string;
  priceNote?: string;
  customPricing?: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
  featuredLabel?: string;
  footerNote?: string;
};

const DEFAULT_PLANS: Plan3[] = [
  {
    id: 'hobby',
    name: 'Hobby',
    price: 'Free',
    description: 'For most individuals',
    features: [
      'Up to 3 Blog posts',
      'Up to 3 Transcriptions',
      'Up to 3 Posts stored',
      'Markdown support',
      'Community support',
      'AI powered suggestions',
    ],
    ctaLabel: 'Start For Free',
    ctaHref: '#',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$20',
    priceNote: 'per month',
    description: 'For small businesses',
    features: [
      'Up to 500 Blog Posts',
      'Up to 500 Transcriptions',
      'Up to 500 Posts stored',
      'Unlimited Markdown support',
      'SEO optimization tools',
      'Priority support',
      'AI powered suggestions',
    ],
    ctaLabel: 'Get started',
    ctaHref: '#',
    featured: true,
    featuredLabel: 'Best Value',
    footerNote: 'Safe and secure',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    customPricing: 'Tailored pricing terms',
    description: 'For large organizations',
    features: [
      'Unlimited Blog Posts',
      'Unlimited Transcriptions',
      'Unlimited Posts stored',
      'Unlimited Markdown support',
      'SEO optimization tools',
      'Priority support',
      'AI powered suggestions',
    ],
    ctaLabel: 'Contact team',
    ctaHref: '#',
  },
];

function FeatureList({ features }: { features: string[] }) {
  return (
    <ul className="space-y-3">
      {features.map((feature, i) => (
        <li key={i} className="flex items-center gap-2.5 text-sm">
          <HugeiconsIcon
            icon={Tick02Icon}
            className="size-4 shrink-0 text-foreground/60"
            strokeWidth={2}
          />
          {feature}
        </li>
      ))}
    </ul>
  );
}

export default function Pricing3({
  plans = DEFAULT_PLANS,
  title = 'Flexible plans that grow with you',
  subtitle = 'Use Inbox individually or upgrade to link more accounts and add seats for your team members.',
}: {
  plans?: Plan3[];
  title?: string;
  subtitle?: string;
}) {
  const hobbyPlan =
    plans.find((p) => !p.featured && plans.indexOf(p) === 0) ?? plans[0];
  const featuredPlan = plans.find((p) => p.featured);
  const enterprisePlan =
    plans.find((p) => !p.featured && plans.indexOf(p) > 0) ?? plans[2];

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-16">
        <h2 className="text-4xl font-bold tracking-tight md:max-w-xs">
          {title}
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground md:max-w-xs">
          {subtitle}
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border md:grid md:grid-cols-3">
        {hobbyPlan && (
          <div className="flex flex-col gap-6 border-b border-border p-6 md:border-r md:border-b-0">
            <span className="text-sm text-muted-foreground">
              {hobbyPlan.name}
            </span>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold tracking-tight">
                  {hobbyPlan.price}
                </span>
                {hobbyPlan.priceNote && (
                  <span className="text-sm text-muted-foreground">
                    {hobbyPlan.priceNote}
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {hobbyPlan.description}
              </p>
            </div>
            <Button asChild variant="outline" className="w-full">
              <Link href={hobbyPlan.ctaHref}>{hobbyPlan.ctaLabel}</Link>
            </Button>
            <FeatureList features={hobbyPlan.features} />
          </div>
        )}

        {featuredPlan && (
          <div className="flex flex-col items-stretch gap-4 border-b border-border bg-muted/50 p-1.5 md:border-r md:border-b-0">
            <div className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6 dark:shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-foreground">
                  {featuredPlan.name}
                </span>
                {featuredPlan.featuredLabel && (
                  <Badge variant="amber">
                    <HugeiconsIcon icon={MoneyBag01Icon} strokeWidth={3} />
                    <span className="text-xs font-semibold">
                      {featuredPlan.featuredLabel}
                    </span>
                  </Badge>
                )}
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold tracking-tight">
                    {featuredPlan.price}
                  </span>
                  {featuredPlan.priceNote && (
                    <span className="text-sm text-muted-foreground">
                      {featuredPlan.priceNote}
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {featuredPlan.description}
                </p>
              </div>
              <Button asChild className="w-full">
                <Link href={featuredPlan.ctaHref}>{featuredPlan.ctaLabel}</Link>
              </Button>
              <FeatureList features={featuredPlan.features} />
            </div>
            {featuredPlan.footerNote && (
              <div className="flex items-center justify-center gap-1.5 pb-2 text-xs text-muted-foreground">
                <HugeiconsIcon
                  icon={SecurityCheckIcon}
                  className="size-3 shrink-0"
                  strokeWidth={3}
                />
                {featuredPlan.footerNote}
              </div>
            )}
          </div>
        )}

        {enterprisePlan && (
          <div className="flex flex-col gap-6 p-6">
            <span className="text-sm text-muted-foreground">
              {enterprisePlan.name}
            </span>
            <div>
              {enterprisePlan.customPricing ? (
                <>
                  <div className="flex items-center gap-1.5 text-sm font-medium">
                    <HugeiconsIcon
                      icon={Coins01Icon}
                      className="size-4 shrink-0"
                      strokeWidth={2}
                    />
                    {enterprisePlan.customPricing}
                  </div>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {enterprisePlan.description}
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-bold tracking-tight">
                      {enterprisePlan.price}
                    </span>
                    {enterprisePlan.priceNote && (
                      <span className="text-sm text-muted-foreground">
                        {enterprisePlan.priceNote}
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {enterprisePlan.description}
                  </p>
                </>
              )}
            </div>
            <Button asChild variant="outline" className="w-full">
              <Link href={enterprisePlan.ctaHref}>
                {enterprisePlan.ctaLabel}
              </Link>
            </Button>
            <FeatureList features={enterprisePlan.features} />
          </div>
        )}
      </div>
    </div>
  );
}

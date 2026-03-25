'use client';

import { useEffect, useId, useState } from 'react';
import Link from 'next/link';
import {
  motion,
  MotionValue,
  motionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import useMeasure from 'react-use-measure';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type Plan4 = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  targetedFor: string;
  credits: string;
  monthly: number | 'Custom';
  yearly: number | 'Custom';
  ctaLabel: string;
  ctaHref: string;
  pastel: 'rose' | 'amber' | 'sky' | 'violet' | 'emerald' | 'lime';
};

const DEFAULT_PLANS: Plan4[] = [
  {
    id: 'starter',
    name: 'Starter Plan',
    description:
      'Kickstart your workflow with essential tools tailored for lean teams.',
    tags: ['Resume AI', 'Analytics'],
    targetedFor: 'Startups, Small Teams',
    credits: '100 / month',
    monthly: 0,
    yearly: 0,
    ctaLabel: 'Get Started',
    ctaHref: '#',
    pastel: 'rose',
  },
  {
    id: 'pro',
    name: 'Growth Plan',
    description:
      'Scale automation with deeper analytics, ATS workflows, and compliance reports.',
    tags: ['AI Interviews', 'ATS', 'Compliance'],
    targetedFor: 'Growing Businesses',
    credits: '200 / month',
    monthly: 119,
    yearly: 97,
    ctaLabel: 'Get Started',
    ctaHref: '#',
    pastel: 'amber',
  },
  {
    id: 'enterprise',
    name: 'Enterprise Plan',
    description:
      'White-label controls, custom SLAs, and dedicated pods for global organizations.',
    tags: ['White-label', 'Custom SLA'],
    targetedFor: 'Large Enterprises',
    credits: 'Unlimited',
    monthly: 'Custom',
    yearly: 'Custom',
    ctaLabel: 'Contact Sales',
    ctaHref: '#',
    pastel: 'sky',
  },
];

// Light mode: true pastels. Dark mode: vibrant mid-opacity tints on dark surfaces.
const pastelBg: Record<Plan4['pastel'], string> = {
  rose: 'bg-rose-200/80 dark:bg-rose-400/[0.22]',
  amber: 'bg-amber-200/80 dark:bg-amber-400/[0.22]',
  sky: 'bg-sky-200/80 dark:bg-sky-400/[0.22]',
  violet: 'bg-violet-200/80 dark:bg-violet-400/[0.22]',
  emerald: 'bg-emerald-200/80 dark:bg-emerald-400/[0.22]',
  lime: 'bg-lime-200/80 dark:bg-lime-400/[0.22]',
};

const pastelBadgeVariant: Record<
  Plan4['pastel'],
  React.ComponentProps<typeof Badge>['variant']
> = {
  rose: 'rose',
  amber: 'amber',
  sky: 'sky',
  violet: 'violet',
  emerald: 'emerald',
  lime: 'lime',
};

const SPRING = {
  type: 'spring' as const,
  stiffness: 280,
  damping: 18,
  mass: 0.3,
};

function Digit({ value, place }: { value: number; place: number }) {
  const rounded = Math.floor(value / place) % 10;
  const initial = motionValue(rounded);
  const anim = useSpring(initial, SPRING);

  useEffect(() => {
    anim.set(rounded);
  }, [anim, rounded]);

  return (
    <div className="relative inline-block w-[1ch] overflow-x-visible overflow-y-clip leading-none tabular-nums">
      <div className="invisible">0</div>
      {Array.from({ length: 10 }, (_, i) => (
        <Slot key={i} mv={anim} number={i} />
      ))}
    </div>
  );
}

function Slot({ mv, number }: { mv: MotionValue<number>; number: number }) {
  const id = useId();
  const [ref, bounds] = useMeasure();

  const y = useTransform(mv, (latest) => {
    if (!bounds.height) return 0;
    const offset = (10 + number - (latest % 10)) % 10;
    return offset > 5 ? (offset - 10) * bounds.height : offset * bounds.height;
  });

  if (!bounds.height) {
    return (
      <span ref={ref} className="invisible absolute">
        {number}
      </span>
    );
  }

  return (
    <motion.span
      style={{ y }}
      layoutId={`${id}-${number}`}
      className="absolute inset-0 flex items-center justify-center"
      transition={SPRING}
      ref={ref}
    >
      {number}
    </motion.span>
  );
}

function SlidingNumber({ value }: { value: number }) {
  const digits = Math.abs(value).toString().split('');
  const intVal = parseInt(digits.join(''), 10);
  const places = digits.map((_, i) => Math.pow(10, digits.length - i - 1));

  return (
    <div className="flex items-center">
      {digits.map((_, i) => (
        <Digit key={`p${places[i]}`} value={intVal} place={places[i]} />
      ))}
    </div>
  );
}

function BillingToggle({
  yearly,
  onToggle,
}: {
  yearly: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={yearly}
      onClick={onToggle}
      className={cn(
        'relative inline-flex h-5.5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none',
        yearly ? 'bg-foreground' : 'bg-input',
      )}
    >
      <motion.span
        animate={{ x: yearly ? '1.125rem' : '0.125rem' }}
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
        className="block size-3.5 rounded-full bg-background shadow-sm"
      />
    </button>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-dashed border-foreground/30 py-3 last:border-0">
      <span className="text-sm font-medium">{label}</span>
      <span className="text-sm text-foreground">{value}</span>
    </div>
  );
}

function PricingCard({ plan, yearly }: { plan: Plan4; yearly: boolean }) {
  const raw = yearly ? plan.yearly : plan.monthly;

  return (
    <div className={cn('flex flex-col rounded-3xl p-6', pastelBg[plan.pastel])}>
      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {plan.tags.map((tag) => (
          <Badge
            key={tag}
            variant={pastelBadgeVariant[plan.pastel]}
            className="rounded-full text-xs font-medium"
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/* Spacer */}
      <div className="min-h-24 flex-1" />

      {/* Plan info */}
      <div className="space-y-1">
        <h3 className="text-2xl font-bold tracking-tight">{plan.name}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {plan.description}
        </p>
      </div>

      {/* Rows */}
      <div className="mt-6">
        <InfoRow label="Perfect for" value={plan.targetedFor} />
        <InfoRow label="Credits" value={plan.credits} />
        {/* Animated price row */}
        <div className="flex items-center justify-between gap-2 py-3">
          <span className="text-sm font-semibold">Price</span>
          <span className="text-sm font-semibold text-foreground">
            {raw === 'Custom' ? (
              'Custom'
            ) : raw === 0 ? (
              'Free'
            ) : (
              <span className="flex items-center gap-px">
                <span>$</span>
                <SlidingNumber value={raw as number} />
                <span>/mo</span>
              </span>
            )}
          </span>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-6">
        <Button
          asChild
          className="w-full rounded-xl bg-foreground text-background hover:bg-foreground/85"
        >
          <Link href={plan.ctaHref}>{plan.ctaLabel}</Link>
        </Button>
      </div>
    </div>
  );
}

export default function Pricing4({
  plans = DEFAULT_PLANS,
  label = 'Pricing Plans',
  yearlyLabel = 'Billed yearly (18% OFF)',
  defaultYearly = false,
}: {
  plans?: Plan4[];
  label?: string;
  yearlyLabel?: string;
  defaultYearly?: boolean;
}) {
  const [yearly, setYearly] = useState(defaultYearly);

  return (
    <div className="w-full space-y-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-4xl font-bold tracking-tight">{label}</h2>
        <div className="flex items-center gap-2.5">
          <BillingToggle
            yearly={yearly}
            onToggle={() => setYearly((y) => !y)}
          />
          <span
            className={cn(
              'text-sm font-medium transition-colors duration-200',
              yearly ? 'text-foreground' : 'text-muted-foreground',
            )}
          >
            {yearlyLabel}
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} yearly={yearly} />
        ))}
      </div>
    </div>
  );
}

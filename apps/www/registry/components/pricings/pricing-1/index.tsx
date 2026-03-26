'use client';

import { useEffect, useId, useState } from 'react';
import {
  motion,
  MotionValue,
  motionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import useMeasure from 'react-use-measure';
import {
  ArrowUpRight01Icon,
  CheckmarkBadge01Icon,
  CustomerService01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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

function CornerPlus({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute z-10 size-3 shrink-0 stroke-muted-foreground stroke-1',
        className,
      )}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
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

export type Plan = {
  id: string;
  name: string;
  desc: string;
  credits: string;
  monthly: number;
  yearly: number;
  cta: string;
  featured: boolean;
  features: string[];
};

const DEFAULT_PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Starter',
    desc: 'Everything you need to explore. No card required, no strings attached.',
    credits: '1,000',
    monthly: 0,
    yearly: 0,
    cta: 'Get started',
    featured: false,
    features: [
      '1,000 credits / month',
      '1 concurrent request',
      'Community support',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    desc: 'Built for makers shipping real products. Flexible, fast, and reliable.',
    credits: '10,000',
    monthly: 29,
    yearly: 23,
    cta: 'Start free trial',
    featured: true,
    features: [
      '10,000 credits / month',
      '10 concurrent requests',
      'Email support',
      '$7 per extra 1k credits',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    desc: 'For teams that need reliability at scale. Custom limits, dedicated support.',
    credits: '500,000',
    monthly: 149,
    yearly: 119,
    cta: 'Contact sales',
    featured: false,
    features: [
      '500,000 credits / month',
      'Unlimited concurrent requests',
      'Dedicated support',
      'Custom rate limits',
      'SLA guarantee',
    ],
  },
];

export function Pricing1({ plans = DEFAULT_PLANS }: { plans?: Plan[] }) {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="w-full space-y-1.5">
      {/* Header */}
      <div className="flex flex-col gap-3 p-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">
          Simple, transparent pricing
        </h2>
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
            Billed yearly (18% OFF)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 divide-y divide-border rounded-2xl border border-border lg:grid-cols-3 lg:divide-x lg:divide-y-0">
        {plans.map((plan, i) => {
          const price = yearly ? plan.yearly : plan.monthly;
          const isFirst = i === 0;
          const isLast = i === plans.length - 1;

          return (
            <div
              key={plan.id}
              className={cn(
                'relative flex flex-col',
                isFirst &&
                  'overflow-hidden rounded-t-2xl lg:rounded-t-none lg:rounded-l-2xl',
                isLast &&
                  'overflow-hidden rounded-b-2xl lg:rounded-r-2xl lg:rounded-b-none',
                !plan.featured && 'bg-muted/30',
              )}
            >
              {plan.featured && (
                <>
                  <CornerPlus className="top-0 left-0 hidden -translate-x-[calc(50%+0.5px)] -translate-y-[calc(50%+0.5px)] lg:block" />
                  <CornerPlus className="top-0 right-0 hidden translate-x-[calc(50%+0.5px)] -translate-y-[calc(50%+0.5px)] lg:block" />
                </>
              )}

              <div className="relative flex flex-col gap-4 border-b border-border p-6">
                {plan.featured && (
                  <>
                    <CornerPlus className="bottom-0 left-0 hidden -translate-x-[calc(50%+0.5px)] translate-y-[calc(50%+0.5px)] lg:block" />
                    <CornerPlus className="right-0 bottom-0 hidden translate-x-[calc(50%+0.5px)] translate-y-[calc(50%+0.5px)] lg:block" />
                  </>
                )}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xl font-semibold">{plan.name}</span>
                  {plan.featured && (
                    <span className="rounded-full bg-foreground px-2.5 py-0.5 text-xs font-semibold text-background">
                      Most popular
                    </span>
                  )}
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {plan.desc}
                </p>

                <div className="mt-1 flex items-end gap-1">
                  <div className="flex items-end text-3xl leading-none font-bold">
                    <span>$</span>
                    <SlidingNumber value={price} />
                  </div>
                  <span className="mb-0.5 text-sm text-muted-foreground">
                    /month
                  </span>
                </div>

                <Button
                  variant={plan.featured ? 'default' : 'outline'}
                  className={cn(
                    'w-full rounded-lg',
                    plan.featured &&
                      'bg-foreground text-background hover:bg-foreground/90',
                  )}
                >
                  {plan.cta}
                </Button>
              </div>

              <div className="flex flex-col gap-2.5 p-6">
                {plan.features.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <HugeiconsIcon
                      icon={CheckmarkBadge01Icon}
                      strokeWidth={2}
                      className="size-4 shrink-0"
                    />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50">
            <HugeiconsIcon
              icon={CustomerService01Icon}
              strokeWidth={2}
              className="size-4 shrink-0"
            />
          </div>
          <div>
            <p className="text-sm font-semibold">Need help deciding?</p>
            <p className="text-sm text-muted-foreground">
              Contact our support team for personalized recommendations and
              guidance.
            </p>
          </div>
        </div>
        <Button
          variant="link"
          className="ml-0 flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:ml-4"
        >
          Learn more
          <HugeiconsIcon
            icon={ArrowUpRight01Icon}
            strokeWidth={2}
            className="size-4 shrink-0"
          />
        </Button>
      </div>
    </div>
  );
}

export default Pricing1;

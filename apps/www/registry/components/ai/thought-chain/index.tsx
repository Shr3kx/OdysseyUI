'use client';

import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Loader2, Circle, ChevronDown } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ShimmerText } from '@/registry/components/texts/text-shimmer';

type Status = 'done' | 'active' | 'pending';

type StepContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  status: Status;
};

const StepContext = createContext<StepContextType | null>(null);

const statusStyles: Record<
  Status,
  { label: string; line: string; badge: string }
> = {
  done: {
    label: 'text-gray-500',
    line: 'bg-green-600/30',
    badge: '',
  },
  active: {
    label: 'text-gray-900 dark:text-gray-100',
    line: 'bg-blue-500/25',
    badge: 'bg-blue-50 text-blue-500 dark:bg-blue-900/30',
  },
  pending: {
    label: 'text-gray-400',
    line: 'bg-gray-200 dark:bg-gray-700',
    badge: '',
  },
};

function StatusIcon({ status }: { status: Status }) {
  if (status === 'done') {
    return (
      <span className="flex size-5 items-center justify-center rounded-full bg-green-600">
        <Check className="size-3 text-white" strokeWidth={3} />
      </span>
    );
  }

  if (status === 'active') {
    return (
      <motion.span
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.75, ease: 'linear' }}
        className="flex size-5 items-center justify-center"
      >
        <Loader2 className="size-5 text-blue-500" />
      </motion.span>
    );
  }

  return <Circle className="size-5 text-gray-300 dark:text-gray-600" />;
}

export function ThoughtChain({ children }: { children: React.ReactNode }) {
  const steps = React.Children.toArray(children);
  const total = steps.length;

  return (
    <div>
      {steps.map((step, index) =>
        React.isValidElement(step)
          ? React.cloneElement(
              step as React.ReactElement<{ _isLast?: boolean }>,
              {
                _isLast: index === total - 1,
              },
            )
          : step,
      )}
    </div>
  );
}

export function ThoughtChainStep({
  children,
  status = 'pending',
  defaultOpen = true,
  _isLast = false,
}: {
  children: React.ReactNode;
  status?: Status;
  defaultOpen?: boolean;
  _isLast?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const styles = statusStyles[status];

  return (
    <StepContext.Provider value={{ open, setOpen, status }}>
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="flex gap-3.5">
          <div className="flex shrink-0 flex-col items-center">
            <span className="mt-0.5">
              <StatusIcon status={status} />
            </span>

            <span
              className={cn(
                'mt-1.5 min-h-5 w-0.5 flex-1 rounded-sm',
                styles.line,
              )}
            />
          </div>

          <div className="flex-1 pb-2">{children}</div>
        </div>
      </Collapsible>
    </StepContext.Provider>
  );
}

export function ThoughtChainTrigger({
  children,
}: {
  children: React.ReactNode;
}) {
  const { open, status } = useContext(StepContext)!;
  const styles = statusStyles[status];

  return (
    <CollapsibleTrigger className="flex cursor-pointer select-none items-center gap-1.5 outline-none">
      <span
        className={cn(
          'text-[13.5px] font-semibold tracking-tight',
          styles.label,
        )}
      >
        {status === 'active' ? (
          typeof children === 'string' ? (
            <ShimmerText text={children} />
          ) : (
            children
          )
        ) : (
          children
        )}
      </span>

      <motion.span
        animate={{ rotate: open ? 180 : 0 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="flex items-center text-gray-400"
      >
        <ChevronDown className="size-3.5" />
      </motion.span>

      {status === 'active' && (
        <Badge
          variant="outline"
          className={cn(styles.badge, 'border-blue-200 dark:border-blue-500')}
        >
          In progress
        </Badge>
      )}
    </CollapsibleTrigger>
  );
}

export function ThoughtChainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { open } = useContext(StepContext)!;

  return (
    <CollapsibleContent forceMount>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-1 pl-0.5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </CollapsibleContent>
  );
}

export function ThoughtChainItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex items-start gap-2 py-1.25"
    >
      <span className="mt-1.75 size-1 shrink-0 rounded-full bg-gray-300 dark:bg-gray-600" />
      <span className="text-[13px] leading-[1.55] text-gray-500 dark:text-gray-400">
        {children}
      </span>
    </motion.div>
  );
}

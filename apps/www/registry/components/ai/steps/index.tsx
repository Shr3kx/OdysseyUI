'use client';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { ShimmerText } from '@/registry/components/animate/text-shimmer';

export type StepsItemProps = React.ComponentProps<'div'>;

export const StepsItem = ({
  children,
  className,
  ...props
}: StepsItemProps) => (
  <div
    className={cn(
      'text-muted-foreground hover:text-foreground text-sm transition-colors duration-200 [&_strong]:text-blue-500',
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export type StepsTriggerProps = React.ComponentProps<
  typeof CollapsibleTrigger
> & {
  leftIcon?: React.ReactNode;
  swapIconOnHover?: boolean;
};

export const StepsTrigger = ({
  children,
  className,
  leftIcon,
  swapIconOnHover = true,
  ...props
}: StepsTriggerProps) => (
  <CollapsibleTrigger
    className={cn(
      'group text-muted-foreground hover:text-blue-500 flex w-full cursor-pointer items-center justify-start gap-1 text-sm transition-colors duration-200',
      className,
    )}
    {...props}
  >
    <div className="flex items-center gap-2">
      {leftIcon ? (
        <span className="relative inline-flex size-4 items-center justify-center">
          <span
            className={cn(
              'transition-opacity',
              swapIconOnHover && 'group-hover:opacity-0',
            )}
          >
            {leftIcon}
          </span>
          {swapIconOnHover && (
            <ChevronDown className="absolute size-4 opacity-0 transition-opacity group-hover:opacity-100 group-hover:text-blue-500 group-data-[state=open]:rotate-180" />
          )}
        </span>
      ) : null}
      <span>
        <ShimmerText text={children as string} />
      </span>
    </div>
    {!leftIcon && (
      <ChevronDown className="size-4 transition-transform group-hover:text-blue-500 group-data-[state=open]:rotate-180" />
    )}
  </CollapsibleTrigger>
);

export type StepsContentProps = React.ComponentProps<
  typeof CollapsibleContent
> & {
  bar?: React.ReactNode;
};

export const StepsContent = ({
  children,
  className,
  bar,
  ...props
}: StepsContentProps) => {
  return (
    <CollapsibleContent
      className={cn(
        'text-popover-foreground data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden cursor-pointer',
        className,
      )}
      {...props}
    >
      <div className="group mt-3 grid max-w-full min-w-0 grid-cols-[min-content_minmax(0,1fr)] items-start gap-x-3">
        <div className="min-w-0 self-stretch">{bar ?? <StepsBar />}</div>
        <div className="min-w-0 space-y-2">{children}</div>
      </div>
    </CollapsibleContent>
  );
};

export type StepsBarProps = React.HTMLAttributes<HTMLDivElement>;

export const StepsBar = ({ className, ...props }: StepsBarProps) => (
  <div
    className={cn(
      'bg-muted h-full w-[2px] transition-colors duration-300 group-hover:bg-blue-500/40',
      className,
    )}
    aria-hidden
    {...props}
  />
);

export type StepsProps = React.ComponentProps<typeof Collapsible>;

export function Steps({ defaultOpen = true, className, ...props }: StepsProps) {
  return (
    <Collapsible
      className={cn(className)}
      defaultOpen={defaultOpen}
      {...props}
    />
  );
}

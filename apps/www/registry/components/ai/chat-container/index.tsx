'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'motion/react';
import { HTMLMotionProps } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowDown01Icon, BubbleChatIcon } from '@hugeicons/core-free-icons';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

type ChatContainerContextValue = {
  scrollToBottom: (behavior?: ScrollBehavior) => void;
  isAtBottom: boolean;
  isEmpty: boolean;
  messageCount: number;
  registerMessage: () => () => void;
};

const ChatContainerContext = createContext<ChatContainerContextValue | null>(
  null,
);

const useChatContainer = () => {
  const ctx = useContext(ChatContainerContext);
  if (!ctx)
    throw new Error('useChatContainer must be used inside <ChatContainer />');
  return ctx;
};

export type ChatContainerProps = React.ComponentProps<'div'> & {
  bottomThreshold?: number;
  autoScroll?: boolean;
};

export function ChatContainer({
  children,
  className,
  bottomThreshold = 64,
  autoScroll = true,
  ...props
}: ChatContainerProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [messageCount, setMessageCount] = useState(0);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.scrollTo({ top: viewport.scrollHeight, behavior });
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const onScroll = () => {
      const distFromBottom =
        viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight;
      setIsAtBottom(distFromBottom <= bottomThreshold);
    };
    viewport.addEventListener('scroll', onScroll, { passive: true });
    return () => viewport.removeEventListener('scroll', onScroll);
  }, [bottomThreshold]);

  useEffect(() => {
    if (autoScroll && isAtBottom) scrollToBottom('smooth');
  }, [messageCount, autoScroll, isAtBottom, scrollToBottom]);

  const registerMessage = useCallback(() => {
    setMessageCount((c) => c + 1);
    return () => setMessageCount((c) => c - 1);
  }, []);

  const isEmpty = messageCount === 0;

  return (
    <ChatContainerContext.Provider
      value={{
        scrollToBottom,
        isAtBottom,
        isEmpty,
        messageCount,
        registerMessage,
      }}
    >
      <div
        className={cn(
          'p-2 ring-1 ring-ring/30 rounded-4xl backdrop-blur-lg',
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            'relative flex h-full w-full flex-col',
            'bg-background ring-1 ring-ring/20 rounded-3xl shadow-lg overflow-hidden',
          )}
        >
          <div
            ref={viewportRef}
            className="min-h-0 flex-1 w-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {children}
          </div>
          <ChatContainerScrollButton />
        </div>
      </div>
    </ChatContainerContext.Provider>
  );
}

export type ChatContainerContentProps = React.ComponentProps<'div'>;

export const ChatContainerContent = ({
  children,
  className,
  ...props
}: ChatContainerContentProps) => (
  <div
    className={cn(
      'mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6',
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export type ChatContainerEmptyStateProps = Omit<
  HTMLMotionProps<'div'>,
  'children'
> & {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
};

export const ChatContainerEmptyState = ({
  className,
  icon,
  title = 'No messages yet',
  description = 'Start a conversation to see messages here.',
  children,
  ...props
}: ChatContainerEmptyStateProps) => {
  const { isEmpty } = useChatContainer();
  if (!isEmpty) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        'flex flex-col items-center justify-center gap-3 py-20 text-center',
        className,
      )}
      {...props}
    >
      <div className="text-muted-foreground/40">
        {icon ?? (
          <HugeiconsIcon
            icon={BubbleChatIcon}
            className="size-10"
            strokeWidth={1.25}
          />
        )}
      </div>
      <div className="space-y-1">
        <p className="text-foreground/80 text-sm font-medium">{title}</p>
        <p className="text-muted-foreground max-w-xs text-xs leading-relaxed">
          {description}
        </p>
      </div>
      {children}
    </motion.div>
  );
};

export type ChatContainerScrollButtonProps = React.ComponentProps<
  typeof Button
> & {
  icon?: React.ReactNode;
};

export const ChatContainerScrollButton = ({
  className,
  icon,
  onClick,
  ...props
}: ChatContainerScrollButtonProps) => {
  const { isAtBottom, scrollToBottom } = useChatContainer();

  return (
    <AnimatePresence>
      {!isAtBottom && (
        <motion.div
          key="scroll-btn"
          initial={{ opacity: 0, scale: 0.85, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 8 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2"
        >
          <Button
            size="icon"
            variant="secondary"
            className={cn(
              'hover:bg-background size-8 rounded-full border shadow-md backdrop-blur-sm',
              className,
            )}
            onClick={(e) => {
              scrollToBottom('smooth');
              onClick?.(e);
            }}
            aria-label="Scroll to bottom"
            {...props}
          >
            {icon ?? (
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                className="size-4"
                strokeWidth={2}
              />
            )}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export type ChatContainerMessageProps = Omit<
  HTMLMotionProps<'div'>,
  'children'
> & { children?: React.ReactNode };

export const ChatContainerMessage = ({
  children,
  className,
  ...props
}: ChatContainerMessageProps) => {
  const { registerMessage } = useChatContainer();

  useEffect(() => {
    return registerMessage();
  }, [registerMessage]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className={cn('w-full', className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export type ChatContainerDividerProps = React.ComponentProps<'div'> & {
  label?: string;
};

export const ChatContainerDivider = ({
  className,
  label,
  children,
  ...props
}: ChatContainerDividerProps) => (
  <div
    className={cn('relative flex items-center gap-3 py-2', className)}
    role="separator"
    aria-label={label}
    {...props}
  >
    <div className="bg-border h-px flex-1" />
    {(label ?? children) && (
      <span className="text-muted-foreground shrink-0 text-xs">
        {label ?? children}
      </span>
    )}
    <div className="bg-border h-px flex-1" />
  </div>
);

export { useChatContainer };

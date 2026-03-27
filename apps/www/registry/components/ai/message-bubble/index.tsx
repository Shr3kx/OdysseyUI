'use client';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HugeiconsIcon } from '@hugeicons/react';
import { BotIcon, UserIcon } from '@hugeicons/core-free-icons';
import { createContext, useContext } from 'react';

type Role = 'user' | 'assistant';

type MessageBubbleContextValue = { isUser: boolean };

const MessageBubbleContext = createContext<MessageBubbleContextValue | null>(
  null,
);

function useMessageBubble() {
  const ctx = useContext(MessageBubbleContext);
  if (!ctx)
    throw new Error('useMessageBubble must be used inside <MessageBubble />');
  return ctx;
}

export type MessageBubbleProps = React.ComponentProps<'div'> & { role: Role };

export function MessageBubble({
  role,
  children,
  className,
  ...props
}: MessageBubbleProps) {
  const isUser = role === 'user';
  return (
    <MessageBubbleContext.Provider value={{ isUser }}>
      <div
        className={cn(
          'flex w-full items-end gap-2',
          isUser ? 'flex-row-reverse' : 'flex-row',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </MessageBubbleContext.Provider>
  );
}

export type MessageBubbleAvatarProps = {
  src?: string;
  fallback?: string;
  className?: string;
};

export function MessageBubbleAvatar({
  src,
  fallback,
  className,
}: MessageBubbleAvatarProps) {
  const { isUser } = useMessageBubble();
  return (
    <Avatar className={cn('size-7 shrink-0', className)}>
      {isUser ? (
        <>
          {src && <AvatarImage src={src} />}
          <AvatarFallback className="bg-primary/10 text-primary">
            {fallback ?? (
              <HugeiconsIcon
                icon={UserIcon}
                className="size-4"
                strokeWidth={2}
              />
            )}
          </AvatarFallback>
        </>
      ) : (
        <>
          {src && <AvatarImage src={src} />}
          <AvatarFallback className="bg-primary/10 text-primary">
            {fallback ?? (
              <HugeiconsIcon
                icon={BotIcon}
                className="size-4"
                strokeWidth={2}
              />
            )}
          </AvatarFallback>
        </>
      )}
    </Avatar>
  );
}

export type MessageBubbleContentProps = React.ComponentProps<'div'>;

export function MessageBubbleContent({
  children,
  className,
  ...props
}: MessageBubbleContentProps) {
  const { isUser } = useMessageBubble();
  return (
    <div
      className={cn(
        'max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
        isUser
          ? 'bg-primary text-primary-foreground rounded-br-sm'
          : 'bg-muted text-foreground rounded-bl-sm',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export type MessageBubbleTimestampProps = React.ComponentProps<'p'>;

export function MessageBubbleTimestamp({
  children,
  className,
  ...props
}: MessageBubbleTimestampProps) {
  const { isUser } = useMessageBubble();
  return (
    <p
      className={cn(
        'mt-1 text-right text-[10px]',
        isUser ? 'text-primary-foreground/60' : 'text-muted-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export { useMessageBubble };

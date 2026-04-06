'use client';

import { memo, useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { cn } from '@/lib/utils';
import { HugeiconsIcon } from '@hugeicons/react';
import { Copy01Icon, Tick01Icon } from '@hugeicons/core-free-icons';

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
    >
      <HugeiconsIcon
        icon={copied ? Tick01Icon : Copy01Icon}
        className="size-3.5"
        strokeWidth={1.5}
      />
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

const MarkdownRenderer = memo(function MarkdownRenderer({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  return (
    <div className={cn('markdown-body', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          pre({ children, ...props }) {
            const codeEl = (children as React.ReactElement[])?.[0] as
              | React.ReactElement<{
                  children?: React.ReactNode;
                  className?: string;
                }>
              | undefined;
            const codeText = codeEl?.props?.children
              ? String(codeEl.props.children).replace(/\n$/, '')
              : '';
            const langClass = codeEl?.props?.className ?? '';
            const lang = langClass.replace(/^language-/, '');

            return (
              <div className="group/code relative my-3 overflow-hidden rounded-xl border border-border/40 bg-background">
                <div className="flex items-center justify-between rounded-t-xl border border-border/30 bg-muted px-4 py-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    {lang || 'Code'}
                  </span>
                  <CopyButton text={codeText} />
                </div>
                <pre
                  className="overflow-x-auto p-4 text-sm leading-relaxed"
                  {...props}
                >
                  {children}
                </pre>
              </div>
            );
          },
          code({ className, children, ...props }) {
            const isInline = !className;
            if (isInline) {
              return (
                <code
                  className="rounded-md bg-muted/60 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground/90"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          p({ children, ...props }) {
            return (
              <p className="mb-3 leading-relaxed last:mb-0" {...props}>
                {children}
              </p>
            );
          },
          ul({ children, ...props }) {
            return (
              <ul className="mb-3 list-disc space-y-1 pl-6" {...props}>
                {children}
              </ul>
            );
          },
          ol({ children, ...props }) {
            return (
              <ol className="mb-3 list-decimal space-y-1 pl-6" {...props}>
                {children}
              </ol>
            );
          },
          h1({ children, ...props }) {
            return (
              <h1 className="mt-6 mb-3 text-xl font-bold first:mt-0" {...props}>
                {children}
              </h1>
            );
          },
          h2({ children, ...props }) {
            return (
              <h2 className="mt-5 mb-2 text-lg font-bold first:mt-0" {...props}>
                {children}
              </h2>
            );
          },
          h3({ children, ...props }) {
            return (
              <h3
                className="mt-4 mb-2 text-base font-semibold first:mt-0"
                {...props}
              >
                {children}
              </h3>
            );
          },
          blockquote({ children, ...props }) {
            return (
              <blockquote
                className="my-3 border-l-2 border-primary/40 pl-4 text-muted-foreground italic"
                {...props}
              >
                {children}
              </blockquote>
            );
          },
          table({ children, ...props }) {
            return (
              <div className="my-3 overflow-x-auto rounded-lg border border-border/40">
                <table className="w-full text-sm" {...props}>
                  {children}
                </table>
              </div>
            );
          },
          th({ children, ...props }) {
            return (
              <th
                className="border-b border-border/40 bg-muted/30 px-3 py-2 text-left font-semibold"
                {...props}
              >
                {children}
              </th>
            );
          },
          td({ children, ...props }) {
            return (
              <td className="border-b border-border/20 px-3 py-2" {...props}>
                {children}
              </td>
            );
          },
          a({ children, href, ...props }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:decoration-primary/60"
                {...props}
              >
                {children}
              </a>
            );
          },
          hr() {
            return <hr className="my-4 border-border/30" />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
});

export default MarkdownRenderer;

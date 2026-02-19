'use client';

import * as React from 'react';
import { cn } from '@workspace/ui/lib/utils';
// import { CopyButton } from "@/components/ui/cubby-ui/copy-button/copy-button";
type CodeFrameProps = {
  code: string;
  language?: string;
  className?: string;
  children: React.ReactNode;
};

export function CodeFrame({
  code,
  language = 'JS',
  className,
  children,
}: CodeFrameProps) {
  return (
    <div
      className={cn(
        'group bg-muted border border-border/60 max-w-full w-full rounded-2xl p-1 pt-0 relative',
        className,
      )}
    >
      <div className="flex items-center justify-between bg-transparent px-3 py-1">
        <div className="flex min-w-0 items-center gap-2">
          <span className="inline-flex items-center rounded-sm border border-border/70 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-muted-foreground">
            {language.toUpperCase()}
          </span>
        </div>

        {/* <CopyButton content={code} /> */}
      </div>

      <pre className="relative bg-card border border-border/60 rounded-lg whitespace-pre overflow-hidden max-h-96">
        <div className="">{children}</div>
      </pre>
    </div>
  );
}

//   <CodeFrame code={snippet.code} language="js">
//     <CodeBlock code={snippet.code} language={snippet.language} />
//   </CodeFrame>;

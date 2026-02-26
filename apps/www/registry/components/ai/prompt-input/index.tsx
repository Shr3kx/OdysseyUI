'use client';

import { useState, useRef, useLayoutEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowUp02Icon,
  Attachment,
  Earth,
  Mic,
} from '@hugeicons/core-free-icons';
import { Button } from '../../buttons/button';

export default function PromptInput() {
  const [value, setValue] = useState('');
  const [searchEnabled, setSearchEnabled] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 240)}px`;
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // handle submit
    }
  };

  return (
    <div className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl px-3 pb-4 md:px-5 md:pb-0">
      {/* Outer wrapper */}
      <div className="border-border/50 bg-input/50 border border-b-0 p-1.5 pb-0 rounded-4xl rounded-b-none backdrop-blur-sm">
        {/* Inner card */}
        <div className="border-input bg-popover/50 relative z-10 w-full rounded-3xl rounded-b-none border border-b-0 p-0 pt-1 shadow-xs">
          <div className="flex flex-col">
            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              rows={1}
              className="text-[#096cdc] min-h-[44px] w-full resize-none border-none bg-transparent shadow-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 min-h-16 pt-3 pl-4 pr-4 text-base leading-[1.3] sm:text-base md:text-base"
              style={{ maxHeight: 240 }}
            />

            {/* Action bar */}
            <div className="mt-4 flex w-full items-center justify-between gap-2 px-3 pb-5">
              {/* Left actions */}
              <div className="flex items-center gap-2">
                {/* Attachment */}
                <Button
                  variant="outline"
                  size="icon"
                  className="size-9 rounded-full"
                  onClick={() => fileInputRef.current?.click()}
                  type="button"
                >
                  <HugeiconsIcon
                    icon={Attachment}
                    strokeWidth={2}
                    className="rotate-45"
                  />
                </Button>

                {/* Search toggle */}

                <Button
                  className={`rounded-full px-3 transition-colors bg-background text-black dark:text-white hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 ${
                    searchEnabled
                      ? 'bg-blue-glossy text-white hover:text-white'
                      : ''
                  }`}
                  onClick={() => setSearchEnabled((v) => !v)}
                  type="button"
                >
                  <HugeiconsIcon icon={Earth} strokeWidth={2} />
                  Search
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-9 rounded-full"
                  type="button"
                >
                  <HugeiconsIcon icon={Mic} strokeWidth={2} />
                </Button>

                <Button
                  size="icon"
                  className="size-9  bg-[#096cdc] hover:bg-blue-glossy"
                >
                  <HugeiconsIcon icon={ArrowUp02Icon} strokeWidth={2} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        multiple
        onChange={(e) => {
          if (!e.target.files) return;
          // handle files: Array.from(e.target.files)
          e.target.value = '';
        }}
      />
    </div>
  );
}

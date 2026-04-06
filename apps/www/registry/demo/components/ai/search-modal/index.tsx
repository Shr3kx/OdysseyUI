'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { HugeiconsIcon } from '@hugeicons/react';
import { Search01Icon } from '@hugeicons/core-free-icons';
import SearchModal from '@/registry/components/ai/search-modal';

export default function SearchModalDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-[500px] items-center justify-center">
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2"
      >
        <HugeiconsIcon icon={Search01Icon} className="size-4" strokeWidth={2} />
        Search chats...
        <kbd className="ml-2 rounded border border-border/50 bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
          ⌘K
        </kbd>
      </Button>

      <SearchModal
        open={open}
        onClose={() => setOpen(false)}
        onNewChat={() => console.log('New chat')}
      />
    </div>
  );
}

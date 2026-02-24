'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '@workspace/ui/components/ui/context-menu';
import { Copy, PackagePlus, Settings, Volume2, VolumeOff } from 'lucide-react';
import { useSound } from '@/hooks/use-sound';
import { clickSoftSound } from '@/lib/click-soft';

interface RegistryItem {
  name: string;
  files?: Array<{ path?: string }>;
}

function normalizePath(path: string) {
  if (!path) return path;
  if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1);
  return path;
}
const STORAGE_KEY = 'odyssey-sound-enabled';
export function GlobalContextMenu({ children }: { children: React.ReactNode }) {
  const [playClick] = useSound(clickSoftSound, { volume: 0.5 });
  const pathname = usePathname();
  const router = useRouter();
  const [enabled, setEnabled] = React.useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem(STORAGE_KEY) !== 'false';
  });
  const [selectedText, setSelectedText] = React.useState('');
  const [pathToCommand, setPathToCommand] = React.useState<
    Record<string, string>
  >({});

  React.useEffect(() => {
    const loadCommands = async () => {
      try {
        const response = await fetch('/r/registry.json');
        const data = await response.json();

        const map: Record<string, string> = {};
        if (data.items && Array.isArray(data.items)) {
          data.items.forEach((item: RegistryItem) => {
            const filePath = item.files?.[0]?.path;
            if (!filePath) return;

            const pathMatch = filePath.match(
              /registry\/components\/(.+?)\/index\.tsx$/,
            );
            if (!pathMatch) return;

            const rest = pathMatch[1];
            const docsPath = `/docs/components/${rest}`;
            map[normalizePath(docsPath)] =
              `npx shadcn@latest add @odyssey/${item.name}`;
          });
        }

        setPathToCommand(map);
      } catch (error) {
        console.error('Failed to load registry commands:', error);
      }
    };

    loadCommands();
  }, []);

  const installCommand = React.useMemo(() => {
    const normalizedPath = normalizePath(pathname || '');
    return pathToCommand[normalizedPath] ?? null;
  }, [pathname, pathToCommand]);

  const handleCopyInstallCommand = React.useCallback(() => {
    if (!installCommand) return;
    playClick();
    navigator.clipboard.writeText(installCommand);
  }, [installCommand, playClick]);

  const hasSelectedText = selectedText.trim().length > 0;

  return (
    <ContextMenu
      // modal={false}
      onOpenChange={(open) => {
        if (!open) return;
        const selection = window.getSelection()?.toString() ?? '';
        setSelectedText(selection.trim());
      }}
    >
      <ContextMenuTrigger className="h-full w-full block border-0 bg-transparent p-0 select-text!">
        <div className="h-full w-full">{children}</div>
      </ContextMenuTrigger>

      <ContextMenuContent className="w-56">
        <ContextMenuItem
          disabled={!hasSelectedText}
          onClick={() => playClick()}
          onSelect={() => {
            if (!hasSelectedText) return;
            navigator.clipboard.writeText(selectedText);
          }}
        >
          <Copy />
          Copy Selected Text
        </ContextMenuItem>

        <ContextMenuItem
          disabled={!installCommand}
          onClick={() => handleCopyInstallCommand()}
        >
          <PackagePlus />
          Copy Install Command
        </ContextMenuItem>

        <ContextMenuCheckboxItem
          checked={enabled}
          onCheckedChange={(val) => {
            const next = val === true;
            setEnabled(next);
            playClick();
            localStorage.setItem(STORAGE_KEY, String(next));
            window.dispatchEvent(
              new CustomEvent<boolean>('odyssey-sound-toggle', {
                detail: next,
              }),
            );
          }}
        >
          {enabled ? <Volume2 /> : <VolumeOff />}
          Sound Effects
        </ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

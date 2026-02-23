'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { usePathname, useRouter } from 'next/navigation';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '@workspace/ui/components/ui/context-menu';
import { Copy, PackagePlus, Settings } from 'lucide-react';
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

export function GlobalContextMenu({ children }: { children: React.ReactNode }) {
  const [playClick] = useSound(clickSoftSound, { volume: 0.5 });
  const pathname = usePathname();
  const router = useRouter();

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

  const hasSelectedText = selectedText.trim().length > 0;

  const handleCopySelectedText = React.useCallback(() => {
    if (!hasSelectedText) return;
    playClick();
    navigator.clipboard.writeText(selectedText);
  }, [hasSelectedText, playClick, selectedText]);

  const handleCopyInstallCommand = React.useCallback(() => {
    if (!installCommand) return;
    playClick();
    navigator.clipboard.writeText(installCommand);
  }, [installCommand, playClick]);

  const menuItems = React.useMemo(
    () => [
      {
        key: 'copy-selected',
        icon: Copy,
        label: 'Copy Selected Text',
        shortcut: '⌘C',
        disabled: !hasSelectedText,
        onSelect: handleCopySelectedText,
      },
      {
        key: 'copy-install',
        icon: PackagePlus,
        label: 'Copy Install Command',
        disabled: !installCommand,
        onSelect: handleCopyInstallCommand,
      },
      {
        key: 'settings',
        icon: Settings,
        label: 'Settings',
        onSelect: () => {
          playClick();
          router.push('/docs#settings');
        },
      },
    ],
    [
      handleCopyInstallCommand,
      handleCopySelectedText,
      hasSelectedText,
      installCommand,
      playClick,
      router,
    ],
  );

  const listVariants = React.useMemo(
    () => ({
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.05,
        },
      },
    }),
    [],
  );

  const itemVariants = React.useMemo(
    () => ({
      hidden: { opacity: 0, x: -10 },
      show: { opacity: 1, x: 0, transition: { duration: 0.14 } },
    }),
    [],
  );

  return (
    <ContextMenu
      modal={false}
      onOpenChange={(open) => {
        if (!open) return;
        const selection = window.getSelection()?.toString() ?? '';
        setSelectedText(selection.trim());
      }}
    >
      <ContextMenuTrigger className="h-full w-full block border-0 bg-transparent p-0 select-text!">
        <div className="h-full w-full">{children}</div>
      </ContextMenuTrigger>

      <ContextMenuContent className="w-56 rounded-xl p-2">
        <ContextMenuLabel>Actions</ContextMenuLabel>
        <ContextMenuSeparator />

        <motion.div
          initial="hidden"
          animate="show"
          transition={{ duration: 0.14 }}
          variants={listVariants}
          style={{ transformOrigin: 'top left' }}
        >
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.key}
                variants={itemVariants}
                whileHover={{ x: 4 }}
              >
                <ContextMenuItem
                  disabled={item.disabled}
                  onSelect={item.onSelect}
                >
                  <Icon />
                  {item.label}
                  {item.shortcut ? (
                    <ContextMenuShortcut>{item.shortcut}</ContextMenuShortcut>
                  ) : null}
                </ContextMenuItem>
              </motion.div>
            );
          })}
        </motion.div>
      </ContextMenuContent>
    </ContextMenu>
  );
}

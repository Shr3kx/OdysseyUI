'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Search01Icon,
  Add01Icon,
  Delete02Icon,
  PencilEdit01Icon,
  UserIcon,
} from '@hugeicons/core-free-icons';
import AgentAvatar, {
  type AvatarColor,
} from '@/registry/components/primitives/avatar';
import MarkdownRenderer from './markdown-renderer';

/* ── types ───────────────────────────────────────────────── */

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: number;
}

interface Chat {
  id: string;
  title: string;
  agentId: string;
  modelId: string;
  pinned: boolean;
  folderId: string | null;
  createdAt: number;
  updatedAt: number;
  messages: Message[];
}

interface Agent {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  avatarColor: AvatarColor;
  isDefault?: boolean;
}

/* ── dummy data ──────────────────────────────────────────── */

const now = Date.now();
const min = 60_000;
const hr = 3_600_000;
const day = 86_400_000;

const DUMMY_AGENTS: Agent[] = [
  {
    id: 'default',
    name: 'Apollo',
    description: 'General-purpose AI assistant.',
    systemPrompt: '',
    avatarColor: 'blue',
    isDefault: true,
  },
  {
    id: 'code-expert',
    name: 'Cipher',
    description: 'Expert software engineer.',
    systemPrompt: '',
    avatarColor: 'green',
  },
  {
    id: 'creative-writer',
    name: 'Muse',
    description: 'Creative writing assistant.',
    systemPrompt: '',
    avatarColor: 'violet',
  },
];

const DUMMY_CHATS: Chat[] = [
  {
    id: 'chat-1',
    title: 'Building a REST API with Node.js',
    agentId: 'code-expert',
    modelId: 'gpt-4o',
    pinned: false,
    folderId: null,
    createdAt: now - 20 * min,
    updatedAt: now - 20 * min,
    messages: [
      {
        id: 'm1',
        role: 'user',
        content: 'How do I build a REST API with Node.js and Express?',
        createdAt: now - 20 * min,
      },
      {
        id: 'm2',
        role: 'assistant',
        content:
          "Here's a quick guide to building a REST API with Node.js and Express:\n\n```js\nconst express = require('express')\nconst app = express()\n\napp.use(express.json())\n\napp.get('/api/items', (req, res) => {\n  res.json({ items: [] })\n})\n\napp.listen(3000, () => console.log('Server running on port 3000'))\n```\n\nKey steps:\n1. Install Express: `npm install express`\n2. Define routes for CRUD operations\n3. Use middleware like `express.json()` for parsing request bodies",
        createdAt: now - 19 * min,
      },
    ],
  },
  {
    id: 'chat-2',
    title: 'Trip planning for Japan',
    agentId: 'default',
    modelId: 'gpt-4o',
    pinned: false,
    folderId: null,
    createdAt: now - 2 * hr,
    updatedAt: now - 2 * hr,
    messages: [
      {
        id: 'm3',
        role: 'user',
        content: 'I want to plan a 2-week trip to Japan. Where should I start?',
        createdAt: now - 2 * hr,
      },
      {
        id: 'm4',
        role: 'assistant',
        content:
          "Great choice! Japan is an incredible destination. For a 2-week trip I'd suggest:\n\n- **Tokyo** (4-5 days): Shibuya, Shinjuku, Akihabara, Asakusa\n- **Kyoto** (3-4 days): Fushimi Inari, Arashiyama, Gion\n- **Osaka** (2 days): Dotonbori, street food, day trip to Nara\n- **Hakone or Nikko** (1-2 days): Mt Fuji views, nature\n\nBook a **JR Pass** for bullet train travel between cities.",
        createdAt: now - 2 * hr + min,
      },
    ],
  },
  {
    id: 'chat-3',
    title: 'Short story: The Last Library',
    agentId: 'creative-writer',
    modelId: 'gpt-4o',
    pinned: false,
    folderId: null,
    createdAt: now - 5 * hr,
    updatedAt: now - 5 * hr,
    messages: [
      {
        id: 'm5',
        role: 'user',
        content:
          'Write the opening paragraph of a dystopian short story about the last library on Earth.',
        createdAt: now - 5 * hr,
      },
      {
        id: 'm6',
        role: 'assistant',
        content:
          "The last library smelled of time itself—dust and cedar and the faint, sweet rot of pages turning back into earth. Elara pressed her palm against the iron door, feeling the cold seep through her glove, and listened. Inside, ten thousand books held their breath. Outside, the Silence Bureau's drones swept low arcs across the grey sky, their sensors hungry for the one thing the State could never quite kill: a story.",
        createdAt: now - 5 * hr + min,
      },
    ],
  },
  {
    id: 'chat-4',
    title: 'Understanding React Server Components',
    agentId: 'code-expert',
    modelId: 'gpt-4o',
    pinned: false,
    folderId: null,
    createdAt: now - day,
    updatedAt: now - day,
    messages: [
      {
        id: 'm7',
        role: 'user',
        content:
          'Can you explain React Server Components and when to use them?',
        createdAt: now - day,
      },
      {
        id: 'm8',
        role: 'assistant',
        content:
          "React Server Components (RSCs) run **only on the server** and never ship JavaScript to the client. They're great for:\n\n- **Data fetching** directly from databases\n- **Reducing bundle size** — no client JS for heavy components\n- **Layouts and shells** that don't need interactivity\n\nUse `'use client'` at the top of any file that needs hooks, event handlers, or browser APIs. Everything else can stay as a Server Component by default in Next.js 13+.",
        createdAt: now - day + min,
      },
    ],
  },
  {
    id: 'chat-5',
    title: 'Meditation techniques for beginners',
    agentId: 'default',
    modelId: 'gpt-4o',
    pinned: false,
    folderId: null,
    createdAt: now - 2 * day,
    updatedAt: now - 2 * day,
    messages: [
      {
        id: 'm9',
        role: 'user',
        content: 'What are some good meditation techniques for beginners?',
        createdAt: now - 2 * day,
      },
    ],
  },
  {
    id: 'chat-6',
    title: 'CSS Grid vs Flexbox',
    agentId: 'code-expert',
    modelId: 'gpt-4o',
    pinned: false,
    folderId: null,
    createdAt: now - 10 * day,
    updatedAt: now - 10 * day,
    messages: [
      {
        id: 'm10',
        role: 'user',
        content: 'When should I use CSS Grid instead of Flexbox?',
        createdAt: now - 10 * day,
      },
      {
        id: 'm11',
        role: 'assistant',
        content:
          "**Use Grid** when you need two-dimensional layout control (rows *and* columns), like page layouts, card grids, or dashboards.\n\n**Use Flexbox** when you're laying out items in a single direction — a row of buttons, a nav bar, or stacking elements vertically in a sidebar.\n\nA practical rule: if you're thinking in rows *and* columns → Grid. If you're thinking in one axis → Flexbox.",
        createdAt: now - 10 * day + min,
      },
    ],
  },
];

/* ── helpers ─────────────────────────────────────────────── */

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return '1 day ago';
  if (days < 7) return `${days}d ago`;
  return new Date(ts).toLocaleDateString();
}

function groupSearchResults(chats: Chat[]) {
  const n = new Date();
  const todayStart = new Date(
    n.getFullYear(),
    n.getMonth(),
    n.getDate(),
  ).getTime();
  const yesterdayStart = todayStart - 86_400_000;
  const weekStart = todayStart - 7 * 86_400_000;

  const groups: { label: string; chats: Chat[] }[] = [
    { label: 'Today', chats: [] },
    { label: 'Yesterday', chats: [] },
    { label: 'Last 7 Days', chats: [] },
    { label: 'Earlier', chats: [] },
  ];
  for (const c of chats) {
    if (c.updatedAt >= todayStart) groups[0].chats.push(c);
    else if (c.updatedAt >= yesterdayStart) groups[1].chats.push(c);
    else if (c.updatedAt >= weekStart) groups[2].chats.push(c);
    else groups[3].chats.push(c);
  }
  return groups.filter((g) => g.chats.length > 0);
}

/* ── search chat item ────────────────────────────────────── */

function SearchChatItem({
  chat,
  isSelected,
  isRenaming,
  renameValue,
  onRenameChange,
  onRenameConfirm,
  onRenameCancel,
  onSelect,
  onGo,
  onEdit,
  onDelete,
}: {
  chat: Chat;
  isSelected: boolean;
  isRenaming: boolean;
  renameValue: string;
  onRenameChange: (v: string) => void;
  onRenameConfirm: () => void;
  onRenameCancel: () => void;
  onSelect: () => void;
  onGo: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const showActions = (hovered || isSelected) && !isRenaming;

  return (
    <div
      onClick={onSelect}
      onDoubleClick={onGo}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'group relative flex h-9 cursor-pointer items-center rounded-xl px-2.5 text-sm transition-colors',
        isSelected ? 'bg-muted/60' : 'hover:bg-muted/30',
      )}
    >
      <div className="min-w-0 flex-1 pr-18">
        {isRenaming ? (
          <input
            autoFocus
            value={renameValue}
            onChange={(e) => onRenameChange(e.target.value)}
            onBlur={onRenameConfirm}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onRenameConfirm();
              if (e.key === 'Escape') onRenameCancel();
            }}
            className="w-full bg-transparent text-sm text-foreground outline-none"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <p className="truncate font-medium text-foreground/90">
            {chat.title}
          </p>
        )}
      </div>

      {!isRenaming && (
        <div className="absolute top-0 right-1 flex h-full items-center">
          <AnimatePresence mode="wait">
            {showActions ? (
              <motion.div
                key="actions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="relative flex items-center gap-0.5 pl-6"
              >
                <div
                  className={cn(
                    'absolute inset-0',
                    isSelected ? 'from-muted/60' : 'from-muted/30',
                  )}
                />
                <div className="relative flex items-center gap-0.5">
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit();
                    }}
                    className="text-muted-foreground hover:text-foreground"
                    title="Rename"
                  >
                    <HugeiconsIcon
                      icon={PencilEdit01Icon}
                      className="size-3.5"
                      strokeWidth={2}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete();
                    }}
                    className="text-muted-foreground hover:text-destructive"
                    title="Delete"
                  >
                    <HugeiconsIcon
                      icon={Delete02Icon}
                      className="size-3.5"
                      strokeWidth={2}
                    />
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.span
                key="time"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="pr-1 text-[10px] text-muted-foreground/50"
              >
                {timeAgo(chat.updatedAt)}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

/* ── search modal ────────────────────────────────────────── */

export default function SearchModal({
  open,
  onClose,
  onNewChat,
}: {
  open: boolean;
  onClose: () => void;
  onNewChat?: () => void;
}) {
  const [chats, setChats] = useState<Chat[]>(DUMMY_CHATS);
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return chats;
    const q = query.toLowerCase();
    return chats.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.messages.some((m) => m.content.toLowerCase().includes(q)),
    );
  }, [chats, query]);

  const grouped = useMemo(() => groupSearchResults(results), [results]);
  const flatList = useMemo(() => grouped.flatMap((g) => g.chats), [grouped]);

  const selectedChat = useMemo(
    () => chats.find((c) => c.id === selectedId) ?? null,
    [chats, selectedId],
  );

  const selectedChatAgent = useMemo(() => {
    if (!selectedChat) return null;
    return (
      DUMMY_AGENTS.find((a) => a.id === selectedChat.agentId) ?? DUMMY_AGENTS[0]
    );
  }, [selectedChat]);

  // Auto-select first result
  useEffect(() => {
    if (flatList.length > 0 && !flatList.find((c) => c.id === selectedId)) {
      setSelectedId(flatList[0].id);
    }
  }, [flatList, selectedId]);

  // Reset on open
  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedId(null);
      setRenamingId(null);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !renamingId) {
        onClose();
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const idx = flatList.findIndex((c) => c.id === selectedId);
        if (idx < flatList.length - 1) setSelectedId(flatList[idx + 1].id);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const idx = flatList.findIndex((c) => c.id === selectedId);
        if (idx > 0) setSelectedId(flatList[idx - 1].id);
      }
      if (e.key === 'Enter' && selectedId && !renamingId) {
        e.preventDefault();
        onClose();
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        setShowPreview((v) => !v);
      }
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        e.key === 'E' &&
        selectedId
      ) {
        e.preventDefault();
        const chat = chats.find((c) => c.id === selectedId);
        if (chat) {
          setRenamingId(selectedId);
          setRenameValue(chat.title);
        }
      }
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        e.key === 'D' &&
        selectedId
      ) {
        e.preventDefault();
        setChats((prev) => prev.filter((c) => c.id !== selectedId));
        setSelectedId(null);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, selectedId, flatList, renamingId, chats, onClose]);

  const handleRenameConfirm = () => {
    if (renamingId && renameValue.trim()) {
      setChats((prev) =>
        prev.map((c) =>
          c.id === renamingId ? { ...c, title: renameValue.trim() } : c,
        ),
      );
    }
    setRenamingId(null);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-4 z-50 m-auto flex max-h-[80dvh] min-h-180 max-w-5xl items-center justify-center sm:inset-x-0 sm:inset-y-auto sm:top-[10%] sm:px-4"
          >
            <div className="flex max-h-[80dvh] min-h-180 w-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-popover shadow-2xl">
              {/* Search input */}
              <div className="flex items-center gap-3 border-b border-border/50 px-4 py-3">
                <HugeiconsIcon
                  icon={Search01Icon}
                  className="size-5 shrink-0 text-muted-foreground"
                  strokeWidth={2}
                />
                <input
                  ref={inputRef}
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search chats..."
                  className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
                />
                <kbd className="rounded-md border border-border/50 bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                  ESC
                </kbd>
              </div>

              {/* Content */}
              <div className="flex min-h-0 flex-1">
                {/* Left: list */}
                <div
                  className={cn(
                    'flex flex-col',
                    showPreview
                      ? 'w-full sm:w-2/5 sm:border-r sm:border-border/50'
                      : 'w-full',
                  )}
                >
                  {/* Actions */}
                  <div className="border-b border-border/30 p-2">
                    <p className="mb-1 px-2 text-[10px] font-semibold tracking-wider text-muted-foreground/60 uppercase">
                      Actions
                    </p>
                    <button
                      onClick={() => {
                        onNewChat?.();
                        onClose();
                      }}
                      className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-foreground/90 transition-colors hover:bg-muted/50"
                    >
                      <HugeiconsIcon
                        icon={Add01Icon}
                        className="size-4 text-muted-foreground"
                        strokeWidth={2}
                      />
                      New Chat
                    </button>
                  </div>

                  {/* Chat list */}
                  <div className="scrollbar-thin flex-1 overflow-y-auto p-2">
                    {grouped.length === 0 ? (
                      <p className="py-8 text-center text-sm text-muted-foreground">
                        No conversations found
                      </p>
                    ) : (
                      grouped.map((group) => (
                        <div key={group.label} className="mb-2">
                          <p className="px-2 py-1.5 text-[10px] font-semibold tracking-wider text-muted-foreground/60 uppercase">
                            {group.label}
                          </p>
                          {group.chats.map((chat) => (
                            <SearchChatItem
                              key={chat.id}
                              chat={chat}
                              isSelected={chat.id === selectedId}
                              isRenaming={chat.id === renamingId}
                              renameValue={renameValue}
                              onRenameChange={setRenameValue}
                              onRenameConfirm={handleRenameConfirm}
                              onRenameCancel={() => setRenamingId(null)}
                              onSelect={() => setSelectedId(chat.id)}
                              onGo={() => onClose()}
                              onEdit={() => {
                                setRenamingId(chat.id);
                                setRenameValue(chat.title);
                              }}
                              onDelete={() => {
                                setChats((prev) =>
                                  prev.filter((c) => c.id !== chat.id),
                                );
                                if (selectedId === chat.id) setSelectedId(null);
                              }}
                            />
                          ))}
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Right: preview */}
                {showPreview && (
                  <div className="hidden flex-1 overflow-hidden sm:block">
                    {selectedChat && selectedChat.messages.length > 0 ? (
                      <div className="scrollbar-thin h-full overflow-y-auto p-4">
                        <div className="space-y-4">
                          {selectedChat.messages.map((msg) => (
                            <div key={msg.id} className="flex gap-2.5">
                              <div className="mt-0.5 shrink-0">
                                {msg.role === 'user' ? (
                                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <HugeiconsIcon
                                      icon={UserIcon}
                                      className="size-3"
                                      strokeWidth={2}
                                    />
                                  </div>
                                ) : (
                                  <div className="size-6 overflow-hidden rounded-lg">
                                    <AgentAvatar
                                      color={
                                        selectedChatAgent?.avatarColor ?? 'blue'
                                      }
                                      size="md"
                                      className="origin-top-left scale-[0.5]"
                                    />
                                  </div>
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="mb-1 text-[10px] font-medium text-sm text-muted-foreground">
                                  {msg.role === 'user'
                                    ? 'You'
                                    : (selectedChatAgent?.name ?? 'Assistant')}
                                </p>
                                {msg.role === 'assistant' ? (
                                  <div className="text-sm [&_.markdown-body]:text-sm [&_.markdown-body_p]:mb-2 [&_.markdown-body_pre]:my-2">
                                    <MarkdownRenderer content={msg.content} />
                                  </div>
                                ) : (
                                  <p className="text-sm leading-relaxed text-foreground/90">
                                    {msg.content}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <p className="text-sm text-muted-foreground/50">
                          {selectedChat
                            ? 'No messages yet'
                            : 'Select a conversation to preview'}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom actions */}
              <div className="flex items-center gap-1 overflow-x-auto border-t border-border/50 px-3 py-2 sm:gap-2 sm:px-4 sm:py-3">
                <button
                  onClick={() => setShowPreview((v) => !v)}
                  className="hidden shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground sm:flex"
                >
                  <span className="text-[10px]">↕</span>
                  {showPreview ? 'Hide' : 'Show'} Preview
                  <kbd className="ml-1 rounded border border-border/50 bg-muted px-1 py-px text-[9px]">
                    Ctrl + P
                  </kbd>
                </button>
                <div className="flex-1" />
                <button
                  onClick={() => {
                    if (selectedId) onClose();
                  }}
                  className="flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs text-foreground/80 transition-colors hover:bg-muted/50"
                >
                  Go
                  <kbd className="hidden rounded border border-border/50 bg-muted px-1 py-px text-[9px] text-muted-foreground sm:inline">
                    ↵
                  </kbd>
                </button>
                <button
                  onClick={() => {
                    if (selectedId) {
                      const chat = chats.find((c) => c.id === selectedId);
                      if (chat) {
                        setRenamingId(selectedId);
                        setRenameValue(chat.title);
                      }
                    }
                  }}
                  className="flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs text-foreground/80 transition-colors hover:bg-muted/50"
                >
                  Edit
                  <kbd className="hidden rounded border border-border/50 bg-muted px-1 py-px text-[9px] text-muted-foreground sm:inline">
                    Ctrl + Shift + E
                  </kbd>
                </button>
                <button
                  onClick={() => {
                    if (selectedId) {
                      setChats((prev) =>
                        prev.filter((c) => c.id !== selectedId),
                      );
                      setSelectedId(null);
                    }
                  }}
                  className="flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs text-destructive/80 transition-colors hover:bg-destructive/10"
                >
                  Delete
                  <kbd className="hidden rounded border border-border/50 bg-muted px-1 py-px text-[9px] text-muted-foreground sm:inline">
                    Ctrl + Shift + D
                  </kbd>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

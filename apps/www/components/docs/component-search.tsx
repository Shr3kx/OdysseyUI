'use client';

import * as React from 'react';
import Fuse from 'fuse.js';
import { useRouter } from 'next/navigation';
import { cn } from '@workspace/ui/lib/utils';
import {
  Search,
  ArrowRight,
  Copy,
  ArrowDownUp,
  Forward,
  Check,
} from 'lucide-react';
import { useSound } from '@/hooks/use-sound';
import { clickSoftSound } from '@/lib/click-soft';
import { impactGenericLight002Sound } from '@/lib/impact-generic-light-002';

interface RegistryItem {
  name: string;
  title?: string;
  description?: string;
  type?: string;
  path?: string;
  files?: Array<{ path?: string }>;
}

interface SearchResult {
  name: string;
  title: string;
  description?: string;
  path: string;
  category: string;
  type: 'page' | 'component';
  installCommand?: string;
}

interface ComponentsMetaResponse {
  pages?: string[];
  templatePages?: string[];
}

// Guide pages
const GUIDE_PAGES: SearchResult[] = [
  {
    name: 'introduction',
    title: 'Introduction',
    description: 'Get started with Odyssey UI',
    path: '/docs',
    category: 'Pages',
    type: 'page',
  },
  {
    name: 'installation',
    title: 'Installation',
    description: 'How to install Odyssey UI in your project',
    path: '/docs/installation',
    category: 'Pages',
    type: 'page',
  },
  {
    name: 'changelog',
    title: 'Changelog',
    description: 'Latest updates and releases',
    path: '/docs/changelog',
    category: 'Pages',
    type: 'page',
  },
  {
    name: 'accessibility',
    title: 'Accessibility',
    description: 'Accessibility features and guidelines',
    path: '/docs/accessibility',
    category: 'Pages',
    type: 'page',
  },
  {
    name: 'get-started',
    title: 'Get Started',
    description: 'Quick start guide',
    path: '/docs',
    category: 'Pages',
    type: 'page',
  },
];

export interface ComponentSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ComponentSearch({ open, onOpenChange }: ComponentSearchProps) {
  const [playClick] = useSound(clickSoftSound, { volume: 0.5 });
  const [playDialTick] = useSound(impactGenericLight002Sound, { volume: 0.1 });
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const scrollStepRef = React.useRef<number>(0);

  const [query, setQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [registryData, setRegistryData] = React.useState<SearchResult[]>([]);
  const [guidePages, setGuidePages] = React.useState<SearchResult[]>([]);
  const isKeyboardNavigationRef = React.useRef(false);
  const fuseRef = React.useRef<Fuse<SearchResult> | null>(null);
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const itemRefs = React.useRef<Array<HTMLButtonElement | null>>([]);

  // copied state for footer feedback
  const [copied, setCopied] = React.useState(false);
  const copiedTimeoutRef = React.useRef<number | null>(null);

  const formatSlugTitle = React.useCallback((slug: string) => {
    return slug
      .split('/')
      .map((segment) =>
        segment
          .split('-')
          .map((word) =>
            word.length > 0
              ? word.charAt(0).toUpperCase() + word.slice(1)
              : word,
          )
          .join(' '),
      )
      .join(' / ');
  }, []);

  // Copy install command to clipboard and show feedback
  const copyInstallCommand = React.useCallback(
    (command: string, e?: { stopPropagation?: () => void } | null) => {
      try {
        e?.stopPropagation?.();
      } catch {}

      if (!command) return;

      navigator.clipboard.writeText(command).then(() => {
        setCopied(true);
        // clear any existing timeout
        if (copiedTimeoutRef.current) {
          window.clearTimeout(copiedTimeoutRef.current);
        }
        // hide tick after 2 seconds
        copiedTimeoutRef.current = window.setTimeout(() => {
          setCopied(false);
          copiedTimeoutRef.current = null;
        }, 2000) as unknown as number;
      });
    },
    [],
  );

  // Load registry data and guide pages
  React.useEffect(() => {
    const loadData = async () => {
      try {
        // Load components from registry
        const response = await fetch('/r/registry.json');
        const data = await response.json();

        // Load meta.json to cross-reference available components
        const metaResponse = await fetch('/api/components-meta');
        const metaData: ComponentsMetaResponse = await metaResponse.json();

        // Extract component paths from meta.json (e.g., "animate/github-stars-wheel")
        const availableComponents = new Set<string>();
        if (metaData.pages && Array.isArray(metaData.pages)) {
          metaData.pages.forEach((page: string) => {
            // Skip separator lines like "---Odyssey UI---"
            if (!page.startsWith('---')) {
              availableComponents.add(page);
            }
          });
        }

        const templatePages: SearchResult[] = [];
        if (metaData.templatePages && Array.isArray(metaData.templatePages)) {
          metaData.templatePages.forEach((page: string) => {
            if (!page.startsWith('---')) {
              templatePages.push({
                name: `template-${page}`,
                title: formatSlugTitle(page),
                description: 'Template documentation',
                path: `/docs/templates/${page}`,
                category: 'Templates',
                type: 'page',
              });
            }
          });
        }

        const allPages = [...GUIDE_PAGES, ...templatePages];

        const components: SearchResult[] = [];

        // Process registry items - only components folder
        if (data.items && Array.isArray(data.items)) {
          data.items.forEach((item: RegistryItem) => {
            if (item.files && item.files[0] && item.files[0].path) {
              const filePath = item.files[0].path;
              // Only match components (not primitives, demo, etc.)
              const pathMatch = filePath.match(
                /registry\/components\/(.+?)\/index\.tsx$/,
              );
              if (pathMatch) {
                const rest = pathMatch[1]; // e.g. animate/github-stars-wheel

                // Only include if it exists in meta.json
                if (availableComponents.has(rest)) {
                  const documentationPath = `/docs/components/${rest}`;
                  const category = rest.split('/')[0] || 'components';
                  const shortName = item.name.replace(/^components-[^-]+-/, '');
                  const installCommand = `npx shadcn add @odyssey/${shortName}`;

                  components.push({
                    name: item.name,
                    title: item.title || item.name,
                    description: item.description || '',
                    path: documentationPath,
                    category,
                    type: 'component',
                    installCommand,
                  });
                }
              }
            }
          });
        }

        setRegistryData(components);
        setGuidePages(allPages);

        // Default: show more guide pages and components by default
        setSearchResults([
          ...allPages.slice(0, 10),
          ...components.slice(0, 50),
        ]);

        // Initialize Fuse for components only
        fuseRef.current = new Fuse(components, {
          keys: ['title', 'name', 'description'],
          threshold: 0.3,
          minMatchCharLength: 1,
        });
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };

    if (open) {
      playClick();
      loadData();
      setQuery('');
      setSelectedIndex(0);
      setHoveredIndex(null);
      scrollStepRef.current = 0;
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setSelectedIndex(0);

    if (!searchQuery.trim()) {
      // Default: show more guide pages and components when query is empty
      setSearchResults([
        ...guidePages.slice(0, 10),
        ...registryData.slice(0, 50),
      ]);
    } else if (fuseRef.current) {
      // Search components
      const componentResults = fuseRef.current.search(searchQuery);
      const components = componentResults.map((r) => r.item).slice(0, 50);

      // Filter guide pages by title
      const filteredPages = guidePages
        .filter((page) =>
          page.title.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .slice(0, 5);

      // Pages first, then components
      setSearchResults([...filteredPages, ...components]);
    }
  };

  const handleSelect = (result: SearchResult) => {
    playClick();
    router.push(result.path);
    onOpenChange(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        isKeyboardNavigationRef.current = true;
        setSelectedIndex((prev) =>
          prev < searchResults.length - 1 ? prev + 1 : prev,
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        isKeyboardNavigationRef.current = true;
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (searchResults[selectedIndex]) {
          handleSelect(searchResults[selectedIndex]);
        }
        break;
      case 'c':
      case 'C':
        // Copy install command with Ctrl+C or Cmd+C
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          const selected = searchResults[selectedIndex];
          if (
            selected &&
            selected.type === 'component' &&
            selected.installCommand
          ) {
            navigator.clipboard.writeText(selected.installCommand);
          }
        }
        break;
      case 'Escape':
        e.preventDefault();
        onOpenChange(false);
        break;
    }
  };

  // scroll selected item into view when it changes (keyboard only)
  React.useEffect(() => {
    if (isKeyboardNavigationRef.current) {
      const el = itemRefs.current[selectedIndex];
      if (el) {
        try {
          el.scrollIntoView({ block: 'center', behavior: 'smooth' });
        } catch {}
      }
      isKeyboardNavigationRef.current = false;
    }
  }, [selectedIndex]);

  // Group results by category
  const groupedResults = React.useMemo(() => {
    const groups: { category: string; items: SearchResult[] }[] = [];
    const categoryMap: Record<string, SearchResult[]> = {};

    searchResults.forEach((result) => {
      const cat = result.category;
      if (!categoryMap[cat]) {
        categoryMap[cat] = [];
      }
      categoryMap[cat].push(result);
    });

    // Pages first, Templates second, then other categories
    if (categoryMap['Pages']) {
      groups.push({ category: 'Pages', items: categoryMap['Pages'] });
    }

    if (categoryMap['Templates']) {
      groups.push({ category: 'Templates', items: categoryMap['Templates'] });
    }

    Object.entries(categoryMap).forEach(([category, items]) => {
      if (category !== 'Pages' && category !== 'Templates') {
        groups.push({ category, items });
      }
    });

    return groups;
  }, [searchResults]);

  // currently selected result (by keyboard or mouse)
  const selected = searchResults[selectedIndex];

  // global key handler for Cmd/Ctrl+C to copy the selected component's install command
  React.useEffect(() => {
    if (!open) return;

    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C')) {
        const sel = searchResults[selectedIndex];
        if (sel && sel.type === 'component' && sel.installCommand) {
          e.preventDefault();
          navigator.clipboard.writeText(sel.installCommand).then(() => {
            setCopied(true);
            if (copiedTimeoutRef.current) {
              window.clearTimeout(copiedTimeoutRef.current);
            }
            copiedTimeoutRef.current = window.setTimeout(() => {
              setCopied(false);
              copiedTimeoutRef.current = null;
            }, 2000) as unknown as number;
          });
        }
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, searchResults, selectedIndex]);

  if (!open) return null;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 2px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.3);
          }
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
          }
        `,
        }}
      />

      {/* Overlay with fade-in */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px]',
          'animate-in fade-in-0 duration-200',
        )}
        onClick={() => onOpenChange(false)}
      />

      {/* Modal with slide and fade animation */}
      <div
        className={cn(
          'fixed left-1/2 top-[20%] z-50 w-full max-w-160 -translate-x-1/2 p-1 bg-accent rounded-xl',
          'animate-in fade-in-0 slide-in-from-top-4 duration-200',
        )}
      >
        <div className="overflow-hidden rounded-lg border bg-background shadow-2xl">
          {/* Search Input */}
          <div className="px-2 pt-2">
            <div className="flex items-center gap-3 px-4 py-3 bg-accent rounded-md border shadow-xs">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search documentation..."
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Search Results */}
          <div
            ref={scrollContainerRef}
            className="max-h-105 overflow-y-auto custom-scrollbar pt-2"
            onScroll={() => {
              const container = scrollContainerRef.current;
              if (!container) return;

              const stepSizePx = 28;
              const nextStep = Math.floor(container.scrollTop / stepSizePx);

              if (nextStep !== scrollStepRef.current) {
                scrollStepRef.current = nextStep;
                if (nextStep % 2 === 0) {
                  playDialTick();
                }
              }
            }}
          >
            {searchResults.length === 0 ? (
              <div className="py-12 text-center text-sm text-muted-foreground">
                No results found.
              </div>
            ) : (
              <div className="pb-3">
                {groupedResults.map((group) => (
                  <div key={group.category}>
                    {/* Category Header */}
                    <div className="px-3 py-1.5">
                      <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        {group.category}
                      </h3>
                    </div>

                    {/* Results */}
                    <div className="px-2 py-1">
                      {group.items.map((result) => {
                        const globalIndex = searchResults.indexOf(result);
                        const isSelected = globalIndex === selectedIndex;
                        const isHovered = globalIndex === hoveredIndex;

                        return (
                          <button
                            key={result.name}
                            ref={(el) => {
                              itemRefs.current[globalIndex] = el;
                            }}
                            onClick={() => handleSelect(result)}
                            onMouseEnter={() => {
                              isKeyboardNavigationRef.current = false;
                              setSelectedIndex(globalIndex);
                              setHoveredIndex(globalIndex);
                            }}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className={cn(
                              'group relative w-full rounded-md px-3 py-2.5 text-left transition-all',
                              'flex items-start justify-between gap-3',
                              isSelected
                                ? 'bg-accent/80 border border-primary/30'
                                : 'hover:bg-accent/40 border border-transparent',
                            )}
                          >
                            <div className="flex items-start gap-2.5 flex-1 min-w-0">
                              {result.type === 'page' ? (
                                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                              ) : (
                                <div className="h-4 w-4 shrink-0 rounded-sm bg-primary/10 mt-0.5" />
                              )}

                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium truncate">
                                  {result.title}
                                </div>
                                {result.description && (
                                  <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                                    {result.description}
                                  </div>
                                )}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border p-3 bg-muted">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="inline-flex h-4 min-w-4 items-center justify-center rounded border border-border bg-background px-1 font-mono">
                    <ArrowDownUp className="h-3 w-3" />
                  </kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="inline-flex h-4 min-w-4 items-center justify-center rounded border border-border bg-background px-1 font-mono">
                    <Forward className="h-3 w-3" />
                  </kbd>
                  Go to page
                </span>
              </div>

              <div className="flex items-center gap-3">
                {selected &&
                selected.type === 'component' &&
                selected.installCommand ? (
                  <button
                    onClick={(e) =>
                      copyInstallCommand(selected.installCommand!, e as any)
                    }
                    className="flex items-center gap-3 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <div className="max-w-90 text-xs text-muted-foreground truncate">
                      {selected.installCommand}
                    </div>
                    <div className="flex items-center gap-1">
                      {copied ? (
                        <Check className="h-3 w-3 text-emerald-500" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </div>
                  </button>
                ) : (
                  <span className="flex items-center gap-1">
                    <kbd className="inline-flex h-4 min-w-4 items-center justify-center rounded border border-border bg-background px-1 font-mono">
                      ESC
                    </kbd>
                    Close
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

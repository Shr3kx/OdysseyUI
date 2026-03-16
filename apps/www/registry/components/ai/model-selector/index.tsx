'use client';

import {
  useState,
  useContext,
  createContext,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  X,
  ChevronDown,
  Eye,
  Brain,
  Globe,
  Star,
  LayoutGrid,
  ArrowRight,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ShimmerText } from '@/registry/components/animate/text-shimmer';

export type Cap = 'vision' | 'tools' | 'search';
export type Cost = string;

export interface Provider {
  id: string;
  icon: ReactNode;
  label: string;
}

export interface Model {
  id: string;
  provider: string;
  name: string;
  desc: string;
  cost: Cost;
  tag: string | null;
  caps: string[];
  starred: boolean;
}

interface ModelSelectorCtxValue {
  providers: Provider[];
  models: Model[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selected: Model;
  setSelected: Dispatch<SetStateAction<Model>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  activeProvider: string | null;
  setActiveProvider: Dispatch<SetStateAction<string | null>>;
  filtered: Model[];
  starred: Set<string>;
  toggleStar: (id: string) => void;
}

const ModelSelectorCtx = createContext<ModelSelectorCtxValue | null>(null);

const useModelSelector = () => {
  const ctx = useContext(ModelSelectorCtx);
  if (!ctx) throw new Error('Must be used inside <ModelSelector>');
  return ctx;
};

const CAP_ICONS: Record<
  Cap,
  { icon: React.ElementType; label: string; color: string }
> = {
  vision: { icon: Eye, label: 'Vision', color: 'text-violet-400' },
  tools: { icon: Brain, label: 'Reasoning', color: 'text-orange-400' },
  search: { icon: Globe, label: 'Search', color: 'text-emerald-400' },
};

const COST_CLASS = 'text-muted-foreground/50 font-mono text-xs';

export function ModelSelector({
  children,
  providers,
  models,
  defaultModel,
}: {
  children: ReactNode;
  providers: Provider[];
  models: Model[];
  defaultModel?: Model;
}) {
  const initialModel = defaultModel ?? models[0];
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Model>(initialModel);
  const [search, setSearch] = useState('');
  const [activeProvider, setActiveProvider] = useState<string | null>(null);
  const [starred, setStarred] = useState(
    () => new Set(models.filter((m) => m.starred).map((m) => m.id)),
  );

  const toggleStar = (id: string) =>
    setStarred((prev) => {
      const n = new Set(prev);
      if (n.has(id)) {
        n.delete(id);
      } else {
        n.add(id);
      }
      return n;
    });

  const filtered = models.filter((m) => {
    const matchProvider = !activeProvider || m.provider === activeProvider;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      m.name.toLowerCase().includes(q) ||
      m.desc.toLowerCase().includes(q);
    return matchProvider && matchSearch;
  });

  return (
    <ModelSelectorCtx.Provider
      value={{
        providers,
        models,
        open,
        setOpen,
        selected,
        setSelected,
        search,
        setSearch,
        activeProvider,
        setActiveProvider,
        filtered,
        starred,
        toggleStar,
      }}
    >
      {children}
    </ModelSelectorCtx.Provider>
  );
}

export function ModelSelectorTrigger({
  className = '',
}: {
  className?: string;
}) {
  const { setOpen, selected } = useModelSelector();
  return (
    <motion.button
      onClick={() => setOpen(true)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl bg-secondary border border-border text-sm font-medium text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors ${className}`}
    >
      <span className="text-xs text-muted-foreground font-mono">
        <ShimmerText text={selected.name} />
      </span>
      <span className={COST_CLASS}>{selected.cost}</span>
      <ChevronDown className="w-3 h-3 text-muted-foreground/60" />
    </motion.button>
  );
}

export function ModelSelectorModal() {
  const { open, setOpen } = useModelSelector();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        aria-describedby={undefined}
        className={cn(
          'flex flex-col gap-0 p-0 ring-0 border border-border shadow-2xl overflow-hidden duration-200',
          'top-auto bottom-0 inset-x-0 translate-x-0 translate-y-0 max-w-full rounded-t-3xl rounded-b-none max-h-[85vh]',
          'sm:top-1/2 sm:left-1/2 sm:right-auto sm:bottom-auto sm:w-130 sm:max-w-130 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl sm:max-h-150',
        )}
      >
        <DialogTitle className="sr-only">Select a model</DialogTitle>
        <ModelSelectorHeader />
        <div className="flex flex-1 min-h-0">
          <ModelSelectorProviderSidebar />
          <ModelSelectorModelList />
        </div>
        <ModelSelectorFooter />
      </DialogContent>
    </Dialog>
  );
}

function ModelSelectorHeader() {
  const { search, setSearch } = useModelSelector();
  return (
    <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-border">
      <Search className="w-4 h-4 text-muted-foreground shrink-0" />
      <input
        autoFocus
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search models…"
        className="flex-1 bg-transparent text-sm text-popover-foreground placeholder:text-muted-foreground/50 outline-none font-light tracking-wide font-mono"
      />
      <AnimatePresence>
        {search && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setSearch('')}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </motion.button>
        )}
      </AnimatePresence>
      <DialogClose asChild>
        <button className="ml-1 w-6 h-6 rounded-lg flex items-center justify-center bg-secondary hover:bg-accent text-muted-foreground hover:text-accent-foreground transition-colors">
          <X className="w-3.5 h-3.5" />
        </button>
      </DialogClose>
    </div>
  );
}

function ModelSelectorProviderSidebar() {
  const { providers, activeProvider, setActiveProvider } = useModelSelector();
  return (
    <div className="flex flex-col gap-0.5 py-3 px-2 border-r border-border w-14 shrink-0">
      <SidebarBtn
        active={!activeProvider}
        onClick={() => setActiveProvider(null)}
        title="All"
      >
        <LayoutGrid className="w-4 h-4" />
      </SidebarBtn>
      {providers.map((p) => (
        <SidebarBtn
          key={p.id}
          active={activeProvider === p.id}
          onClick={() =>
            setActiveProvider(activeProvider === p.id ? null : p.id)
          }
          title={p.label}
        >
          <span className="w-4 h-4 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
            {p.icon}
          </span>
        </SidebarBtn>
      ))}
    </div>
  );
}

function SidebarBtn({
  active,
  onClick,
  title,
  children,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  children: ReactNode;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      title={title}
      className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-colors mx-auto ${
        active
          ? 'bg-accent text-accent-foreground'
          : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
      }`}
    >
      {active && (
        <motion.div
          layoutId="provider-indicator"
          className="absolute inset-0 rounded-xl bg-accent border border-border"
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

function ModelSelectorModelList() {
  const { filtered } = useModelSelector();
  return (
    <div
      className="flex-1 overflow-y-auto py-2 px-1 space-y-0.5"
      style={{ scrollbarWidth: 'none' }}
    >
      {filtered.length === 0 && (
        <div className="py-12 text-center text-muted-foreground/60 text-sm font-mono">
          No models found
        </div>
      )}
      {filtered.map((model, i) => (
        <ModelSelectorModelRow key={model.id} model={model} index={i} />
      ))}
    </div>
  );
}

function ModelSelectorModelRow({
  model,
  index,
}: {
  model: Model;
  index: number;
}) {
  const { providers, selected, setSelected, setOpen, starred, toggleStar } =
    useModelSelector();
  const isSelected = selected.id === model.id;
  const isStarred = starred.has(model.id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: index * 0.025, duration: 0.2 }}
    >
      <button
        onClick={() => {
          setSelected(model);
          setOpen(false);
        }}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors group border hover:bg-accent ${
          isSelected ? 'bg-accent border-border' : 'border-transparent'
        }`}
      >
        <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-sm font-bold bg-secondary border border-border">
          <span className="w-4 h-4 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
            {providers.find((p) => p.id === model.provider)?.icon ?? '◈'}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground truncate font-mono tracking-tight">
              {model.name}
            </span>
            {model.tag && (
              <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold tracking-wide bg-primary/10 text-primary border border-primary/20">
                {model.tag}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground truncate mt-0.5 leading-snug">
            {model.desc}
          </p>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {model.caps.length > 0 && (
            <div className="flex items-center gap-1 px-1.5 py-1 rounded-lg bg-secondary border border-border/60">
              <TooltipProvider>
                {model.caps.map((c) => {
                  const entry = CAP_ICONS[c as Cap];
                  if (!entry) return null;
                  const Icon = entry.icon;
                  return (
                    <Tooltip key={c}>
                      <TooltipTrigger asChild>
                        <span className={entry.color}>
                          <Icon className="w-3 h-3" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top">{entry.label}</TooltipContent>
                    </Tooltip>
                  );
                })}
              </TooltipProvider>
            </div>
          )}

          <motion.div
            role="button"
            tabIndex={0}
            aria-label={isStarred ? 'Unstar model' : 'Star model'}
            onClick={(e) => {
              e.stopPropagation();
              toggleStar(model.id);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                toggleStar(model.id);
              }
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.85 }}
            className="ml-1 w-5 h-5 flex items-center justify-center cursor-pointer"
          >
            <Star
              className={`w-3.5 h-3.5 transition-colors ${
                isStarred
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-muted-foreground/30 hover:text-muted-foreground'
              }`}
              stroke={isStarred ? '#FF8904' : '#6A7282'}
            />
          </motion.div>
        </div>
      </button>
    </motion.div>
  );
}

function ModelSelectorFooter() {
  const { selected } = useModelSelector();
  return (
    <div className="px-4 py-3 border-t border-border flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground font-mono">
          {selected.name}
        </span>
      </div>
      <a
        href="#"
        className="flex items-center gap-1 text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors font-mono"
      >
        Upgrade for more
        <ArrowRight className="w-3 h-3" />
      </a>
    </div>
  );
}

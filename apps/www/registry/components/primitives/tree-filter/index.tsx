'use client';

import {
  useState,
  useContext,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Search01Icon,
  ArrowRight01Icon,
  Cancel01Icon,
} from '@hugeicons/core-free-icons';
import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible';

interface TreeNode {
  id: string;
  label: string;
  count?: number;
  children?: TreeNode[];
}

type CheckedState = 'checked' | 'unchecked' | 'indeterminate';

interface TreeFilterContextValue {
  checked: Set<string>;
  toggle: (ids: string[], value: boolean) => void;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

const TreeFilterContext = createContext<TreeFilterContextValue | null>(null);

function useTreeFilter(): TreeFilterContextValue {
  const ctx = useContext(TreeFilterContext);
  if (!ctx) throw new Error('Must be used within <TreeFilter>');
  return ctx;
}

function getAllLeafIds(node: TreeNode): string[] {
  if (!node.children || node.children.length === 0) return [node.id];
  return node.children.flatMap(getAllLeafIds);
}

function getCheckedState(node: TreeNode, checked: Set<string>): CheckedState {
  const leaves = getAllLeafIds(node);
  if (leaves.length === 0)
    return checked.has(node.id) ? 'checked' : 'unchecked';
  const count = leaves.filter((id: string) => checked.has(id)).length;
  if (count === 0) return 'unchecked';
  if (count === leaves.length) return 'checked';
  return 'indeterminate';
}

function filterTree(nodes: TreeNode[], query: string): TreeNode[] {
  if (!query) return nodes;
  const result: TreeNode[] = [];
  for (const node of nodes) {
    const match = node.label.toLowerCase().includes(query.toLowerCase());
    const filteredChildren = node.children
      ? filterTree(node.children, query)
      : [];
    if (match || filteredChildren.length > 0)
      result.push({ ...node, children: filteredChildren });
  }
  return result;
}

function TreeFilter({
  children,
  defaultChecked = [],
}: {
  children: ReactNode;
  defaultChecked?: string[];
}) {
  const [checked, setChecked] = useState<Set<string>>(new Set(defaultChecked));
  const [search, setSearch] = useState('');

  const toggle = (ids: string[], value: boolean) => {
    setChecked((prev) => {
      const next = new Set(prev);
      ids.forEach((id: string) => (value ? next.add(id) : next.delete(id)));
      return next;
    });
  };

  return (
    <TreeFilterContext.Provider value={{ checked, toggle, search, setSearch }}>
      <div className="w-72 h-[420px] bg-card border border-border rounded-xl shadow-lg text-sm flex flex-col overflow-hidden">
        {children}
      </div>
    </TreeFilterContext.Provider>
  );
}

function TreeFilterSearch({
  placeholder = 'Search...',
}: {
  placeholder?: string;
}) {
  const { search, setSearch } = useTreeFilter();
  return (
    <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border sticky top-0 bg-card z-10 shrink-0">
      <HugeiconsIcon
        icon={Search01Icon}
        size={14}
        className="shrink-0 text-muted-foreground"
      />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent border-none outline-none text-[13px] text-foreground placeholder:text-muted-foreground tracking-tight"
      />
      <div className="flex items-center gap-1.5">
        <AnimatePresence>
          {search && (
            <motion.button
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.12 }}
              onClick={() => setSearch('')}
              className="bg-transparent border-none text-muted-foreground hover:text-foreground cursor-pointer p-0 leading-none flex items-center"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={12} />
            </motion.button>
          )}
        </AnimatePresence>
        <span className="text-[11px] text-muted-foreground/40 font-medium">
          ESC
        </span>
      </div>
    </div>
  );
}

function TreeFilterGroup({
  label,
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex-1 overflow-y-auto py-2">
      {label && (
        <div className="px-3 pt-0.5 pb-2 text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-widest">
          {label}
        </div>
      )}
      {children}
    </div>
  );
}

function TreeFilterList({ items }: { items: TreeNode[] }) {
  const { search } = useTreeFilter();
  const visible = filterTree(items, search);

  if (visible.length === 0) {
    return (
      <div className="py-4 px-3 text-[13px] text-muted-foreground text-center">
        No results
      </div>
    );
  }

  return (
    <>
      {visible.map((node: TreeNode) => (
        <TreeFilterNode key={node.id} node={node} depth={0} />
      ))}
    </>
  );
}

function Checkbox({
  state,
  onChange,
}: {
  state: CheckedState;
  onChange: () => void;
}) {
  const isChecked = state === 'checked';
  const isIndet = state === 'indeterminate';

  return (
    <button
      onClick={onChange}
      className={`w-4.5 h-4.5 rounded-[5px] flex items-center justify-center shrink-0 cursor-pointer transition-colors duration-150 ${
        isChecked || isIndet
          ? 'bg-primary border-0'
          : 'border border-border bg-transparent'
      }`}
    >
      <AnimatePresence mode="wait">
        {isChecked && (
          <motion.svg
            key="check"
            width="10"
            height="8"
            viewBox="0 0 10 8"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <motion.path
              d="M1 4L3.8 7L9 1"
              stroke="currentColor"
              className="text-primary-foreground"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            />
          </motion.svg>
        )}

        {isIndet && (
          <motion.div
            key="indet"
            className="h-0.5 rounded-sm bg-primary-foreground"
            style={{ width: 8 }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.15 }}
          />
        )}
      </AnimatePresence>
    </button>
  );
}

function TreeFilterNode({
  node,
  depth = 0,
}: {
  node: TreeNode;
  depth?: number;
}) {
  const { checked, toggle } = useTreeFilter();
  const [expanded, setExpanded] = useState(depth < 1);

  const hasChildren = node.children && node.children.length > 0;
  const checkedState = getCheckedState(node, checked);

  const handleCheck = () => {
    const leaves = getAllLeafIds(node);
    toggle(leaves.length ? leaves : [node.id], checkedState !== 'checked');
  };

  return (
    <Collapsible open={expanded} onOpenChange={setExpanded}>
      <div
        className="flex items-center gap-1.5 pr-2.5 py-1.25 mx-1 rounded-md cursor-pointer hover:bg-accent transition-colors duration-100"
        style={{ paddingLeft: `${8 + depth * 10}px` }}
      >
        {hasChildren ? (
          <CollapsibleTrigger asChild>
            <button className="bg-transparent border-none p-0 cursor-pointer flex items-center w-4 shrink-0 text-muted-foreground">
              <motion.span
                animate={{ rotate: expanded ? 90 : 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="flex items-center"
              >
                <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
              </motion.span>
            </button>
          </CollapsibleTrigger>
        ) : (
          <div className="w-4 shrink-0" />
        )}

        <Checkbox state={checkedState} onChange={handleCheck} />

        <span
          onClick={handleCheck}
          className={`flex-1 text-[13px] cursor-pointer select-none transition-colors duration-150 tracking-tight ${
            checkedState === 'checked'
              ? 'font-semibold text-foreground'
              : 'font-normal text-muted-foreground'
          }`}
        >
          {node.label}
        </span>

        {node.count != null && (
          <span className="text-[11.5px] text-muted-foreground/50 tabular-nums">
            {node.count}
          </span>
        )}
      </div>

      <AnimatePresence initial={false}>
        {expanded && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            {node.children!.map((child: TreeNode) => (
              <TreeFilterNode key={child.id} node={child} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </Collapsible>
  );
}

export {
  TreeFilter,
  TreeFilterSearch,
  TreeFilterGroup,
  TreeFilterList,
  TreeFilterNode,
};

'use client';

import { ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge, badgeVariants } from '@/registry/components/ui/badge';
import type { VariantProps } from 'class-variance-authority';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];

type TokenType = 'default' | 'control' | 'system';

interface Token {
  text: string;
  type: TokenType;
}

const tokens: Token[] = [
  { text: 'Analyze', type: 'default' },
  { text: 'the', type: 'default' },
  { text: 'following', type: 'default' },
  { text: 'dataset', type: 'default' },
  { text: 'and', type: 'default' },
  { text: 'return', type: 'default' },
  { text: '\\n\\n', type: 'control' },
  { text: '⊲system▷', type: 'system' },
  { text: 'a', type: 'default' },
  { text: 'structured', type: 'default' },
  { text: 'JSON', type: 'default' },
  { text: '```', type: 'control' },
  { text: 'summary', type: 'default' },
  { text: 'with', type: 'default' },
  { text: 'insights', type: 'default' },
  { text: '.', type: 'default' },
];

const tokenVariants: Record<TokenType, BadgeVariant> = {
  default: 'secondary',
  control: 'orange',
  system: 'purple',
};

const tokenTooltips: Record<TokenType, string> = {
  default: 'Regular text token',
  control: 'Control character or code delimiter',
  system: 'System prompt injection token',
};

const fmt = (n: number) => n.toLocaleString();
const fmtCost = (n: number) => `$${n.toFixed(4)}`;

const inputTokens = 4391;
const outputTokens = 8456;
const inputCost = 0.0132;
const outputCost = 0.1267;
const model = 'claude-sonnet-4.6';
const totalTokens = inputTokens + outputTokens;
const totalCost = inputCost + outputCost;

const inputPct = Math.round((inputTokens / totalTokens) * 100);
const outputPct = 100 - inputPct;

export const TokenUsage = () => {
  return (
    <Card className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-card">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between px-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-md bg-muted shrink-0">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M1 2h10M1 6h10M1 10h6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="text-muted-foreground"
              />
            </svg>
          </div>
          <span className="text-sm font-medium text-card-foreground">
            Token usage
          </span>
        </div>
        <span className="text-[11px] text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full border border-border">
          {model}
        </span>
      </CardHeader>

      {/* Input / Output stats */}
      <div className="grid grid-cols-2 border-b border-border">
        <div className="px-5 py-4 border-r border-border">
          <div className="flex items-center gap-1 text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-1.5">
            <ArrowUp size={9} /> Input
          </div>
          <div className="text-[22px] font-medium text-foreground leading-none mb-1">
            {fmt(inputTokens)}
          </div>
          <div className="text-[11px] text-muted-foreground">
            {fmtCost(inputCost)}
          </div>
        </div>

        <div className="px-5 py-4">
          <div className="flex items-center gap-1 text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-1.5">
            <ArrowDown size={9} /> Output
          </div>
          <div className="text-[22px] font-medium text-foreground leading-none mb-1">
            {fmt(outputTokens)}
          </div>
          <div className="text-[11px] text-muted-foreground">
            {fmtCost(outputCost)}
          </div>
        </div>
      </div>

      {/* Total + proportion bar */}
      <div className="px-5 py-4 border-b border-border">
        <div className="flex items-baseline justify-between mb-2.5">
          <div className="flex items-baseline gap-2.5">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">
              Total tokens
            </span>
            <span className="text-xl font-medium text-foreground">
              {fmt(totalTokens)}
            </span>
          </div>
          <span className="text-[13px] font-medium text-emerald-500">
            {fmtCost(totalCost)}
          </span>
        </div>

        {/* Bar */}
        <div className="h-1.5 rounded-full overflow-hidden flex gap-px">
          <div
            className="bg-violet-600 rounded-full"
            style={{ width: `${inputPct}%` }}
          />
          <div
            className="bg-sky-500 rounded-full"
            style={{ width: `${outputPct}%` }}
          />
        </div>

        {/* Legend */}
        <div className="flex gap-3.5 mt-2">
          <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <span className="w-2 h-2 rounded-sm bg-violet-600 inline-block" />
            Input {inputPct}%
          </span>
          <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <span className="w-2 h-2 rounded-sm bg-sky-500 inline-block" />
            Output {outputPct}%
          </span>
        </div>
      </div>

      {/* Token breakdown */}
      <div className="px-5 pt-4 pb-5">
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">
            Token breakdown
          </p>
          <div className="flex gap-3">
            <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-sm bg-orange-500 inline-block" />
              Special
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-sm bg-purple-500 inline-block" />
              System
            </span>
          </div>
        </div>

        <TooltipProvider>
          <div className="flex flex-wrap gap-1.5">
            {tokens.map((token, i) => (
              <Tooltip key={i}>
                <TooltipTrigger asChild>
                  <Badge
                    variant={tokenVariants[token.type]}
                    className="cursor-pointer"
                  >
                    {token.text}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent side="top">
                  {tokenTooltips[token.type]}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </Card>
  );
};

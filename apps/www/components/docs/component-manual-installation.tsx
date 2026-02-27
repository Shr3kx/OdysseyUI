'use client';

import { DynamicCodeBlock } from '@/components/docs/dynamic-codeblock';
import { CodeTabs } from '@/components/docs/code-tabs';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { CollapsibleContent } from 'fumadocs-ui/components/ui/collapsible';
import { Collapsible } from 'fumadocs-ui/components/ui/collapsible';
import { CollapsibleTrigger } from 'fumadocs-ui/components/ui/collapsible';
import { Button } from '@workspace/ui/components/ui/button';
import { cn } from '@workspace/ui/lib/utils';
import { useRef, useState } from 'react';
import ReactIcon from '@workspace/ui/components/icons/react-icon';

const getDepsCommands = (dependencies?: string[]) => {
  if (!dependencies) return undefined;
  return {
    npm: `npm install ${dependencies?.join(' ')}`,
    pnpm: `pnpm add ${dependencies?.join(' ')}`,
    yarn: `yarn add ${dependencies?.join(' ')}`,
    bun: `bun add ${dependencies?.join(' ')}`,
  };
};

const generateCssCode = (
  cssVars?: { light?: Record<string, string>; dark?: Record<string, string> },
  css?: Record<string, Record<string, string>>,
) => {
  const lines: string[] = [];

  if (cssVars?.light || cssVars?.dark) {
    lines.push('@layer base {');
    if (cssVars.light && Object.keys(cssVars.light).length > 0) {
      lines.push('  :root {');
      for (const [key, value] of Object.entries(cssVars.light)) {
        lines.push(`    --${key}: ${value};`);
      }
      lines.push('  }');
    }
    if (cssVars.dark && Object.keys(cssVars.dark).length > 0) {
      lines.push('  .dark {');
      for (const [key, value] of Object.entries(cssVars.dark)) {
        lines.push(`    --${key}: ${value};`);
      }
      lines.push('  }');
    }
    lines.push('}');
  }

  if (css && Object.keys(css).length > 0) {
    if (lines.length > 0) lines.push('');
    for (const [selector, properties] of Object.entries(css)) {
      lines.push(`${selector} {`);
      for (const [prop, value] of Object.entries(properties)) {
        lines.push(`  ${prop}: ${value};`);
      }
      lines.push('}');
    }
  }

  return lines.join('\n');
};

const getRegistryDepsCommands = (dependencies?: string[]) => {
  if (!dependencies) return undefined;
  const quotedDependencies = dependencies
    .map((dep) => {
      if (dep.startsWith('https://odysseyui.com/r/')) {
        return dep.replace('https://odysseyui.com/r/', '@odyssey/');
      }
      if (dep.startsWith('https://')) {
        return `"${dep}"`;
      }
      return dep;
    })
    .join(' ');
  return {
    npm: `npx shadcn@latest add ${quotedDependencies}`,
    pnpm: `pnpm dlx shadcn@latest add ${quotedDependencies}`,
    yarn: `npx shadcn@latest add ${quotedDependencies}`,
    bun: `bun x --bun shadcn@latest add ${quotedDependencies}`,
  };
};

export const ComponentManualInstallation = ({
  path,
  dependencies,
  devDependencies,
  registryDependencies,
  code,
  cssVars,
  css,
}: {
  path: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  code: string;
  cssVars?: {
    light?: Record<string, string>;
    dark?: Record<string, string>;
  };
  css?: Record<string, Record<string, string>>;
}) => {
  const depsCommands = getDepsCommands(dependencies);
  const devDepsCommands = getDepsCommands(devDependencies);
  const registryDepsCommands = getRegistryDepsCommands(registryDependencies);
  const cssCode = generateCssCode(cssVars, css);
  const hasCss = cssCode.trim().length > 0;

  const [isOpened, setIsOpened] = useState(false);
  const collapsibleRef = useRef<HTMLDivElement>(null);

  return (
    <div className="-mt-6">
      <Steps>
        {dependencies && depsCommands && (
          <Step>
            <h4 className="pt-1 pb-4">Install the following dependencies:</h4>
            <CodeTabs codes={depsCommands} />
          </Step>
        )}

        {devDependencies && devDepsCommands && (
          <Step>
            <h4 className="pt-1 pb-4">
              Install the following dev dependencies:
            </h4>
            <CodeTabs codes={devDepsCommands} />
          </Step>
        )}

        {registryDependencies && registryDepsCommands && (
          <Step>
            <h4 className="pt-1 pb-4">
              Install the following registry dependencies:
            </h4>
            <CodeTabs codes={registryDepsCommands} />
          </Step>
        )}

        <Step>
          <h4 className="pt-1 pb-4">
            Copy and paste the following code into your project:
          </h4>

          <Collapsible open={isOpened} onOpenChange={setIsOpened}>
            <div ref={collapsibleRef} className="relative overflow-hidden">
              <CollapsibleContent
                forceMount
                className={cn('overflow-hidden', !isOpened && 'max-h-32')}
              >
                <div
                  className={cn(
                    '[&_pre]:my-0 [&_pre]:max-h-[650px] [&_code]:pb-[60px]',
                    !isOpened
                      ? '[&_pre]:overflow-hidden'
                      : '[&_pre]:overflow-auto]',
                  )}
                >
                  <DynamicCodeBlock
                    code={code}
                    lang="tsx"
                    title={path}
                    icon={<ReactIcon />}
                  />
                </div>
              </CollapsibleContent>
              <div
                className={cn(
                  'absolute flex items-center justify-center bg-gradient-to-b rounded-t-xl from-neutral-300/30 to-white dark:from-neutral-700/30 dark:to-neutral-950 p-2',
                  isOpened ? 'inset-x-0 bottom-0 h-12' : 'inset-0',
                )}
              >
                <CollapsibleTrigger asChild>
                  <Button variant="secondary" className="h-8 text-xs">
                    {isOpened ? 'Collapse' : 'Expand'}
                  </Button>
                </CollapsibleTrigger>
              </div>
            </div>
          </Collapsible>
        </Step>

        {hasCss && (
          <Step>
            <h4 className="pt-1 pb-4">
              Add the following CSS to your global stylesheet:
            </h4>
            <DynamicCodeBlock code={cssCode} lang="css" title="globals.css" />
          </Step>
        )}

        <Step>
          <h4 className="pt-1 pb-4">
            Update the import paths to match your project setup.
          </h4>
        </Step>
      </Steps>
    </div>
  );
};

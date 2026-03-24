'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

type LogoCloudContextType = {
  visible: boolean;
  fadeDuration: number;
  staggerDelay: number;
};

const LogoCloudCtx = createContext<LogoCloudContextType>({
  visible: true,
  fadeDuration: 0.6,
  staggerDelay: 0.08,
});

interface LogoItemProps {
  icon: React.ReactNode;
  name: string;
  _index?: number;
}

export function LogoCloudItem({ icon, name, _index = 0 }: LogoItemProps) {
  const { visible, fadeDuration, staggerDelay } = useContext(LogoCloudCtx);

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(8px)' }}
      animate={{
        opacity: visible ? 1 : 0,
        filter: visible ? 'blur(0px)' : 'blur(8px)',
      }}
      transition={{
        delay: _index * staggerDelay,
        duration: fadeDuration,
        ease: 'easeInOut',
      }}
      className="flex flex-row items-center gap-2 cursor-default"
    >
      {icon}
      <span className="text-lg font-semibold text-foreground tracking-tight whitespace-nowrap">
        {name}
      </span>
    </motion.div>
  );
}

interface LogoGroupProps {
  children: React.ReactNode;
  _active?: boolean;
}

export function LogoCloudGroup({ children, _active = false }: LogoGroupProps) {
  if (!_active) return null;

  const items = React.Children.toArray(children);
  return (
    <>
      {items.map((item, i) =>
        React.isValidElement(item)
          ? React.cloneElement(
              item as React.ReactElement<{ _index?: number }>,
              {
                _index: i,
              },
            )
          : null,
      )}
    </>
  );
}

interface LogoCloudRootProps {
  children: React.ReactNode;
  label?: string;
  displayDuration?: number | boolean;
  fadeDuration?: number | boolean;
  staggerDelay?: number | boolean;
  className?: string;
}

export function LogoCloud({
  children,
  label = '',
  displayDuration,
  fadeDuration,
  staggerDelay,
  className,
}: LogoCloudRootProps) {
  const resolvedDisplayDuration =
    typeof displayDuration === 'number' ? displayDuration : 2000;
  const resolvedFadeDuration =
    typeof fadeDuration === 'number' ? fadeDuration : 0.6;
  const resolvedStaggerDelay =
    typeof staggerDelay === 'number' ? staggerDelay : 0.08;
  const [groupIndex, setGroupIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const groups = React.Children.toArray(children).filter(React.isValidElement);
  const totalGroups = groups.length;

  const currentGroup = groups[groupIndex];
  const itemCount = React.isValidElement(currentGroup)
    ? React.Children.count(
        (currentGroup as React.ReactElement<{ children: React.ReactNode }>)
          .props.children,
      )
    : 0;
  const totalExitMs =
    ((itemCount - 1) * resolvedStaggerDelay + resolvedFadeDuration) * 1000 +
    150;
  const cycleMs = resolvedDisplayDuration + totalExitMs;

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setGroupIndex((prev) => (prev + 1) % totalGroups);
        setVisible(true);
      }, totalExitMs);
    }, cycleMs);

    return () => clearInterval(interval);
  }, [totalGroups, totalExitMs, cycleMs]);

  return (
    <LogoCloudCtx.Provider
      value={{
        visible,
        fadeDuration: resolvedFadeDuration,
        staggerDelay: resolvedStaggerDelay,
      }}
    >
      <section className={cn('w-full py-16 px-6', className)}>
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-10">
          {label && (
            <p className="text-muted-foreground text-sm tracking-widest uppercase font-light">
              {label}
            </p>
          )}
          <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
            {groups.map((group, i) =>
              React.isValidElement(group)
                ? React.cloneElement(
                    group as React.ReactElement<{ _active?: boolean }>,
                    {
                      _active: i === groupIndex,
                    },
                  )
                : null,
            )}
          </div>
        </div>
      </section>
    </LogoCloudCtx.Provider>
  );
}

export default LogoCloud;

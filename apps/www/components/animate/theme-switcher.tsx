'use client';

import { Switch } from '@/components/radix/switch';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useSound } from '@/hooks/use-sound';
import { switchOnSound } from '@/lib/switch-on';
import { switchOffSound } from '@/lib/switch-off';

export const ThemeSwitcher = ({ className }: { className?: string }) => {
  const { resolvedTheme: theme, setTheme } = useTheme();
  const [playOn] = useSound(switchOnSound, { volume: 0.25 });
  const [playOff] = useSound(switchOffSound, { volume: 0.25 });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'd' || e.key === 'D') {
        const isDark = document.documentElement.classList.contains('dark');
        isDark ? playOn() : playOff();
        setTheme(isDark ? 'light' : 'dark');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playOn, playOff, setTheme]);

  return (
    isClient && (
      <Switch
        className={className}
        leftIcon={<Sun />}
        rightIcon={<Moon />}
        checked={theme === 'dark'}
        onCheckedChange={(checked) => {
          checked ? playOff() : playOn();
          setTheme(checked ? 'dark' : 'light');
        }}
      />
    )
  );
};

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
  const [playOn] = useSound(switchOnSound, { volume: 0.125 });
  const [playOff] = useSound(switchOffSound, { volume: 0.125 });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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

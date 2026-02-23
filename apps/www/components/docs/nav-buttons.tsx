'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/registry/components/buttons/button';
import { useSound } from '@/hooks/use-sound';
import { clickSoftSound } from '@/lib/click-soft';

interface NavButtonsProps {
  prevNav?: { url: string; name: string };
  nextNav?: { url: string; name: string };
  currentUrl: string;
}

export function NavButtons({ prevNav, nextNav, currentUrl }: NavButtonsProps) {
  const [play] = useSound(clickSoftSound, { volume: 1 });

  return (
    <div className="flex flex-row gap-1.5 items-center">
      <Link
        href={prevNav?.url ?? currentUrl}
        aria-disabled={!prevNav}
        className={!prevNav ? 'pointer-events-none opacity-50' : undefined}
        aria-label={
          prevNav ? `Aller à ${prevNav.name}` : 'Pas de page précédente'
        }
      >
        <Button variant="accent" size="icon-md" onClick={() => play()}>
          <ArrowLeft />
        </Button>
      </Link>
      <Link
        href={nextNav?.url ?? currentUrl}
        aria-disabled={!nextNav}
        className={!nextNav ? 'pointer-events-none opacity-50' : undefined}
        aria-label={
          nextNav ? `Aller à ${nextNav.name}` : 'Pas de page suivante'
        }
      >
        <Button variant="accent" size="icon-md" onClick={() => play()}>
          <ArrowRight />
        </Button>
      </Link>
    </div>
  );
}

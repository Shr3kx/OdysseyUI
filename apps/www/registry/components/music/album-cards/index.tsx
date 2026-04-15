'use client';

import { useState, useEffect, useId, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SpotifyData {
  title: string;
  artist: string;
  image: string;
  link: string;
  audio?: string;
}

export interface AlbumCardData {
  id: string;
  url: string;
}

export interface AlbumCardsProps {
  albums: AlbumCardData[];
  title?: string;
  className?: string;
}

// --- Vinyl Disc SVG ----------------------------------------------------------
function VinylDisc({ isSpinning, uid }: { isSpinning: boolean; uid: string }) {
  const grooves: ReactNode[] = [];
  for (let i = 0; i < 36; i++) {
    const r = 16 + ((43 - 16) / 36) * i;
    const opacity = i % 4 === 0 ? 0.1 : i % 2 === 0 ? 0.04 : 0.02;
    grooves.push(
      <circle
        key={i}
        cx="55"
        cy="55"
        r={r}
        fill="none"
        stroke={`rgba(255,255,255,${opacity})`}
        strokeWidth={i % 4 === 0 ? '0.6' : '0.25'}
      />,
    );
  }

  const maskId = `vinyl-mask-${uid}`;
  const fLeft = `vf-l-${uid}`;
  const fRight = `vf-r-${uid}`;
  const fTop = `vf-t-${uid}`;
  const fBot = `vf-b-${uid}`;

  return (
    <svg
      viewBox="0 0 110 110"
      className="size-full drop-shadow-[0_8px_24px_rgba(0,0,0,0.8)]"
      style={{ animation: isSpinning ? 'spin 3.4s linear infinite' : 'none' }}
    >
      <circle cx="55" cy="55" r="55" fill="#0c0c0c" />
      <circle cx="55" cy="55" r="51.5" fill="#0f0f0f" />
      <g>{grooves}</g>
      <mask id={maskId} maskUnits="userSpaceOnUse">
        <circle cx="55" cy="55" r="55" fill="white" />
      </mask>
      <g mask={`url(#${maskId})`}>
        <g filter={`url(#${fLeft})`} opacity="0.38">
          <path fill="#fff" d="M-14 38l68 19.579L-14 74V38z" />
        </g>
        <g filter={`url(#${fRight})`} opacity="0.38">
          <path fill="#fff" d="M123 38L55 57.579 123 74V38z" />
        </g>
        <g filter={`url(#${fTop})`} opacity="0.38">
          <path fill="#fff" d="M36.5-12.5l19.579 68 16.421-68h-36z" />
        </g>
        <g filter={`url(#${fBot})`} opacity="0.38">
          <path fill="#fff" d="M36.5 124.5l19.579-68 16.421 68h-36z" />
        </g>
      </g>
      <circle cx="55" cy="55" r="13.5" fill="#7a1212" />
      <circle cx="55" cy="55" r="11.5" fill="#5c0e0e" />
      <circle cx="55" cy="55" r="9" fill="#4a0b0b" />
      <circle cx="55" cy="55" r="2.8" fill="#000" />
      <defs>
        <filter
          id={fLeft}
          x="-30"
          y="22"
          width="100"
          height="68"
          filterUnits="userSpaceOnUse"
        >
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <filter
          id={fRight}
          x="39"
          y="22"
          width="100"
          height="68"
          filterUnits="userSpaceOnUse"
        >
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <filter
          id={fTop}
          x="20.5"
          y="-28.5"
          width="68"
          height="100"
          filterUnits="userSpaceOnUse"
        >
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <filter
          id={fBot}
          x="20.5"
          y="40.5"
          width="68"
          height="100"
          filterUnits="userSpaceOnUse"
        >
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
    </svg>
  );
}

// --- Single Album Card --------------------------------------------------------
function AlbumCard({
  album,
  index,
  total,
  isActive,
  hasNeighborActive,
  onActivate,
}: {
  album: AlbumCardData;
  index: number;
  total: number;
  isActive: boolean;
  hasNeighborActive: boolean;
  onActivate: (id: string | null) => void;
}) {
  const uid = useId().replace(/:/g, '');
  const [vinylOut, setVinylOut] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [data, setData] = useState<SpotifyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/spotify?url=${encodeURIComponent(album.url)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: SpotifyData) => setData(d))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [album.url]);

  // Retract vinyl when another card becomes active
  useEffect(() => {
    if (!isActive) setVinylOut(false);
  }, [isActive]);

  const stackZ = total - index;
  const isRaised = hovered || vinylOut;

  const handleClick = () => {
    const next = !vinylOut;
    setVinylOut(next);
    onActivate(next ? album.id : null);
  };

  if (isLoading) {
    return (
      <div
        className="relative shrink-0"
        style={{
          marginLeft: index > 0 ? '-2.75rem' : undefined,
          zIndex: stackZ,
        }}
      >
        <div className="relative z-10">
          <div className="size-40 animate-pulse rounded-2xl bg-foreground/10" />
          <div className="h-14 w-40" />
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div
      className="relative shrink-0"
      style={{
        zIndex: vinylOut ? 200 : stackZ,
        marginLeft: index > 0 ? '-2.75rem' : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Vinyl disc slides up on click */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 z-0 aspect-square w-[80%]"
        style={
          vinylOut
            ? {
                transform: 'translate(-50%, -56%)',
                opacity: 1,
                transition:
                  'transform 0.5s cubic-bezier(0.34, 1.15, 0.64, 1), opacity 0.25s ease',
              }
            : {
                transform: 'translate(-50%, 5%)',
                opacity: 0,
                transition:
                  'transform 0.3s cubic-bezier(0.32, 0, 0.67, 0), opacity 0.2s ease 0.08s',
              }
        }
      >
        <VinylDisc isSpinning={vinylOut} uid={uid} />
      </div>

      {/* Card body */}
      <div
        className="relative z-10 cursor-pointer"
        style={{
          transform: isRaised ? 'translateY(-14px)' : 'translateY(0px)',
          transition: 'transform 0.35s cubic-bezier(0.34, 1.4, 0.64, 1)',
        }}
        onClick={handleClick}
      >
        {/* Album cover */}
        <div
          className={cn(
            'relative size-40 overflow-hidden rounded-2xl',
            'shadow-[0_8px_28px_rgba(0,0,0,0.14)] dark:shadow-[0_8px_28px_rgba(0,0,0,0.6)]',
            isRaised &&
              'shadow-[0_22px_48px_rgba(0,0,0,0.22)] dark:shadow-[0_22px_48px_rgba(0,0,0,0.82)]',
          )}
        >
          <img
            src={data.image}
            alt={data.title}
            draggable={false}
            className="pointer-events-none size-full object-cover select-none"
          />
          {/* Edge vignette */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_12px_rgba(0,0,0,0.4)]" />
          {/* Neighbor dimming overlay */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl bg-black/0 transition-[background-color] duration-300"
            style={{
              backgroundColor: hasNeighborActive
                ? 'rgba(0,0,0,0.125)'
                : 'rgba(0,0,0,0)',
            }}
          />
        </div>

        {/* Reflection */}
        <div
          className="pointer-events-none mt-0 h-14 w-40 overflow-hidden"
          style={{
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, transparent 72%)',
            maskImage:
              'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, transparent 72%)',
          }}
        >
          <img
            src={data.image}
            alt=""
            aria-hidden
            draggable={false}
            className="pointer-events-none w-40 object-cover select-none"
            style={{
              transform: 'scaleY(-1)',
              transformOrigin: 'top',
              height: '10rem',
            }}
          />
        </div>
      </div>
    </div>
  );
}

// --- AlbumCards Container -----------------------------------------------------
export function AlbumCards({
  albums,
  title = "Music I'm Vibin' to",
  className,
}: AlbumCardsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className={cn('relative w-full', className)}>
      <div className="flex justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex shrink-0 items-start pt-24 pb-4">
          {albums.map((album, i) => (
            <AlbumCard
              key={album.id}
              album={album}
              index={i}
              total={albums.length}
              isActive={activeId === album.id}
              hasNeighborActive={activeId !== null && activeId !== album.id}
              onActivate={setActiveId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

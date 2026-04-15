'use client';

import { useState, useEffect, useRef, SVGProps } from 'react';
import { cn } from '@/lib/utils';

interface SpotifyData {
  title: string;
  artist: string;
  image: string;
  link: string;
  audio?: string;
}

export interface SpotifyCardProps {
  url: string;
  className?: string;
  size?: CardSize;
  onPrev?: () => void;
  onNext?: () => void;
}

function formatTime(seconds: number) {
  if (!isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

type CardSize = 'md' | 'lg' | 'xl';

const sizeConfig = {
  md: {
    pad: 'p-3',
    gap: 'gap-2',
    art: 'max-w-18.75',
    artImg: 'min-h-18.75 min-w-18.75',
    title: 'text-sm',
    artist: 'text-sm',
    spotify: 'size-4',
  },
  lg: {
    pad: 'p-4',
    gap: 'gap-3',
    art: 'max-w-26',
    artImg: 'min-h-26 min-w-26',
    title: 'text-sm',
    artist: 'text-sm',
    spotify: 'size-5',
  },
  xl: {
    pad: 'p-5',
    gap: 'gap-4',
    art: 'max-w-36',
    artImg: 'min-h-36 min-w-36',
    title: 'text-base',
    artist: 'text-sm',
    spotify: 'size-6',
  },
} as const;

const SpotifyCardSkeleton = ({
  className,
  size = 'md',
}: {
  className?: string;
  size?: CardSize;
}) => {
  const s = sizeConfig[size];
  return (
    <div
      className={cn(
        'relative flex h-full w-full items-stretch justify-center overflow-hidden rounded-2xl border border-border bg-muted/50',
        s.pad,
        className,
      )}
    >
      <div
        className={cn(
          'aspect-square w-full animate-pulse self-center rounded-lg bg-muted',
          s.art,
        )}
      />
      <div className="z-10 flex w-full flex-col justify-end">
        <div className="flex flex-col items-end gap-1 pl-6">
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
          <div className="h-4 w-16 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </div>
  );
};

const SpotifyCardError = ({ className }: { className?: string }) => (
  <div
    className={cn(
      'flex h-25 w-full items-center justify-center rounded-2xl border border-border bg-muted/50 p-6 text-muted-foreground',
      className,
    )}
  >
    <p className="text-sm">Failed to load Spotify data</p>
  </div>
);

export const Spotify = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 256 256" preserveAspectRatio="xMidYMid">
    <path
      d="M128 0C57.308 0 0 57.309 0 128c0 70.696 57.309 128 128 128 70.697 0 128-57.304 128-128C256 57.314 198.697.007 127.998.007l.001-.006Zm58.699 184.614c-2.293 3.76-7.215 4.952-10.975 2.644-30.053-18.357-67.885-22.515-112.44-12.335a7.981 7.981 0 0 1-9.552-6.007 7.968 7.968 0 0 1 6-9.553c48.76-11.14 90.583-6.344 124.323 14.276 3.76 2.308 4.952 7.215 2.644 10.975Zm15.667-34.853c-2.89 4.695-9.034 6.178-13.726 3.289-34.406-21.148-86.853-27.273-127.548-14.92-5.278 1.594-10.852-1.38-12.454-6.649-1.59-5.278 1.386-10.842 6.655-12.446 46.485-14.106 104.275-7.273 143.787 17.007 4.692 2.89 6.175 9.034 3.286 13.72v-.001Zm1.345-36.293C162.457 88.964 94.394 86.71 55.007 98.666c-6.325 1.918-13.014-1.653-14.93-7.978-1.917-6.328 1.65-13.012 7.98-14.935C93.27 62.027 168.434 64.68 215.929 92.876c5.702 3.376 7.566 10.724 4.188 16.405-3.362 5.69-10.73 7.565-16.4 4.187h-.006Z"
      fill="#ffffff"
    />
  </svg>
);

function VinylRecord({ isPlaying }: { isPlaying: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 110 110"
      className="size-full animate-spin"
      style={{
        animationDuration: '3s',
        animationPlayState: isPlaying ? 'running' : 'paused',
      }}
    >
      <circle cx="55" cy="55" r="55" fill="#000" />
      <mask
        id="mask0_6138_16576"
        width="110"
        height="110"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
        style={{ maskType: 'alpha' }}
      >
        <circle cx="55" cy="55" r="55" fill="#000" />
      </mask>
      <g mask="url(#mask0_6138_16576)">
        <g filter="url(#filter0_f_6138_16576)">
          <circle cx="55" cy="55" r="51.5" stroke="#fff" strokeOpacity="0.21" />
        </g>
        <g filter="url(#filter1_f_6138_16576)">
          <circle cx="55" cy="55" r="47.5" stroke="#fff" strokeOpacity="0.21" />
        </g>
        <g filter="url(#filter2_f_6138_16576)">
          <circle cx="55" cy="55" r="45.5" stroke="#fff" strokeOpacity="0.21" />
        </g>
        <g filter="url(#filter3_f_6138_16576)">
          <circle cx="55" cy="55" r="43.5" stroke="#fff" strokeOpacity="0.21" />
        </g>
        <g filter="url(#filter4_f_6138_16576)">
          <circle cx="55" cy="55" r="37.5" stroke="#fff" strokeOpacity="0.21" />
        </g>
        <g filter="url(#filter5_f_6138_16576)">
          <circle cx="55" cy="55" r="34.5" stroke="#fff" strokeOpacity="0.21" />
        </g>
        <g filter="url(#filter6_f_6138_16576)" opacity="0.4">
          <path fill="#fff" d="M-14 38l68 19.579L-14 74V38z" />
        </g>
        <g filter="url(#filter7_f_6138_16576)" opacity="0.4">
          <path fill="#fff" d="M123 38L55 57.579 123 74V38z" />
        </g>
        <g filter="url(#filter8_f_6138_16576)" opacity="0.4">
          <path fill="#fff" d="M36.5 124.5l19.579-68 16.421 68h-36z" />
        </g>
        <g filter="url(#filter9_f_6138_16576)" opacity="0.4">
          <path fill="#fff" d="M36.5-12.5l19.579 68 16.421-68h-36z" />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_f_6138_16576"
          width="108"
          height="108"
          x="1"
          y="1"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_6138_16576"
            stdDeviation="1"
          />
        </filter>
        <filter
          id="filter1_f_6138_16576"
          width="100"
          height="100"
          x="5"
          y="5"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_6138_16576"
            stdDeviation="1"
          />
        </filter>
        <filter
          id="filter2_f_6138_16576"
          width="96"
          height="96"
          x="7"
          y="7"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_6138_16576"
            stdDeviation="1"
          />
        </filter>
        <filter
          id="filter3_f_6138_16576"
          width="92"
          height="92"
          x="9"
          y="9"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_6138_16576"
            stdDeviation="1"
          />
        </filter>
        <filter
          id="filter4_f_6138_16576"
          width="80"
          height="80"
          x="15"
          y="15"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_6138_16576"
            stdDeviation="1"
          />
        </filter>
        <filter
          id="filter5_f_6138_16576"
          width="74"
          height="74"
          x="18"
          y="18"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_6138_16576"
            stdDeviation="1"
          />
        </filter>
        <filter
          id="filter6_f_6138_16576"
          width="100"
          height="68"
          x="-30"
          y="22"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_6138_16576"
            stdDeviation="8"
          />
        </filter>
        <filter
          id="filter7_f_6138_16576"
          width="100"
          height="68"
          x="39"
          y="22"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_6138_16576"
            stdDeviation="8"
          />
        </filter>
        <filter
          id="filter8_f_6138_16576"
          width="68"
          height="100"
          x="20.5"
          y="40.5"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_6138_16576"
            stdDeviation="8"
          />
        </filter>
        <filter
          id="filter9_f_6138_16576"
          width="68"
          height="100"
          x="20.5"
          y="-28.5"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_6138_16576"
            stdDeviation="8"
          />
        </filter>
      </defs>
    </svg>
  );
}

export function SpotifyCard({
  url,
  className,
  size = 'md',
  onPrev,
  onNext,
}: SpotifyCardProps) {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setIsLoading(true);
    setError(false);

    fetch(`/api/spotify?url=${encodeURIComponent(url)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [url]);

  const handlePlayPause = () => {
    if (!data?.audio) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(data.audio);
      audioRef.current.volume = 0.3;
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });
      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current?.currentTime ?? 0);
      });
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration ?? 0);
      });
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  if (isLoading) {
    return <SpotifyCardSkeleton className={className} size={size} />;
  }

  if (error || !data) {
    return <SpotifyCardError className={className} />;
  }

  const s = sizeConfig[size];
  const seekProgress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-border',
        className,
      )}
    >
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 block aspect-square w-[120%] -translate-x-1/2 -translate-y-1/2">
        <div className="pointer-events-none flex h-full opacity-100 select-none">
          <img
            src={data.image}
            alt=""
            className="absolute top-0 left-0 block h-full w-full blur-[50px] brightness-150"
          />
          <div className="absolute top-0 left-0 h-full w-full bg-[linear-gradient(180deg,rgba(0,0,0,0)_0,rgba(0,0,0,.85))]" />
        </div>
      </div>
      <div className={cn('relative z-1 flex flex-col', s.gap, s.pad)}>
        <div className="flex h-full items-stretch justify-center">
          <button
            onClick={data.audio ? handlePlayPause : undefined}
            className={cn(
              'group relative z-1 w-full self-center',
              s.art,
              data.audio && 'cursor-pointer',
            )}
          >
            <img
              src={data.image}
              alt={data.title}
              className={cn(
                'pointer-events-none relative z-1 w-full rounded-lg object-cover shadow-md transition-transform duration-300 ease-out select-none',
                s.artImg,
                data.audio && 'group-hover:-translate-x-0.5',
                isPlaying && '-translate-x-0.5',
              )}
            />
            {data.audio && (
              <div
                className={cn(
                  'absolute top-1/2 left-1/2 -z-1 size-[80%] -translate-y-1/2 transition-all duration-300',
                  isPlaying
                    ? 'translate-x-[-10%]'
                    : 'translate-x-[-50%] group-hover:translate-x-[-10%]',
                )}
              >
                <VinylRecord isPlaying={isPlaying} />
              </div>
            )}
          </button>
          <div className="z-10 flex w-full flex-col justify-between">
            <div className="flex self-end">
              <a
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                <Spotify className={cn('text-[#BAAEBA]', s.spotify)} />
              </a>
            </div>
            <div className="pl-6 text-end">
              <h2
                className={cn(
                  'font-semibold tracking-[-.006em] whitespace-nowrap text-[#D6D1D4]',
                  s.title,
                )}
              >
                {data.title}
              </h2>
              <h2
                className={cn(
                  'font-medium tracking-[-.006em] whitespace-nowrap text-[#BAAEBA]',
                  s.artist,
                )}
              >
                {data.artist}
              </h2>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="min-w-8 shrink-0 text-right font-mono text-[10px] text-white/40 tabular-nums">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            className="spotify-seek flex-1"
            min={0}
            max={duration || 100}
            step={0.05}
            value={currentTime}
            onChange={handleSeek}
            disabled={!data.audio}
            aria-label="Seek"
            style={{
              background: `linear-gradient(to right, rgba(255,255,255,0.75) ${seekProgress}%, rgba(255,255,255,0.18) ${seekProgress}%)`,
            }}
          />
          <span className="min-w-10 shrink-0 font-mono text-[10px] text-white/40 tabular-nums">
            {formatTime(duration)}
          </span>
        </div>

        <div className="flex items-center justify-between pb-0.5">
          <button
            onClick={handlePlayPause}
            disabled={!data.audio}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            className="cursor-pointer text-white/80 transition-opacity duration-150 hover:text-white disabled:cursor-default disabled:opacity-30"
            style={{ filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.45))' }}
          >
            {isPlaying ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <rect x="4" y="3" width="4.5" height="14" rx="1.5" />
                <rect x="11.5" y="3" width="4.5" height="14" rx="1.5" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5 3.5v13l12-6.5L5 3.5z" />
              </svg>
            )}
          </button>

          <div className="flex items-center gap-5">
            <button
              onClick={onPrev}
              aria-label="Previous"
              className="cursor-pointer text-white/70 transition-opacity duration-150 hover:text-white disabled:cursor-default disabled:opacity-30"
              style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.35))' }}
              disabled={!onPrev}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="currentColor"
              >
                <path d="M15 2.5v12l-9-6 9-6z" />
                <rect x="1.5" y="2.5" width="2.8" height="12" rx="0.8" />
              </svg>
            </button>
            <button
              onClick={onNext}
              aria-label="Next"
              className="cursor-pointer text-white/70 transition-opacity duration-150 hover:text-white disabled:cursor-default disabled:opacity-30"
              style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.35))' }}
              disabled={!onNext}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="currentColor"
              >
                <path d="M2 2.5v12l9-6-9-6z" />
                <rect x="12.7" y="2.5" width="2.8" height="12" rx="0.8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

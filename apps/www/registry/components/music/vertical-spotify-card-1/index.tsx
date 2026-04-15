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

export interface VerticalSpotifyCard1Props {
  url: string;
  className?: string;
  onPrev?: () => void;
  onNext?: () => void;
}

function formatTime(seconds: number) {
  if (!isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

const Spotify = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 256 256" preserveAspectRatio="xMidYMid">
    <path
      d="M128 0C57.308 0 0 57.309 0 128c0 70.696 57.309 128 128 128 70.697 0 128-57.304 128-128C256 57.314 198.697.007 127.998.007l.001-.006Zm58.699 184.614c-2.293 3.76-7.215 4.952-10.975 2.644-30.053-18.357-67.885-22.515-112.44-12.335a7.981 7.981 0 0 1-9.552-6.007 7.968 7.968 0 0 1 6-9.553c48.76-11.14 90.583-6.344 124.323 14.276 3.76 2.308 4.952 7.215 2.644 10.975Zm15.667-34.853c-2.89 4.695-9.034 6.178-13.726 3.289-34.406-21.148-86.853-27.273-127.548-14.92-5.278 1.594-10.852-1.38-12.454-6.649-1.59-5.278 1.386-10.842 6.655-12.446 46.485-14.106 104.275-7.273 143.787 17.007 4.692 2.89 6.175 9.034 3.286 13.72v-.001Zm1.345-36.293C162.457 88.964 94.394 86.71 55.007 98.666c-6.325 1.918-13.014-1.653-14.93-7.978-1.917-6.328 1.65-13.012 7.98-14.935C93.27 62.027 168.434 64.68 215.929 92.876c5.702 3.376 7.566 10.724 4.188 16.405-3.362 5.69-10.73 7.565-16.4 4.187h-.006Z"
      fill="#ffffff"
    />
  </svg>
);

export function VerticalSpotifyCard1({
  url,
  className,
  onPrev,
  onNext,
}: VerticalSpotifyCard1Props) {
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
    return (
      <div
        className={cn(
          'relative h-130 w-84 overflow-hidden rounded-3xl bg-neutral-900',
          className,
        )}
      >
        <div className="absolute inset-0 animate-pulse bg-linear-to-b from-white/5 to-black/60" />
        <div className="absolute right-0 bottom-0 left-0 flex flex-col gap-4 p-6">
          <div className="h-5 w-44 rounded bg-white/10" />
          <div className="h-3.5 w-28 rounded bg-white/10" />
          <div className="mt-1 h-0.5 w-full rounded bg-white/10" />
          <div className="h-3 w-20 self-start rounded bg-white/10" />
          <div className="mt-1 flex items-center justify-center gap-7">
            <div className="size-8 rounded bg-white/10" />
            <div className="size-14 rounded-full bg-white/10" />
            <div className="size-8 rounded bg-white/10" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div
        className={cn(
          'flex h-130 w-84 items-center justify-center rounded-3xl border border-border bg-muted/50 text-muted-foreground',
          className,
        )}
      >
        <p className="text-sm">Failed to load Spotify data</p>
      </div>
    );
  }

  const seekProgress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={cn(
        'relative h-130 w-84 overflow-hidden rounded-3xl select-none',
        className,
      )}
    >
      {/* Base layer: blurred image */}
      <img
        src={data.image}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: 'blur(12px)', transform: 'scale(1.12)' }}
      />

      {/* Sharp top layer: fades out downward */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={data.image}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            WebkitMaskImage:
              'linear-gradient(to bottom, black 55%, transparent 80%)',
            maskImage: 'linear-gradient(to bottom, black 55%, transparent 80%)',
          }}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/10 to-black/80" />

      {/* Bottom vignette boost */}
      <div className="absolute right-0 bottom-0 left-0 h-[60%] bg-linear-to-t from-black/65 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-end p-4 pt-5">
          <a
            href={data.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition-colors hover:text-white/80"
            aria-label="Open in Spotify"
          >
            <Spotify className="size-5" />
          </a>
        </div>

        <div className="flex-1" />

        {/* Bottom content */}
        <div className="flex flex-col gap-3 px-6 pb-8">
          <div>
            <h2 className="truncate text-[19px] leading-tight font-semibold tracking-[-0.022em] text-white">
              {data.title}
            </h2>
            <p className="mt-0.5 truncate text-[14px] tracking-[-0.01em] text-white/60">
              {data.artist}
            </p>
          </div>

          {/* Seek bar */}
          <div className="mt-0.5 flex flex-col gap-1.5">
            <input
              type="range"
              className="spotify-seek w-full"
              min={0}
              max={duration || 100}
              step={0.05}
              value={currentTime}
              onChange={handleSeek}
              disabled={!data.audio}
              aria-label="Seek"
              style={{
                background: `linear-gradient(to right, rgba(255,255,255,0.88) ${seekProgress}%, rgba(255,255,255,0.22) ${seekProgress}%)`,
              }}
            />
            <div className="flex justify-between">
              <span className="font-mono text-[10px] text-white/45 tabular-nums">
                {formatTime(currentTime)}
              </span>
              <span className="font-mono text-[10px] text-white/45 tabular-nums">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Transport controls */}
          <div className="mt-0.5 flex items-center justify-center gap-2">
            <button
              onClick={onPrev}
              disabled={!onPrev}
              aria-label="Previous"
              className="cursor-pointer rounded-full p-2 text-white/70 transition-all duration-150 hover:bg-white/10 hover:text-white active:scale-90 disabled:cursor-default disabled:opacity-30"
              style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.35))' }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 17 17"
                fill="currentColor"
              >
                <path d="M15 2.5v12l-9-6 9-6z" />
                <rect x="1.5" y="2.5" width="2.8" height="12" rx="0.8" />
              </svg>
            </button>

            <button
              onClick={handlePlayPause}
              disabled={!data.audio}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="cursor-pointer rounded-full p-2.5 text-white/90 transition-all duration-150 hover:bg-white/12 hover:text-white active:scale-95 disabled:cursor-default disabled:opacity-30"
              style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.5))' }}
            >
              {isPlaying ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <rect x="4" y="3" width="4.5" height="14" rx="1.5" />
                  <rect x="11.5" y="3" width="4.5" height="14" rx="1.5" />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5 3.5v13l12-6.5L5 3.5z" />
                </svg>
              )}
            </button>

            <button
              onClick={onNext}
              disabled={!onNext}
              aria-label="Next"
              className="cursor-pointer rounded-full p-2 text-white/70 transition-all duration-150 hover:bg-white/10 hover:text-white active:scale-90 disabled:cursor-default disabled:opacity-30"
              style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.35))' }}
            >
              <svg
                width="20"
                height="20"
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

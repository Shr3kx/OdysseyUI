'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface SpotifyData {
  title: string;
  artist: string;
  image: string;
  link: string;
  audio?: string;
}

export interface VerticalSpotifyCard2Props {
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

export function VerticalSpotifyCard2({
  url,
  className,
  onPrev,
  onNext,
}: VerticalSpotifyCard2Props) {
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
        <div className="absolute inset-0 animate-pulse">
          <div className="h-full w-full bg-linear-to-br from-white/8 via-transparent to-white/4" />
        </div>
        <div className="absolute inset-0 flex flex-col gap-5 px-6 pt-6 pb-8">
          <div className="aspect-square w-full rounded-2xl bg-white/10" />
          <div className="mt-auto flex w-full flex-col gap-4">
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
      {/* Background: color-extracted from album art */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          src={data.image}
          alt=""
          aria-hidden
          className="absolute top-0 left-0 block h-full w-full object-cover"
          style={{
            filter: 'blur(50px)',
            transform: 'scale(1.15)',
            opacity: 0.9,
          }}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.7)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col px-6">
        {/* Album art */}
        <div className="pt-6">
          <div
            className="aspect-square w-full overflow-hidden rounded-2xl"
            style={{
              boxShadow:
                '0 24px 64px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.07)',
            }}
          >
            <img
              src={data.image}
              alt={data.title}
              className="h-full w-full object-cover"
              style={{
                transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                transform: isPlaying ? 'scale(1.04)' : 'scale(1)',
              }}
            />
          </div>
        </div>

        {/* Bottom content */}
        <div className="mt-5 flex flex-col gap-3 pb-8">
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

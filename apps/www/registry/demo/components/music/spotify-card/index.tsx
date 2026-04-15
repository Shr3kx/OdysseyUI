'use client';

import { useState } from 'react';
import { SpotifyCard } from '@/registry/components/music/spotify-card';

const TRACKS = [
  'https://open.spotify.com/track/0DTSnA1bcVI5niJzoyBPyZ',
  'https://open.spotify.com/track/4iZ4pt7kvcaH6Yo8UoZ4s2',
  'https://open.spotify.com/track/2374M0fQpWi3dLnB54qaLX',
];

export default function SpotifyCardDemo() {
  const [index, setIndex] = useState(0);

  return (
    <div className="flex items-center justify-center p-8">
      <SpotifyCard
        url={TRACKS[index]}
        size="lg"
        className="w-80"
        onPrev={index > 0 ? () => setIndex((i) => i - 1) : undefined}
        onNext={
          index < TRACKS.length - 1 ? () => setIndex((i) => i + 1) : undefined
        }
      />
    </div>
  );
}

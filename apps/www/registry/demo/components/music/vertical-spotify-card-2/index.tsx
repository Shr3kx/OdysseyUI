'use client';

import { useState } from 'react';
import { VerticalSpotifyCard2 } from '@/registry/components/music/vertical-spotify-card-2';

const TRACKS = [
  'https://open.spotify.com/track/0DTSnA1bcVI5niJzoyBPyZ',
  'https://open.spotify.com/track/4iZ4pt7kvcaH6Yo8UoZ4s2',
  'https://open.spotify.com/track/2374M0fQpWi3dLnB54qaLX',
];

export default function VerticalSpotifyCard2Demo() {
  const [index, setIndex] = useState(0);

  return (
    <div className="flex items-center justify-center p-8">
      <VerticalSpotifyCard2
        url={TRACKS[index]}
        onPrev={index > 0 ? () => setIndex((i) => i - 1) : undefined}
        onNext={
          index < TRACKS.length - 1 ? () => setIndex((i) => i + 1) : undefined
        }
      />
    </div>
  );
}

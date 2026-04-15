'use client';

import { AlbumCards } from '@/registry/components/music/album-cards';

const ALBUMS = [
  { id: '1', url: 'https://open.spotify.com/track/0DTSnA1bcVI5niJzoyBPyZ' },
  { id: '2', url: 'https://open.spotify.com/track/4iZ4pt7kvcaH6Yo8UoZ4s2' },
  { id: '3', url: 'https://open.spotify.com/track/2374M0fQpWi3dLnB54qaLX' },
];

export default function AlbumCardsDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <AlbumCards albums={ALBUMS} />
    </div>
  );
}

import { NextRequest, NextResponse } from 'next/server';
import spotifyUrlInfo from 'spotify-url-info';

// @ts-expect-error no types available
const { getPreview } = spotifyUrlInfo(fetch) as {
  getPreview: (url: string) => Promise<{
    title: string;
    artist: string;
    image: string;
    link: string;
    audio: string;
  }>;
};

function normalizeSpotifyUrl(url: string): string {
  return url.replace(/\/intl-[a-z]{2}\//, '/');
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const normalizedUrl = normalizeSpotifyUrl(url);
    const data = await getPreview(normalizedUrl);

    return NextResponse.json({
      title: data.title,
      artist: data.artist,
      image: data.image,
      link: data.link,
      audio: data.audio,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch Spotify data' },
      { status: 500 },
    );
  }
}

import { source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';

export const revalidate = false;

function isSupportedOpenType(buffer: ArrayBuffer) {
  if (buffer.byteLength < 4) return false;

  const signature = new DataView(buffer).getUint32(0, false);

  return (
    signature === 0x00010000 || // TrueType
    signature === 0x4f54544f || // OTTO (CFF/OpenType)
    signature === 0x74746366 // ttcf (TrueType Collection)
  );
}

async function loadGoogleFont(font: string, text: string) {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const resource = css.match(
      /src: url\((.+)\) format\('(opentype|truetype)'\)/,
    );

    if (resource) {
      const response = await fetch(resource[1]);
      if (response.status === 200) {
        const fontData = await response.arrayBuffer();

        if (isSupportedOpenType(fontData)) {
          return fontData;
        }
      }
    }
  } catch {}

  return null;
}

export async function GET(_req: Request, { params }: any) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  const outfitFont = await loadGoogleFont(
    'Outfit',
    `${page.data.description} ${page.data.title} odysseyui.com`,
  );

  return new ImageResponse(
    <div tw="relative flex w-full h-full bg-[#0A0A0A]">
      <div tw="absolute left-15 top-0 bottom-0 w-0.5 h-full bg-[#171717]" />
      <div tw="absolute right-15 top-0 bottom-0 w-0.5 h-full bg-[#171717]" />
      <div tw="absolute bottom-15 left-0 right-0 w-full h-0.5 bg-[#171717]" />
      <div tw="absolute top-15 left-0 right-0 w-full h-0.5 bg-[#171717]" />

      <div tw="absolute top-15 left-[43.5px] w-[35px] h-0.5 bg-[#404040]" />
      <div tw="absolute left-15 top-[43.5px] h-[35px] w-0.5 bg-[#404040]" />

      <div tw="absolute bottom-15 left-[43.5px] w-[35px] h-0.5 bg-[#404040]" />
      <div tw="absolute left-15 bottom-[43.5px] h-[35px] w-0.5 bg-[#404040]" />

      <div tw="absolute top-15 right-[43.5px] w-[35px] h-0.5 bg-[#404040]" />
      <div tw="absolute right-15 top-[43.5px] h-[35px] w-0.5 bg-[#404040]" />

      <div tw="absolute bottom-15 right-[43.5px] w-[35px] h-0.5 bg-[#404040]" />
      <div tw="absolute right-15 bottom-[43.5px] h-[35px] w-0.5 bg-[#404040]" />

      <div
        tw="flex flex-col w-full h-full items-start justify-between p-26"
        style={{
          backgroundSize: '100px 100px',
        }}
      >
        <h1>Odyssey UI</h1>

        <div tw="flex flex-row gap-10 w-full justify-between items-end">
          <div tw="flex flex-col">
            <p
              tw="text-white text-6xl font-medium mb-0"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              {page.data.title}
            </p>
            {page.data.description && (
              <p
                tw="text-white/60 text-2xl mt-6 -mb-2 max-w-2xl"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                {page.data.description}
              </p>
            )}
          </div>

          <div tw="flex ml-6">
            <p
              tw="text-white/80 text-2xl -mb-2"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              odysseyui.com
            </p>
          </div>
        </div>
      </div>
    </div>,
    {
      fonts: outfitFont
        ? [
            {
              name: 'Outfit',
              data: outfitFont,
              style: 'normal' as const,
            },
          ]
        : [],
    },
  );
}

export function generateStaticParams(): {
  slug: string[];
}[] {
  return source.generateParams().map((page) => ({
    ...page,
    slug: [...page.slug, 'image.png'],
  }));
}

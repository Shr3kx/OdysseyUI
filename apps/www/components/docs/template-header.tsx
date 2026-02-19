'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { Button } from '@/registry/components/buttons/button';

interface TemplateHeaderProps {
  title: string;
  description: string;
  image?: string;
  video?: string;
  githubLink?: string;
  buyLink?: string;
  previewLink: string;
}

export function TemplateHeader({
  title,
  description,
  image,
  video,
  githubLink,
  buyLink,
  previewLink,
}: TemplateHeaderProps) {
  return (
    <div className="flex flex-col gap-8 not-prose mb-10">
      {/* Title and Description are rendered by MDX/Fumadocs usually, but if user wants custom header */}
      {/* If fumadocs renders title automatically, we might skip this h1/p or hide fumadocs title */}

      <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-muted/50 shadow-sm">
        {video ? (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="size-full object-cover"
          />
        ) : image ? (
          <img src={image} alt={title} className="size-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
            No preview available
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {buyLink && (
          <Button
            asChild
            className="w-full sm:w-auto rounded-full font-bold h-12 px-8 text-base"
          >
            <Link href={buyLink} target="_blank">
              Buy Now <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        )}
        {githubLink && (
          <Button
            asChild
            className="w-full sm:w-auto rounded-full font-bold h-12 px-8 text-base"
          >
            <Link href={githubLink} target="_blank">
              Get Code <Github className="ml-2 size-4" />
            </Link>
          </Button>
        )}
        <Button
          variant="outline"
          asChild
          className="w-full sm:w-auto rounded-full h-12 px-8 text-base"
        >
          <Link href={previewLink} target="_blank">
            Live Preview <ExternalLink className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

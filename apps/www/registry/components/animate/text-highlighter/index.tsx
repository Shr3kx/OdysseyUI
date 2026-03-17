'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { useInView } from 'motion/react';
import { annotate } from 'rough-notation';
import type { RoughAnnotation } from 'rough-notation/lib/model';

type AnnotationAction =
  | 'highlight'
  | 'underline'
  | 'box'
  | 'circle'
  | 'strike-through'
  | 'crossed-off'
  | 'bracket';

interface HighlighterProps {
  children: ReactNode;
  action?: AnnotationAction;
  color?: string;
  strokeWidth?: number;
  animationDuration?: number;
  iterations?: number;
  padding?: number;
  multiline?: boolean;
  isView?: boolean;
  active?: boolean;
}

export function TextHighlighter({
  children,
  action = 'highlight',
  color = '#ffd1dc',
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
  active = true,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const annotationRef = useRef<RoughAnnotation | null>(null);

  const isInView = useInView(elementRef, { once: true, margin: '-10%' });
  const shouldShow = (!isView || isInView) && active;

  useEffect(() => {
    const element = elementRef.current;
    if (!shouldShow || !element) return;

    const annotation = annotate(element, {
      type: action,
      color,
      strokeWidth,
      animationDuration,
      iterations,
      padding,
      multiline,
    });

    annotationRef.current = annotation;
    annotation.show();

    const observer = new ResizeObserver(() => {
      annotation.hide();
      annotation.show();
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
      annotationRef.current?.remove();
      annotationRef.current = null;
    };
  }, [
    shouldShow,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
  ]);

  return (
    <span
      ref={elementRef}
      className="relative inline-block bg-transparent font-heading"
    >
      {children}
    </span>
  );
}

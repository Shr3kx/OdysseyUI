'use client';

import { motion } from 'motion/react';
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from 'react';

type TypewriterSequence = {
  text: string;
  deleteAfter?: boolean;
  pauseAfter?: number;
};

interface TypewriterProps {
  sequences?: TypewriterSequence[];
  typingSpeed?: number;
  deleteSpeed?: number;
  startDelay?: number;
  pauseBeforeDelete?: number;
  loopDelay?: number;
  autoLoop?: boolean;
  naturalVariance?: boolean;
  className?: string;
}

const DEFAULT_SEQUENCES: TypewriterSequence[] = [
  { text: 'Typewriter', deleteAfter: true },
  { text: 'Multiple Words', deleteAfter: true },
  { text: 'Auto Loop', deleteAfter: false },
];

const getRandomTypingDelay = (baseSpeed: number): number => {
  if (Math.random() < 0.1) return baseSpeed * 2;
  if (Math.random() > 0.9) return baseSpeed * 0.5;
  const variance = 0.4;
  const min = baseSpeed * (1 - variance);
  const max = baseSpeed * (1 + variance);
  return Math.random() * (max - min) + min;
};

export function Typewriter({
  sequences = DEFAULT_SEQUENCES,
  typingSpeed = 50,
  deleteSpeed = 30,
  startDelay = 200,
  pauseBeforeDelete = 1000,
  loopDelay = 1000,
  autoLoop = true,
  naturalVariance = true,
  className,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sequenceIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const sequencesRef = useRef(sequences);
  const typeNextCharRef = useRef<() => void>(() => {});
  const deleteCharRef = useRef<() => void>(() => {});

  useLayoutEffect(() => {
    sequencesRef.current = sequences;
  });

  const schedule = useCallback((fn: () => void, delay: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(fn, delay);
  }, []);

  const typeNextChar = useCallback(() => {
    const seq = sequencesRef.current[sequenceIndexRef.current];
    if (!seq) return;

    if (charIndexRef.current < seq.text.length) {
      charIndexRef.current += 1;
      setDisplayText(seq.text.slice(0, charIndexRef.current));

      const delay = naturalVariance
        ? getRandomTypingDelay(typingSpeed)
        : typingSpeed;

      schedule(typeNextCharRef.current, delay);
    } else {
      const pause = seq.pauseAfter ?? pauseBeforeDelete;

      if (seq.deleteAfter !== false) {
        schedule(() => deleteCharRef.current(), pause);
      } else {
        schedule(() => {
          const isLast =
            sequenceIndexRef.current === sequencesRef.current.length - 1;

          if (isLast && autoLoop) {
            sequenceIndexRef.current = 0;
            charIndexRef.current = 0;
            setDisplayText('');
            typeNextCharRef.current();
          } else if (!isLast) {
            sequenceIndexRef.current += 1;
            charIndexRef.current = 0;
            setDisplayText('');
            typeNextCharRef.current();
          }
        }, loopDelay);
      }
    }
  }, [
    typingSpeed,
    naturalVariance,
    pauseBeforeDelete,
    autoLoop,
    loopDelay,
    schedule,
  ]);

  const deleteChar = useCallback(() => {
    if (charIndexRef.current > 0) {
      charIndexRef.current -= 1;
      const text = sequencesRef.current[sequenceIndexRef.current]?.text ?? '';
      setDisplayText(text.slice(0, charIndexRef.current));
      schedule(deleteCharRef.current, deleteSpeed);
    } else {
      const isLast =
        sequenceIndexRef.current === sequencesRef.current.length - 1;

      if (isLast && autoLoop) {
        schedule(() => {
          sequenceIndexRef.current = 0;
          typeNextCharRef.current();
        }, loopDelay);
      } else if (!isLast) {
        schedule(() => {
          sequenceIndexRef.current += 1;
          typeNextCharRef.current();
        }, 80);
      }
    }
  }, [deleteSpeed, autoLoop, loopDelay, schedule]);

  useLayoutEffect(() => {
    typeNextCharRef.current = typeNextChar;
    deleteCharRef.current = deleteChar;
  });

  const startAnimation = useCallback(() => {
    sequenceIndexRef.current = 0;
    charIndexRef.current = 0;
    schedule(() => {
      setDisplayText('');
      typeNextCharRef.current();
    }, startDelay);
  }, [startDelay, schedule]);

  useEffect(() => {
    startAnimation();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [sequences, typingSpeed, deleteSpeed, naturalVariance, startAnimation]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <span className="inline-block min-h-[1.2em] min-w-[0.5em]">
        {displayText}
      </span>
    </motion.span>
  );
}

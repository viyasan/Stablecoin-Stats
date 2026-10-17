// Word swap animation adapted from Watermelon UI's landing-01 hero, MIT License.
// https://github.com/WatermelonCorp/watermellon-registry
import { useEffect, useState } from 'react';
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m } from 'motion/react';
import { cn } from '@/lib/utils';

interface RotatingWordsProps {
  words: string[];
  /** How long the first word stays before rotation starts (ms). */
  initialHoldMs?: number;
  /** How long each later word stays (ms). */
  intervalMs?: number;
  /** When false, rotation continues from the second word, so the first word only shows once. */
  loopFirstWord?: boolean;
  className?: string;
}

/** Cycles through words, blurring and sliding each one in and out. */
export function RotatingWords({
  words,
  initialHoldMs = 2800,
  intervalMs = 2800,
  loopFirstWord = true,
  className,
}: RotatingWordsProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length < 2) return;
    const restartAt = loopFirstWord ? 0 : 1;
    const timer = setTimeout(
      () => setIndex((prev) => (prev + 1 >= words.length ? restartAt : prev + 1)),
      index === 0 ? initialHoldMs : intervalMs
    );
    return () => clearTimeout(timer);
  }, [index, words.length, initialHoldMs, intervalMs, loopFirstWord]);

  return (
    // LazyMotion + m keeps motion's bundle cost small (only the DOM animation features load).
    // reducedMotion="user": with prefers-reduced-motion, only the opacity fade remains.
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <span className="relative inline-block">
          <AnimatePresence mode="wait" initial={false}>
            <m.span
              key={words[index]}
              className={cn('inline-block', className)}
              initial={{ y: 12, opacity: 0, filter: 'blur(4px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: -12, opacity: 0, filter: 'blur(4px)', transition: { duration: 0.15, ease: 'easeIn' } }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {words[index]}
            </m.span>
          </AnimatePresence>
        </span>
      </MotionConfig>
    </LazyMotion>
  );
}

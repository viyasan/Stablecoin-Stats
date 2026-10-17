// Adapted from Watermelon UI's Marquee, MIT License.
// https://github.com/WatermelonCorp/watermellon-registry
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MarqueeProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  /** Scroll the other way. */
  reverse?: boolean;
  /** Pause while the pointer is over the marquee. */
  pauseOnHover?: boolean;
  /** Animate vertically instead of horizontally. */
  vertical?: boolean;
  /** How many copies of the content to render (enough to fill the width). */
  repeat?: number;
  speed?: 'slow' | 'normal' | 'fast';
}

/** Continuously scrolling strip. Keyframes live in index.css (--animate-marquee). */
export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 5,
  speed = 'normal',
  ...props
}: MarqueeProps) {
  const speedVariants = {
    slow: '[--duration:120s]',
    normal: '[--duration:40s]',
    fast: '[--duration:10s]',
  };

  return (
    <div
      {...props}
      className={cn(
        'group flex [gap:var(--gap)] overflow-hidden p-1 [--gap:6px]',
        speedVariants[speed],
        { 'flex-row': !vertical, 'flex-col': vertical },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            aria-hidden={i > 0 || undefined}
            className={cn('flex shrink-0 justify-around [gap:var(--gap)]', {
              'animate-marquee flex-row': !vertical,
              'animate-marquee-vertical flex-col': vertical,
              'group-hover:[animation-play-state:paused]': pauseOnHover,
              '[animation-direction:reverse]': reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}

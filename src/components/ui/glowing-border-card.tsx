// Adapted from Watermelon UI's GlowingBorderCard (stats-4), MIT License.
// https://github.com/WatermelonCorp/watermellon-registry
import { useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlowingBorderCardProps {
  children: ReactNode;
  /** Classes for the outer wrapper (the 2px glowing border). */
  className?: string;
  /** Classes for the inner content surface. */
  contentClassName?: string;
  /** Color at the centre of the glow that follows the cursor. */
  glowColor?: string;
  /** Optional decorative background pattern for the content surface. */
  repeatingGradient?: string;
}

/** Card whose border lights up with a radial glow that tracks the cursor. */
export function GlowingBorderCard({
  children,
  className,
  contentClassName,
  glowColor = 'rgba(212, 164, 55, 1)', // gold-500
  repeatingGradient,
}: GlowingBorderCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={cn('relative rounded-2xl bg-border/60 p-[2px]', className)}
    >
      <div
        data-testid="glow"
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 60%)`,
        }}
      />

      <div className={cn('relative z-10 h-full overflow-hidden rounded-[14px] bg-background', contentClassName)}>
        {repeatingGradient && (
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{ background: repeatingGradient }}
          />
        )}
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}

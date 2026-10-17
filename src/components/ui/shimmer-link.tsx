// Adapted from Watermelon UI's ShimmerButton, MIT License.
// https://github.com/WatermelonCorp/watermellon-registry
// Renders a react-router Link instead of a <button> so it can be used for navigation CTAs.
import type { ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ShimmerLinkProps extends LinkProps {
  children: ReactNode;
}

/** Primary CTA link with a light sweep across it on hover. */
export function ShimmerLink({ children, className, ...props }: ShimmerLinkProps) {
  return (
    <Link
      className={cn(
        'group relative inline-flex items-center overflow-hidden rounded-md px-6 py-3 text-sm font-medium',
        'bg-primary text-primary-foreground hover:bg-gold-600',
        'transition-[background-color,box-shadow] duration-300 hover:shadow-lg',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className={cn(
          'absolute inset-0 -translate-x-full',
          'bg-linear-to-r from-transparent via-white/40 to-transparent',
          'transition-transform duration-700 group-hover:translate-x-full motion-reduce:hidden'
        )}
      />
    </Link>
  );
}

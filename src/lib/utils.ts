/** The `cn` helper every shadcn-style component imports from `@/lib/utils`.
 *  clsx resolves conditional class lists; tailwind-merge then drops the losing
 *  half of any conflicting Tailwind pair, so a caller's `p-8` beats a
 *  component's built-in `p-4` instead of the two both landing and the cascade
 *  deciding by source order. */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

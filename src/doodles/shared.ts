import type { CSSProperties } from 'react';

/**
 * Shared doodle vocabulary.
 *
 * Colours default to semantic CSS variables rather than hex, so a doodle placed
 * inside a `.tone-paper` room automatically picks up the AA-safe darkened rose
 * instead of the dark-tone value that fails on light. See design-system.md §3.
 */
export interface DoodleProps {
    /** Any CSS colour. Defaults to the room accent. */
    color?: string;
    animate?: boolean;
    className?: string;
    style?: CSSProperties;
    strokeWidth?: number;
}

export const ACCENT = 'var(--room-accent)';
export const MUTED = 'var(--room-muted)';

/**
 * `drawPath` animates stroke-dashoffset from a hardcoded 1000, so every drawing
 * path must declare pathLength="1000" or short paths over-draw. The original
 * doodle-components.jsx omitted this — it was a bug there and is fixed here.
 */
export const stroke = (
    color: string,
    animate = true,
    strokeWidth = 3
) => ({
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    pathLength: 1000,
    className: animate ? 'draw-doodle' : undefined,
});
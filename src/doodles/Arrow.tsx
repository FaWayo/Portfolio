import type { DoodleProps } from './shared';
import { ACCENT, stroke } from './shared';

type Direction = 'right' | 'left' | 'up' | 'down';

const ROTATION: Record<Direction, string> = {
    right: 'none',
    left: 'scaleX(-1)',
    up: 'rotate(-90deg)',
    down: 'rotate(90deg)',
};

/**
 * Arrow — direction, connection, attention.
 *
 * Rotates about its centre rather than mirroring, so the shaft stays organic.
 */
export function Arrow({
    color = ACCENT,
    direction = 'right',
    width = 90,
    height = 40,
    animate = true,
    className,
    style,
    strokeWidth = 3,
}: DoodleProps & { direction?: Direction; width?: number; height?: number }) {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 120 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={{ transform: ROTATION[direction], ...style }}
            aria-hidden="true"
            focusable="false"
        >
            <path d="M10 25C35 10 75 15 105 28" {...stroke(color, animate, strokeWidth)} />
            <path d="M88 18C96 22 103 26 107 29C102 34 94 40 90 45" {...stroke(color, animate, strokeWidth)} />
        </svg>
    );
}

export default Arrow;
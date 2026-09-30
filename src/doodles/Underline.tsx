import type { CSSProperties } from 'react';
import type { DoodleProps } from './shared';
import { ACCENT, stroke } from './shared';

/**
 * Underline — emphasis.
 *
 * The source path carried two subpaths in one `d`. With a single pathLength the
 * dash pattern would run continuously across the gap and leave a linecap seam
 * mid-draw, so the two strokes are split and staggered instead.
 */
export function Underline({
    color = ACCENT,
    width = 200,
    height = 18,
    animate = true,
    className,
    style,
    strokeWidth = 2.8,
}: DoodleProps & { width?: number; height?: number }) {
    const secondStroke: CSSProperties | undefined = animate ? { animationDelay: '0.35s' } : undefined;

    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 240 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={style}
            aria-hidden="true"
            focusable="false"
        >
            <path d="M5 12C50 4 150 16 235 8" {...stroke(color, animate, strokeWidth)} />
            <path
                d="M15 15C80 8 180 18 220 12"
                {...stroke(color, animate, strokeWidth)}
                style={secondStroke}
            />
        </svg>
    );
}

export default Underline;
import type { CSSProperties } from 'react';
import type { DoodleProps } from './shared';
import { ACCENT, stroke } from './shared';

type Direction = 'down-left' | 'down-right';

/**
 * Small hand-drawn thought bubbles trailing away from the cloud.
 *
 * Closed wobbly paths rather than <circle> — §11 wants lines that read as
 * hand-drawn, not mathematically perfect. Drawn in sequence so the trail
 * appears to trail off.
 */
const TRAILS: Record<Direction, { path: string; delay: number }[]> = {
    'down-left': [
        { path: 'M44 102C51 103 55 107 54 113C53 119 48 122 42 120C36 119 33 114 35 108C37 104 40 102 44 102Z', delay: 0.5 },
        { path: 'M24 126C29 127 31 131 30 135C29 139 25 141 21 139C17 138 15 134 17 130C18 127 21 126 24 126Z', delay: 0.8 },
        { path: 'M11 144C14 145 15 148 14 150C13 153 10 154 8 152C6 151 6 148 8 146C9 145 10 145 11 144Z', delay: 1.05 },
    ],
    'down-right': [
        { path: 'M156 102C163 103 167 107 166 113C165 119 160 122 154 120C148 119 145 114 147 108C149 104 152 102 156 102Z', delay: 0.5 },
        { path: 'M176 126C181 127 183 131 182 135C181 139 177 141 173 139C169 138 167 134 169 130C170 127 173 126 176 126Z', delay: 0.8 },
        { path: 'M189 144C192 145 193 148 192 150C191 153 188 154 186 152C184 151 184 148 186 146C187 145 188 145 189 144Z', delay: 1.05 },
    ],
};

/**
 * Cloud — ideas, thoughts, dreams, things you're wondering about.
 *
 * The recurring motif (brand-direction §12): appears throughout the site as a
 * visual thread, never as a logo or icon. Carries thought bubbles so it reads
 * as something occurring rather than a shape sitting in a margin.
 */
export function Cloud({
    color = ACCENT,
    size = 120,
    direction = 'down-left',
    bubbles = true,
    animate = true,
    className,
    style,
    strokeWidth = 3.5,
}: DoodleProps & { size?: number; direction?: Direction; bubbles?: boolean }) {
    return (
        <svg
            width={size}
            height={size * 0.8}
            viewBox="0 0 200 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`drift-cloud ${className ?? ''}`}
            style={style}
            aria-hidden="true"
            focusable="false"
        >
            <path
                transform="translate(38,-6)"
                d="M30 70C18 70 10 60 12 48C14 36 26 30 38 32C42 20 56 12 70 15C82 8 100 12 108 24C118 18 132 22 138 32C148 34 154 44 150 56C146 68 134 72 122 70C118 80 102 86 88 82C76 88 58 84 48 76C40 78 34 76 30 70Z"
                {...stroke(color, animate, strokeWidth)}
            />
            {bubbles &&
                TRAILS[direction].map(({ path, delay }) => (
                    <path
                        key={path}
                        d={path}
                        {...stroke(color, animate, strokeWidth * 0.75)}
                        style={animate ? ({ animationDelay: `${delay}s` } as CSSProperties) : undefined}
                    />
                ))}
        </svg>
    );
}

export default Cloud;
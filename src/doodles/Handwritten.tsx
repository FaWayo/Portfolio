import type { CSSProperties, ReactNode } from 'react';

interface HandwrittenProps {
    children: ReactNode;
    /** Any CSS colour. Defaults to the room accent. */
    color?: string;
    fontSize?: string;
    rotate?: string;
    className?: string;
    style?: CSSProperties;
}

/**
 * Handwritten — the site's margin notes.
 *
 * Small notes are Fraunces italic. Beth Ellen, the site's one hand, is kept
 * for the few large moments — the hero name and one overlay per room — so it
 * stays special; set at note size everywhere it would become the body font of
 * the margins. Large handwriting uses `font-hand` directly. See
 * design-system.md §5.
 *
 * The 18px floor is enforced by the default below — the italic gets spindly
 * under that on a dark ground. Rotation stays budgeted under 2° (§9).
 */
export function Handwritten({
    children,
    color = 'var(--room-accent)',
    fontSize = '1.125rem',
    rotate = '-1.2deg',
    className,
    style,
}: HandwrittenProps) {
    return (
        <span
            className={`inline-block font-display italic leading-snug ${className ?? ''}`}
            style={{
                color,
                fontSize,
                transform: rotate === '0' ? undefined : `rotate(${rotate})`,
                ...style,
            }}
        >
            {children}
        </span>
    );
}

export default Handwritten;
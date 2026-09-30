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
 * Handwritten — margin notes, annotations, doodle labels, captions.
 *
 * Beth Ellen is the only notebook voice now; the source component listed
 * 'Caveat' as a fallback. Single-weight 400, so weight cannot vary — size,
 * colour and rotation carry the variation instead. See design-system.md §5.
 */
export function Handwritten({
    children,
    color = 'var(--room-accent)',
    fontSize = '1.1rem',
    rotate = '-3deg',
    className,
    style,
}: HandwrittenProps) {
    return (
        <span
            className={`inline-block font-hand leading-snug ${className ?? ''}`}
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
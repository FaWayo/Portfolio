import type { ReactNode } from 'react';

type Position = 'below' | 'above' | 'right';

interface HoverNoteProps {
    children: ReactNode;
    note: string;
    position?: Position;
    className?: string;
}

const POSITION_CLASS: Record<Position, string> = {
    below: 'top-full left-0 mt-2',
    above: 'bottom-full left-0 mb-2',
    right: 'left-full top-1/2 ml-3 -translate-y-1/2',
};

/**
 * A handwritten note that appears when something is hovered or focused.
 *
 * Brand-direction §16. Focus triggers it too, not just hover — a note only
 * reachable with a mouse is a note keyboard users never see.
 */
export function HoverNote({ children, note, position = 'below', className }: HoverNoteProps) {
    return (
        <span className={`group relative inline-block ${className ?? ''}`}>
            {children}
            <span
                aria-hidden="true"
                className={`pointer-events-none absolute z-20 whitespace-nowrap font-display italic text-lg text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 ${POSITION_CLASS[position]}`}
            >
                {note}
            </span>
        </span>
    );
}

export default HoverNote;
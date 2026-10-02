import type { CSSProperties, ReactNode } from 'react';

type StampTone = 'accent' | 'muted' | 'ink';

interface StampProps {
    children: ReactNode;
    tone?: StampTone;
    rotate?: number;
    className?: string;
    style?: CSSProperties;
}

const TONE_CLASS: Record<StampTone, string> = {
    accent: 'text-accent border-accent/45',
    muted: 'text-muted border-rule',
    ink: 'text-ink border-rule',
};

/**
 * A small technical stamp — issue tag, date badge, location.
 * Metadata register: Jost, small, uppercase, warm grey.
 */
export function Stamp({
    children,
    tone = 'muted',
    rotate = -1.5,
    className,
    style,
}: StampProps) {
    return (
        <span
            className={`inline-block border px-2.5 py-1 font-sans text-[0.6rem] uppercase tracking-[0.22em] ${TONE_CLASS[tone]} ${className ?? ''}`}
            style={{ transform: `rotate(${rotate}deg)`, ...style }}
        >
            {children}
        </span>
    );
}

export default Stamp;
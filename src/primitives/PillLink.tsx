import type { ReactNode } from 'react';

interface PillLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
}

/**
 * The site's one button shape (decision-log.md §62): a pill outlined in a
 * hairline, the words in spaced Jost caps, the arrow in a mauve disc. On hover
 * or keyboard focus the room's ink fills it from the foot and the words take
 * the room's surface colour, so it works on noir and on cream alike. Opens in a
 * new tab.
 */
export function PillLink({ href, children, className }: PillLinkProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className={`group relative inline-flex items-center gap-5 overflow-hidden rounded-full border border-ink/30 py-2 pl-7 pr-2 transition-colors duration-500 hover:border-ink focus-visible:border-ink sm:gap-7 sm:pl-9 ${className ?? ''}`}
        >
            <span
                aria-hidden="true"
                className="absolute inset-0 translate-y-full rounded-full bg-ink transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:transition-none"
            />
            <span className="relative font-sans text-[length:clamp(0.75rem,0.55rem+0.35vw,0.95rem)] font-semibold uppercase tracking-[0.28em] text-ink transition-colors duration-500 group-hover:text-surface group-focus-visible:text-surface">
                {children}
            </span>
            <span
                aria-hidden="true"
                className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-cream sm:h-14 sm:w-14"
            >
                <span className="text-xl leading-none transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none sm:text-2xl">
                    ↗
                </span>
            </span>
        </a>
    );
}

export default PillLink;

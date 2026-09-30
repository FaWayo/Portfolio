import type { ReactNode } from 'react';
import Handwritten from '@/doodles/Handwritten';

type Tone = 'dark' | 'paper';

interface RoomProps {
    /** Anchor target. Nav hrefs are `#${id}`. */
    id: string;
    /**
     * Large Instrument Serif title, rendered uppercase. Omit for the hero,
     * which supplies its own display type.
     */
    title?: string;
    /** Handwritten margin note beside the title. */
    note?: string;
    tone?: Tone;
    /**
     * `hero` fills the viewport under the sticky header and drops the room
     * header treatment. Used by ME, which is the first thing after the intro
     * gate — brand-direction §19 wants an immediate introduction.
     */
    variant?: 'default' | 'hero';
    /**
     * Accessible name for the section when there is no visible `title` to
     * point `aria-labelledby` at, as in the hero.
     */
    label?: string;
    className?: string;
    children: ReactNode;
}

/**
 * One of the six rooms.
 *
 * Sets the tone class so a single `tone-paper` flips the whole section through
 * the semantic tokens — see design-system.md §1. Components inside must use
 * bg-surface / text-ink / text-muted / text-accent / border-rule rather than the
 * fixed palette, or they will not follow.
 */
export function Room({
    id,
    title,
    note,
    tone = 'dark',
    variant = 'default',
    label,
    className,
    children,
}: RoomProps) {
    const isHero = variant === 'hero';

    return (
        <section
            id={id}
            tabIndex={-1}
            aria-labelledby={title && !isHero ? `${id}-heading` : undefined}
            aria-label={!title || isHero ? label : undefined}
            className={`tone-${tone} bg-surface text-ink relative focus:outline-none ${
                isHero ? '' : 'scroll-mt-16 md:scroll-mt-20'
            } ${className ?? ''}`}
        >
            {title && !isHero && (
                <header className="mx-auto w-full max-w-6xl px-6 pt-24 pb-10 md:px-12">
                    <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                        <h2 id={`${id}-heading`} className="font-serif text-title leading-none uppercase">
                            {title}
                        </h2>
                        {note && (
                            <Handwritten className="text-lg" rotate="-2deg">
                                {note}
                            </Handwritten>
                        )}
                    </div>
                    <div className="mt-8 h-px w-full bg-rule" />
                </header>
            )}
            {children}
        </section>
    );
}

export default Room;
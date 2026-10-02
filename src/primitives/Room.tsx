import type { ReactNode } from 'react';
import Handwritten from '@/doodles/Handwritten';
import WriteOn from '@/primitives/WriteOn';

type Tone = 'dark' | 'paper';

interface RoomProps {
    /** Anchor target. Nav hrefs are `#${id}`. */
    id: string;
    /**
     * The room's name, set large in Fraunces and written on once. There is
     * deliberately no small label above it — a heading stands on its own. See
     * design-system.md §10.
     *
     * Omit for a room with no title, as the journal room has none. `label` then
     * carries the accessible name so the section is still announced properly.
     */
    title?: string;
    /**
     * Accessible name for the section. Only needed when there is no visible
     * title to point `aria-labelledby` at.
     */
    label?: string;
    /** Handwritten note beside the title. */
    note?: string;
    tone?: Tone;
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
 *
 * Each room is one full-width slide, alternating dark and paper down the page.
 *
 * There is no per-room signature. It used to sit at `top-5 left-6` and scroll to
 * the top, and landed directly underneath the fixed nav in every room. The nav
 * has no `Fatimah` wordmark either — it is on screen at all times, so it already
 * tells you whose site this is. See Nav.tsx.
 */
export function Room({ id, title, label, note, tone = 'dark', className, children }: RoomProps) {
    return (
        <section
            id={id}
            tabIndex={-1}
            aria-labelledby={title ? `${id}-heading` : undefined}
            aria-label={!title ? label : undefined}
            className={`tone-${tone} bg-surface text-ink relative scroll-mt-8 pb-16 focus:outline-none sm:pb-0 ${
                className ?? ''
            }`}
        >
            {title && (
                <header className="mx-auto w-full max-w-6xl px-6 pt-24 pb-10 md:px-12 md:pt-32">
                    <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                        <WriteOn
                            id={`${id}-heading`}
                            duration={1.3}
                            className="font-display text-title leading-[0.95]"
                        >
                            {title}
                        </WriteOn>
                        {note && <Handwritten rotate="-1.2deg">{note}</Handwritten>}
                    </div>
                </header>
            )}

            {children}
        </section>
    );
}

export default Room;

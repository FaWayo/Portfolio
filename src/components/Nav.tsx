import { useEffect, useState } from 'react';

import { ROOMS, ROOM_IDS } from '@/data/rooms';
import Handwritten from '@/doodles/Handwritten';
import useActiveRoom from '@/hooks/useActiveRoom';
import HoverNote from '@/primitives/HoverNote';

interface NavProps {
    /**
     * Wired to the intro gate in Phase 4. Until then the wordmark just returns
     * to the top of the page.
     */
    onWordmarkClick?: () => void;
}

/**
 * Primary navigation. brand-direction §18: ME WORK WRITINGS LIFE STILL BECOMING
 * LET'S TALK, kept simple.
 *
 * Inline on desktop with a handwritten hover note per item. On mobile the six
 * labels do not fit beside the wordmark, so they move into a full-screen list —
 * with the notes always visible, since there is no hover on a touch screen.
 */
export function Nav({ onWordmarkClick }: NavProps) {
    const active = useActiveRoom(ROOM_IDS);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = previous;
        };
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setOpen(false);
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open]);

    /** Native anchor href handles the scroll and the hash; we only move focus,
     *  so keyboard and screen reader users land inside the room they jumped to. */
    const focusTarget = (id: string) => {
        document.getElementById(id)?.focus({ preventScroll: true });
    };

    return (
        <header className="tone-dark sticky top-0 z-40 border-b border-rule bg-surface">
            <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 md:h-20 md:px-12">
                <a
                    href="#top"
                    onClick={(event) => {
                        if (!onWordmarkClick) return;
                        event.preventDefault();
                        setOpen(false);
                        onWordmarkClick();
                    }}
                    className="font-serif text-lg leading-none text-ink transition-opacity hover:opacity-70"
                >
                    Fatimah Wayo
                </a>

                <nav aria-label="Rooms" className="hidden md:block">
                    <ul className="flex items-center gap-7 lg:gap-9">
                        {ROOMS.map((room) => {
                            const isActive = active === room.id;
                            return (
                                <li key={room.id}>
                                    <HoverNote note={room.note}>
                                        <a
                                            href={`#${room.id}`}
                                            onClick={() => focusTarget(room.id)}
                                            aria-current={isActive ? 'true' : undefined}
                                            className={`relative block pb-1 font-sans text-[0.68rem] uppercase tracking-[0.16em] transition-colors duration-300 ${
                                                isActive ? 'text-accent' : 'text-muted hover:text-ink'
                                            }`}
                                        >
                                            {room.label}
                                            <span
                                                aria-hidden="true"
                                                className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-300 ease-out ${
                                                    isActive ? 'scale-x-100' : 'scale-x-0'
                                                }`}
                                            />
                                        </a>
                                    </HoverNote>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    aria-expanded={open}
                    aria-controls="rooms-menu"
                    className="-mr-2 flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
                >
                    <span className="sr-only">{open ? 'Close rooms' : 'Open rooms'}</span>
                    <span aria-hidden="true" className="flex flex-col gap-[5px]">
                        <span
                            className={`block h-px w-6 bg-ink transition-transform duration-300 ${
                                open ? 'translate-y-[6px] rotate-45' : ''
                            }`}
                        />
                        <span
                            className={`block h-px w-6 bg-ink transition-opacity duration-200 ${
                                open ? 'opacity-0' : ''
                            }`}
                        />
                        <span
                            className={`block h-px w-6 bg-ink transition-transform duration-300 ${
                                open ? '-translate-y-[6px] -rotate-45' : ''
                            }`}
                        />
                    </span>
                </button>
            </div>

            {open && (
                <div
                    id="rooms-menu"
                    className="fixed inset-x-0 top-16 bottom-0 z-30 overflow-y-auto bg-surface md:hidden"
                >
                    <ul className="px-6 py-4">
                        {ROOMS.map((room) => (
                            <li key={room.id} className="border-b border-rule">
                                <a
                                    href={`#${room.id}`}
                                    onClick={() => {
                                        setOpen(false);
                                        focusTarget(room.id);
                                    }}
                                    className="flex flex-col gap-1 py-6"
                                >
                                    <span className="flex items-baseline gap-4">
                                        <span className="font-serif text-4xl uppercase leading-none text-ink">
                                            {room.label}
                                        </span>
                                        <Handwritten fontSize="1rem" rotate="-2deg">
                                            {room.note}
                                        </Handwritten>
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
}

export default Nav;
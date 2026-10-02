import { useCallback, useEffect, useRef, useState } from 'react';

import { ROOMS, ROOM_IDS } from '@/data/rooms';
import useActiveRoom from '@/hooks/useActiveRoom';
import useBackdropRoom from '@/hooks/useBackdropRoom';
import NavMark from './NavMark';

const MENU_ID = 'room-menu';

/** Below this the nav hides going down and returns going up. */
const HIDE_AFTER = 120;

/** How long the nav takes to slide away or come back. */
const HIDE_MS = 250;

/**
 * The navigation, which is a line of words and nothing else.
 *
 * No bar, no background, no border, no divider, no dots, no pill outlines. Six
 * short words of Jost capitals in the top right, sharing one hand-drawn
 * underline. See design-system.md §13 and decision-log.md §30.
 *
 * ## Why the nav is sans and the hero is not
 *
 * The nav is the one place on the site that is not a piece of writing. Display
 * serif or script up here would sit above the 270px name as a small echo of it;
 * Jost capitals read as wayfinding instead. The type is furniture, the marks are
 * the hand. See decision-log.md §22 and §26.
 *
 * ## The words rest at 70% and rise to 100%
 *
 * The nav is fixed and has no background, so it sits directly on the room behind
 * it, and those alternate noir and cream. Every word therefore carries an
 * explicit opacity: **70% at rest, 100% on hover, focus and active**, plus the
 * mauve underline. The mark, not the colour, is what identifies the current room.
 *
 * Every word behaves identically: same weight, same opacity steps, same mark in
 * the same place, same 0.4s draw. Hover draws the line on; the current room's
 * line is already there and does not redraw when hovered.
 *
 * A muted grey was used here before, and it was the wrong tool: a fixed grey has
 * to be chosen light enough for noir and dark enough for cream, so it is
 * always a compromise on both. Inheriting the room's own cream or ink at 70%
 * resolves per tone instead, and the `tone-*` class on the nav is what makes that
 * possible. See design-system.md §4.
 *
 * There is no `Fatimah` wordmark. It duplicated the hero name one screen below
 * it, and the one place it was worth having — telling you who the site belongs
 * to when you are deep in a room — the nav is fixed, so it is on screen anyway.
 *
 * ## Why the mark is its own component
 *
 * The library doodles are drawn for rooms, 70–240px wide. A nav word is 13px.
 * See `NavMark.tsx`.
 *
 * ## Why the nav carries a tone class
 *
 * The nav is fixed and has no background, so it takes the tone class of whatever
 * room is behind it, so `--room-ink` and `--room-accent` resolve to the right
 * pair in both tones and the words stay legible. This is the same semantic-token
 * trick `<Room>` uses.
 *
 * "Behind it" is the room under the nav strip, not the room being read. Those
 * are different rooms for most of the page — the rooms after Me are shorter than
 * a viewport, so the 35% reading line sits in a later room than the strip the
 * nav is actually painted on. Deriving tone from the reading line left paper
 * links over a dark room at 1.1:1, so tone follows the backdrop and aria-current
 * follows the reading line. See useBackdropRoom.
 */
export function Nav() {
    const active = useActiveRoom(ROOM_IDS);
    const backdrop = useBackdropRoom(ROOM_IDS);
    const [open, setOpen] = useState(false);

    // Hide on the way down, come back on the way up. Direction is read from two
    // consecutive scroll positions rather than a wheel event, because a wheel
    // fires far more often than the scroll actually moves and would flicker on a
    // trackpad.
    const [hidden, setHidden] = useState(false);

    const triggerRef = useRef<HTMLButtonElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const close = useCallback(() => setOpen(false), []);

    useEffect(() => {
        let lastY = window.scrollY;

        const onScroll = () => {
            const y = window.scrollY;
            const delta = y - lastY;

            // Ignore sub-pixel jitter and rubber-band overscroll at either end.
            if (Math.abs(delta) < 4) return;
            if (y <= 0) {
                setHidden(false);
            } else {
                setHidden(delta > 0 && y > HIDE_AFTER);
            }

            lastY = y;
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Escape closes, Tab is trapped inside the overlay, and focus returns to the
    // trigger so the keyboard never lands somewhere unexplained.
    useEffect(() => {
        if (!open) return;

        const overlay = overlayRef.current;
        const trigger = triggerRef.current;
        const focusable = overlay?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');

        focusable?.[0]?.focus();

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                close();
                return;
            }

            if (event.key !== 'Tab' || !focusable?.length) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', onKeyDown);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = previousOverflow;
            trigger?.focus();
        };
    }, [open, close]);

    // Two different rooms, on purpose. `active` is the room being read and
    // drives aria-current; `backdrop` is the room under the nav strip and drives
    // the tone. See useBackdropRoom for why they cannot be the same value.
    const backdropRoom = ROOMS.find((room) => room.id === backdrop);
    const tone = backdropRoom?.tone ?? 'dark';

    return (
        <>
            {/*
                Fixed, not sticky, and the reason is the hero. A sticky nav
                occupies flow space, so a `min-h-[100svh]` hero beneath it would
                start 76px down the page — the name would centre 76px below the
                real centre of the first screen and the next room would sit
                exactly on the fold. Fixed takes no flow space, so the hero is
                genuinely one screen. See design-system.md §12.

                The container is `px-[6vw]` with no max-width, identical to the
                hero's, so the nav and the name share a left and right edge.

                `data-tone` is the hook the CSS reads for the word opacity and the
                mark draw. Translating out is `translateY(-100%)` rather than a
                height change so nothing reflows when the nav leaves.
            */}
            <nav
                aria-label="Rooms"
                data-tone={tone}
                data-hidden={hidden && !open ? 'true' : undefined}
                className={`tone-${tone} fixed inset-x-0 top-0 z-40 px-[6vw] pt-7 text-ink transition-transform duration-[250ms] ease-out ${
                    hidden && !open ? '-translate-y-full' : ''
                }`}
            >
                {/* Right-aligned. The `Fatimah` wordmark that used to sit here is
                    gone — see the note in the file header. `ml-auto` puts the
                    words on the right and nothing on the left. */}
                <div className="flex w-full items-start justify-end gap-6">
                    {/* Words, desktop. */}
                    <ul className="hidden items-center gap-[2rem] md:flex">
                        {ROOMS.map((room) => (
                            <li key={room.id}>
                                <NavWord room={room} isActive={room.id === active} />
                            </li>
                        ))}
                    </ul>

                    {/* One word, mobile. */}
                    <button
                        ref={triggerRef}
                        type="button"
                        onClick={() => setOpen(true)}
                        aria-haspopup="dialog"
                        aria-expanded={open}
                        aria-controls={MENU_ID}
                        className="font-sans text-sm font-semibold uppercase leading-none tracking-[0.1em] text-ink/70 transition-colors duration-300 hover:text-ink focus-visible:text-ink md:hidden"
                    >
                        menu
                    </button>
                </div>
            </nav>

            {open && (
                <div
                    ref={overlayRef}
                    id={MENU_ID}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Rooms"
                    className="tone-dark fixed inset-0 z-50 flex items-center justify-center bg-noir/92 px-6"
                >
                    <div className="w-full max-w-3xl">
                        <ul className="flex flex-col gap-x-12 gap-y-[clamp(2rem,5vh,2.75rem)] sm:flex-row sm:flex-wrap">
                            {ROOMS.map((room) => (
                                <li key={room.id}>
                                    <NavWord
                                        room={room}
                                        isActive={room.id === active}
                                        onNavigate={close}
                                        size="overlay"
                                    />
                                </li>
                            ))}
                        </ul>

                        <button
                            type="button"
                            onClick={close}
                            className="mt-10 font-sans text-sm font-semibold uppercase tracking-[0.1em] text-ink/70 transition-colors duration-300 hover:text-ink focus-visible:text-ink"
                        >
                            close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

interface NavWordProps {
    room: (typeof ROOMS)[number];
    isActive: boolean;
    onNavigate?: () => void;
    /**
     * `inline` is the 13px nav. `overlay` is the mobile sheet's own scale —
     * the same words at 28px, because an overlay that lists 13px text is a menu
     * you have to squint at.
     */
    size?: 'inline' | 'overlay';
}

/** One word in the nav. Every word is built the same way — see the header. */
function NavWord({ room, isActive, onNavigate, size = 'inline' }: NavWordProps) {
    const isOverlay = size === 'overlay';

    return (
        <a
            href={`#${room.id}`}
            onClick={onNavigate}
            aria-current={isActive ? 'true' : undefined}
            className={`group nav-group relative inline-block uppercase ${
                isOverlay ? 'text-[1.75rem] font-bold tracking-[0.06em]' : 'text-[0.8125rem] font-semibold tracking-[0.1em]'
            }`}
        >
            {/* 70% at rest, 100% on hover, focus and current. Colour comes from
                `text-ink`, which the tone class resolves — see the header note on
                why this is not a fixed grey. */}
            <span
                className={`transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 ${
                    isActive ? 'opacity-100' : 'opacity-70'
                }`}
            >
                {room.label}
            </span>

            <NavMark active={isActive} />
        </a>
    );
}

export default Nav;
import { useCallback, useEffect, useRef, useState } from 'react';

import { ROOMS, ROOM_IDS } from '@/data/rooms';
import useActiveRoom from '@/hooks/useActiveRoom';
import useBackdropRoom from '@/hooks/useBackdropRoom';
import NavMark, { NavCircle } from './NavMark';

const MENU_ID = 'room-menu';

/** Past this many pixels of scroll the nav leaves the hero line and floats. */
const FLOAT_AFTER = 40;

/**
 * The navigation, which is a line of words and nothing else.
 *
 * At the top of the page: no bar, no background, no border — six short words of
 * Jost capitals in the top right, sharing one hand-drawn underline
 * (design-system.md §13, decision-log.md §30). Once you scroll it floats: the
 * same words, plus an "F." home link, in a frosted pill of the room's own
 * surface, always on screen (decision-log.md §39).
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

    // At the very top the nav is the bare line of words over the hero. Once the
    // page moves it floats: always on screen, in a frosted pill — decision-log.md
    // §39. It used to hide on the way down instead, and when it came back it sat
    // as bare words straight over ME's paragraphs.
    const [floating, setFloating] = useState(false);

    const triggerRef = useRef<HTMLButtonElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const close = useCallback(() => setOpen(false), []);

    useEffect(() => {
        const onScroll = () => setFloating(window.scrollY > FLOAT_AFTER);
        onScroll();
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
                mark draw.

                Floating, the words sit in a pill of the room's own surface at
                80% with a blur, so they stay legible over any content and still
                belong to the room. The pill is the same element as the bare line,
                padding and background transition in, so nothing jumps.
            */}
            {/* Desktop: the spine. The words run down the left edge like the
                spine of a magazine, top to bottom, "F." at its head and a
                hairline along it, fixed while the page moves. It has no
                background: it takes the tone of the room behind it. The page's
                6vw margin is always wider than the spine, so nothing sits under
                it. decision-log.md §61. */}
            <nav
                aria-label="Rooms"
                data-tone={tone}
                className={`tone-${tone} fixed inset-y-0 left-0 z-40 hidden w-[clamp(48px,3.6vw,72px)] flex-col items-center border-r border-ink/15 py-8 text-ink transition-colors duration-300 lg:flex`}
            >
                <a href="#opening" aria-label="Back to the top" className="font-hand text-[length:clamp(1.4rem,1.6vw,2rem)] leading-none text-ink">
                    F<span className="text-accent">.</span>
                </a>

                <ul className="mt-auto mb-auto flex flex-col items-center gap-[clamp(1.75rem,4vh,3rem)]">
                    {ROOMS.map((room) => (
                        <li key={room.id}>
                            <NavWord room={room} isActive={room.id === active} size="spine" />
                        </li>
                    ))}
                </ul>

                <span aria-hidden="true" className="font-sans text-[10px] font-semibold tracking-[0.2em] text-ink/50 [writing-mode:vertical-rl]">
                    2026
                </span>
            </nav>

            {/* Phones and tablets: "F." and "menu", top right. */}
            <nav
                aria-label="Rooms"
                data-tone={tone}
                data-floating={floating ? 'true' : undefined}
                className={`tone-${tone} pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-end lg:hidden px-[6vw] text-ink transition-[padding] duration-300 ease-out ${
                    floating ? 'px-[4vw] pt-4' : 'pt-[clamp(1.75rem,2vw,2.75rem)]'
                }`}
            >
                <div
                    className={`pointer-events-auto flex items-center gap-6 rounded-full transition-[background-color,box-shadow,padding] duration-300 ease-out ${
                        floating
                            ? 'bg-surface/80 px-5 py-3 shadow-[0_6px_24px_-8px_rgb(0_0_0/0.35)] ring-1 ring-ink/10 backdrop-blur-md md:px-7'
                            : 'bg-transparent px-0 py-0'
                    }`}
                >
                    {/* Home, only once you have left it. The hero already says
                        who this is; deep in a room, "F." gets you back. */}
                    <a
                        href="#opening"
                        aria-label="Back to the top"
                        tabIndex={floating ? 0 : -1}
                        aria-hidden={!floating}
                        className={`mr-2 font-hand text-2xl leading-none text-ink transition-opacity duration-300 ${
                            floating ? 'opacity-100' : 'pointer-events-none hidden opacity-0'
                        }`}
                    >
                        F<span className="text-accent">.</span>
                    </a>

                    {/* One word, mobile. */}
                    <button
                        ref={triggerRef}
                        type="button"
                        onClick={() => setOpen(true)}
                        aria-haspopup="dialog"
                        aria-expanded={open}
                        aria-controls={MENU_ID}
                        className="font-display text-lg italic leading-none text-ink/80 transition-colors duration-300 hover:text-ink focus-visible:text-ink"
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
                    className="tone-dark fixed inset-0 z-50 flex items-center justify-center bg-noir/[0.97] px-8 backdrop-blur-sm"
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
                            className="mt-12 font-display text-lg italic text-ink/70 transition-colors duration-300 hover:text-ink focus-visible:text-ink"
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
    size?: 'inline' | 'overlay' | 'spine';
}

/** One word in the nav. Every word is built the same way — see the header. */
function NavWord({ room, isActive, onNavigate, size = 'inline' }: NavWordProps) {
    const isOverlay = size === 'overlay';
    const isSpine = size === 'spine';

    return (
        <a
            href={`#${room.id}`}
            onClick={onNavigate}
            aria-current={isActive ? 'true' : undefined}
            className={`group nav-group relative inline-block font-display lowercase italic ${
                isOverlay
                    ? 'text-[2.5rem] leading-tight'
                    : isSpine
                      ? 'whitespace-nowrap py-1 text-[length:clamp(1rem,1.05vw,1.35rem)] leading-none [writing-mode:vertical-rl]'
                      : 'text-[length:clamp(1rem,1.05vw,1.35rem)] leading-none'
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

            {/* Current room: circled in pen. Any other: a pen stroke on hover. */}
            {isActive ? <NavCircle /> : !isSpine && <NavMark active={false} />}
        </a>
    );
}

export default Nav;
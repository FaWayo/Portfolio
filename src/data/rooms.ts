export type Tone = 'dark' | 'paper';

export interface RoomMeta {
    /** Anchor target. Nav hrefs are `#${id}`. */
    id: string;
    /**
     * The name as it is written, not shouted. brand-direction §18.
     *
     * Title case, not uppercase: room headings are Fraunces at display size,
     * where caps shout. The nav uppercases it in CSS.
     */
    label: string;
    /** Handwritten note. brand-direction §18. Fraunces italic, 18px minimum. */
    note: string;
    tone: Tone;
}

/**
 * The five rooms, in order. brand-direction §18.
 *
 * Module-level constants so identity is stable — useActiveRoom takes ROOM_IDS
 * and re-subscribes whenever its argument changes, so an inline `.map()` here
 * would rebuild the scroll listener on every render.
 *
 * `tone` alternates paper / dark down the page so scrolling feels like flipping
 * through slides — see brand-direction §15. The hero is dark, so ME opens on
 * cream, as in its layout reference. See decision-log.md §26.
 *
 * Five rooms since decision-log.md §42: the separate journal room is gone —
 * journal-style notes belong in WRITING and a "Now" section in ME — and LIFE is
 * the photo room. Change a `label` here and it updates the nav, the anchor and
 * the room heading together. LIFE may yet become "Journal" (a visual diary,
 * photos with dates and notes); that is a one-word change here.
 *
 * ## No `tilt`
 *
 * These words used to carry a per-word rotation, all under 2°, so the nav read
 * as written rather than set. It was dropped when the nav moved to sans caps:
 * at 13px with 0.1em tracking a 1° lean is far below the threshold where it
 * reads as intentional, and the caps themselves already carry the character. A
 * hand is in the *marks*, not in the type — see `NavMark.tsx`. Furniture should
 * be quieter than what it points at.
 */
export const ROOMS: readonly RoomMeta[] = [
    { id: 'me', label: 'Me', note: 'the short version', tone: 'paper' },
    { id: 'work', label: 'Work', note: 'so far', tone: 'dark' },
    { id: 'writing', label: 'Writing', note: "things I've been writing about", tone: 'paper' },
    { id: 'life', label: 'Life', note: 'the other parts of me', tone: 'dark' },
    { id: 'talk', label: "Let's talk", note: 'no reason needed', tone: 'paper' },
] as const;

export const ROOM_IDS: readonly string[] = ROOMS.map((r) => r.id);

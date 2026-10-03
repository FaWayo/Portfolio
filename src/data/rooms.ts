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
 * The six rooms, in order. brand-direction §18.
 *
 * Module-level constants so identity is stable — useActiveRoom takes ROOM_IDS
 * and re-subscribes whenever its argument changes, so an inline `.map()` here
 * would rebuild the scroll listener on every render.
 *
 * `tone` alternates paper / dark down the page so scrolling feels like flipping
 * through slides — see brand-direction §15. The hero is dark, so ME opens on
 * cream, as in its layout reference. See decision-log.md §26.
 *
 * The fifth room's `label` is a stand-in. The room is a journal and its name is
 * undecided — change it here and it updates the nav, the anchor and the room
 * heading together. See decision-log §18.
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
    { id: 'work', label: 'Work', note: "things I've actually built", tone: 'dark' },
    { id: 'writings', label: 'Writings', note: "things I've been writing about", tone: 'paper' },
    { id: 'life', label: 'Life', note: 'the other parts of me', tone: 'dark' },
    { id: 'journal', label: 'Journal', note: 'notes, mostly', tone: 'paper' },
    { id: 'talk', label: "Let's talk", note: 'no reason needed', tone: 'dark' },
] as const;

export const ROOM_IDS: readonly string[] = ROOMS.map((r) => r.id);

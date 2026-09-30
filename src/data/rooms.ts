export type Tone = 'dark' | 'paper';

export interface RoomMeta {
    /** Anchor target. Nav hrefs are `#${id}`. */
    id: string;
    /** Primary navigation label, uppercase. brand-direction §18. */
    label: string;
    /** Handwritten hover note. brand-direction §18. */
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
 * `tone` is data-driven because only LIFE is paper. See decision-log §7.
 */
export const ROOMS: readonly RoomMeta[] = [
    { id: 'me', label: 'ME', note: 'where I come from', tone: 'dark' },
    { id: 'work', label: 'WORK', note: "things I've actually built", tone: 'dark' },
    { id: 'writings', label: 'WRITINGS', note: "things I've been writing about", tone: 'dark' },
    { id: 'life', label: 'LIFE', note: 'the other parts of me', tone: 'paper' },
    { id: 'becoming', label: 'STILL BECOMING', note: 'still, obviously.', tone: 'dark' },
    { id: 'talk', label: "LET'S TALK", note: 'no reason needed', tone: 'dark' },
] as const;

export const ROOM_IDS: readonly string[] = ROOMS.map((r) => r.id);
import { useEffect, useState } from 'react';

/** Viewport fraction that counts as "the room you are reading". */
const DETECTION_LINE = 0.35;

/**
 * Tracks which room is currently being read.
 *
 * A scroll listener rather than IntersectionObserver because the detection
 * needs to be a single moving line — "the last room whose top has passed this
 * point" — which is deterministic and has no dead zones between sections the
 * way per-section observers do.
 *
 * Pass a stable array reference (ROOM_IDS), not an inline `.map()`.
 */
export function useActiveRoom(ids: readonly string[]): string | null {
    const [active, setActive] = useState<string | null>(ids[0] ?? null);

    useEffect(() => {
        let frame = 0;

        const compute = () => {
            frame = 0;

            const line = window.scrollY + window.innerHeight * DETECTION_LINE;
            let current: string | null = null;

            for (const id of ids) {
                const el = document.getElementById(id);
                if (!el) continue;
                const top = el.getBoundingClientRect().top + window.scrollY;
                if (top <= line) current = id;
            }

            // The final room may be too short to cross the detection line.
            const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;
            if (atBottom) current = ids[ids.length - 1] ?? current;

            setActive((prev) => (prev === current ? prev : current));
        };

        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(compute);
        };

        compute();
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);

        return () => {
            if (frame) cancelAnimationFrame(frame);
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
        };
    }, [ids]);

    return active;
}

export default useActiveRoom;
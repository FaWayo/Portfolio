import { useEffect, useState, type RefObject } from 'react';

import type { Tone } from '@/data/rooms';

/**
 * The tone of the room behind each of several fixed elements, one per element.
 *
 * `useBackdropRoom` answers for a single strip at the top of the viewport, which
 * is right for the phone nav. The desktop spine runs the full height of the
 * screen, so while a room boundary scrolls past it, the words above and below
 * the boundary sit on different colours. With one tone for the whole spine, the
 * words past the boundary took the wrong one and vanished (cream on cream, or
 * ink on noir) until the boundary reached the top; only the circle stayed
 * visible. Each element here takes the tone of the room at its own centre.
 *
 * Above the first room the hero owns the screen, which is dark.
 *
 * Pass stable references: `rooms` as a module constant, `refs` from useRef.
 */
export function useBackdropTones(
    rooms: readonly { id: string; tone: Tone }[],
    refs: RefObject<(HTMLElement | null)[]>,
): Tone[] {
    const [tones, setTones] = useState<Tone[]>([]);

    useEffect(() => {
        let frame = 0;

        const compute = () => {
            frame = 0;

            const bounds = rooms.map((room) => ({
                tone: room.tone,
                top: document.getElementById(room.id)?.getBoundingClientRect().top ?? Infinity,
            }));

            const next = (refs.current ?? []).map((el) => {
                if (!el) return 'dark' as Tone;
                const rect = el.getBoundingClientRect();
                const y = rect.top + rect.height / 2;
                let tone: Tone = 'dark';
                for (const room of bounds) if (room.top <= y) tone = room.tone;
                return tone;
            });

            setTones((prev) => (prev.length === next.length && prev.every((t, i) => t === next[i]) ? prev : next));
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
    }, [rooms, refs]);

    return tones;
}

export default useBackdropTones;

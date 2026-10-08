import { useEffect, useState } from 'react';

/**
 * Tracks which room sits *behind the top strip of the viewport*.
 *
 * This is a different question from `useActiveRoom`. That hook answers "what am
 * I reading" and puts its detection line 35% down the viewport, which is right
 * for deciding which link is `aria-current`. This one answers "what colour is
 * behind the nav", and the nav is `fixed top-0`, so the backdrop is whatever
 * room occupies the strip around 40px below the viewport top.
 *
 * They disagree for most of this page, because the rooms after Me are 440px
 * tall in a 1080px viewport — shorter than the distance between the two lines.
 * Driving the tone off the reading line painted `tone-paper` links over a dark
 * room for hundreds of pixels at a time, which measured at 1.1:1: the nav was
 * effectively invisible. Tone has to come from the backdrop, not the reading
 * line, or the barless nav loses its background and takes the text with it.
 *
 * Pass a stable array reference (ROOM_IDS), not an inline `.map()`.
 */
export function useBackdropRoom(ids: readonly string[]): string | null {
    const [backdrop, setBackdrop] = useState<string | null>(null);

    useEffect(() => {
        let frame = 0;

        const compute = () => {
            frame = 0;

            // pt-7 is 28px, so the words occupy roughly 28-80px.
            const line = window.scrollY + 40;
            let current: string | null = null;

            for (const id of ids) {
                const el = document.getElementById(id);
                if (!el) continue;
                const top = el.getBoundingClientRect().top + window.scrollY;
                if (top <= line) current = id;
            }

            // Above the first room the hero owns the strip, which is dark. There
            // is no room id for it, so null is the answer and Nav falls back to
            // the dark tone.
            setBackdrop((prev) => (prev === current ? prev : current));
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

    return backdrop;
}

export default useBackdropRoom;
import { useEffect, useState } from 'react';

interface TypewriterProps {
    text: string;
    /** Milliseconds before the first character. */
    delay?: number;
    /** Average milliseconds per character. Each step is jittered around it. */
    speed?: number;
}

/**
 * Text typed out once, a character at a time, with a caret.
 *
 * Three rules, the same ones `WriteOn` keeps:
 *
 * 1. **Readable without it.** The full text is rendered for assistive
 *    technology from the first frame (`sr-only`); the typed copy is
 *    `aria-hidden`. Under `prefers-reduced-motion` the text is simply there.
 * 2. **Nothing moves while it types.** Every character is laid out from the
 *    start and the untyped ones are transparent, so a right-aligned line does
 *    not slide left as it grows. The caret has no width for the same reason.
 * 3. **Once.** It types, the caret blinks three times and goes. No loop, no
 *    replay — design-system.md §8.
 *
 * The rhythm is uneven on purpose — a deterministic jitter per character and a
 * longer beat after a space — because perfectly even keystrokes read as a
 * progress bar, not as someone typing.
 */
export function Typewriter({ text, delay = 0, speed = 70 }: TypewriterProps) {
    const [count, setCount] = useState(0);
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setReduced(true);
            return;
        }

        let timer = 0;
        let i = 0;

        const step = () => {
            i += 1;
            setCount(i);
            if (i >= text.length) return;
            const jitter = ((i * 37) % 11) / 10 - 0.5; // −0.5 … +0.5, stable per index
            const pause = text[i - 1] === ' ' ? speed * 1.8 : 0;
            timer = window.setTimeout(step, speed * (1 + jitter * 0.8) + pause);
        };

        timer = window.setTimeout(step, delay);
        return () => window.clearTimeout(timer);
    }, [text, delay, speed]);

    const shown = reduced ? text.length : count;
    const done = shown >= text.length;

    return (
        <>
            <span className="sr-only">{text}</span>
            <span aria-hidden="true">
                {text.slice(0, shown)}
                <span className={`typewriter-caret ${done ? 'is-done' : ''} ${reduced ? 'hidden' : ''}`} />
                <span className="text-transparent">{text.slice(shown)}</span>
            </span>
        </>
    );
}

export default Typewriter;

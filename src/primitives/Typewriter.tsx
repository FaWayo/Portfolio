import { useEffect, useRef, useState } from 'react';

interface TypewriterProps {
    text: string;
    /** Milliseconds before the first character, on the first view. */
    delay?: number;
    /** Milliseconds before the first character on every later view. Defaults to `delay`. */
    returnDelay?: number;
    /** Average milliseconds per character. Each step is jittered around it. */
    speed?: number;
    /** Retype from scratch every time it comes back into view. */
    replay?: boolean;
}

/**
 * Text typed out a character at a time, with a caret, whenever it is on screen.
 *
 * 1. **Readable without it.** The full text is rendered for assistive
 *    technology from the first frame (`sr-only`); the typed copy is
 *    `aria-hidden`. Under `prefers-reduced-motion` the text is simply there.
 * 2. **Nothing moves while it types.** Every character is laid out from the
 *    start and the untyped ones are transparent, so a right-aligned line does
 *    not slide left as it grows. The caret has no width for the same reason.
 * 3. **On every visit.** It types when it comes into view, and with `replay`
 *    (the default) it resets when it leaves, so coming back types it again —
 *    decision-log.md §38, which relaxes design-system.md §8's "once" for the
 *    two lines that use it. The caret blinks three times after each pass and
 *    goes.
 *
 * The rhythm is uneven on purpose — a deterministic jitter per character and a
 * longer beat after a space — because perfectly even keystrokes read as a
 * progress bar, not as someone typing.
 */
export function Typewriter({ text, delay = 0, returnDelay, speed = 70, replay = true }: TypewriterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const [count, setCount] = useState(0);
    const [run, setRun] = useState(0);
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setReduced(true);
            return;
        }

        let timer = 0;
        let runs = 0;

        const stop = () => {
            window.clearTimeout(timer);
            timer = 0;
        };

        const start = () => {
            stop();
            let i = 0;
            setCount(0);
            setRun((r) => r + 1);

            const step = () => {
                i += 1;
                setCount(i);
                if (i >= text.length) return;
                const jitter = ((i * 37) % 11) / 10 - 0.5; // −0.5 … +0.5, stable per index
                const pause = text[i - 1] === ' ' ? speed * 1.8 : 0;
                timer = window.setTimeout(step, speed * (1 + jitter * 0.8) + pause);
            };

            timer = window.setTimeout(step, runs === 0 ? delay : (returnDelay ?? delay));
            runs += 1;
        };

        const el = ref.current;
        if (!el || typeof IntersectionObserver === 'undefined') {
            start();
            return stop;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (runs === 0 || replay) start();
                    if (!replay) observer.disconnect();
                } else if (replay && runs > 0) {
                    // Reset while out of sight, so the next visit types from scratch.
                    stop();
                    setCount(0);
                }
            },
            { threshold: 0.6 },
        );
        observer.observe(el);

        return () => {
            stop();
            observer.disconnect();
        };
    }, [text, delay, returnDelay, speed, replay]);

    const shown = reduced ? text.length : count;
    const done = shown >= text.length;

    return (
        <span ref={ref}>
            <span className="sr-only">{text}</span>
            {/* `select-none`: copying should pick up the sr-only text once, not
                both copies ("so farso far"). */}
            <span aria-hidden="true" className="select-none">
                {text.slice(0, shown)}
                <span key={run} className={`typewriter-caret ${done ? 'is-done' : ''} ${reduced ? 'hidden' : ''}`} />
                <span className="text-transparent">{text.slice(shown)}</span>
            </span>
        </span>
    );
}

export default Typewriter;

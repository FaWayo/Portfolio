import { useLayoutEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

interface WriteOnProps {
    children: ReactNode;
    as?: ElementType;
    className?: string;
    /** Set when a parent points `aria-labelledby` at this heading. */
    id?: string;
    /** Seconds. Titles take longer than body copy. */
    duration?: number;
}

/**
 * A title being written by hand, once.
 *
 * design-system.md §8: titles and the greeting draw themselves in on first
 * appearance and then stay still. Nothing loops and nothing replays — this
 * component deliberately has no `once=false` escape hatch, because a second
 * playthrough is the failure mode the rule exists to prevent.
 *
 * Three guarantees, mirroring `Reveal`:
 *
 * 1. **Visible is the default.** The clipped state is opt-in (`.is-waiting`) and
 *    the finished state is the unstyled default, so if this component never runs
 *    — no JS, no observer, a thrown error — the title is simply readable. The
 *    animation is allowed to fail; the text is not. The first version inverted
 *    this and the hero heading rendered permanently invisible, because
 *    `clip-path` on the observed element collapses its own intersection rect, so
 *    an IntersectionObserver `threshold` could never be reached.
 * 2. **Above-the-fold titles never touch an observer.** They're measured in a
 *    layout effect before paint, so there is no clipped flash on the hero.
 * 3. **clip-path clips paint, not content**, so assistive technology reads the
 *    full title at every point of the animation.
 */
export function WriteOn({
    children,
    as: Tag = 'h2',
    className,
    id,
    duration = 1.2,
}: WriteOnProps) {
    const ref = useRef<HTMLElement>(null);
    const [state, setState] = useState<'idle' | 'waiting' | 'written'>('idle');

    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (typeof IntersectionObserver === 'undefined') {
            setState('written');
            return;
        }

        // Already on screen: write it now, no observer.
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            setState('written');
            return;
        }

        // Below the fold: hold it clipped until it arrives.
        setState('waiting');
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    setState('written');
                    observer.disconnect();
                }
            },
            // No `threshold` ratio. The element carries a clip-path, so a ratio
            // would be measured against a collapsed rect. A 0 threshold plus a
            // generous bottom margin is what "has arrived" actually means here.
            { threshold: 0, rootMargin: '0px 0px -12% 0px' }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <Tag
            ref={ref}
            id={id}
            className={`write-on ${state === 'idle' ? '' : `is-${state}`} ${className ?? ''}`}
            style={{ transitionDuration: `${duration}s` }}
        >
            {children}
        </Tag>
    );
}

export default WriteOn;

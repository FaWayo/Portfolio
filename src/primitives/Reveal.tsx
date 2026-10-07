import { useLayoutEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react';

interface RevealProps {
    children?: ReactNode;
    /** Stagger in milliseconds. */
    delay?: number;
    as?: ElementType;
    className?: string;
    style?: CSSProperties;
    /** Stop observing after the first reveal. Default true. */
    once?: boolean;
    /**
     * Play again on every return: hide once it is *fully* off screen (so it
     * never vanishes while partly visible), show when it comes back. Repeat
     * plays carry `is-replay`, which the CSS uses to run faster. Implies
     * `once={false}`. decision-log.md §50.
     */
    replay?: boolean;
}

/**
 * Reveals content when it scrolls into view.
 *
 * Brand-direction §16 wants handwritten comments to "enter after the main
 * content", and §17 says motion must never delay access to content. Three
 * guarantees follow from that:
 *
 * 1. Anything already on screen at mount is shown in a layout effect, before
 *    paint, so there is no opacity flash on above-the-fold content.
 * 2. Without IntersectionObserver everything is simply shown.
 * 3. Under prefers-reduced-motion the CSS shows everything regardless.
 */
export function Reveal({
    children,
    delay = 0,
    as: Tag = 'div',
    className,
    style,
    once = true,
    replay = false,
}: RevealProps) {
    const ref = useRef<HTMLElement>(null);
    const [shown, setShown] = useState(false);
    const [replayed, setReplayed] = useState(false);

    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (typeof IntersectionObserver === 'undefined') {
            setShown(true);
            return;
        }

        const rect = el.getBoundingClientRect();
        const onScreen = rect.top < window.innerHeight && rect.bottom > 0;
        if (onScreen) {
            setShown(true);
            if (!replay) return;
        }

        let plays = onScreen ? 1 : 0;
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
                        if (plays > 0) setReplayed(true);
                        plays += 1;
                        setShown(true);
                        if (once && !replay) observer.disconnect();
                    } else if (replay && !entry.isIntersecting) {
                        // Fully out of view: reset, ready to play again.
                        setShown(false);
                    }
                }
            },
            { threshold: [0, 0.15], rootMargin: '0px 0px -8% 0px' }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [once, replay]);

    return (
        <Tag
            ref={ref}
            className={`reveal ${shown ? 'is-visible' : ''} ${replayed ? 'is-replay' : ''} ${className ?? ''}`}
            style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
        >
            {children}
        </Tag>
    );
}

export default Reveal;
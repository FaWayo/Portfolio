import { useLayoutEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

interface RevealProps {
    children: ReactNode;
    /** Stagger in milliseconds. */
    delay?: number;
    as?: ElementType;
    className?: string;
    /** Stop observing after the first reveal. Default true. */
    once?: boolean;
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
    once = true,
}: RevealProps) {
    const ref = useRef<HTMLElement>(null);
    const [shown, setShown] = useState(false);

    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (typeof IntersectionObserver === 'undefined') {
            setShown(true);
            return;
        }

        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            setShown(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    setShown(true);
                    if (once) observer.disconnect();
                }
            },
            { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [once]);

    return (
        <Tag
            ref={ref}
            className={`reveal ${shown ? 'is-visible' : ''} ${className ?? ''}`}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
        >
            {children}
        </Tag>
    );
}

export default Reveal;
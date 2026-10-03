import { useEffect, useRef } from 'react';

import MusicNote from '@/doodles/MusicNote';
import TinyStar from '@/doodles/TinyStar';
import Reveal from '@/primitives/Reveal';
import Typewriter from '@/primitives/Typewriter';
import WriteOn from '@/primitives/WriteOn';

/** The small label under the name. One phrase — change it here. */
const HERO_TAG = 'software engineer';

interface OpeningProps {
    /**
     * A cut-out portrait — a PNG with a transparent background — so the figure
     * stands in front of the name. Until there is one, a silhouette at the same
     * size and position stands in, so nothing shifts when it arrives.
     */
    photo?: { src: string; alt: string };
}

/**
 * The first screen. decision-log.md §29.
 *
 * The name written by hand, very large, across the upper middle; a cut-out
 * portrait rising from the bottom edge until its head meets the underside of
 * the signature; a small tag in Jost caps under the name's right end, typed
 * out once the name has written itself on;
 * the faith line bottom left; one star.
 *
 * ## Layers, back to front
 *
 *   1  the name   Beth Ellen, cream, mauve full stop, ~80vw. The page's `h1`.
 *   2  portrait   bottom-anchored, centred, the head meeting the name.
 *   3  tag, faith line, star — above the portrait so nothing is covered.
 *
 * Everything is absolutely placed inside a one-screen section, because the
 * layers overlap by design.
 */
export function Opening({ photo }: OpeningProps) {
    // Marks the hero `data-offscreen` while it is scrolled away, so the playing
    // note pauses instead of keeping time for nobody.
    const ref = useRef<HTMLElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el || typeof IntersectionObserver === 'undefined') return;
        const observer = new IntersectionObserver(([entry]) => {
            el.toggleAttribute('data-offscreen', !entry.isIntersecting);
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={ref}
            id="opening"
            tabIndex={-1}
            aria-label="Introduction"
            className="hero tone-dark relative min-h-[100svh] w-full overflow-hidden bg-surface text-ink focus:outline-none"
        >
            {/* 1 + 3 — the name, and the tag hung under its right end. One
                block, so the tag follows the name at every width. The block is
                below the portrait; the tag lifts itself above it. */}
            <div className="absolute inset-x-0 top-[var(--hero-top)] flex flex-col items-center">
                <WriteOn
                    as="h1"
                    duration={1.6}
                    className="hero-name -ml-[0.04em] font-hand text-ink"
                >
                    Fatimah<span className="text-accent">.</span>
                </WriteOn>
                <div className="relative z-20 mt-3 w-[calc(var(--text-hero-name)*5.112)] max-w-full text-right">
                    <p className="font-sans text-[length:clamp(11px,1.05vw,24px)] font-semibold uppercase tracking-[0.24em] text-muted">
                        <Typewriter text={HERO_TAG} delay={1500} returnDelay={300} speed={75} />
                    </p>
                </div>
            </div>

            {/* 2 — the portrait. Width follows height at 4:5, and the height is
                derived from the name's position (`.hero-portrait`) so the head
                meets the name without covering it. On a phone the box can be
                wider than the screen; the section's `overflow-hidden` crops the
                shoulders, never the page.

                This is the portrait's *starting* slot: TravellingPortrait.tsx
                lifts the same image out of here and carries it into ME as you
                scroll. The `<img>` below is the static fallback. */}
            <div data-portrait-from className="hero-portrait pointer-events-none absolute bottom-0 left-1/2 z-10 aspect-[4/5] -translate-x-1/2">
                {photo ? (
                    <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="eager"
                        decoding="async"
                        className="portrait-fade h-full w-full object-contain object-bottom"
                    />
                ) : (
                    <PortraitPlaceholder />
                )}
            </div>

            {/* 3 — the star, off the name's top right. */}
            <TinyStar size={34} className="absolute right-[4vw] top-[calc(var(--hero-top)-8px)] z-20 h-auto w-[clamp(26px,2.2vw,56px)] rotate-12 md:right-[8vw]" />

            {/* 3 — the faith line, bottom left, with a hand-drawn ♪ after it:
                the line is a lyric, and the note says so. It sits at the end of
                the last line, lifted and tilted, and draws on once the text has
                faded in. Negative vertical margins keep it from pushing the line
                apart; `nowrap` keeps it with "love." so it never wraps alone. */}
            <Reveal className="absolute bottom-0 left-0 z-20 px-[6vw] pb-[max(6vh,36px)]">
                <p className="max-w-[14em] font-display text-[length:clamp(15px,1.15vw,28px)] italic leading-snug text-muted">
                    Grounded firm and deep in the Saviour&rsquo;s{' '}
                    <span className="whitespace-nowrap">
                        love.
                        <MusicNote
                            size={20}
                            delay={700}
                            playing
                            className="-my-5 ml-[0.4em] inline-block h-auto w-[1.05em] translate-y-[0.2em] rotate-[10deg] align-middle"
                        />
                    </span>
                </p>
            </Reveal>
        </section>
    );
}

/**
 * A head-and-shoulders silhouette at the cut-out's exact box, so the overlap
 * with the word can be judged before a photograph exists.
 */
function PortraitPlaceholder() {
    return (
        <div aria-hidden="true" className="relative h-full w-full">
            <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMax meet" className="h-full w-full">
                <path
                    d="M200 70c-52 0-86 40-86 96 0 44 20 80 50 98v26c-70 14-128 50-150 110L0 500h400l-14-100c-22-60-80-96-150-110v-26c30-18 50-54 50-98 0-56-34-96-86-96Z"
                    className="fill-cocoa"
                />
            </svg>
            <span className="absolute inset-x-0 top-[45%] text-center font-display text-lg italic text-muted">
                cut-out portrait goes here
            </span>
        </div>
    );
}

export default Opening;

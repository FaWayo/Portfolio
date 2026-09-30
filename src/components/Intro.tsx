import { useEffect, useRef } from 'react';

import Cloud from '@/doodles/Cloud';
import Handwritten from '@/doodles/Handwritten';
import Reveal from '@/primitives/Reveal';

interface IntroProps {
    onEnter: () => void;
    /** True once entered — the gate fades rather than unmounts. */
    leaving: boolean;
}

/**
 * The intro gate. brand-direction §19 and PLAN Phase 4.
 *
 * Deliberately thin: §19's copy lives in the ME hero directly behind this, so
 * repeating it here would be the same paragraph twice within one scroll. What
 * this screen has instead is the threshold itself — the name, `Still becoming.`,
 * a handwritten note, one cloud, and the way in.
 *
 * Copy is verbatim from the brand direction. `Still becoming.` is set in
 * Instrument Serif per §9.
 */
export function Intro({ onEnter, leaving }: IntroProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Take focus on mount so the gate is operable from the keyboard immediately
    // — a portfolio must not require a click to reach its own navigation.
    useEffect(() => {
        if (!leaving) buttonRef.current?.focus();
    }, [leaving]);

    return (
        <div
            className={`tone-dark fixed inset-0 z-50 flex bg-surface transition-opacity duration-700 ${
                leaving ? 'pointer-events-none opacity-0' : 'opacity-100'
            }`}
        >
            {/* Not a landmark: this is a gate, and the page behind already has one. */}
            <div
                aria-hidden={leaving ? 'true' : undefined}
                className="mx-auto flex w-full max-w-6xl flex-col justify-center px-6 py-16 md:px-12"
            >
                <Reveal as="p" className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-muted">
                    Fatimah Wayo
                </Reveal>

                <h1 className="mt-6 font-serif text-display leading-[0.95] tracking-[-0.01em] text-ink">
                    Hi, I&rsquo;m Fatimah.
                </h1>

                <Reveal delay={140} className="mt-6">
                    <p className="font-serif text-2xl leading-tight text-ink md:text-3xl">
                        Still becoming.
                    </p>
                </Reveal>

                {/* §19: a handwritten note nearby, with a small cloud. */}
                <Reveal delay={280} className="mt-10 flex items-center gap-4">
                    <Handwritten fontSize="1.35rem" rotate="-3deg" className="text-accent">
                        you&rsquo;re here.
                    </Handwritten>
                    <Cloud size={92} direction="down-left" />
                </Reveal>

                <Reveal delay={420} className="mt-14 md:mt-20">
                    <button
                        ref={buttonRef}
                        type="button"
                        onClick={onEnter}
                        className="font-sans text-sm uppercase tracking-[0.3em] text-ink transition-colors duration-300 hover:text-accent"
                    >
                        [ enter ]
                    </button>
                </Reveal>
            </div>
        </div>
    );
}

export default Intro;

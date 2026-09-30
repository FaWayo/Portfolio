import { useEffect, useRef } from 'react';

import Opening from '@/components/Opening';
import Reveal from '@/primitives/Reveal';

interface IntroProps {
    onEnter: () => void;
    /** True once entered — the gate fades rather than unmounts. */
    leaving: boolean;
}

/**
 * The intro gate. brand-direction §19 and PLAN Phase 4.
 *
 * The screen itself is `Opening`, the same component the top of the page uses,
 * so clicking enter reveals a page that begins with exactly what was just
 * dismissed rather than a second, similar-looking layout.
 *
 * `[ enter ]` is a real button and takes focus on mount — a portfolio must not
 * require a click to reach its own content.
 */
export function Intro({ onEnter, leaving }: IntroProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!leaving) buttonRef.current?.focus();
    }, [leaving]);

    return (
        <div
            className={`tone-dark fixed inset-0 z-50 flex overflow-y-auto bg-surface transition-opacity duration-700 ${
                leaving ? 'pointer-events-none opacity-0' : 'opacity-100'
            }`}
        >
            {/* Not a landmark: this is a gate, and the page behind already has one. */}
            <div
                aria-hidden={leaving ? 'true' : undefined}
                className="flex w-full flex-col"
            >
                <Opening
                    action={
                        <button
                            ref={buttonRef}
                            type="button"
                            onClick={onEnter}
                            className="font-sans text-sm uppercase tracking-[0.3em] text-ink transition-colors duration-300 hover:text-accent"
                        >
                            [ enter ]
                        </button>
                    }
                />

                {/* Hints that the page continues, so enter does not read as a dead end. */}
                <Reveal delay={620} className="mx-auto w-full max-w-6xl px-6 pb-10 md:px-12">
                    <p className="font-hand text-lg text-muted rotate-[-2deg]">
                        six rooms below this one
                    </p>
                </Reveal>
            </div>
        </div>
    );
}

export default Intro;

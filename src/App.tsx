import { useCallback, useEffect, useState } from 'react';

import Intro from '@/components/Intro';
import Nav from '@/components/Nav';
import { ROOMS } from '@/data/rooms';
import Room from '@/primitives/Room';
import Hero from '@/rooms/Hero';

/** How long the gate takes to fade. Matches the CSS transition. */
const LEAVE_MS = 700;

/**
 * Phase 4 — intro gate in place. The rooms are still placeholders; ME carries
 * §19 and the rest fill in from Phase 6.
 *
 * The gate replays on every fresh load by design (PLAN Phase 4), so there is
 * deliberately no sessionStorage or localStorage here.
 */
export default function App() {
    const [entered, setEntered] = useState(false);
    const [leaving, setLeaving] = useState(false);

    const enter = useCallback(() => {
        if (entered || leaving) return;
        setLeaving(true);
        window.setTimeout(() => {
            setEntered(true);
            setLeaving(false);
        }, LEAVE_MS);
    }, [entered, leaving]);

    /** Nav wordmark — returns to the gate. */
    const backToIntro = useCallback(() => {
        setLeaving(false);
        setEntered(false);
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    // Lock scrolling behind the gate so the page behind cannot be moved by
    // wheel or scrollbar while it is still covered.
    useEffect(() => {
        if (entered) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = previous;
        };
    }, [entered]);

    return (
        <>
            {!entered && <Intro onEnter={enter} leaving={leaving} />}

            {/*
             * `inert` while the gate is up: the site behind must not be
             * tabbable or reachable by a screen reader before it has been
             * entered. Fading it with opacity alone would leave it fully
             * operable underneath the overlay.
             */}
            <div inert={!entered ? true : undefined}>
                <a
                    href="#rooms"
                    className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-surface focus:px-4 focus:py-2 focus:font-sans focus:text-sm focus:text-ink"
                >
                    Skip to content
                </a>

                <div id="top" />

                <Nav onWordmarkClick={backToIntro} />

                <main id="rooms">
                    <Room id="me" variant="hero" label="Me">
                        <Hero />
                    </Room>

                    {ROOMS.slice(1).map((room) => (
                        <Room key={room.id} id={room.id} title={room.label} note={room.note} tone={room.tone}>
                            <div className="mx-auto flex min-h-[60vh] w-full max-w-6xl flex-col justify-end px-6 pb-24 md:px-12">
                                <p className="font-hand text-lg text-accent rotate-[-2deg] inline-block">
                                    built in Phase {ROOMS.indexOf(room) + 5}
                                </p>
                            </div>
                        </Room>
                    ))}
                </main>
            </div>
        </>
    );
}

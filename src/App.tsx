import { useCallback, useEffect, useState } from 'react';

import Arrow from '@/doodles/Arrow';
import { MUTED } from '@/doodles/shared';
import Intro from '@/components/Intro';
import Opening from '@/components/Opening';
import RoomIndex from '@/components/RoomIndex';
import { ROOMS } from '@/data/rooms';
import Reveal from '@/primitives/Reveal';
import Room from '@/primitives/Room';
import Me from '@/rooms/Me';

/** How long the gate takes to fade. Matches the CSS transition. */
const LEAVE_MS = 700;

/**
 * Intro gate + the whole site as one continuous scroll.
 *
 * The gate and the top of the page share the `Opening` component, so entering
 * reveals the screen that was just dismissed rather than a second layout that
 * resembles it. There is no sticky nav bar — navigation is the room index
 * directly under the opening screen.
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

    /** The wordmark / "back to start" — returns to the gate. */
    const backToIntro = useCallback(() => {
        setLeaving(false);
        setEntered(false);
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    // Lock scrolling behind the gate so the page cannot be moved underneath it.
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
             * `inert` while the gate is up: the site behind must not be tabbable
             * or reachable by a screen reader before it has been entered.
             */}
            <div inert={!entered ? true : undefined}>
                <a
                    href="#rooms"
                    className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-surface focus:px-4 focus:py-2 focus:font-sans focus:text-sm focus:text-ink"
                >
                    Skip to content
                </a>

                <div id="top" />

                <main id="rooms">
                    <Room id="me" variant="hero" label="Me">
                        <Opening
                            note="hello →"
                            action={
                                <span className="flex items-center gap-3 font-sans text-[0.65rem] uppercase tracking-[0.3em] text-muted">
                                    Scroll
                                    <Arrow direction="down" width={40} height={40} color={MUTED} />
                                </span>
                            }
                        />

                        <RoomIndex onWordmarkClick={backToIntro} />

                        <Me />
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

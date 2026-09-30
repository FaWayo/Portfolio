import { ROOMS } from '@/data/rooms';
import Nav from '@/components/Nav';
import Hero from '@/rooms/Hero';
import Room from '@/primitives/Room';

/**
 * Phase 3 shell. Temporary — the intro gate lands in Phase 4 and the rooms fill
 * in from Phase 5. Its job is to make the navigation and scroll behaviour
 * reviewable before every room has content in it.
 */
export default function App() {
    return (
        <>
            <a
                href="#rooms"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-surface focus:px-4 focus:py-2 focus:font-sans focus:text-sm focus:text-ink"
            >
                Skip to content
            </a>

            <div id="top" />

            <Nav />

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
        </>
    );
}
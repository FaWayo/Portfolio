import Nav from '@/components/Nav';
import Opening from '@/components/Opening';
import TravellingPortrait from '@/components/TravellingPortrait';
import { ROOMS } from '@/data/rooms';
import { HERO_PHOTO } from '@/data/me';
import Handwritten from '@/doodles/Handwritten';
import Me from '@/rooms/Me';
import Room from '@/primitives/Room';

/**
 * The whole site as one continuous scroll.
 *
 * The nav is a fixed line of words at the top — no bar, no background. The page
 * opens on the name, and the six rooms follow as full-width slides alternating
 * dark and paper.
 */
export default function App() {
    // The hero's static portrait. If HERO_PHOTO.src is ever unset the hero draws
    // a silhouette at the same size, so nothing shifts. TravellingPortrait
    // carries this same image into ME on scroll (decision-log.md §32).
    const openingPhoto = HERO_PHOTO.src ? { src: HERO_PHOTO.src, alt: HERO_PHOTO.alt } : undefined;

    return (
        // `overflow-x: clip` — not `hidden` — so nothing can widen the page
        // sideways without creating a scroll container. The travelling portrait
        // starts scaled wider than a phone screen, and outside any room it would
        // otherwise stretch the layout viewport: on a 320px phone the page laid
        // out at 391px and the browser zoomed out. `relative` makes this the
        // traveller's positioning box, which starts at the document's top-left.
        <div className="relative overflow-x-clip">
            <a
                href="#rooms"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-surface focus:px-4 focus:py-2 focus:font-sans focus:text-sm focus:text-ink"
            >
                Skip to content
            </a>

            <Nav />

            <main id="rooms">
                {/* The opening screen is not a room — nothing anchors to it.
                    `Opening` carries its own `id` and surface, so it is a direct
                    child rather than wrapped in a second one. */}
                <Opening photo={openingPhoto} />

                {ROOMS.map((room) => (
                    <Room
                        key={room.id}
                        id={room.id}
                        // The journal room has no title, and ME supplies its own
                        // heading — "About me." — rather than a bare
                        // "ME" above it. `label` names both.
                        title={room.id === 'journal' || room.id === 'me' ? undefined : room.label}
                        label={room.id === 'journal' || room.id === 'me' ? room.label : undefined}
                        note={room.note}
                        tone={room.tone}
                    >
                        {room.id === 'me' ? (
                            <Me />
                        ) : (
                            <div className="mx-auto w-full max-w-6xl px-6 pb-28 md:px-12 md:pb-40">
                                <Handwritten rotate="-1.2deg">
                                    built in Phase {ROOMS.indexOf(room) + 5}
                                </Handwritten>
                            </div>
                        )}
                    </Room>
                ))}
            </main>

            {/* Outside every room, positioned against the document. See the
                component for why it needs no `fixed`. */}
            <TravellingPortrait />
        </div>
    );
}

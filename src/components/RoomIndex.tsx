import { ROOMS, ROOM_IDS } from '@/data/rooms';
import Handwritten from '@/doodles/Handwritten';
import useActiveRoom from '@/hooks/useActiveRoom';
import Reveal from '@/primitives/Reveal';

interface RoomIndexProps {
    /** Returning to the intro gate from the wordmark. */
    onWordmarkClick: () => void;
}

/**
 * Navigation, as a room index rather than a bar.
 *
 * The user asked for the sticky nav bar to go and the site to read as one big
 * page. §18 still wants the six rooms reachable, and §19 wants the homepage to
 * make someone want to keep exploring — so the nav is now the first thing under
 * the opening screen, in the page's own type, and the wordmark is a quiet
 * return-to-top rather than a fixed bar sitting above the content.
 *
 * Every entry is a real anchor with a handwritten note, per §18.
 */
export function RoomIndex({ onWordmarkClick }: RoomIndexProps) {
    const active = useActiveRoom(ROOM_IDS);

    return (
        <div className="mx-auto w-full max-w-6xl px-6 pb-24 md:px-12 md:pb-32">
            <div className="flex items-baseline justify-between gap-6 border-t border-rule pt-6">
                <h2 className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-muted">
                    Rooms
                </h2>
                <button
                    type="button"
                    onClick={onWordmarkClick}
                    className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-muted transition-colors duration-300 hover:text-accent"
                >
                    Back to start
                </button>
            </div>

            <ul className="mt-8 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
                {ROOMS.map((room, i) => {
                    const isActive = active === room.id;
                    return (
                        <li key={room.id} className="border-b border-rule">
                            <Reveal delay={i * 70}>
                                <a
                                    href={`#${room.id}`}
                                    className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5"
                                >
                                    <span className="flex items-baseline gap-4">
                                        <span
                                            className={`font-serif text-2xl uppercase leading-none transition-colors duration-300 md:text-3xl ${
                                                isActive ? 'text-accent' : 'text-ink'
                                            }`}
                                        >
                                            {room.label}
                                        </span>
                                        <Handwritten
                                            fontSize="0.95rem"
                                            rotate="-2deg"
                                            className="text-muted"
                                        >
                                            {room.note}
                                        </Handwritten>
                                    </span>
                                    <span
                                        aria-hidden="true"
                                        className={`text-muted transition-transform duration-300 ${
                                            isActive ? 'translate-x-1 text-accent' : 'group-hover:translate-x-1'
                                        }`}
                                    >
                                        &rarr;
                                    </span>
                                </a>
                            </Reveal>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default RoomIndex;

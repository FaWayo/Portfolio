import { MEDIUM_URL, POSTS, type Post } from '@/data/writing';
import PillLink from '@/primitives/PillLink';
import Reveal from '@/primitives/Reveal';

/**
 * WRITING — her Medium posts, set like the contents of a quiet magazine
 * (decision-log.md §63). The brief asks for this room to be visually quiet.
 *
 *   2  title      "Writing." set like "About me." and "Proof of work.", with
 *                 the room's note in the hand beneath
 *   3  featured   the newest post: its cover matted with a hairline, the date
 *                 and read time, the title large, her opening line, a link
 *   4  index      every other post as one row — date, title, read time —
 *                 between hairlines; on desktop its cover fades in at the
 *                 row's end on hover
 *   5  Medium     the pill button, to everything on Medium
 *
 * Every post opens on Medium in a new tab.
 */
export function Writing() {
    const [featured, ...rest] = POSTS;

    return (
        <div className="px-[6vw] pb-20 pt-24 lg:pb-28 lg:pt-32">
            {/* The room opens on a hairline that meets the nav spine: on desktop it
                runs from the spine's edge to the right edge of the screen, same
                weight and colour, so the two make one corner. It draws itself in
                from the left as the room arrives. decision-log.md §69. */}
            <Reveal replay className="room-rule h-px bg-ink/15 lg:-mr-[6vw] lg:ml-[calc(clamp(48px,3.6vw,72px)-6vw)]" />

            <div className="pb-16 pt-12 lg:pb-24 lg:pt-16">
                <h2
                    id="writing-heading"
                    className="font-display text-[length:clamp(3.5rem,7vw,9.5rem)] leading-[0.9] tracking-[-0.02em] text-ink"
                >
                    Writing<span className="text-accent">.</span>
                </h2>
                <p className="mt-3 -rotate-[3deg] whitespace-nowrap pl-[0.4em] font-hand text-[length:clamp(1.15rem,2.2vw,2.5rem)] text-accent">
                    things I&rsquo;ve been writing about
                </p>
            </div>

            {featured && <Featured post={featured} />}

            <ol aria-label="More writing" className="mt-20 border-b border-rule lg:mt-28">
                {rest.map((post) => (
                    <IndexRow key={post.href} post={post} />
                ))}
            </ol>

            <Reveal className="mt-16 flex justify-center lg:mt-24">
                <PillLink href={MEDIUM_URL}>Everything on Medium</PillLink>
            </Reveal>
        </div>
    );
}

/** "9 Sep 2026 · 3 min read" */
function Meta({ post }: { post: Post }) {
    return (
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-muted md:text-xs">
            {post.date}
            <span aria-hidden="true"> · </span>
            {post.minutes} min read
        </p>
    );
}

/** The newest post, given room: cover on the left, the words on the right. */
function Featured({ post }: { post: Post }) {
    return (
        <Reveal as="article" className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:items-center lg:gap-x-12">
            {post.cover && (
                <a
                    href={post.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="group relative block aspect-[4/5] w-full max-w-md overflow-hidden lg:col-span-5 lg:max-w-none"
                >
                    <img
                        src={post.cover}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition-[scale] duration-[1200ms] ease-out motion-safe:group-hover:scale-105"
                    />
                    <span className="pointer-events-none absolute inset-3 border border-cream/70 sm:inset-4" />
                </a>
            )}

            <div className="lg:col-span-6 lg:col-start-7">
                <Meta post={post} />
                <h3 className="mt-5 font-display text-[length:clamp(2.5rem,4.5vw,5rem)] leading-[0.95] tracking-[-0.02em] text-ink">
                    <a
                        href={post.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="transition-colors hover:text-accent"
                    >
                        {post.title}
                    </a>
                </h3>
                {post.opening && (
                    <p className="mt-6 max-w-[30em] font-display text-[length:clamp(17px,0.45rem+0.6vw,22px)] italic leading-[1.55] text-muted">
                        &ldquo;{post.opening}&rdquo;
                    </p>
                )}
                <a
                    href={post.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-8 inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ink underline decoration-accent decoration-2 underline-offset-[7px] transition-colors hover:text-accent"
                >
                    Read it on Medium
                    <span aria-hidden="true">↗</span>
                </a>
            </div>
        </Reveal>
    );
}

/** One post in the index: date, title, read time; the cover peeks in on hover. */
function IndexRow({ post }: { post: Post }) {
    return (
        <Reveal as="li" className="border-t border-rule">
            <a
                href={post.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group relative grid grid-cols-1 gap-y-1 py-6 sm:grid-cols-[8.5rem_1fr_auto] sm:items-baseline sm:gap-x-8 lg:py-7"
            >
                <span className="font-sans text-xs tabular-nums tracking-[0.06em] text-muted">{post.date}</span>
                <span className="font-display text-[length:clamp(1.35rem,0.9rem+1vw,2.1rem)] leading-tight text-ink transition-[color,translate] duration-300 group-hover:text-accent motion-safe:group-hover:translate-x-1.5">
                    {post.title}
                </span>
                <span className="font-sans text-xs text-muted">
                    {post.minutes} min <span aria-hidden="true" className="ml-1 inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </span>

                {/* The cover, peeking in at the row's end on hover (desktop). */}
                {post.cover && (
                    <img
                        src={post.cover}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="pointer-events-none absolute right-24 top-1/2 z-10 hidden aspect-[4/5] w-36 -translate-y-1/2 rotate-[3deg] object-cover opacity-0 shadow-[0_18px_40px_-16px_rgb(0_0_0/0.5)] transition-[opacity,scale] duration-300 group-hover:scale-100 group-hover:opacity-100 lg:block lg:scale-95"
                    />
                )}
            </a>
        </Reveal>
    );
}

export default Writing;

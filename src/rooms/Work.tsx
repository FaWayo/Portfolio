import type { CSSProperties } from 'react';

import { CV_URL } from '@/data/me';
import { PROJECTS, type Project } from '@/data/work';
import Arrow from '@/doodles/Arrow';
import LoopVideo from '@/primitives/LoopVideo';
import PillLink from '@/primitives/PillLink';
import Reveal from '@/primitives/Reveal';
import Typewriter from '@/primitives/Typewriter';

/**
 * WORK — what Fatimah has done. ME is who she is (decision-log.md §41).
 *
 * Laid out like a magazine feature (decision-log.md §54–55): a
 * title set like "About me.", and each project as a spread — a hero photo
 * matted like a gallery print with an inset overlapping its foot and a caption
 * beneath, beside a short story and one handwritten note.
 *
 *   2  title      Proof of / work., then "so far ↘"
 *   3  projects   feature spreads, alternating sides
 *   4  the CV — one centred line; the CV holds the history
 *
 * The CV holds the full history, so this room only shows the first-look facts
 * (decision-log.md §48).
 */
export function Work() {
    return (
        <div className="px-[6vw] pb-28 pt-24 lg:pb-40 lg:pt-32">
            {/* The room opens on a hairline that meets the nav spine: on desktop it
                runs from the spine's edge to the right edge of the screen, same
                weight and colour, so the two make one corner. It draws itself in
                from the left as the room arrives. decision-log.md §69. */}
            <Reveal replay className="room-rule h-px bg-ink/15 lg:-mr-[6vw] lg:ml-[calc(clamp(48px,3.6vw,72px)-6vw)]" />

            {/* 2 — title. */}
            <div className="grid grid-cols-1 gap-y-10 pb-20 pt-12 lg:grid-cols-12 lg:gap-x-10 lg:pb-28 lg:pt-16">
                <div className="relative w-fit lg:col-span-8">
                    <h2
                        id="work-heading"
                        className="font-display text-[length:clamp(3.5rem,7vw,9.5rem)] leading-[0.9] tracking-[-0.02em] text-ink"
                    >
                        Proof of
                        <br />
                        work<span className="text-accent">.</span>
                    </h2>
                    {/* The handwritten line under the heading, running on into an
                        arrow down into the work. In flow rather than absolute, so it
                        never collides with the full stop; it may wrap on a phone,
                        and the typewriter lays the whole line out first so wrapping
                        never jumps while it types. */}
                    <span className="mt-3 block -rotate-[6deg] whitespace-nowrap pl-[38%] font-hand text-[length:clamp(1.75rem,3.2vw,3.5rem)] leading-snug text-accent">
                        <Typewriter text="so far" delay={500} returnDelay={300} speed={110} />
                        <span aria-hidden="true" className="ml-2 inline-block origin-left translate-y-[0.1em] rotate-[58deg] align-top">
                            <Arrow width={120} height={50} strokeWidth={4} className="h-auto w-[2.2em]" />
                        </span>
                    </span>
                </div>
            </div>

            {/* 3 — projects. */}
            <ol aria-label="Projects" className="border-t border-rule">
                {PROJECTS.map((project, i) => (
                    <ProjectSpread key={project.slug} project={project} index={i} />
                ))}
            </ol>

            {/* 4 — the CV, and nothing else: it holds the history. */}
            <CvLine />
        </div>
    );
}

/**
 * How WORK ends (decision-log.md §59). The CV holds the full history, so
 * there is no summary of jobs here: one quiet centred line pointing at it,
 * the hand above with an arrow down.
 */
function CvLine() {
    return (
        <Reveal as="section" replay aria-label="CV" className="glance pt-24 text-center lg:pt-32">
            <p className="glance-cv flex flex-col items-center">
                <span aria-hidden="true" className="flex -rotate-[3deg] items-end gap-1 font-hand text-[length:clamp(1.2rem,1.5vw,1.7rem)] text-accent">
                    the rest is in here
                    <span className="inline-block origin-left translate-y-[0.2em] rotate-[70deg]">
                        <Arrow width={120} height={50} strokeWidth={4} className="h-auto w-[1.5em]" />
                    </span>
                </span>
                <PillLink href={CV_URL} className="mt-5">
                    Download my CV
                </PillLink>
            </p>
        </Reveal>
    );
}

/**
 * A feature spread. The picture side takes seven columns and the story five,
 * alternating, so four projects read as one layout turned over.
 *
 * Picture side: the hero photo as a matted print — a champagne hairline set in
 * from its edge — with a slow zoom on hover; the second photo as an inset in a
 * cream border, overlapping the hero's lower corner; a "fig." caption beneath.
 * With no photos it is a typographic plate: the project's initial, huge, in a
 * champagne outline on wine.
 */
function ProjectSpread({ project, index }: { project: Project; index: number }) {
    const flip = index % 2 === 1;
    const [hero, inset] = project.images ?? [];

    return (
        <Reveal
            as="li"
            replay
            className="spread grid grid-cols-1 gap-y-12 border-b border-rule py-20 lg:grid-cols-12 lg:items-center lg:gap-x-12 lg:py-28"
            style={{ '--brand': project.brand ?? 'var(--color-champagne)' } as CSSProperties}
        >
            {/* The picture side. */}
            <figure className={`relative lg:col-span-7 ${flip ? 'lg:order-2 lg:col-start-6' : ''}`}>
                {hero ? (
                    <div className={`relative ${inset ? 'pb-[26%]' : ''} ${flip ? 'pl-[10%]' : 'pr-[10%]'}`}>
                        <div className="spread-hero group relative aspect-[4/3] overflow-hidden bg-cocoa">
                            {hero.video ? (
                                <LoopVideo
                                    src={hero.video}
                                    poster={hero.src}
                                    label={hero.alt}
                                    className="h-full w-full object-cover"
                                    style={hero.position ? { objectPosition: hero.position } : undefined}
                                />
                            ) : (
                                <img
                                    src={hero.src}
                                    alt={hero.alt}
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-[scale] duration-[1200ms] ease-out motion-safe:group-hover:scale-105"
                                    style={hero.position ? { objectPosition: hero.position } : undefined}
                                />
                            )}
                            {/* The mat: a hairline in the project's own brand colour, set in
                                from the edge. The inset below only overlaps the hero's foot,
                                so it never covers a face. */}
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-3 border border-[var(--brand)] opacity-80 sm:inset-4"
                            />
                        </div>

                        {inset && (
                            <div
                                className={`spread-inset absolute bottom-0 w-[30%] border-[5px] border-[var(--brand)] bg-[var(--brand)] shadow-[0_24px_50px_-20px_rgb(0_0_0/0.75)] sm:border-[7px] ${
                                    flip ? 'left-0' : 'right-0'
                                }`}
                            >
                                {inset.video ? (
                                    <LoopVideo
                                        src={inset.video}
                                        poster={inset.src}
                                        label={inset.alt}
                                        className="aspect-[4/5] w-full object-cover"
                                        style={inset.position ? { objectPosition: inset.position } : undefined}
                                    />
                                ) : (
                                    <img
                                        src={inset.src}
                                        alt={inset.alt}
                                        loading="lazy"
                                        className="aspect-[4/5] w-full object-cover"
                                        style={inset.position ? { objectPosition: inset.position } : undefined}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <div
                        aria-hidden="true"
                        className="spread-hero relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[color-mix(in_srgb,var(--brand)_22%,var(--color-noir))]"
                    >
                        <span className="pointer-events-none absolute inset-3 border border-[var(--brand)] opacity-60 sm:inset-4" />
                        <span className="select-none font-display text-[length:clamp(10rem,24vw,22rem)] font-light italic leading-none text-transparent [-webkit-text-stroke:1.5px_var(--brand)]">
                            {project.title.charAt(0)}
                        </span>
                    </div>
                )}

                <figcaption className="spread-line mt-4 font-display text-[length:clamp(13px,0.3rem+0.4vw,15px)] italic text-muted">
                    {hero?.caption ?? 'image to come'}
                    {inset?.caption && <span> · {inset.caption}</span>}
                </figcaption>
            </figure>

            {/* The story. */}
            <div className={`lg:col-span-5 ${flip ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-8'}`}>
                {/* The title, set like "About me.", then one plain italic line
                    saying where it was made and how far it got. */}
                <h3 className="spread-title font-display text-[length:clamp(2.75rem,4.8vw,5.5rem)] leading-[0.92] tracking-[-0.02em] text-ink">
                    {project.title}
                    <span className="text-[var(--brand)]">.</span>
                </h3>

                {project.context && (
                    <p className="spread-line mt-4 font-display text-[length:clamp(17px,0.45rem+0.55vw,22px)] italic text-muted">
                        {project.context}
                    </p>
                )}

                {project.summary && (
                    <p className="spread-line mt-6 max-w-[30em] font-sans text-[length:clamp(16px,0.4rem+0.5vw,21px)] leading-[1.7] text-ink">
                        {project.summary}
                    </p>
                )}

                {project.did?.length ? (
                    <ul className="mt-6 space-y-2.5 font-sans text-[length:clamp(15px,0.35rem+0.5vw,18px)] leading-[1.6] text-ink">
                        {project.did.map((item) => (
                            <li key={item} className="flex gap-3">
                                <span aria-hidden="true" className="text-accent">
                                    ·
                                </span>
                                {item}
                            </li>
                        ))}
                    </ul>
                ) : null}

                {/* What the work took, quietly. */}
                {project.skills?.length ? (
                    <p className="spread-line mt-5 font-sans text-[length:clamp(14px,0.3rem+0.45vw,17px)] text-muted">
                        <span className="sr-only">Skills: </span>
                        {project.skills.join(' · ')}
                    </p>
                ) : null}

                {/* Her part, as a note in the margin with a little arrow. */}
                {project.role && (
                    <p className="spread-note mt-6 flex -rotate-[2deg] items-center gap-2 font-hand text-[length:clamp(1.2rem,1.45vw,1.7rem)] text-accent">
                        <span aria-hidden="true" className="inline-block rotate-[20deg]">
                            <Arrow width={120} height={50} strokeWidth={4} className="h-auto w-[1.6em]" />
                        </span>
                        {project.role}
                    </p>
                )}

                {(project.aside || project.placeholder) && (
                    <p className="mt-6 -rotate-[1.5deg] font-hand text-[length:clamp(1.1rem,1.3vw,1.5rem)] text-accent">
                        {project.aside ?? 'the full story is being written'}
                    </p>
                )}

                {/* The project's own site, underlined in its brand colour. */}
                {project.href && (
                    <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="spread-line mt-8 inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ink underline decoration-[var(--brand)] decoration-2 underline-offset-[7px] transition-colors hover:text-[var(--brand)]"
                    >
                        {project.linkLabel ?? 'Visit the site'}
                        <span aria-hidden="true">↗</span>
                    </a>
                )}
            </div>
        </Reveal>
    );
}

export default Work;

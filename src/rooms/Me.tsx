import { EDUCATION, EXPERIENCE, ME_PROSE, PORTRAITS, SKILLS } from '@/data/me';
import Photo from '@/primitives/Photo';
import Underline from '@/doodles/Underline';
import Reveal from '@/primitives/Reveal';

/**
 * ME — "A little about me". brand-direction §ME.
 *
 * Not a biography. The prose is verbatim from the brand direction and the
 * structured facts sit below it in a ruled editorial column, so the room reads
 * as a person who happens to have a CV rather than a CV with a person stapled on.
 */
export function Me() {
    return (
        <div className="mx-auto w-full max-w-6xl px-6 pb-28 md:px-12 md:pb-40">
            {/* Prose and one portrait, asymmetric per §15. */}
            <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-7">
                    <h3 className="font-serif text-title leading-none uppercase text-ink">
                        A little about me
                    </h3>

                    <div className="mt-8 space-y-6">
                        {ME_PROSE.map((line, i) => (
                            <Reveal
                                as="p"
                                key={line}
                                delay={i * 100}
                                className={`font-sans leading-relaxed ${
                                    i === 0 ? 'text-xl text-ink' : 'text-lg text-muted'
                                }`}
                            >
                                {line}
                            </Reveal>
                        ))}
                    </div>

                    {/* §13: the handwritten layer adds commentary, never repeats.
                        Underline rather than HighlightCircle — the circle is a
                        fixed square viewBox, so it cannot sit behind a phrase
                        without distorting. */}
                    <Reveal delay={420} className="mt-10 flex flex-col items-end gap-1">
                        <span className="relative inline-block">
                            <span className="font-hand text-lg text-accent">more than my work</span>
                            <Underline
                                width={170}
                                height={16}
                                className="absolute -bottom-2 left-0"
                            />
                        </span>
                    </Reveal>
                </div>

                <div className="md:col-span-4 md:col-start-9 md:pt-6">
                    <Reveal>
                        <Photo
                            src={PORTRAITS[0].src}
                            alt={PORTRAITS[0].alt}
                            rotate={PORTRAITS[0].rotate}
                            aspect="4 / 5"
                        />
                    </Reveal>
                </div>
            </div>

            {/* Second portrait, offset the other way. */}
            <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-3 md:col-start-2 md:pt-16">
                    <Reveal>
                        <Photo
                            src={PORTRAITS[1].src}
                            alt={PORTRAITS[1].alt}
                            rotate={PORTRAITS[1].rotate}
                            aspect="1 / 1"
                        />
                    </Reveal>
                </div>

                {/* Facts as a ruled column, not timeline dots or pill tags. */}
                <div className="md:col-span-6 md:col-start-6">
                    <section aria-labelledby="me-experience">
                        <h4
                            id="me-experience"
                            className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-muted"
                        >
                            Experience
                        </h4>
                        <dl className="mt-4">
                            {EXPERIENCE.map((entry) => (
                                <div
                                    key={`${entry.period}-${entry.role}`}
                                    className="border-t border-rule py-4 last:border-b"
                                >
                                    <dt className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                                        <span className="font-serif text-xl leading-tight text-ink">
                                            {entry.role}
                                        </span>
                                        <span className="font-sans text-xs uppercase tracking-[0.18em] text-muted">
                                            {entry.period}
                                        </span>
                                    </dt>
                                    <dd className="mt-1 font-sans text-sm text-muted">{entry.org}</dd>
                                </div>
                            ))}
                        </dl>
                    </section>

                    <section aria-labelledby="me-education" className="mt-14">
                        <h4
                            id="me-education"
                            className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-muted"
                        >
                            Education
                        </h4>
                        <dl className="mt-4">
                            {EDUCATION.map((entry) => (
                                <div
                                    key={`${entry.period}-${entry.qualification}`}
                                    className="border-t border-rule py-4 last:border-b"
                                >
                                    <dt className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                                        <span className="font-serif text-xl leading-tight text-ink">
                                            {entry.qualification}
                                        </span>
                                        <span className="font-sans text-xs uppercase tracking-[0.18em] text-muted">
                                            {entry.period}
                                        </span>
                                    </dt>
                                    <dd className="mt-1 font-sans text-sm text-muted">
                                        {entry.org}
                                        {entry.detail && (
                                            <span className="text-muted/70"> · {entry.detail}</span>
                                        )}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </section>

                    <section aria-labelledby="me-skills" className="mt-14">
                        <h4
                            id="me-skills"
                            className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-muted"
                        >
                            Skills
                        </h4>
                        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                            {SKILLS.map((skill) => (
                                <li
                                    key={skill}
                                    className="border-b border-rule pb-1 font-sans text-sm text-ink"
                                >
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Me;

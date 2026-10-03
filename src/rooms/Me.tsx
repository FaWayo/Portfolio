import { EDUCATION, EXPERIENCE, ME_PROSE, PORTRAITS, SKILLS, CV_URL } from '@/data/me';
import Reveal from '@/primitives/Reveal';
import Typewriter from '@/primitives/Typewriter';
import WriteOn from '@/primitives/WriteOn';

/**
 * Wide-tracked words under the portrait, the reference's "BEAUTY ✦ STRATEGY ✦
 * PROFIT" strip. PLACEHOLDER copy drawn from the hero line, awaiting sign-off.
 */
const STRIP = ['Software', 'Product', 'Faith'] as const;

/**
 * ME — "About me." decision-log.md §37 (was "A little about me", brand-direction §ME).
 *
 * Layout is the GlamToProfit "about me." page (decision-log.md §26): a
 * full-height portrait on the left standing on a hairline, a very large display
 * heading on the right, a short rule, then the prose. A vertical hairline runs
 * down the left margin. The room is cream, which is why ME is `tone: 'paper'`.
 *
 * The room has no `ME` heading of its own — "About me." is the heading,
 * so the generic room header is skipped and the room is named by its `label`.
 *
 * The handwriting is one word-group, `the short version`, laid across the
 * heading's lower edge in Beth Ellen. It is the only handwriting in the room:
 * used once it reads as a hand, used twice it reads as a font.
 *
 * The facts sit below the strip as hairline rows, quiet and unlabelled, so the
 * room still does not read as a CV. See PLAN Phase 5.
 */
export function Me() {
    const [portrait] = PORTRAITS;

    return (
        <div className="relative pt-28 md:pt-36">
            {/* The vertical hairline at the left margin, as in the reference. */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-[3vw] hidden w-px bg-rule lg:block"
            />

            <div className="grid grid-cols-1 gap-y-14 px-[6vw] lg:grid-cols-12 lg:gap-x-10">
                {/* The portrait stands on the strip's hairline: no bottom padding
                    under it on desktop, so its foot meets the rule.

                    This is the *landing* slot for the hero portrait — see
                    TravellingPortrait.tsx. 4:5 because the photograph is 4:5,
                    so it lands without a crop. No `Reveal` and no `Photo`: both
                    animate their own opacity or transform, and the slot has to
                    hold still to be measured. The `<img>` is the static
                    fallback for reduced motion and no JS. */}
                <div className="lg:col-span-5 lg:self-end">
                    <div
                        data-portrait-to
                        className="relative aspect-[4/5] w-full max-w-[min(26rem,64svh)] overflow-hidden bg-rule/40 lg:max-w-none"
                    >
                        {portrait.src && (
                            <img
                                src={portrait.src}
                                alt={portrait.alt}
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover"
                            />
                        )}
                    </div>
                </div>

                <div className="lg:col-span-6 lg:col-start-7 lg:self-center lg:pb-24">
                    {/* `w-fit`, so the handwriting is placed against the heading
                        itself rather than the column. It hangs from 12% in and runs
                        right: "About" is narrower than the handwritten line, so
                        right-anchoring pushed it off the left edge of a phone. */}
                    <div className="relative w-fit pb-8">
                        <WriteOn
                            id="me-heading"
                            duration={1.3}
                            className="font-display text-[length:clamp(4.25rem,10vw,14rem)] leading-[0.88] tracking-[-0.02em] text-ink"
                        >
                            About
                            <br />
                            me<span className="text-accent">.</span>
                        </WriteOn>

                        {/* Typed, not faded: on every visit to ME, after the heading
                            has mostly written itself on. decision-log.md §38. */}
                        <span className="absolute bottom-0 left-[12%] -rotate-[3deg] whitespace-nowrap font-hand text-[length:clamp(1.375rem,2vw,3rem)] text-accent">
                            <Typewriter text="the short version" delay={1100} returnDelay={300} speed={85} />
                        </span>
                    </div>

                    <div aria-hidden="true" className="mt-10 h-px w-3/5 bg-rule" />

                    {/* The first line is a lede — three short statements, set in
                        Fraunces a step larger. The rest are paragraphs, so Jost.
                        §5. */}
                    <div className="mt-10 max-w-[32em] space-y-6 text-[length:clamp(17px,0.5rem+0.7vw,26px)]">
                        {ME_PROSE.map((line, i) => (
                            <Reveal
                                as="p"
                                key={line}
                                delay={i * 100}
                                className={
                                    i === 0
                                        ? 'font-display text-[1.3em] leading-[1.35] tracking-[-0.01em] text-ink'
                                        : 'font-sans leading-[1.75] text-ink'
                                }
                            >
                                {line}
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>

            {/* The strip: a full-width hairline, then three tracked words. */}
            <div className="mt-14 border-t border-rule lg:mt-0">
                <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-[6vw] py-6 font-sans text-[11px] font-medium uppercase tracking-[0.2em] md:text-[length:clamp(0.75rem,0.6vw,1rem)] text-muted md:gap-x-12 md:tracking-[0.4em]">
                    {STRIP.map((word, i) => (
                        <span key={word} className="contents">
                            {i > 0 && (
                                <span aria-hidden="true" className="text-accent">
                                    &#10022;
                                </span>
                            )}
                            <span>{word}.</span>
                        </span>
                    ))}
                </p>
            </div>

            {/* The facts, present but quiet: hairline rows aligned under the
                prose column, no section labels. */}
            <div className="grid grid-cols-1 px-[6vw] pb-28 pt-16 lg:grid-cols-12 lg:gap-x-10 lg:pb-40">
                <div className="max-w-3xl lg:col-span-6 lg:col-start-7 lg:max-w-none">
                    <dl aria-label="Experience and education">
                        {[
                            ...EXPERIENCE.map((e) => ({ key: `${e.period}-${e.role}`, what: e.role, org: e.org, period: e.period })),
                            ...EDUCATION.map((e) => ({ key: `${e.period}-${e.qualification}`, what: e.qualification, org: e.org, period: e.period })),
                        ].map((row) => (
                            <div
                                key={row.key}
                                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-0.5 border-t border-rule py-4"
                            >
                                <dt className="font-sans text-[length:clamp(15px,0.35rem+0.55vw,20px)] text-ink">
                                    {row.what}
                                    <span className="text-muted"> · {row.org}</span>
                                </dt>
                                <dd className="font-sans text-[length:clamp(13px,0.3rem+0.45vw,17px)] tabular-nums text-muted">{row.period}</dd>
                            </div>
                        ))}
                    </dl>

                    <ul aria-label="Skills" className="mt-10 flex flex-wrap gap-2.5">
                        {SKILLS.map((skill) => (
                            <li key={skill} className="pill">
                                {skill}
                            </li>
                        ))}
                    </ul>

                    <Reveal delay={120} className="mt-8">
                        <a href={CV_URL} target="_blank" rel="noreferrer noopener" className="pill">
                            CV
                            <span aria-hidden="true">↗</span>
                        </a>
                    </Reveal>
                </div>
            </div>
        </div>
    );
}

export default Me;

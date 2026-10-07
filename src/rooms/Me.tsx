import { ME_PROSE, PORTRAITS } from '@/data/me';
import Reveal from '@/primitives/Reveal';
import Typewriter from '@/primitives/Typewriter';
import WriteOn from '@/primitives/WriteOn';

/**
 * ME — "About me." decision-log.md §37 (was "A little about me", brand-direction §ME).
 *
 * Layout is the GlamToProfit "about me." page (decision-log.md §26): a
 * full-height portrait on the left standing on a hairline, a very large display
 * heading on the right, a short rule, then the prose. The reference's vertical
 * hairline down the left margin is now the nav spine's own (decision-log.md
 * §61). The room is cream, which is why ME is `tone: 'paper'`.
 *
 * The room has no `ME` heading of its own — "About me." is the heading,
 * so the generic room header is skipped and the room is named by its `label`.
 *
 * The handwriting is one word-group, `the short version`, laid across the
 * heading's lower edge in Beth Ellen. It is the only handwriting in the room:
 * used once it reads as a hand, used twice it reads as a font.
 *
 * The room ends on the hairline the portrait stands on — no tagline strip
 * (decision-log.md §43). Experience, education, skills and the CV moved
 * to WORK — ME is who she is, WORK is what she has done (decision-log.md §41).
 */
export function Me() {
    const [portrait] = PORTRAITS;

    return (
        <div className="relative pt-28 md:pt-36">
            <div className="grid grid-cols-1 gap-y-14 px-[6vw] lg:grid-cols-12 lg:gap-x-10">
                {/* The portrait stands on the room's closing hairline: no bottom padding
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
                            className="font-display text-[length:clamp(3.5rem,7vw,9.5rem)] leading-[0.9] tracking-[-0.02em] text-ink"
                        >
                            About
                            <br />
                            me<span className="text-accent">.</span>
                        </WriteOn>

                        {/* Typed, not faded: on every visit to ME, after the heading
                            has mostly written itself on. decision-log.md §38. */}
                        <span className="absolute bottom-0 left-[12%] -rotate-[3deg] whitespace-nowrap font-hand text-[length:clamp(1.25rem,1.6vw,2.25rem)] text-accent">
                            <Typewriter text="the short version" delay={1100} returnDelay={300} speed={85} />
                        </span>
                    </div>

                    <div aria-hidden="true" className="mt-10 h-px w-3/5 bg-rule" />

                    {/* The first line is a lede — three short statements, set in
                        Fraunces a step larger. The rest are paragraphs, so Jost.
                        §5. */}
                    <div className="mt-10 max-w-[34em] space-y-5 text-[length:clamp(16px,0.4rem+0.5vw,21px)]">
                        {ME_PROSE.map((line, i) => (
                            <Reveal
                                as="p"
                                key={line}
                                delay={i * 100}
                                className={
                                    i === 0
                                        ? 'font-display text-[1.2em] leading-[1.4] tracking-[-0.01em] text-ink'
                                        : 'font-sans leading-[1.7] text-ink'
                                }
                            >
                                {line}
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>

            {/* The floor: a full-width hairline the portrait stands on, then
                room to breathe before WORK. */}
            <div aria-hidden="true" className="mt-14 border-t border-rule pb-24 lg:mt-0 lg:pb-32" />
        </div>
    );
}

export default Me;

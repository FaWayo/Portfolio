import type { ReactNode } from 'react';

import Cloud from '@/doodles/Cloud';
import Handwritten from '@/doodles/Handwritten';
import Reveal from '@/primitives/Reveal';

interface OpeningProps {
    /**
     * The last element. The gate passes the `[ enter ]` button; the page itself
     * passes a scroll cue. Everything above it is shared, so the first viewport
     * is genuinely the same screen either side of the click.
     */
    action?: ReactNode;
    /** Handwritten line beside the cloud. */
    note?: string;
}

/**
 * The opening screen. brand-direction §19.
 *
 * One component, two mounts: the intro gate and the top of the page. The user
 * asked for these to be the same exact way, so they are the same component
 * rather than two layouts kept in agreement by hand.
 *
 * Copy is verbatim from the brand direction. `Still becoming.` is set in
 * Instrument Serif per §9, and is deliberately not the last line — it sits under
 * the name, the way the gate had it, and the body follows it.
 */
export function Opening({ action, note = "you're here." }: OpeningProps) {
    return (
        <div className="mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-center px-6 py-20 md:px-12">
            <Reveal as="p" className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-muted">
                Fatimah Wayo
            </Reveal>

            <h1 className="mt-6 font-serif text-display leading-[0.95] tracking-[-0.01em] text-ink">
                Hi, I&rsquo;m Fatimah.
            </h1>

            <Reveal delay={140} className="mt-6">
                <p className="font-serif text-2xl leading-tight text-ink md:text-3xl">
                    Still becoming.
                </p>
            </Reveal>

            <div className="mt-10 max-w-2xl space-y-6 md:mt-12">
                <Reveal as="p" delay={220} className="font-sans text-lg leading-relaxed text-ink">
                    I&rsquo;m a software engineer and product builder, rooted in faith and curious
                    about what I can create with the life I&rsquo;ve been given.
                </Reveal>
                <Reveal as="p" delay={320} className="font-sans text-lg leading-relaxed text-muted">
                    I build software, work on products, write about things I&rsquo;m learning, and
                    like taking an idea from &ldquo;what if?&rdquo; to something people can actually
                    use.
                </Reveal>
            </div>

            {/* §19: a handwritten note nearby, with a small cloud. */}
            <Reveal delay={420} className="mt-10 flex items-center gap-4 md:mt-12">
                <Handwritten fontSize="1.35rem" rotate="-3deg" className="text-accent">
                    {note}
                </Handwritten>
                <Cloud size={92} direction="down-left" />
            </Reveal>

            {action && <Reveal delay={520} className="mt-12 md:mt-16">{action}</Reveal>}
        </div>
    );
}

export default Opening;

import Arrow from '@/doodles/Arrow';
import Cloud from '@/doodles/Cloud';
import Handwritten from '@/doodles/Handwritten';
import { MUTED } from '@/doodles/shared';
import Reveal from '@/primitives/Reveal';

/**
 * ME as the opening screen. brand-direction §19.
 *
 * Copy is verbatim from the brand direction — do not tighten it. The section
 * deliberately stops short of a biography; Phase 5 is where the depth goes.
 */
export function Hero() {
    return (
        <div className="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-6xl flex-col justify-center px-6 py-20 md:min-h-[calc(100svh-5rem)] md:px-12">
            <h1 className="font-serif text-display leading-[0.95] tracking-[-0.01em] text-ink">
                <Reveal as="span" className="block">
                    Hi, I&rsquo;m Fatimah.
                </Reveal>
            </h1>

            <div className="mt-10 max-w-2xl space-y-6 md:mt-14">
                <Reveal as="p" delay={120} className="font-sans text-lg leading-relaxed text-ink">
                    I&rsquo;m a software engineer and product builder, rooted in faith and curious about
                    what I can create with the life I&rsquo;ve been given.
                </Reveal>
                <Reveal as="p" delay={240} className="font-sans text-lg leading-relaxed text-muted">
                    I build software, work on products, write about things I&rsquo;m learning, and like
                    taking an idea from &ldquo;what if?&rdquo; to something people can actually use.
                </Reveal>
                <Reveal as="p" delay={360} className="font-serif text-2xl leading-tight text-ink">
                    Still becoming.
                </Reveal>
            </div>

            {/* §19: a handwritten note nearby, with a small cloud. */}
            <Reveal delay={480} className="mt-12 flex items-center gap-4 md:mt-16">
                <Handwritten fontSize="1.35rem" rotate="-3deg" className="text-accent">
                    hello &rarr;
                </Handwritten>
                <Cloud size={92} direction="down-left" />
            </Reveal>

            <Reveal delay={600} className="mt-16 md:mt-24">
                <span className="flex items-center gap-3 font-sans text-[0.65rem] uppercase tracking-[0.3em] text-muted">
                    Scroll
                    <Arrow direction="down" width={40} height={40} color={MUTED} />
                </span>
            </Reveal>
        </div>
    );
}

export default Hero;
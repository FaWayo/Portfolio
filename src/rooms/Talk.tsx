import { useState } from 'react';

import Heart from '@/doodles/Heart';
import PillLink from '@/primitives/PillLink';
import Reveal from '@/primitives/Reveal';

/** From her CV (2026-10-04). The phone number is left off on purpose. */
const EMAIL = 'wayofatima@gmail.com';
type Network = 'linkedin' | 'github' | 'instagram' | 'x' | 'snapchat';

/**
 * Where else to find her. Medium lives in WRITING, so it is not repeated here.
 * Links are the clean profile URLs, without the share-tracking parameters.
 */
const ELSEWHERE: readonly { network: Network; name: string; handle: string; href: string }[] = [
    { network: 'linkedin', name: 'LinkedIn', handle: 'Fatimah Wayo', href: 'https://www.linkedin.com/in/fatima-alhassan-wayo/' },
    { network: 'github', name: 'GitHub', handle: '@FaWayo', href: 'https://github.com/FaWayo' },
    { network: 'instagram', name: 'Instagram', handle: '@faawayo', href: 'https://www.instagram.com/faawayo/' },
    { network: 'instagram', name: 'Instagram', handle: '@daviina._', href: 'https://www.instagram.com/daviina._/' },
    { network: 'x', name: 'X (Twitter)', handle: '@faawayo', href: 'https://x.com/faawayo' },
    { network: 'snapchat', name: 'Snapchat', handle: '@fawayo', href: 'https://www.snapchat.com/@fawayo' },
];

/**
 * LET'S TALK — a postcard to whoever has read this far (decision-log.md §65).
 *
 * The room's title, then a large postcard lying a little crooked on the page.
 * Left half: a note in her hand, in her words, signed. Right half: a postage
 * stamp with her "F.", an ink postmark half over it, and the address lines,
 * where her email and her links are written. On hover the card straightens and
 * lifts. Below it, the pill button to write, and the footer. On phones the two
 * halves stack.
 */
export function Talk() {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard blocked: the address is on the card to select by hand.
        }
    };

    return (
        <div className="px-[6vw] pb-12 pt-24 lg:pt-32">
            {/* The room opens on a hairline that meets the nav spine: on desktop it
                runs from the spine's edge to the right edge of the screen, same
                weight and colour, so the two make one corner. It draws itself in
                from the left as the room arrives. decision-log.md §69. */}
            <Reveal replay className="room-rule h-px bg-ink/15 lg:-mr-[6vw] lg:ml-[calc(clamp(48px,3.6vw,72px)-6vw)]" />

            <Reveal className="pt-12 lg:pt-16">
                <h2
                    id="talk-heading"
                    className="font-display text-[length:clamp(3.5rem,7vw,9.5rem)] leading-[0.9] tracking-[-0.02em] text-ink"
                >
                    Let&rsquo;s talk<span className="text-accent">.</span>
                </h2>
            </Reveal>

            {/* The postcard. */}
            <Reveal className="mt-14 flex justify-center lg:mt-20">
                <article
                    aria-label="A postcard from Fatimah"
                    className="relative w-full max-w-5xl -rotate-[1.5deg] bg-[#FBF6EF] p-6 text-noir shadow-[0_30px_70px_-30px_rgb(0_0_0/0.45),0_2px_6px_rgb(0_0_0/0.08)] ring-1 ring-black/5 transition-[rotate,translate] duration-500 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:rotate-0 sm:p-10 lg:p-14"
                >
                    <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2">
                        {/* Left: the note, set in Fraunces like a printed letter; only
                            the signature is in her hand. */}
                        <div className="flex flex-col font-display text-[length:clamp(1.3rem,0.9rem+0.9vw,1.95rem)] leading-[1.4] tracking-[-0.01em] md:pr-10 lg:pr-14">
                            <p>For work, ideas, questions, collaborations, or simply a hello.</p>
                            <p className="mt-5">I&rsquo;d like to hear from you.</p>
                            <p className="mt-8 flex items-center gap-2 font-hand text-[length:clamp(1.5rem,1.1rem+0.9vw,2.1rem)] leading-none text-wine">
                                <span className="-rotate-[3deg]">Fatimah</span>
                                <Heart size={26} strokeWidth={2.6} className="-rotate-[8deg] translate-y-[-0.15em]" />
                            </p>
                        </div>

                        {/* Right: stamp, postmark, address. */}
                        <div className="relative border-t border-noir/15 pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0 lg:pl-14">
                            <div className="flex items-start justify-end">
                                <Postmark />
                                <Stamp />
                            </div>

                            <p className="mt-6 font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-mauve">to</p>
                            <ul className="mt-1">
                                <li className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-noir/20 pb-2 pt-3">
                                    <a
                                        href={`mailto:${EMAIL}`}
                                        className="break-all font-sans text-[length:clamp(1.1rem,0.8rem+0.8vw,1.6rem)] text-noir transition-colors hover:text-wine sm:break-normal"
                                    >
                                        {EMAIL}
                                    </a>
                                    <button
                                        type="button"
                                        onClick={copy}
                                        className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-mauve transition-colors hover:text-noir"
                                    >
                                        <span aria-live="polite">{copied ? 'copied' : 'copy'}</span>
                                    </button>
                                </li>
                            </ul>

                            {/* Elsewhere: an ink icon and the handle in clean Jost on each
                                ruled line, two columns from `sm`. The handwriting is kept
                                for the note. */}
                            <ul aria-label="Elsewhere" className="mt-2 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                                {ELSEWHERE.map((link) => (
                                    <li key={link.href} className="border-b border-noir/20">
                                        <a
                                            href={link.href}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            aria-label={`${link.name}: ${link.handle}`}
                                            className="group flex items-center gap-3 py-3 font-sans text-[length:clamp(15px,0.35rem+0.45vw,18px)] text-noir transition-colors hover:text-wine"
                                        >
                                            <SocialIcon network={link.network} />
                                            <span className="truncate">{link.handle}</span>
                                            <span
                                                aria-hidden="true"
                                                className="ml-auto font-sans text-xs text-mauve transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                            >
                                                ↗
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </article>
            </Reveal>

            <Reveal className="mt-14 flex justify-center lg:mt-20">
                <PillLink href={`mailto:${EMAIL}`}>Say hello</PillLink>
            </Reveal>

            {/* The sign-off. */}
            <footer className="mt-24 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t border-rule pt-6 font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-muted lg:mt-32">
                <span>Fatimah Wayo · Ghana · 2026</span>
                <a href="#opening" className="transition-colors hover:text-ink">
                    Back to the top <span aria-hidden="true">↑</span>
                </a>
            </footer>
        </div>
    );
}

/** Small line icons, drawn in ink like the rest of the card. */
function SocialIcon({ network }: { network: Network }) {
    const common = {
        width: 20,
        height: 20,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.6,
        strokeLinecap: 'round' as const,
        strokeLinejoin: 'round' as const,
        'aria-hidden': true,
        className: 'shrink-0 text-wine',
    };
    switch (network) {
        case 'linkedin':
            return (
                <svg {...common}>
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <path d="M8 10.5V17M8 7.5v.01M12 17v-3.5a2.5 2.5 0 0 1 5 0V17M12 10.5V17" />
                </svg>
            );
        case 'github':
            return (
                <svg {...common}>
                    <path d="M9 19c-4 1.4-4-2-6-2.5m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
                </svg>
            );
        case 'instagram':
            return (
                <svg {...common}>
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <path d="M17.5 6.5v.01" />
                </svg>
            );
        case 'x':
            return (
                <svg {...common}>
                    <path d="M4 4l16 16M20 4L4 20" strokeWidth={1.4} />
                    <path d="M4 4h4l12 16h-4z" strokeWidth={1.4} />
                </svg>
            );
        case 'snapchat':
            return (
                <svg {...common}>
                    <path d="M12 3c3 0 5 2.2 5 5v2.2l1.6-.5c.6-.2 1 .6.5 1l-2 1.2c.6 1.8 2 3.1 3.6 3.6.4.1.4.7 0 .9l-1.7.6-.4 1.2-1.9-.1c-.9 0-1.6.5-2.3 1-.6.4-1.4.8-2.4.8s-1.8-.4-2.4-.8c-.7-.5-1.4-1-2.3-1l-1.9.1-.4-1.2-1.7-.6c-.4-.2-.4-.8 0-.9 1.6-.5 3-1.8 3.6-3.6l-2-1.2c-.5-.4-.1-1.2.5-1l1.6.5V8c0-2.8 2-5 5-5z" />
                </svg>
            );
    }
}

const PERFORATION =
    'radial-gradient(circle at 5px 5px, transparent 3px, #000 3.5px) -5px -5px / 10px 10px, linear-gradient(#000, #000) center / calc(100% - 10px) calc(100% - 10px) no-repeat';

/** A postage stamp: perforated edge, wine face, her "F." and the country. */
function Stamp() {
    return (
        <span
            aria-hidden="true"
            className="relative flex h-[100px] w-[80px] shrink-0 rotate-[4deg] flex-col items-center justify-center bg-wine text-cream sm:h-[110px] sm:w-[90px]"
            style={{
                // Perforation: holes centred on the edge every 10px, and a solid
                // centre so only the rim is scalloped. Sizes are multiples of 10.
                WebkitMask: PERFORATION,
                mask: PERFORATION,
            }}
        >
            <span className="absolute inset-2.5 border border-cream/40" />
            <span className="font-hand text-[2.2rem] leading-none">
                F<span className="text-champagne">.</span>
            </span>
            <span className="mt-1 font-sans text-[8px] font-semibold uppercase tracking-[0.25em] text-champagne">Ghana</span>
        </span>
    );
}

/** An ink postmark: two rings with ACCRA · GHANA · 2026 round them, and wavy cancel lines. */
function Postmark() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 180 100"
            className="relative z-10 -mr-10 mt-6 h-auto w-[clamp(120px,13vw,170px)] -rotate-[8deg] text-mauve opacity-80"
            fill="none"
        >
            <defs>
                <path id="postmark-ring" d="M50 50m-31 0a31 31 0 1 1 62 0a31 31 0 1 1-62 0" />
            </defs>
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="1.2" />
            <text fill="currentColor" fontFamily="Jost, sans-serif" fontSize="8.5" fontWeight="600" letterSpacing="2.6">
                <textPath href="#postmark-ring">ACCRA · GHANA · 2026 ·</textPath>
            </text>
            <text x="50" y="53" textAnchor="middle" fill="currentColor" fontFamily="Jost, sans-serif" fontSize="9" fontWeight="600">
                OCT
            </text>
            {[38, 50, 62].map((y) => (
                <path
                    key={y}
                    d={`M96 ${y}c8-5 16 5 24 0s16-5 24 0 16 5 24 0`}
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                />
            ))}
        </svg>
    );
}

export default Talk;

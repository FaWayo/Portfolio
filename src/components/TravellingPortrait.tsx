import { useEffect, useRef } from 'react';

import { HERO_PHOTO, PORTRAITS } from '@/data/me';

/**
 * The hero portrait, carried down into the ME room by the scroll.
 *
 * One image, two homes. It starts as the cut-out standing behind the name in
 * the hero (`[data-portrait-from]`) and ends as a straight-edged print in ME's
 * photo slot (`[data-portrait-to]`). Between them it is scroll-linked: the page
 * moves under it while it drifts across and shrinks into place, tilting a few
 * degrees mid-flight like a print being set down, and landing square.
 *
 * ## It develops on the way
 *
 * The cut-out and the original studio photograph are the same 1122×1402 frame —
 * the cut-out is only a mask of it — so they can be stacked pixel for pixel.
 * As it travels, the hero's edge fade relaxes to nothing and the original
 * fades in over the cut-out, so the studio backdrop "develops" back around the
 * figure. It arrives in the cream room as a photograph, not a sticker.
 *
 * ## Progress
 *
 * 0 at the top of the page, 1 when the ME room's top reaches the top of the
 * viewport, eased in-out. Because the image's document position moves by about
 * as much as the page scrolls, it appears to hold its place on screen while the
 * hero slides away beneath it — that is the effect, and it needs no `fixed`.
 * Before and after the range it simply scrolls with its room.
 *
 * ## Fallbacks
 *
 * The two slots each render their own static `<img>`. This component only hides
 * them — by adding `portrait-travel` to <html> — once it has measured both
 * slots and is ready to paint. No JS, an error, or `prefers-reduced-motion`
 * leaves the static images exactly as they are. The traveller is aria-hidden;
 * the static images keep the alt text.
 */

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
/** 0 before `a`, 1 after `b`, smooth between. */
const band = (a: number, b: number, t: number) => {
    const x = clamp01((t - a) / (b - a));
    return x * x * (3 - 2 * x);
};

interface Box {
    x: number;
    y: number;
    w: number;
    h: number;
}

export function TravellingPortrait() {
    const ref = useRef<HTMLDivElement>(null);
    const photoRef = useRef<HTMLImageElement>(null);
    const cutout = HERO_PHOTO.src;
    const print = PORTRAITS[0]?.src;

    useEffect(() => {
        const el = ref.current;
        const photo = photoRef.current;
        if (!el || !photo || !cutout || !print) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const from = document.querySelector<HTMLElement>('[data-portrait-from]');
        const to = document.querySelector<HTMLElement>('[data-portrait-to]');
        const room = document.getElementById('me');
        if (!from || !to || !room) return;

        const docBox = (node: HTMLElement): Box => {
            const r = node.getBoundingClientRect();
            return { x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height };
        };

        const root = document.documentElement;
        let a: Box = docBox(from);
        let b: Box = docBox(to);
        let end = 1;
        let frame = 0;

        const paint = () => {
            frame = 0;
            const e = easeInOut(clamp01(window.scrollY / end));

            const w = lerp(a.w, b.w, e);
            const h = lerp(a.h, b.h, e);
            const x = lerp(a.x, b.x, e);
            const y = lerp(a.y, b.y, e);

            // The element is laid out at the landing size and scaled about its
            // centre, so translate to where that centre must be.
            const sx = w / b.w;
            const sy = h / b.h;
            const tx = x + w / 2 - b.w / 2;
            const ty = y + h / 2 - b.h / 2;
            const tilt = Math.sin(Math.PI * e) * -4;

            el.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${tilt}deg) scale(${sx}, ${sy})`;
            el.style.setProperty('--fade', String(1 - band(0.1, 0.7, e)));
            photo.style.opacity = String(band(0.3, 0.95, e));
        };

        const measure = () => {
            // Measure with the transform off so nothing we paint feeds back
            // into the geometry.
            a = docBox(from);
            b = docBox(to);
            end = Math.max(1, room.getBoundingClientRect().top + window.scrollY);
            el.style.width = `${b.w}px`;
            el.style.height = `${b.h}px`;
            paint();
        };

        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(paint);
        };

        measure();
        root.classList.add('portrait-travel');

        // Fonts, images and the viewport all move the slots.
        const resize = new ResizeObserver(() => measure());
        resize.observe(document.body);
        void document.fonts?.ready.then(measure);
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', measure);

        return () => {
            if (frame) cancelAnimationFrame(frame);
            resize.disconnect();
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', measure);
            root.classList.remove('portrait-travel');
        };
    }, [cutout, print]);

    if (!cutout || !print) return null;

    return (
        <div
            ref={ref}
            aria-hidden="true"
            className="portrait-traveller portrait-fade pointer-events-none absolute left-0 top-0 z-10 origin-center will-change-transform"
        >
            <img src={cutout} alt="" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
            <img
                ref={photoRef}
                src={print}
                alt=""
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover opacity-0"
            />
        </div>
    );
}

export default TravellingPortrait;

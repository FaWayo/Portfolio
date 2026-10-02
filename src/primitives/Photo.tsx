import type { CSSProperties } from 'react';
import Handwritten from '@/doodles/Handwritten';

interface PhotoProps {
    /** Omit to render the placeholder frame. */
    src?: string;
    /** Required whenever there is an image. Describe the moment, not the layout. */
    alt?: string;
    /** Degrees. Photographs are meant to sit slightly off-grid. */
    rotate?: number;
    aspect?: string;
    caption?: string;
    /**
     * How the print is held to the page. Default is a single flat tape tab at
     * the top-left, like a print pinned into a notebook.
     */
    pin?: Pin;
    className?: string;
    style?: CSSProperties;
}

export type Pin = 'tape' | 'none';

/** A single flat rectangle of tape. No blur, no shadow, no gloss. */
const PIN: Record<Pin, string | null> = {
    tape: 'bg-[var(--room-muted)]',
    none: null,
};

/**
 * A photograph, sitting slightly wrong on purpose.
 *
 * brand-direction §14: photography should feel like evidence of a life, so
 * images are never filtered — the frame handles rotation and settle, the pixels
 * are left alone. §16 wants a rotated photo to "settle into place", which is the
 * settlePhoto keyframe driven by --photo-rotate.
 *
 * The print is held down by a piece of tape, because a photo lying loose on a
 * page doesn't look placed. §10: pinned, not shadowed — the tape is one flat
 * block of the room's muted colour, with no blur and no shadow underneath. The
 * photo has no border and no drop shadow of its own; the rotation and the tape
 * are enough to say "someone put this here on purpose".
 *
 * Rotation is budgeted under 2° in §9. Past that it stops reading as hand-placed
 * and starts reading as broken.
 *
 * The placeholder is deliberately designed rather than a broken-image icon, so
 * a layout can be reviewed before any photograph exists.
 */
export function Photo({
    src,
    alt,
    rotate = -1,
    aspect = '4 / 5',
    caption,
    pin = 'tape',
    className,
    style,
}: PhotoProps) {
    const rotateVar = { '--photo-rotate': `${rotate}deg` } as CSSProperties;

    return (
        <figure className={`m-0 ${className ?? ''}`} style={{ ...rotateVar, ...style }}>
            <div className={`relative ${PIN[pin] ?? ''}`}>
                {pin !== 'none' && (
                    <span
                        aria-hidden="true"
                        className="absolute -left-2 -top-3 z-10 h-5 w-16 -rotate-[1.5deg] opacity-70"
                    />
                )}

                <div
                    className="relative overflow-hidden bg-rule/40 settle-photo"
                    style={{ aspectRatio: aspect }}
                >
                    {src ? (
                        <img
                            src={src}
                            alt={alt ?? ''}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center border border-dashed border-rule p-4">
                            <Handwritten className="text-center" rotate="-1.2deg">
                                photo goes here
                            </Handwritten>
                        </div>
                    )}
                </div>
            </div>

            {caption && (
                <figcaption className="mt-4">
                    <Handwritten rotate="-1.2deg">{caption}</Handwritten>
                </figcaption>
            )}
        </figure>
    );
}

export default Photo;
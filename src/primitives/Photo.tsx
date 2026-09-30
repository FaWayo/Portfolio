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
    /** Show a strip of tape across the top corner. */
    tape?: boolean;
    caption?: string;
    className?: string;
    style?: CSSProperties;
}

/**
 * A photograph, sitting slightly wrong on purpose.
 *
 * Brand-direction §14: photography should feel like evidence of a life, so
 * images are never filtered — the frame handles rotation, shadow and settle,
 * the pixels are left alone. §16 wants a rotated photo to "settle into place",
 * which is the settlePhoto keyframe driven by --photo-rotate.
 *
 * The placeholder is deliberately designed rather than a broken-image icon, so
 * a layout can be reviewed before any photograph exists.
 */
export function Photo({
    src,
    alt,
    rotate = -2,
    aspect = '4 / 5',
    tape = false,
    caption,
    className,
    style,
}: PhotoProps) {
    const rotateVar = { '--photo-rotate': `${rotate}deg` } as CSSProperties;

    return (
        <figure className={`m-0 ${className ?? ''}`} style={{ ...rotateVar, ...style }}>
            <div
                className="relative overflow-hidden bg-muted-rose/40 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.65)] settle-photo"
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
                        <Handwritten className="text-center text-base" rotate="-2deg">
                            photo goes here
                        </Handwritten>
                    </div>
                )}

                {tape && src && (
                    <span
                        aria-hidden="true"
                        className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-3 bg-ivory/25 backdrop-blur-[1px]"
                    />
                )}
            </div>

            {caption && (
                <figcaption className="mt-4">
                    <Handwritten rotate="-1.5deg" fontSize="0.95rem">
                        {caption}
                    </Handwritten>
                </figcaption>
            )}
        </figure>
    );
}

export default Photo;
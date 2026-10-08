import { useEffect, useRef } from 'react';

interface LoopVideoProps {
    src: string;
    /** Still shown while it loads, and instead of motion for reduced motion. */
    poster: string;
    /** Describes what is happening, for screen readers. */
    label: string;
    className?: string;
    style?: React.CSSProperties;
}

/**
 * A short silent clip that plays like a moving photograph (decision-log.md §56).
 *
 * Muted and inline, because browsers only autoplay muted video. It plays while
 * on screen and pauses when it leaves, so it never spends battery or data on
 * something nobody is looking at. `preload="metadata"` keeps it from
 * downloading until it is near. Under prefers-reduced-motion it never plays:
 * the poster is the picture.
 */
export function LoopVideo({ src, poster, label, className, style }: LoopVideoProps) {
    const ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = ref.current;
        if (!video) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (typeof IntersectionObserver === 'undefined') {
            void video.play().catch(() => {});
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) void video.play().catch(() => {});
                else video.pause();
            },
            { threshold: 0.25 },
        );
        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    return (
        <video
            ref={ref}
            src={src}
            poster={poster}
            aria-label={label}
            muted
            loop
            playsInline
            preload="metadata"
            className={className}
            style={style}
        />
    );
}

export default LoopVideo;

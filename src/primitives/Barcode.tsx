import { useMemo } from 'react';

interface BarcodeProps {
    /** Same seed always yields the same bars. */
    seed?: string;
    bars?: number;
    height?: number;
    className?: string;
}

/** FNV-1a, so the pattern is stable across renders instead of reshuffling. */
function hashSeed(seed: string): number {
    let h = 2166136261;
    for (let i = 0; i < seed.length; i += 1) {
        h ^= seed.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}

/**
 * A minimalist CSS barcode for card footers and margins.
 * Texture, not function — brand-direction §2.3 keeps it in the technical layer.
 */
export function Barcode({ seed = 'fatimah', bars = 28, height = 14, className }: BarcodeProps) {
    const widths = useMemo(() => {
        let state = hashSeed(seed);
        return Array.from({ length: bars }, () => {
            state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
            return 1 + Math.round((state / 4294967296) * 3);
        });
    }, [seed, bars]);

    return (
        <div
            aria-hidden="true"
            className={`flex items-stretch gap-[2px] text-accent/70 ${className ?? ''}`}
            style={{ height }}
        >
            {widths.map((w, i) => (
                <span
                    // widths are deterministic from seed, so index is a stable key
                    key={i}
                    className="block bg-current"
                    style={{ width: `${w}px` }}
                />
            ))}
        </div>
    );
}

export default Barcode;
interface MetricRow {
    label: string;
    value: string;
    detail?: string;
}

interface MetricTableProps {
    rows: MetricRow[];
    caption?: string;
    className?: string;
}

/**
 * Case study metrics as clean horizontal ruled rows.
 *
 * The whole point of the WORK room is "what I actually did" rather than what
 * the company does, so these are contribution-shaped rows, not vanity figures.
 */
export function MetricTable({ rows, caption, className }: MetricTableProps) {
    if (rows.length === 0) return null;

    return (
        <div className={className}>
            {caption && (
                <p className="pb-3 font-display italic text-lg text-muted">{caption}</p>
            )}
            <dl>
                {rows.map((row) => (
                    <div
                        key={row.label}
                        className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-rule py-4"
                    >
                        <dt className="font-sans text-xs text-muted">{row.label}</dt>
                        <dd className="text-right">
                            <span className="font-display text-2xl leading-tight text-ink">{row.value}</span>
                            {row.detail && (
                                <span className="ml-3 font-sans text-xs text-muted">{row.detail}</span>
                            )}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}

export default MetricTable;
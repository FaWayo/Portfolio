/**
 * Asset imports resolve to a URL string via webpack's asset/resource rule
 * (see webpack.config.js). Needed for the LIFE and ME photographs.
 */
declare module '*.svg' {
    const url: string;
    export default url;
}

declare module '*.png' {
    const url: string;
    export default url;
}

declare module '*.jpg' {
    const url: string;
    export default url;
}

declare module '*.jpeg' {
    const url: string;
    export default url;
}

declare module '*.webp' {
    const url: string;
    export default url;
}

declare module '*.avif' {
    const url: string;
    export default url;
}
declare module '*.mp4' {
    const url: string;
    export default url;
}

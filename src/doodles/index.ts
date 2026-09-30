/**
 * Doodle library. Nine components, matching the vocabulary in
 * brand-direction §10. Portraited from context/doodle-components.jsx, which
 * held six of them and defaulted two to crimson — crimson is gone from the
 * brand, so those now default to the room accent.
 *
 * Rules (brand-direction §11): imperfect, restrained, functional, slightly
 * unexpected. Not every section gets one.
 *
 * There is deliberately no `EditorialDot` — the source file had one, but "focal
 * dot" is not in the §10 vocabulary.
 */
export { Cloud } from './Cloud';
export { Arrow } from './Arrow';
export { QuestionMark } from './QuestionMark';
export { ExclamationMark } from './ExclamationMark';
export { HighlightCircle } from './HighlightCircle';
export { Underline } from './Underline';
export { Scribble } from './Scribble';
export { TinyStar } from './TinyStar';
export { Handwritten } from './Handwritten';

export type { DoodleProps } from './shared';
export { ACCENT, MUTED } from './shared';
import comeasyToOmaya from '@/assets/writing/comeasy-to-omaya.jpg';
import demoFridays from '@/assets/writing/demo-fridays.jpg';
import entrepreneurInTraining from '@/assets/writing/entrepreneur-in-training.jpg';
import lifeUpdate from '@/assets/writing/life-update.jpg';
import mySweetMama from '@/assets/writing/my-sweet-mama.jpg';

/**
 * WRITING — Fatimah's Medium posts, newest first (decision-log.md §63).
 *
 * Taken from her public feed (medium.com/feed/@fawayo) on 2026-10-07. Titles,
 * dates and the opening lines are hers, unchanged. Cover photos are the ones
 * from her own posts; "From Idea to Reality" used a MonkeyUser comic, someone
 * else's artwork, so it has none here. Read time is words ÷ 230, rounded up.
 *
 * Add a new post at the top: the newest becomes the featured one.
 */
export interface Post {
    title: string;
    href: string;
    /** As shown: "9 Sep 2026". */
    date: string;
    minutes: number;
    /** Her opening line, for the featured post. */
    opening?: string;
    cover?: string;
}

export const MEDIUM_URL = 'https://medium.com/@fawayo';

export const POSTS: readonly Post[] = [
    {
        title: 'My Sweet Mama',
        href: 'https://medium.com/@fawayo/my-sweet-mama-2a114475590a',
        date: '9 Sep 2026',
        minutes: 3,
        opening:
            'If you ever ask me where I first learned love, strength, and faith, I would take you straight to my mama.',
        cover: mySweetMama,
    },
    {
        title: 'From Comeasy to Omaya',
        href: 'https://medium.com/@fawayo/from-comeasy-to-omaya-92eaac1cec3e',
        date: '10 Aug 2026',
        minutes: 5,
        cover: comeasyToOmaya,
    },
    {
        title: 'Life Update…',
        href: 'https://medium.com/@fawayo/life-update-d58b50aec627',
        date: '6 Jun 2026',
        minutes: 4,
        cover: lifeUpdate,
    },
    {
        title: 'Demo Fridays: Less Than Two Months of Presentations, Endless Lessons',
        href: 'https://medium.com/@fawayo/demo-fridays-less-than-two-months-of-presentations-endless-lessons-45c0e1d16d7f',
        date: '15 Feb 2026',
        minutes: 5,
        cover: demoFridays,
    },
    {
        title: 'Reflections from an Entrepreneur in Training',
        href: 'https://medium.com/@fawayo/reflections-from-an-entrepreneur-in-training-b323b68d5c06',
        date: '24 Jan 2026',
        minutes: 3,
        cover: entrepreneurInTraining,
    },
    {
        title: 'Check In',
        href: 'https://medium.com/@fawayo/check-in-13273e618239',
        date: '20 Feb 2025',
        minutes: 2,
    },
    {
        title: 'From Idea to Reality',
        href: 'https://medium.com/@fawayo/from-idea-to-reality-c0b2cc7cdc07',
        date: '9 Sep 2024',
        minutes: 2,
    },
    {
        title: 'Does grief end?',
        href: 'https://medium.com/@fawayo/does-grief-end-3a88a6fca628',
        date: '5 Mar 2024',
        minutes: 5,
    },
    {
        title: 'New Year, Better Me',
        href: 'https://medium.com/@fawayo/2024-6e7309e714af',
        date: '5 Jan 2024',
        minutes: 2,
    },
    {
        title: 'Challenges',
        href: 'https://medium.com/@fawayo/challenges-9a68fab826e9',
        date: '13 Dec 2023',
        minutes: 2,
    },
];

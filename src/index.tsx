import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/App';
import '@/style.css';

// Files that must exist at the site root, under their own names: crawlers
// and link previews look for them there. Imported only so webpack emits them.
import '@/public/robots.txt';
import '@/public/sitemap.xml';
import '@/public/og.png';
import '@/public/apple-touch-icon.png';

const container = document.getElementById('root');

if (!container) {
    throw new Error('Root element #root not found');
}

createRoot(container).render(
    <StrictMode>
        <App />
    </StrictMode>
);
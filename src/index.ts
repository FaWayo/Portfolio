import './style.css';
import feather from 'feather-icons';

// DOM Elements
const nav = document.getElementById('main-nav') as HTMLElement;
const menuToggle = document.getElementById('menu-toggle') as HTMLElement;
const links = document.getElementById('links') as HTMLElement;
const header = document.getElementById('main-header') as HTMLElement;
const navSocialButtons = document.getElementById('nav-social-buttons') as HTMLElement;
const headerSocialButtons = document.getElementById('header-social-buttons') as HTMLElement;
const logo = document.querySelector('#main-header img') as HTMLElement;

// State
let isMenuOpen = false;

function toggleNavMenu(): void {
    nav.classList.toggle('w-20');
    nav.classList.toggle('w-64');
    nav.classList.toggle('px-20')
    links.classList.toggle('opacity-0');

    if (window.outerWidth < 1024) {
        navSocialButtons.classList.toggle('hidden');
    }

    isMenuOpen = !isMenuOpen;
    transformMenuIcon();
    handleOutsideClick();
    setupLinkInteractions();

    if (window.outerWidth < 1024) {
        if (isMenuOpen) {
            navSocialButtons.classList.remove('hidden');
            setTimeout(() => {
                navSocialButtons.classList.add('opacity-100');
                navSocialButtons.classList.remove('opacity-0');
            }, 50); // fade in after slight delay
        } else {
            navSocialButtons.classList.remove('opacity-100');
            navSocialButtons.classList.add('opacity-0');
            setTimeout(() => {
                navSocialButtons.classList.add('hidden');
            }, 300); // hide after fade out
        }
    }
}

function transformMenuIcon(): void {
    menuToggle.querySelectorAll('span').forEach((span, index) => {
        const isExpanded = nav.classList.contains('w-64');

        if (isExpanded) {
            if (index === 0) span.classList.add('rotate-45', 'translate-y-2');
            if (index === 1) span.classList.add('opacity-0');
            if (index === 2) span.classList.add('-rotate-45', '-translate-y-2');
        } else {
            span.classList.remove('rotate-45', '-rotate-45', 'translate-y-2', '-translate-y-2', 'opacity-0');
        }
    });
}

function handleOutsideClick(): void {
    if (isMenuOpen) {
        const clickListener = (event: MouseEvent) => {
            if (!nav.contains(event.target as Node)) {
                closeNavMenu();
                document.removeEventListener('click', clickListener);
            }
        };
        document.addEventListener('click', clickListener);
    }
}

function closeNavMenu(): void {
    nav.classList.remove('w-64');
    nav.classList.add('w-20');
    links.classList.add('opacity-0');
    isMenuOpen = false;
    transformMenuIcon();
}

function setupLinkInteractions(): void {
    const linkContainers = document.querySelectorAll('#links > ul > div');
    linkContainers.forEach((container: Element) => {
        const li = container.querySelector('li') as HTMLElement;
        const underline = container.querySelector('p') as HTMLElement;

        li.addEventListener('mouseenter', () => {
            if (!li.classList.contains('text-red')) {
                underline.classList.remove('w-0');
                underline.classList.add('w-10');
            }
        });

        li.addEventListener('mouseleave', () => {
            if (!li.classList.contains('text-red')) {
                underline.classList.remove('w-10');
                underline.classList.add('w-0');
            }
        });

        li.addEventListener('click', () => {
            resetLinks();
            li.classList.add('text-red');
            underline.classList.remove('w-0');
            underline.classList.add('w-10');
            closeNavMenu();
        });
    });
}

function resetLinks(): void {
    document.querySelectorAll('#links > ul > div').forEach((container: Element) => {
        const li = container.querySelector('li') as HTMLElement;
        const underline = container.querySelector('span') as HTMLElement;
        li.classList.remove('text-red');
        underline.classList.remove('w-10');
        underline.classList.add('w-0');
    });
}

function setupResponsiveHeader(): void {
    function handleResize() {
        if (window.outerWidth >= 1024) {
            // Large screen: Show header social buttons, hide nav social buttons
            headerSocialButtons.classList.remove('hidden');
            navSocialButtons.classList.add('hidden');

            // Ensure header is properly styled for desktop
            header.classList.add('flex', 'justify-between', 'items-center');
            headerSocialButtons.classList.remove('opacity-0', 'translate-y-[-100px]');
            headerSocialButtons.classList.add('opacity-100');
        } else {
            // Small screen: Hide header social buttons
            headerSocialButtons.classList.add('hidden');

            // Nav social buttons shown only when menu is open
            if (!isMenuOpen) {
                navSocialButtons.classList.add('hidden');
            }
        }
    }

    handleResize();

    let resizeTimeout: ReturnType<typeof setTimeout>;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 100);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const elements = document.querySelectorAll('.appear-animation');
        elements.forEach(el => {
            el.classList.remove('translate-x-full', 'opacity-0');
            el.classList.add('translate-x-0', 'opacity-100');
        });
    }, 300);
});

document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        root: null as any,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to trigger animations
                entry.target.classList.add('visible');
                
                // Also add visible class to any timeline dots within this element
                const dots = entry.target.querySelectorAll('.timeline-dot');
                dots.forEach(dot => dot.classList.add('visible'));
                
                // Stop observing after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
});

document.addEventListener('DOMContentLoaded', () => {
    // Animate logo and social buttons
    logo.classList.remove('opacity-0', 'transform', 'translate-y-[-100px]');
    logo.classList.add('animate-drop-in');

    headerSocialButtons.classList.remove('opacity-0', 'transform', 'translate-y-[-100px]');
    headerSocialButtons.classList.add('animate-drop-in');

    // Setup click toggle for nav menu
    menuToggle.addEventListener('click', (event: Event) => {
        event.stopPropagation();
        toggleNavMenu();
    });

    // Setup responsive behavior
    setupResponsiveHeader();

    // Replace feather icons
    feather.replace();
});


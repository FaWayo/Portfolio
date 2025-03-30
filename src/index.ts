import './style.css';
import feather from 'feather-icons';

feather.replace();

// Optimized navigation and header code
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav') as HTMLElement;
    const menuToggle = document.getElementById('menu-toggle') as HTMLElement;
    const links = document.getElementById('links') as HTMLElement;
    const header = document.getElementById('header') as HTMLElement;
    const socialButtons = document.getElementById('media-buttons') as HTMLElement;

    let isMenuOpen = false;

    const logo = document.querySelector('#header img') as HTMLElement;

    // Delay the animation slightly so the page is fully loaded
    setTimeout(() => {
        logo.classList.remove('opacity-0', 'transform', 'translate-y-[-100px]');
        logo.classList.add('animate-drop-in');  // Trigger drop-in animation

        socialButtons.classList.remove('opacity-0', 'transform', 'translate-y-[-100px]');
        socialButtons.classList.add('animate-drop-in');  // Trigger drop-in animation
    }, 100);

    // Function to toggle navigation menu
    function toggleNavMenu(): void {
        nav.classList.toggle('w-20');
        nav.classList.toggle('w-64');
        links.classList.toggle('opacity-0');
        isMenuOpen = !isMenuOpen;
        transformMenuIcon();
        handleOutsideClick();
        setupLinkInteractions();
    }

    // Function to convert menu icon to 'X' and vice versa
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

    // Handling outside click
    function handleOutsideClick(): void {
        if (isMenuOpen) {
            const clickListener = (event: MouseEvent) => {
                if (!nav.contains(event.target as Node) && isMenuOpen) {
                    closeNavMenu();
                    document.removeEventListener('click', clickListener);
                }
            };
            document.addEventListener('click', clickListener);
        }
    }

    // Function to close the nav menu
    function closeNavMenu(): void {
        nav.classList.remove('w-64');
        nav.classList.add('w-20');
        links.classList.add('opacity-0');
        isMenuOpen = false;
        transformMenuIcon();
    }

    // Function to handle interactions with nav links
    function setupLinkInteractions(): void {
        const linkContainers = document.querySelectorAll('#links > ul > div');
        linkContainers.forEach((container: Element) => {
            const li = container.querySelector('li') as HTMLElement;
            const underline = container.querySelector('span') as HTMLElement;

            li.addEventListener('mouseenter', () => {
                if (!li.classList.contains('text-red')) {
                    underline.classList.remove('w-0');
                    underline.classList.add('w-full');
                }
            });

            li.addEventListener('mouseleave', () => {
                if (!li.classList.contains('text-red')) {
                    underline.classList.remove('w-full');
                    underline.classList.add('w-0');
                }
            });

            li.addEventListener('click', () => {
                resetLinks();
                li.classList.add('text-red');
                underline.classList.remove('w-0');
                underline.classList.add('w-full');
                closeNavMenu();
            });
        });
    }

    // Reset all link styles to default
    function resetLinks(): void {
        document.querySelectorAll('#links > ul > div').forEach((container: Element) => {
            const li = container.querySelector('li') as HTMLElement;
            const underline = container.querySelector('span') as HTMLElement;
            li.classList.remove('text-red');
            underline.classList.remove('w-full');
            underline.classList.add('w-0');
        });
    }

    // Event listener for menu toggle button
    menuToggle.addEventListener('click', (event: Event) => {
        event.stopPropagation();
        toggleNavMenu();
    });

    // Mobile header setup
    function setupResponsiveHeader(): void {
        const mobileMenuButton = document.createElement('button');
        mobileMenuButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        `;
        mobileMenuButton.classList.add('mobile-menu-button', 'md:hidden', 'p-2');
        header.appendChild(mobileMenuButton);

        // Initial setup for social buttons visibility based on window width
        if (window.innerWidth < 768) {
            socialButtons.classList.add('hidden');
        }

        mobileMenuButton.addEventListener('click', () => {
            socialButtons.classList.toggle('hidden');
            socialButtons.classList.toggle('flex-col');
            socialButtons.classList.toggle('absolute');
            socialButtons.classList.toggle('top-16');
            socialButtons.classList.toggle('right-4');
            socialButtons.classList.toggle('bg-white');
            socialButtons.classList.toggle('p-4');
            socialButtons.classList.toggle('shadow-lg');
            socialButtons.classList.toggle('rounded');
        });

        // Debounced resize handler
        let resizeTimeout: ReturnType<typeof setTimeout>;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (window.innerWidth >= 768) {
                    socialButtons.classList.remove('hidden', 'flex-col', 'absolute', 'top-16', 'right-4', 'bg-white', 'p-4', 'shadow-lg', 'rounded');
                    socialButtons.classList.add('flex', 'gap-10');
                    header.classList.add('mr-8');
                } else {
                    socialButtons.classList.add('hidden');
                    socialButtons.classList.remove('flex-col', 'absolute', 'top-16', 'right-4', 'bg-white', 'p-4', 'shadow-lg', 'rounded');
                    header.classList.remove('mr-8');
                }
            }, 100); // Wait 100ms after resize stops
        });

        // Initial call to handle header transformation
        if (window.innerWidth >= 768) {
            header.classList.add('mr-8');
        }
    }

    setupResponsiveHeader();
    feather.replace();  // Only call once
});

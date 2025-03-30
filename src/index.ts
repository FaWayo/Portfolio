import './style.css';
import feather from 'feather-icons';

feather.replace();

//NAVIGATION
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav') as HTMLElement;
    const menuToggle = document.getElementById('menu-toggle') as HTMLElement;
    const links = document.getElementById('links') as HTMLElement;


    function toggleNavMenu(): void {
        nav.classList.toggle('w-20');
        nav.classList.toggle('w-64');
        links.classList.toggle('opacity-0');

        transformMenuIcon();
        addOutsideClickListener();
        addLinkClickListeners();
        setupLinkInteractions();
    }

    function transformMenuIcon(): void {
        menuToggle.querySelectorAll('span').forEach((span, index) => {
            const isExpanded = nav.classList.contains('w-64');

            if (isExpanded) {
                if (index === 0) span.classList.add('rotate-45', 'translate-y-2');
                if (index === 1) span.classList.add('opacity-0');
                if (index === 2) span.classList.add('-rotate-45', '-translate-y-2');
            } else {
                span.classList.remove(
                    'rotate-45', '-rotate-45', 'translate-y-2', '-translate-y-2', 'opacity-0'
                );
            }
        });
    }

    function addOutsideClickListener(): void {
        document.addEventListener('click', (event: MouseEvent) => {
            const isMenuOpen = nav.classList.contains('w-64');
            const isClickInsideNav = nav.contains(event.target as Node);

            if (!isClickInsideNav && isMenuOpen) {
                closeNavMenu();
            }
        });
    }

    function addLinkClickListeners(): void {
        document.querySelectorAll('#links li').forEach((link: Element) => {
            link.addEventListener('click', closeNavMenu);
        });
    }

    function closeNavMenu(): void {
        nav.classList.remove('w-64');
        nav.classList.add('w-20');
        links.classList.add('opacity-0');

        menuToggle.querySelectorAll('span').forEach((span: Element) => {
            span.classList.remove(
                'rotate-45', '-rotate-45', 'translate-y-2', '-translate-y-2', 'opacity-0'
            );
        });
    }

    function setupLinkInteractions(): void {
        const linkContainers = document.querySelectorAll('#links > ul > div');

        function resetLinks(): void {
            linkContainers.forEach((container: Element) => {
                const li = container.querySelector('li') as HTMLElement;
                const underline = container.querySelector('span') as HTMLElement;

                li.classList.remove('text-red');
                underline.classList.remove('w-full');
                underline.classList.add('w-0');
            });
        }

        linkContainers.forEach((container: Element) => {
            const li = container.querySelector('li') as HTMLElement;
            const underline = container.querySelector('span') as HTMLElement;

            underline.classList.add('w-0');

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
            });
        });
    }

    menuToggle.addEventListener('click', (event: Event) => {
        event.stopPropagation();
        toggleNavMenu();
    });

    feather.replace();
});
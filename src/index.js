import './style.css';
import feather from 'feather-icons';


feather.replace();

document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav')
    const menuToggle = document.getElementById('menu-toggle')
    const links = document.getElementById('links')

    menuToggle.addEventListener('click', (event) => {
        event.stopPropagation()
        nav.classList.toggle('w-20')
        nav.classList.toggle('w-64')
        links.classList.toggle('opacity-0')

        menuToggle.querySelectorAll('span').forEach((span, index) => {
            if (nav.classList.contains('w-64')) {
                if (index === 0) span.classList.add('rotate-45', 'translate-y-2')
                if (index === 1) span.classList.add('opacity-0')
                if (index === 2) span.classList.add('-rotate-45', '-translate-y-2')
            } else {
                span.classList.remove('rotate-45', '-rotate-45', 'translate-y-2', '-translate-y-2', 'opacity-0')
            }
        })

        document.addEventListener('click', (event) => {
            if (!nav.contains(event.target) && nav.classList.contains('w-64')) {
                nav.classList.remove('w-64')
                nav.classList.add('w-20')
                links.classList.add('opacity-0')

                menuToggle.querySelectorAll('span').forEach(span => {
                    span.classList.remove('rotate-45', '-rotate-45', 'translate-y-2', '-translate-y-2', 'opacity-0')
                });
            }
        });

        document.querySelectorAll('#links li').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('w-64')
                nav.classList.add('w-20')
                links.classList.add('opacity-0')

                menuToggle.querySelectorAll('span').forEach(span => {
                    span.classList.remove('rotate-45', '-rotate-45', 'translate-y-2', '-translate-y-2', 'opacity-0')
                })
            })
        })


        const linkContainers = document.querySelectorAll('#links > ul > div');

        const resetLinks = () => {
            linkContainers.forEach(container => {
                const li = container.querySelector('li');
                const underline = container.querySelector('span');

                li.classList.remove('text-red');
                underline.classList.remove('w-full');
                underline.classList.add('w-0');
            });
        };

        linkContainers.forEach(container => {
            const li = container.querySelector('li')
            const underline = container.querySelector('span')

            underline.classList.add('w-0')

            li.addEventListener('mouseenter', () => {
                if (!li.classList.contains('text-red')) {
                    underline.classList.remove('w-0')
                    underline.classList.add('w-full')
                }
            });


            li.addEventListener('mouseleave', () => {
                // Only remove if not the active link
                if (!li.classList.contains('text-red')) {
                    underline.classList.remove('w-full')
                    underline.classList.add('w-0')
                }
            });

            li.addEventListener('click', () => {
                resetLinks()

                li.classList.add('text-red')
                underline.classList.remove('w-0')
                underline.classList.add('w-full')
            });
        })
    })
})


import './style.css';
import feather from 'feather-icons';


feather.replace();

//NAVIGATION

document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav')
    const menuToggle = document.getElementById('menu-toggle')
    const links = document.getElementById('links')
    
    function createImageElement(src, alt) {
        const img = document.createElement('img')
        img.src = src
        img.classList.add('responsive-image')
        return img
    }
    

    function toggleNavMenu() {
        nav.classList.toggle('w-20')
        nav.classList.toggle('w-64')
        links.classList.toggle('opacity-0')

        transformMenuIcon()
        addOutsideClickListener()
        addLinkClickListeners()
        setupLinkInteractions()
    }

    function transformMenuIcon() {
        menuToggle.querySelectorAll('span').forEach((span, index) => {
            const isExpanded = nav.classList.contains('w-64')

            if (isExpanded) {
                if (index === 0) span.classList.add('rotate-45', 'translate-y-2')
                if (index === 1) span.classList.add('opacity-0')
                if (index === 2) span.classList.add('-rotate-45', '-translate-y-2')
            } else {
                span.classList.remove(
                    'rotate-45', '-rotate-45', 'translate-y-2', '-translate-y-2', 'opacity-0'
                )
            }
        })
    }

    function addOutsideClickListener() {
        document.addEventListener('click', (event) => {
            const isMenuOpen = nav.classList.contains('w-64')
            const isClickInsideNav = nav.contains(event.target)

            if (!isClickInsideNav && isMenuOpen) {
                closeNavMenu()
            }
        })
    }

    function addLinkClickListeners() {
        document.querySelectorAll('#links li').forEach(link => {
            link.addEventListener('click', closeNavMenu)
        })
    }

    function closeNavMenu() {
        nav.classList.remove('w-64')
        nav.classList.add('w-20')
        links.classList.add('opacity-0')

        menuToggle.querySelectorAll('span').forEach(span => {
            span.classList.remove(
                'rotate-45', '-rotate-45', 'translate-y-2', '-translate-y-2', 'opacity-0'
            )
        })
    }

    function setupLinkInteractions() {
        const linkContainers = document.querySelectorAll('#links > ul > div')

        function resetLinks() {
            linkContainers.forEach(container => {
                const li = container.querySelector('li')
                const underline = container.querySelector('span')

                li.classList.remove('text-red')
                underline.classList.remove('w-full')
                underline.classList.add('w-0')
            })
        }

        linkContainers.forEach(container => {
            const li = container.querySelector('li')
            const underline = container.querySelector('span')

            underline.classList.add('w-0')

            li.addEventListener('mouseenter', () => {
                if (!li.classList.contains('text-red')) {
                    underline.classList.remove('w-0')
                    underline.classList.add('w-full')
                }
            })

            li.addEventListener('mouseleave', () => {
                if (!li.classList.contains('text-red')) {
                    underline.classList.remove('w-full')
                    underline.classList.add('w-0')
                }
            })

            li.addEventListener('click', () => {
                resetLinks()
                li.classList.add('text-red')
                underline.classList.remove('w-0')
                underline.classList.add('w-full')
            })
        })
    }

    menuToggle.addEventListener('click', (event) => {
        event.stopPropagation()
        toggleNavMenu()
    })

    feather.replace()
})

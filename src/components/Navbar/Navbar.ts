// src/components/Navbar/Navbar.ts
console.trace('Navbar instance created');

import { Component } from "../Component";

export class Navbar extends Component<HTMLElement> {
  private isMenuOpen: boolean = false;
  private menuToggle: HTMLElement;
  private links: HTMLElement;
  private navSocialButtons: HTMLElement;

  constructor() {
    super('navbar-template');
    this.initialize();
  }

  protected initialize(): void {
    this.menuToggle = this.element.querySelector('#menu-toggle') as HTMLElement;
    console.log('Menu toggle found:', !!this.menuToggle);
    
    this.links = this.element.querySelector('#links') as HTMLElement;
    console.log('Links found:', !!this.links);
    
    this.navSocialButtons = this.element.querySelector('#nav-social-buttons') as HTMLElement;
    console.log('Nav social buttons found:', !!this.navSocialButtons);

    this.menuToggle.addEventListener('click', (event: Event) => {
      event.preventDefault();
      event.stopPropagation(); // this helps avoid bubbling up
      this.toggleNavMenu();
    });
    

    this.setupLinkInteractions();
  }

  private toggleNavMenu(): void {
    console.log('Toggle menu called, current state:', this.isMenuOpen);
    this.isMenuOpen = !this.isMenuOpen;
    
    if (this.isMenuOpen) {
      this.element.classList.remove('w-20');
      this.element.classList.add('w-64');
      this.element.classList.add('px-20');
      this.links.classList.remove('opacity-0');
      
      if (window.outerWidth < 1024) {
        this.navSocialButtons.classList.remove('hidden');
        setTimeout(() => {
          this.navSocialButtons.classList.add('opacity-100');
          this.navSocialButtons.classList.remove('opacity-0');
        }, 50);
      }
    } else {
      this.element.classList.add('w-20');
      this.element.classList.remove('w-64');
      this.element.classList.remove('px-20');
      this.links.classList.add('opacity-0');
      
      if (window.outerWidth < 1024) {
        this.navSocialButtons.classList.remove('opacity-100');
        this.navSocialButtons.classList.add('opacity-0');
        setTimeout(() => {
          this.navSocialButtons.classList.add('hidden');
        }, 300);
      }
    }
    
    this.transformMenuIcon();
    
    if (this.isMenuOpen) {
      this.handleOutsideClick();
    }
    
    console.log('After toggle, isMenuOpen:', this.isMenuOpen);
  }

  private transformMenuIcon(): void {
    console.log('transform menu icon, isMenuOpen:', this.isMenuOpen);
    this.menuToggle.querySelectorAll('span').forEach((span, index) => {
      if (this.isMenuOpen) {
        if (index === 0) span.classList.add('rotate-45', 'translate-y-2');
        if (index === 1) span.classList.add('opacity-0');
        if (index === 2) span.classList.add('-rotate-45', '-translate-y-2');
      } else {
        span.classList.remove('rotate-45', '-rotate-45', 'translate-y-2', '-translate-y-2', 'opacity-0');
      }
    });
  }

  private handleOutsideClick(): void {
    document.removeEventListener('click', this.outsideClickHandler);
  
    setTimeout(() => {
      // Wrap inside closure to capture current menu reference safely
      document.addEventListener('click', this.outsideClickHandler, { once: true });
    }, 0); // shorter delay can still prevent immediate bubbling
  }
  
  private outsideClickHandler = (event: MouseEvent) => {
    const target = event.target as Node;
    if (!this.element.contains(target)) {
      console.log('Outside click detected, closing menu');
      this.closeNavMenu();
    }
  };
  

  public closeNavMenu(): void {
    this.element.classList.remove('w-64');
    this.element.classList.add('w-20');
    this.links.classList.add('opacity-0');
    this.isMenuOpen = false;
    this.transformMenuIcon();
  }

  private setupLinkInteractions(): void {
    const linkContainers = this.element.querySelectorAll('#links > ul > div');
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
        this.resetLinks();
        li.classList.add('text-red');
        underline.classList.remove('w-0');
        underline.classList.add('w-full');
        this.closeNavMenu();
      });
    });
  }

  private resetLinks(): void {
    this.element.querySelectorAll('#links > ul > div').forEach((container: Element) => {
      const li = container.querySelector('li') as HTMLElement;
      const underline = container.querySelector('span') as HTMLElement;
      li.classList.remove('text-red');
      underline.classList.remove('w-full');
      underline.classList.add('w-0');
    });
  }
}
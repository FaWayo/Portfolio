import { Component } from '../Component';

export class Header extends Component<HTMLElement> {
  private logo: HTMLElement;
  private socialButtons: HTMLElement;
  private navSocialButtons: HTMLElement | null;

  constructor(navSocialButtons: HTMLElement | null = null) {
    super('header-template');
    this.navSocialButtons = navSocialButtons;
    this.initialize();
  }

  protected initialize(): void {
    this.logo = this.element.querySelector('img') as HTMLElement;
    this.socialButtons = this.element.querySelector('#header-social-buttons') as HTMLElement;
    
    setTimeout(() => {
      this.logo.classList.remove('opacity-0', 'transform', 'translate-y-[-100px]');
      this.logo.classList.add('animate-drop-in');

      this.socialButtons.classList.remove('opacity-0', 'transform', 'translate-y-[-100px]');
      this.socialButtons.classList.add('animate-drop-in');
    }, 300);
    
    this.setupResponsiveHeader();
  }

  private setupResponsiveHeader(): void {
    const handleResize = () => {
      if (window.outerWidth >= 1024) {
        // Large screen: Show header social buttons, hide nav social buttons
        this.socialButtons.classList.remove('hidden');
        if (this.navSocialButtons) {
          this.navSocialButtons.classList.add('hidden');
        }

        this.element.classList.add('flex', 'justify-between', 'items-center');
        this.socialButtons.classList.remove('opacity-0', 'translate-y-[-100px]');
        this.socialButtons.classList.add('opacity-100');
      } else {
        // Small screen: Hide header social buttons
        this.socialButtons.classList.add('hidden');
      }
    };

    handleResize();

    let resizeTimeout: ReturnType<typeof setTimeout>;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    });
  }
}
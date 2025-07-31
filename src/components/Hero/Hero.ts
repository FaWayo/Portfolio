import { Component } from '../Component';

export class Hero extends Component<HTMLElement> {
  constructor() {
    super('hero-template');
    this.initialize();
  }

  protected initialize(): void {
    setTimeout(() => {
      const elements = this.element.querySelectorAll('.appear-animation');
      elements.forEach(el => {
        el.classList.remove('translate-x-full', 'opacity-0');
        el.classList.add('translate-x-0', 'opacity-100');
      });
    }, 300);
  }
}
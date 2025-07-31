import { Component } from "@/components/Component";


export interface SkillTagOptions {
  text: string;
  delayClass?: 'animate-delay-100' | 'animate-delay-200' | 'animate-delay-300' | 'animate-delay-400' | 'animate-delay-500';
  customClasses?: string;
}

export class SkillTag extends Component<HTMLDivElement> {
  private options: SkillTagOptions;
  private textElement: HTMLParagraphElement;

  constructor(options: SkillTagOptions) {
    super('skill-tag-template');
    this.options = options;
    this.textElement = this.element.querySelector('p') as HTMLParagraphElement;
    this.initialize();
  }

  protected initialize(): void {
    // Set skill tag text
    this.textElement.textContent = this.options.text;
    
    // Add animation delay class if provided
    if (this.options.delayClass) {
      this.element.classList.add(this.options.delayClass);
    }
    
    // Add custom classes if provided
    if (this.options.customClasses) {
      const customClasses = this.options.customClasses.split(' ');
      this.element.classList.add(...customClasses);
    }
  }
  
  // Method to update skill tag text
  public setText(text: string): void {
    this.textElement.textContent = text;
  }
  
  // Method to add a click event listener
  public onClick(callback: (event: MouseEvent) => void): void {
    this.element.addEventListener('click', callback);
  }
}
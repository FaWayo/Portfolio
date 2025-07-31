import { Component } from "@/components/Component";

export interface ButtonOptions {
  text: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  classes?: string;
}

export class Button extends Component<HTMLButtonElement> {
  private options: ButtonOptions;

  constructor(options: ButtonOptions) {
    super('button-template');
    this.options = {
      variant: 'primary',
      size: 'medium',
      ...options
    };
    
    this.initialize();
  }

  protected initialize(): void {
    // Set button text
    this.element.textContent = this.options.text;
    
    // Apply classes based on variant
    this.applyVariantClasses();
    
    // Apply size classes
    this.applySizeClasses();
    
    // Apply custom classes if provided
    if (this.options.classes) {
      const customClasses = this.options.classes.split(' ');
      this.element.classList.add(...customClasses);
    }
    
    // Add click event listener
    if (this.options.onClick) {
      this.element.addEventListener('click', this.options.onClick);
    }
  }
  
  private applyVariantClasses(): void {
    switch (this.options.variant) {
      case 'primary':
        this.element.classList.add(
          'bg-[#54577C]',
          'text-white',
          'hover:shadow-lg'
        );
        break;
      case 'secondary':
        this.element.classList.add(
          'bg-[#D64933]',
          'text-white',
          'hover:shadow-lg'
        );
        break;
      case 'outline':
        this.element.classList.add(
          'bg-transparent',
          'border-2',
          'border-[#54577C]',
          'text-[#54577C]',
          'hover:bg-[#54577C]/10'
        );
        break;
    }
  }
  
  private applySizeClasses(): void {
    switch (this.options.size) {
      case 'small':
        this.element.classList.add('py-2', 'px-4', 'text-sm');
        break;
      case 'medium':
        this.element.classList.add('py-3', 'px-6', 'text-lg');
        break;
      case 'large':
        this.element.classList.add('py-4', 'px-8', 'text-xl');
        break;
    }
  }

  // Method to update button text
  public setText(text: string): void {
    this.element.textContent = text;
  }
  
  // Method to disable/enable the button
  public setDisabled(disabled: boolean): void {
    this.element.disabled = disabled;
    if (disabled) {
      this.element.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
      this.element.classList.remove('opacity-50', 'cursor-not-allowed');
    }
  }
}
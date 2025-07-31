export abstract class Component<T extends HTMLElement = HTMLElement> {
    protected element: T;
  
    constructor(templateId: string) {
      const template = document.getElementById(templateId) as HTMLTemplateElement;
      if (!template) {
        throw new Error(`Template with id ${templateId} not found`);
      }
      
      const clone = document.importNode(template.content, true);
      this.element = clone.firstElementChild as T;
      
      this.initialize();
    }
  
    // Method to be implemented by child classes
    protected abstract initialize(): void;
  
    // Get the actual DOM element
    public getElement(): T {
      return this.element;
    }
  
    // Method to attach the component to the DOM
    public attachTo(parent: Element, position: InsertPosition = 'beforeend'): void {
      parent.insertAdjacentElement(position, this.element);
    }
  
    // Method to remove the component from the DOM
    public remove(): void {
      if (this.element.parentElement) {
        this.element.parentElement.removeChild(this.element);
      }
    }
  }
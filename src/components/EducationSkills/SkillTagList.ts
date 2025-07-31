import { SkillTag, SkillTagOptions } from '@/reusable-components/SkillTag';
import { Component } from '../Component';


export interface SkillTagListOptions {
  skills: string[];
  containerClasses?: string;
}

export class SkillTagList extends Component<HTMLDivElement> {
  private options: SkillTagListOptions;
  private skillTags: SkillTag[] = [];
  
  // Animation delay classes to cycle through
  private delayClasses: Array<'animate-delay-100' | 'animate-delay-200' | 'animate-delay-300' | 'animate-delay-400' | 'animate-delay-500'> = [
    'animate-delay-100',
    'animate-delay-200',
    'animate-delay-300',
    'animate-delay-400',
    'animate-delay-500'
  ];

  constructor(options: SkillTagListOptions) {
    super('skill-tag-list-template');
    this.options = options;
    this.initialize();
  }

  protected initialize(): void {
    // Add container classes if provided
    if (this.options.containerClasses) {
      const customClasses = this.options.containerClasses.split(' ');
      this.element.classList.add(...customClasses);
    }
    
    // Create and append skill tags
    this.createSkillTags();
  }
  
  private createSkillTags(): void {
    this.options.skills.forEach((skill, index) => {
      // Cycle through delay classes
      const delayIndex = index % this.delayClasses.length;
      const delayClass = this.delayClasses[delayIndex];
      
      // Create skill tag
      const skillTagOptions: SkillTagOptions = {
        text: skill,
        delayClass
      };
      
      const skillTag = new SkillTag(skillTagOptions);
      this.skillTags.push(skillTag);
      
      // Append to container
      skillTag.attachTo(this.element);
    });
  }
  
  // Method to add a new skill tag
  public addSkill(text: string): void {
    const skillTagOptions: SkillTagOptions = {
      text,
      delayClass: this.delayClasses[this.skillTags.length % this.delayClasses.length]
    };
    
    const skillTag = new SkillTag(skillTagOptions);
    this.skillTags.push(skillTag);
    
    skillTag.attachTo(this.element);
  }
  
  // Method to remove a skill tag by text
  public removeSkill(text: string): boolean {
    const index = this.skillTags.findIndex(tag => {
      const element = tag.getElement().querySelector('p') as HTMLParagraphElement;
      return element.textContent === text;
    });
    
    if (index !== -1) {
      this.skillTags[index].remove();
      this.skillTags.splice(index, 1);
      return true;
    }
    
    return false;
  }
  
  // Method to get all skill tags
  public getSkillTags(): SkillTag[] {
    return [...this.skillTags];
  }
}
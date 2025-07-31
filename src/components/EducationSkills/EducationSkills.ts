// src/components/EducationSkills/EducationSkills.ts
import { Button } from '@/reusable-components/Button';
import { Component } from '../Component';
import { SkillTagList } from './SkillTagList';


export class EducationSkills extends Component<HTMLElement> {
  private skillsList: SkillTagList;

  constructor() {
    super('education-skills-template');
    this.initialize();
  }

  protected initialize(): void {
    this.setupScrollAnimations();
    this.createSkillsSection();
    this.addDownloadResumeButton();
  }

  private setupScrollAnimations(): void {
    const observerOptions = {
      root: null as any,
      rootMargin: '0px',
      threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add visible class to trigger animations
          entry.target.classList.add('visible');
          
          // Also add visible class to any timeline dots within this element
          const dots = entry.target.querySelectorAll('.timeline-dot');
          dots.forEach(dot => dot.classList.add('visible'));
          
          // Stop observing after animation is triggered
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    const animatedElements = this.element.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
  }

  private createSkillsSection(): void {
    // Find the skills container
    const skillsContainer = this.element.querySelector('.skills-container') as HTMLElement;
    if (!skillsContainer) return;
    
    // Create skills list with all the skills
    this.skillsList = new SkillTagList({
      skills: [
        'HTML/CSS',
        'JavaScript',
        'TypeScript',
        'C#',
        'SQL',
        'React',
        '.NET',
        'Express',
        'Node.js',
        'Git',
        'Figma',
        'Azure',
        'Problem Solving'
      ]
    });
    
    // Attach to the container
    this.skillsList.attachTo(skillsContainer);
  }

  private addDownloadResumeButton(): void {
    // Find the button container
    const buttonContainer = this.element.querySelector('.resume-button-container') as HTMLElement;
    if (!buttonContainer) return;
    
    // Create download resume button
    const downloadButton = new Button({
      text: 'Download Resume',
      variant: 'outline',
      size: 'medium',
      onClick: () => {
        console.log('Download resume clicked');
     
      }
    });
    
    downloadButton.attachTo(buttonContainer);
  }
  
  public addSkill(skill: string): void {
    if (this.skillsList) {
      this.skillsList.addSkill(skill);
    }
  }
  
  public removeSkill(skill: string): boolean {
    if (this.skillsList) {
      return this.skillsList.removeSkill(skill);
    }
    return false;
  }
}
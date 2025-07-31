// Example of how to use the components in index.ts
import './style.css';
import feather from 'feather-icons';
import { Navbar } from './components/Navbar/Navbar';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { EducationSkills } from './components/EducationSkills/EducationSkills';
import { Button } from './reusable-components/Button';
import { SkillTag } from './reusable-components/SkillTag';
import { SkillTagList } from './components/EducationSkills/SkillTagList';
document.addEventListener('DOMContentLoaded', function () {
    // Initialize main components
    var app = document.getElementById('app');
    if (!app)
        return;
    var navbar = new Navbar();
    var header = new Header();
    var hero = new Hero();
    var educationSkills = new EducationSkills();
    // Mount main components
    navbar.attachTo(app);
    header.attachTo(app);
    hero.attachTo(app);
    educationSkills.attachTo(app);
    // Example: Creating a standalone button
    var contactButtonContainer = document.getElementById('contact-button-container');
    if (contactButtonContainer) {
        var contactButton = new Button({
            text: 'Contact Me',
            variant: 'primary',
            size: 'large',
            onClick: function () {
                console.log('Contact button clicked');
                // Implementation for contact form or modal would go here
            }
        });
        contactButton.attachTo(contactButtonContainer);
    }
    // Example: Creating a standalone skill tag
    var additionalSkillsContainer = document.getElementById('additional-skills-container');
    if (additionalSkillsContainer) {
        var newSkill = new SkillTag({
            text: 'Docker',
            delayClass: 'animate-delay-200'
        });
        newSkill.attachTo(additionalSkillsContainer);
    }
    // Example: Creating a skill tag list
    var projectSkillsContainer = document.getElementById('project-skills-container');
    if (projectSkillsContainer) {
        var projectSkills = new SkillTagList({
            skills: ['React', 'TypeScript', 'Tailwind'],
            containerClasses: 'mt-4'
        });
        projectSkills.attachTo(projectSkillsContainer);
    }
    // Replace feather icons
    feather.replace();
});

import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class HeaderComponent {
  showScrollspy = false;
  activeSection = '';
  lastScrollTop = 0;
  isMobileMenuOpen = false;

  sections = [
    { id: 'hero', name: 'Accueil' },
    { id: 'presentation', name: 'Présentation' },
    { id: 'about', name: 'À propos' },
    { id: 'services', name: 'Prestations' },
    { id: 'travel-pack', name: 'Travel Pack' },
    { id: 'business-pack', name: 'Business Pack' },
    { id: 'serenity-pack', name: 'Serenity Pack' },
    { id: 'testimonials', name: 'Témoignages' }
  ];

  constructor(private router: Router) {}

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  openCalendly() {
    // @ts-ignore
    Calendly.initPopupWidget({
      url: 'https://calendly.com/hamatwalid/30min',
      color: '#a100ff',
      textColor: '#ffffff',
      branding: true
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const st = window.scrollY;
    
    // Show scrollspy after scrolling down 100px
    this.showScrollspy = st > 100;

    // Update active section
    let currentSection = '';
    for (const section of this.sections) {
      const element = document.getElementById(section.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          currentSection = section.id;
          break;
        }
      }
    }
    this.activeSection = currentSection;

    // Auto-scroll the navigation to keep active section visible
    if (this.activeSection) {
      const activeElement = document.querySelector(`[href="#${this.activeSection}"]`) as HTMLElement;
      if (activeElement) {
        const container = document.querySelector('.scrollspy-nav') as HTMLElement;
        if (container) {
          const scrollLeft = activeElement.getBoundingClientRect().left + container.scrollLeft - 
                           (container.offsetWidth / 2) + (activeElement.offsetWidth / 2);
          container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
      }
    }

    this.lastScrollTop = st;
  }

  onLogoClick() {
    this.closeMobileMenu();
    if (this.router.url === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      this.router.navigate(['/']);
    }
  }
}
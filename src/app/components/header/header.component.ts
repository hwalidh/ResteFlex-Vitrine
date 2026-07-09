import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

// URL Calendly centralisée — à changer ici uniquement
const CALENDLY_URL = 'https://calendly.com/hamatwalid/30min';

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

  // ── État UI ──────────────────────────────────────────────────────────────
  isMobileMenuOpen = false;
  showScrollspy    = false;
  activeSection    = '';

  // ── Sections visibles dans la scrollspy ───────────────────────────────
  readonly sections = [
    { id: 'hero',          name: 'Accueil' },
    { id: 'presentation',  name: 'Présentation' },
    { id: 'about',         name: 'À propos' },
    { id: 'services',      name: 'Prestations' },
    { id: 'travel-pack',   name: 'Travel Pack' },
    { id: 'business-pack', name: 'Business Pack' },
    { id: 'serenity-pack', name: 'Serenity Pack' },
    { id: 'testimonials',  name: 'Témoignages' }
  ];

  constructor(private router: Router) {}

  // ── Menu mobile ────────────────────────────────────────────────────────

  toggleMobileMenu() { this.isMobileMenuOpen = !this.isMobileMenuOpen; }
  closeMobileMenu()  { this.isMobileMenuOpen = false; }

  // ── Logo ───────────────────────────────────────────────────────────────

  onLogoClick() {
    this.closeMobileMenu();
    this.router.url === '/'
      ? window.scrollTo({ top: 0, behavior: 'smooth' })
      : this.router.navigate(['/']);
  }

  // ── Calendly ───────────────────────────────────────────────────────────

  openCalendly() {
    // @ts-ignore — Calendly est chargé via script externe
    Calendly.initPopupWidget({
      url:       CALENDLY_URL,
      color:     '#a100ff',
      textColor: '#ffffff',
      branding:  true
    });
  }

  // ── Scrollspy ──────────────────────────────────────────────────────────

  @HostListener('window:scroll')
  onScroll() {
    const scrollY = window.scrollY;
    this.showScrollspy = scrollY > 100;
    this.updateActiveSection();
    this.scrollNavToActiveItem();
  }

  private updateActiveSection() {
    for (const section of this.sections) {
      const el = document.getElementById(section.id);
      if (!el) continue;
      const { top, bottom } = el.getBoundingClientRect();
      if (top <= 150 && bottom >= 150) {
        this.activeSection = section.id;
        return;
      }
    }
    this.activeSection = '';
  }

  private scrollNavToActiveItem() {
    if (!this.activeSection) return;

    const activeEl  = document.querySelector(`[href="#${this.activeSection}"]`) as HTMLElement | null;
    const container = document.querySelector('.scrollspy-nav') as HTMLElement | null;
    if (!activeEl || !container) return;

    const targetLeft =
      activeEl.getBoundingClientRect().left +
      container.scrollLeft -
      container.offsetWidth / 2 +
      activeEl.offsetWidth  / 2;

    container.scrollTo({ left: targetLeft, behavior: 'smooth' });
  }
}

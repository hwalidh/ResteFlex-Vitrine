import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  scrollDown() {
    const nextSection = document.getElementById('presentation');
    if (!nextSection) {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      return;
    }

    // Mesure le header fixe complet (topbar + scrollspy si visible)
    const fixedHeader = document.querySelector('app-header .fixed') as HTMLElement | null;
    const headerHeight = fixedHeader ? fixedHeader.offsetHeight : 120;

    // Marge supplémentaire pour ne pas coller le titre au header
    const extraPadding = 16;

    const top = nextSection.getBoundingClientRect().top + window.scrollY - headerHeight - extraPadding;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

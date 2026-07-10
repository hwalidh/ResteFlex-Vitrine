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

    // Calcule la hauteur du header fixe dynamiquement
    const header = document.querySelector('app-header') as HTMLElement | null;
    const headerHeight = header ? header.offsetHeight : 100;

    const top = nextSection.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

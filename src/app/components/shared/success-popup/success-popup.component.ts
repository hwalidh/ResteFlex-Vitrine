import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

type PackId = 'travel' | 'business' | 'serenity';

@Component({
  selector: 'app-success-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success-popup.component.html',
  styleUrls: ['./success-popup.component.scss'],
  animations: [
    trigger('popupAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.85) translateY(20px)' }),
        animate('400ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in',
          style({ opacity: 0, transform: 'scale(0.9)' }))
      ])
    ])
  ]
})
export class SuccessPopupComponent {
  @Input() show = false;
  @Input() packType: PackId = 'travel';
  @Output() close = new EventEmitter<void>();

  // Éléments d'animation flottants
  readonly travelItems  = ['✈️', '🌴', '🏖️', '🌊', '✈️', '🌴', '🧳', '🗺️'];
  readonly businessItems = ['💵', '💰', '📈', '💵', '💰', '📊', '💵', '🏆', '💵', '💰', '📈', '🎯'];
  readonly serenityItems = ['🏡', '🌿', '✨', '🔑', '🏡', '🌸', '💚', '🌿'];

  get floatingItems(): string[] {
    switch (this.packType) {
      case 'travel':   return this.travelItems;
      case 'business': return this.businessItems;
      case 'serenity': return this.serenityItems;
    }
  }

  get config(): { title: string; message: string; accent: string; icon: string } {
    switch (this.packType) {
      case 'travel':
        return {
          title:   'Message reçu ! Bon voyage ! 🎉',
          message: 'On prépare tout pour ton absence ✈️\nOn te recontacte dans les 24h !',
          accent:  'from-sky-400 to-cyan-400',
          icon:    '✈️'
        };
      case 'business':
        return {
          title:   'Message reçu ! On s\'occupe de tout ! 🎯',
          message: 'On va faire décoller tes revenus 📈\nOn te recontacte dans les 24h !',
          accent:  'from-violet-500 to-fuchsia-500',
          icon:    '💼'
        };
      case 'serenity':
        return {
          title:   'Message reçu ! Loyer garanti ! 🏡',
          message: 'On s\'occupe de tout, tu peux souffler 😎\nOn te recontacte dans les 24h !',
          accent:  'from-emerald-400 to-teal-400',
          icon:    '🏡'
        };
    }
  }

  onClose() { this.close.emit(); }
}

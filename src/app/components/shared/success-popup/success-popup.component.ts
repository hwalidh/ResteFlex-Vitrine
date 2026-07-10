import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success-popup.component.html',
  styleUrls: ['./success-popup.component.scss']
})
export class SuccessPopupComponent {
  @Input() show = false;
  @Input() packType: 'travel' | 'business' | 'serenity' = 'travel';
  @Output() close = new EventEmitter<void>();

  travelElements = Array(8).fill(0);
  businessElements = Array(12).fill(0);

  get title(): string {
    switch (this.packType) {
      case 'travel':
        return 'Bon voyage ! Message reçu ! 🎉';
      case 'business':
        return 'Excellent choix ! Message reçu ! 🎯';
      case 'serenity':
        return 'Super choix ! Message reçu ! 🏡';
      default:
        return 'Message reçu ! 🎉';
    }
  }

  get message(): string {
    switch (this.packType) {
      case 'travel':
        return 'On prépare tout pour ton absence ! ✈️';
      case 'business':
        return 'On va faire décoller tes revenus ! 📈';
      case 'serenity':
        return 'On s\'occupe de tout, relax ! 😎';
      default:
        return 'On te recontacte très vite ! ⚡️';
    }
  }

  onClose() {
    this.close.emit();
  }
}
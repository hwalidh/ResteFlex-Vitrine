import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendly-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendly-button.component.html',
  styleUrls: ['./calendly-button.component.scss']
})
export class CalendlyButtonComponent implements OnInit {
  private calendlyLoaded = false;
  private calendlyQueue: any[] = [];

  ngOnInit() {
    this.waitForCalendly();
  }

  private waitForCalendly() {
    if (typeof (window as any).Calendly !== 'undefined') {
      this.calendlyLoaded = true;
      this.processQueue();
    } else {
      setTimeout(() => this.waitForCalendly(), 100);
    }
  }

  private processQueue() {
    while (this.calendlyQueue.length > 0) {
      const callback = this.calendlyQueue.shift();
      if (callback) callback();
    }
  }

  openCalendly() {
    const openWidget = () => {
      // @ts-ignore
      if (window.Calendly) {
        // @ts-ignore
        window.Calendly.initPopupWidget({
          url: 'https://calendly.com/hamatwalid/30min',
          color: '#a100ff',
          textColor: '#ffffff',
          branding: true
        });
      }
    };

    if (this.calendlyLoaded) {
      openWidget();
    } else {
      this.calendlyQueue.push(openWidget);
    }
  }
}

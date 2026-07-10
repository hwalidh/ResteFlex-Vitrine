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
  ngOnInit() {
    // Initialize Calendly Badge Widget
    window.onload = () => {
      // @ts-ignore
      Calendly.initBadgeWidget({
        url: 'https://calendly.com/hamatwalid/30min',
        text: 'Schedule time with me',
        color: '#a100ff',
        textColor: '#ffffff'
      });
    };
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
}
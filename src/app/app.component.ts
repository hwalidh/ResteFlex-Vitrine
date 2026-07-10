import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CalendlyButtonComponent } from './components/shared/calendly-button/calendly-button.component';
import { SeederService } from './services/seeder.service';
import { DatabaseInitService } from './services/database-init.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CalendlyButtonComponent],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-calendly-button></app-calendly-button>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }
  `]
})
export class AppComponent implements OnInit {
  constructor(
    private seeder: SeederService,
    private dbInit: DatabaseInitService
  ) {}

  ngOnInit() {
    // Initialize database via Netlify Function
    this.dbInit.initializeDatabase();
    
    // Also try the client-side seeder as fallback
    this.seeder.initializeDatabase();
  }
}

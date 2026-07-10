import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseInitService {
  private initialized = false;

  constructor(private http: HttpClient) {}

  async initializeDatabase(): Promise<void> {
    if (this.initialized) return;

    try {
      const response = await firstValueFrom(
        this.http.post<any>('/.netlify/functions/seed-database', {})
      );
      
      console.log('Database initialization:', response);
      this.initialized = true;
    } catch (error) {
      console.error('Database initialization error:', error);
      // Don't throw - allow app to continue even if seeding fails
    }
  }
}

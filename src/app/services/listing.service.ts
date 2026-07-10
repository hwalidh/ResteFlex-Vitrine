import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AirbnbListing } from '../models/listing.model';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  private apiUrl = 'http://localhost:3001/api/listings';

  constructor(private http: HttpClient) { }

  /**
   * Get all Airbnb listings from backend API
   */
  getAllListings(): Observable<AirbnbListing[]> {
    return this.http.get<AirbnbListing[]>(this.apiUrl);
  }

  /**
   * Get a single listing by ID
   */
  getListingById(id: string): Observable<AirbnbListing> {
    return this.http.get<AirbnbListing>(`${this.apiUrl}/${id}`);
  }

  /**
   * Search listings by criteria
   */
  searchListings(filters: {
    minPrice?: number;
    maxPrice?: number;
    minBedrooms?: number;
    minGuests?: number;
    location?: string;
  }): Observable<AirbnbListing[]> {
    let params = new HttpParams();
    
    if (filters.minPrice !== undefined) {
      params = params.set('minPrice', filters.minPrice.toString());
    }
    if (filters.maxPrice !== undefined) {
      params = params.set('maxPrice', filters.maxPrice.toString());
    }
    if (filters.minBedrooms !== undefined) {
      params = params.set('minBedrooms', filters.minBedrooms.toString());
    }
    if (filters.minGuests !== undefined) {
      params = params.set('minGuests', filters.minGuests.toString());
    }
    if (filters.location) {
      params = params.set('location', filters.location);
    }

    return this.http.get<AirbnbListing[]>(`${this.apiUrl}/search`, { params });
  }
}

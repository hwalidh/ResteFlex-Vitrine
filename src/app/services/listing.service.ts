import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AirbnbListing } from '../models/listing.model';
import { AIRBNB_LISTINGS } from '../data/airbnb-listings';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  constructor() { }

  /**
   * Get all Airbnb listings
   */
  getAllListings(): Observable<AirbnbListing[]> {
    return of(AIRBNB_LISTINGS);
  }

  /**
   * Get a single listing by ID
   */
  getListingById(id: string): Observable<AirbnbListing | undefined> {
    return of(AIRBNB_LISTINGS.find(listing => listing.id === id));
  }

  /**
   * Get listings by location
   */
  getListingsByLocation(location: string): Observable<AirbnbListing[]> {
    return of(AIRBNB_LISTINGS.filter(listing => listing.location.toLowerCase().includes(location.toLowerCase())));
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
    let filtered = [...AIRBNB_LISTINGS];

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(l => l.pricePerNight >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(l => l.pricePerNight <= filters.maxPrice!);
    }
    if (filters.minBedrooms !== undefined) {
      filtered = filtered.filter(l => l.bedrooms >= filters.minBedrooms!);
    }
    if (filters.minGuests !== undefined) {
      filtered = filtered.filter(l => l.guests >= filters.minGuests!);
    }
    if (filters.location) {
      filtered = filtered.filter(l => l.location.toLowerCase().includes(filters.location!.toLowerCase()));
    }

    return of(filtered);
  }
}

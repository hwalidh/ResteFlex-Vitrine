import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Observable, from } from 'rxjs';

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  image_url: string;
  amenities: string[];
  created_at: string;
}

export interface Booking {
  id: string;
  listing_id: string;
  email: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
  stripe_payment_id?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabase.url, environment.supabase.anonKey);
  }

  // Listings CRUD
  getListings(): Observable<Listing[]> {
    return from(
      this.supabase
        .from('listings')
        .select('*')
        .then(result => {
          if (result.error) throw result.error;
          return result.data || [];
        })
    );
  }

  getListingById(id: string): Observable<Listing> {
    return from(
      this.supabase
        .from('listings')
        .select('*')
        .eq('id', id)
        .single()
        .then(result => {
          if (result.error) throw result.error;
          return result.data || {};
        })
    );
  }

  // Bookings CRUD
  createBooking(booking: Omit<Booking, 'id' | 'created_at'>): Observable<Booking> {
    return from(
      this.supabase
        .from('bookings')
        .insert([booking])
        .select()
        .then(result => {
          if (result.error) throw result.error;
          return (result.data as Booking[])[0];
        })
    );
  }

  getBookingsByEmail(email: string): Observable<Booking[]> {
    return from(
      this.supabase
        .from('bookings')
        .select('*')
        .eq('email', email)
        .then(result => {
          if (result.error) throw result.error;
          return result.data || [];
        })
    );
  }

  updateBooking(id: string, updates: Partial<Booking>): Observable<Booking> {
    return from(
      this.supabase
        .from('bookings')
        .update(updates)
        .eq('id', id)
        .select()
        .then(result => {
          if (result.error) throw result.error;
          return (result.data as Booking[])[0];
        })
    );
  }
}

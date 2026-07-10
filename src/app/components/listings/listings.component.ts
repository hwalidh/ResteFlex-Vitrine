import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SupabaseService, Listing } from '../../services/supabase.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div class="container mx-auto px-4">
          <h1 class="text-4xl font-bold mb-2">Nos Logements</h1>
          <p class="text-blue-100">Découvrez nos magnifiques propriétés à louer</p>
        </div>
      </div>

      <!-- Listings Grid -->
      <div class="container mx-auto px-4 py-12">
        <div *ngIf="loading" class="text-center py-12">
          <p class="text-gray-500">Chargement des logements...</p>
        </div>

        <div *ngIf="!loading && listings.length === 0" class="text-center py-12">
          <p class="text-gray-500">Aucun logement disponible pour le moment</p>
        </div>

        <div *ngIf="!loading && listings.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div *ngFor="let listing of listings" class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" [routerLink]="['/booking', listing.id]">
            <!-- Image -->
            <div class="relative h-48 bg-gray-300 overflow-hidden">
              <img [src]="listing.image_url" alt="{{ listing.title }}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300">
              <div class="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {{ listing.price }}€/nuit
              </div>
            </div>

            <!-- Content -->
            <div class="p-6">
              <h2 class="text-xl font-bold text-gray-800 mb-2">{{ listing.title }}</h2>
              <p class="text-gray-600 text-sm mb-4">📍 {{ listing.location }}</p>

              <!-- Description -->
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ listing.description }}</p>

              <!-- Features -->
              <div class="flex gap-4 mb-4 text-sm text-gray-700">
                <span>🛏️ {{ listing.bedrooms }} chambre(s)</span>
                <span>🚿 {{ listing.bathrooms }} salle(s)</span>
                <span>👥 {{ listing.guests }} hôte(s)</span>
              </div>

              <!-- Amenities Preview -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span *ngFor="let amenity of listing.amenities | slice:0:3" class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {{ amenity }}
                </span>
                <span *ngIf="listing.amenities.length > 3" class="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  +{{ listing.amenities.length - 3 }} plus
                </span>
              </div>

              <!-- CTA Button -->
              <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors">
                Voir les détails & réserver
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class ListingsComponent implements OnInit, OnDestroy {
  listings: Listing[] = [];
  loading = true;
  private destroy$ = new Subject<void>();

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit() {
    this.supabaseService.getListings()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.listings = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading listings:', error);
          this.loading = false;
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

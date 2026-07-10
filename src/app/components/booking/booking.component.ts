import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SupabaseService, Listing, Booking } from '../../services/supabase.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Breadcrumb -->
      <div class="bg-white border-b">
        <div class="container mx-auto px-4 py-4">
          <a routerLink="/listings" class="text-blue-600 hover:text-blue-800">← Retour aux logements</a>
        </div>
      </div>

      <div class="container mx-auto px-4 py-8">
        <div *ngIf="loading" class="text-center py-12">
          <p class="text-gray-500">Chargement des informations...</p>
        </div>

        <div *ngIf="!loading && listing" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Listing Details (Left) -->
          <div class="lg:col-span-2">
            <!-- Image Gallery -->
            <div class="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <img [src]="listing.image_url" alt="{{ listing.title }}" class="w-full h-96 object-cover">
            </div>

            <!-- Listing Info -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-6">
              <h1 class="text-3xl font-bold text-gray-800 mb-2">{{ listing.title }}</h1>
              <p class="text-gray-600 mb-4">📍 {{ listing.location }}</p>

              <div class="grid grid-cols-4 gap-4 mb-6 py-6 border-t border-b">
                <div class="text-center">
                  <div class="text-2xl font-bold text-blue-600">{{ listing.bedrooms }}</div>
                  <div class="text-sm text-gray-600">Chambre(s)</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-blue-600">{{ listing.bathrooms }}</div>
                  <div class="text-sm text-gray-600">Salle(s)</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-blue-600">{{ listing.guests }}</div>
                  <div class="text-sm text-gray-600">Hôte(s)</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-blue-600">{{ listing.price }}€</div>
                  <div class="text-sm text-gray-600">Par nuit</div>
                </div>
              </div>

              <h2 class="text-xl font-bold text-gray-800 mb-3">Description</h2>
              <p class="text-gray-600 mb-6">{{ listing.description }}</p>

              <h2 class="text-xl font-bold text-gray-800 mb-3">Équipements</h2>
              <div class="grid grid-cols-2 gap-3">
                <div *ngFor="let amenity of listing.amenities" class="flex items-center">
                  <span class="text-green-600 mr-2">✓</span>
                  <span class="text-gray-700">{{ amenity }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Booking Form (Right) -->
          <div>
            <div class="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 class="text-2xl font-bold text-gray-800 mb-6">Réservation</h2>

              <form [formGroup]="bookingForm" (ngSubmit)="onSubmit()" class="space-y-4">
                <!-- Email -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" formControlName="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" required>
                  <span *ngIf="bookingForm.get('email')?.hasError('required')" class="text-red-600 text-sm">Email requis</span>
                </div>

                <!-- Check-in Date -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Date d'arrivée</label>
                  <input type="date" formControlName="checkIn" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" required>
                  <span *ngIf="bookingForm.get('checkIn')?.hasError('required')" class="text-red-600 text-sm">Date requise</span>
                </div>

                <!-- Check-out Date -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Date de départ</label>
                  <input type="date" formControlName="checkOut" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" required>
                  <span *ngIf="bookingForm.get('checkOut')?.hasError('required')" class="text-red-600 text-sm">Date requise</span>
                </div>

                <!-- Number of Guests -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Nombre d'hôtes</label>
                  <select formControlName="guests" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" required>
                    <option value="">Sélectionnez</option>
                    <option *ngFor="let i of [1,2,3,4,5,6,7,8]" [value]="i">{{ i }} hôte(s)</option>
                  </select>
                </div>

                <!-- Price Calculation -->
                <div class="bg-gray-50 p-4 rounded-lg">
                  <div class="flex justify-between mb-2">
                    <span class="text-gray-700">{{ nights }} nuit(s) x {{ listing.price }}€</span>
                    <span class="font-semibold">{{ totalPrice }}€</span>
                  </div>
                  <div class="border-t pt-2 flex justify-between">
                    <span class="text-lg font-bold text-gray-800">Total</span>
                    <span class="text-2xl font-bold text-blue-600">{{ totalPrice }}€</span>
                  </div>
                </div>

                <!-- Booking Button -->
                <button type="submit" [disabled]="bookingForm.invalid || processing" class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition-colors">
                  {{ processing ? 'Traitement...' : 'Procéder au paiement Stripe' }}
                </button>

                <p class="text-xs text-gray-500 text-center">Vous serez redirigé vers Stripe pour payer en toute sécurité</p>
              </form>

              <!-- Error Message -->
              <div *ngIf="error" class="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {{ error }}
              </div>

              <!-- Success Message -->
              <div *ngIf="success" class="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                {{ success }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class BookingComponent implements OnInit, OnDestroy {
  listing: Listing | null = null;
  bookingForm!: FormGroup;
  loading = true;
  processing = false;
  error: string | null = null;
  success: string | null = null;
  nights = 0;
  totalPrice = 0;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private supabaseService: SupabaseService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadListing(id);
      }
    });

    // Listen to date changes for price calculation
    this.bookingForm.get('checkIn')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.calculatePrice());

    this.bookingForm.get('checkOut')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.calculatePrice());
  }

  private initializeForm() {
    this.bookingForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      guests: ['', Validators.required]
    });
  }

  private loadListing(id: string) {
    this.supabaseService.getListingById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.listing = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading listing:', error);
          this.error = 'Erreur lors du chargement du logement';
          this.loading = false;
        }
      });
  }

  private calculatePrice() {
    const checkIn = this.bookingForm.get('checkIn')?.value;
    const checkOut = this.bookingForm.get('checkOut')?.value;

    if (checkIn && checkOut && this.listing) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      this.nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      this.totalPrice = this.nights > 0 ? this.nights * this.listing.price : 0;
    }
  }

  onSubmit() {
    if (this.bookingForm.invalid || !this.listing) {
      return;
    }

    this.processing = true;
    this.error = null;

    const booking: Omit<Booking, 'id' | 'created_at'> = {
      listing_id: this.listing.id,
      email: this.bookingForm.get('email')!.value,
      check_in: this.bookingForm.get('checkIn')!.value,
      check_out: this.bookingForm.get('checkOut')!.value,
      guests: parseInt(this.bookingForm.get('guests')!.value),
      total_price: this.totalPrice,
      status: 'pending'
    };

    this.supabaseService.createBooking(booking)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (savedBooking) => {
          // TODO: Integrate Stripe checkout
          this.success = 'Réservation créée! Redirection vers Stripe...';
          this.processing = false;
          // In production: initiate Stripe payment
        },
        error: (error) => {
          console.error('Error creating booking:', error);
          this.error = 'Erreur lors de la création de la réservation';
          this.processing = false;
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

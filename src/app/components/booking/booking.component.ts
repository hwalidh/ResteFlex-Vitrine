import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AirbnbListing, BookingRequest } from '../../models/listing.model';
import { ListingService } from '../../services/listing.service';
import { StripePaymentService } from '../../services/stripe-payment.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  bookingForm: FormGroup;
  listing: AirbnbListing | null = null;
  isProcessing = false;
  bookingSummary: any = null;
  paymentStep = 1; // 1: Details, 2: Payment

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private listingService: ListingService,
    private stripePaymentService: StripePaymentService
  ) {
    this.bookingForm = this.fb.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      numberOfGuests: ['', [Validators.required, Validators.min(1)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.loadListing(params['id']);
      }
    });
  }

  loadListing(listingId: string): void {
    this.listingService.getListingById(listingId).subscribe({
      next: (listing) => {
        if (listing) {
          this.listing = listing;
        }
      },
      error: (err) => console.error('Error loading listing:', err)
    });
  }

  calculatePrice(): number {
    if (!this.listing || !this.bookingForm.valid) return 0;
    
    const checkIn = new Date(this.bookingForm.get('checkInDate')?.value);
    const checkOut = new Date(this.bookingForm.get('checkOutDate')?.value);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    
    return nights * this.listing.pricePerNight;
  }

  goToPayment(): void {
    if (this.bookingForm.invalid || !this.listing) return;

    const totalPrice = this.calculatePrice();
    this.bookingSummary = {
      ...this.bookingForm.value,
      listing: this.listing,
      totalPrice,
      nights: Math.ceil(
        (new Date(this.bookingForm.get('checkOutDate')?.value).getTime() - 
         new Date(this.bookingForm.get('checkInDate')?.value).getTime()) 
        / (1000 * 60 * 60 * 24)
      )
    };

    this.paymentStep = 2;
  }

  goBackToDetails(): void {
    this.paymentStep = 1;
  }

  async processPayment(): Promise<void> {
    if (!this.bookingSummary || !this.listing) return;

    this.isProcessing = true;

    const bookingRequest: BookingRequest = {
      listingId: this.listing.id,
      checkInDate: this.bookingSummary.checkInDate,
      checkOutDate: this.bookingSummary.checkOutDate,
      numberOfGuests: this.bookingSummary.numberOfGuests,
      totalPrice: this.bookingSummary.totalPrice,
      currency: this.listing.currency
    };

    try {
      this.stripePaymentService.createPaymentIntent(bookingRequest).subscribe({
        next: (paymentIntent) => {
          // In a real app, you'd show Stripe Elements here
          console.log('Payment intent created:', paymentIntent);
          this.showSuccessMessage();
        },
        error: (err) => {
          console.error('Payment error:', err);
          this.isProcessing = false;
          alert('Payment processing failed. Please try again.');
        }
      });
    } catch (error) {
      console.error('Error processing payment:', error);
      this.isProcessing = false;
    }
  }

  showSuccessMessage(): void {
    alert('Booking confirmed! Check your email for confirmation details.');
    this.router.navigate(['/listings']);
  }

  goBackToListings(): void {
    this.router.navigate(['/listings']);
  }
}

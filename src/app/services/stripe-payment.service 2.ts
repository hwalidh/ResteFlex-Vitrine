import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { BookingRequest, PaymentIntent } from '../models/listing.model';

@Injectable({
  providedIn: 'root'
})
export class StripePaymentService {
  private stripe: Stripe | null = null;
  private apiUrl = '/api/payments';
  private stripePublishableKey = 'pk_test_YOUR_PUBLISHABLE_KEY'; // Replace with your key

  constructor(private http: HttpClient) {
    this.initStripe();
  }

  /**
   * Initialize Stripe
   */
  private async initStripe(): Promise<void> {
    this.stripe = await loadStripe(this.stripePublishableKey);
  }

  /**
   * Create a payment intent for a booking
   */
  createPaymentIntent(booking: BookingRequest): Observable<PaymentIntent> {
    return this.http.post<PaymentIntent>(`${this.apiUrl}/intent`, booking);
  }

  /**
   * Confirm payment with card element
   */
  async confirmPayment(clientSecret: string, cardElement: any): Promise<any> {
    if (!this.stripe) {
      throw new Error('Stripe not initialized');
    }

    return this.stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {}
      }
    });
  }

  /**
   * Process a direct payment (no card element required)
   */
  async confirmPaymentIntent(clientSecret: string): Promise<any> {
    if (!this.stripe) {
      throw new Error('Stripe not initialized');
    }

    return this.stripe.retrievePaymentIntent(clientSecret).then((result) => {
      return result;
    });
  }

  /**
   * Verify payment status
   */
  verifyPaymentStatus(paymentIntentId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/verify/${paymentIntentId}`);
  }

  /**
   * Get Stripe instance
   */
  getStripe(): Stripe | null {
    return this.stripe;
  }
}

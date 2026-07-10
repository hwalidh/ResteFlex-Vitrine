export interface AirbnbListing {
  id: string;
  title: string;
  description: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  pricePerNight: number;
  currency: string;
  images: string[];
  amenities: string[];
  rating: number;
  reviews: number;
  availability: {
    startDate: string;
    endDate: string;
  };
  stripeProductId?: string;
  stripePriceId?: string;
}

export interface BookingRequest {
  listingId: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  totalPrice: number;
  currency: string;
}

export interface PaymentIntent {
  clientSecret: string;
  amount: number;
  currency: string;
}

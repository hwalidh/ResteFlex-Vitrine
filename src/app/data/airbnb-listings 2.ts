import { AirbnbListing } from '../models/listing.model';

export const AIRBNB_LISTINGS: AirbnbListing[] = [
  {
    id: 'listing-1',
    title: 'Luxurious Penthouse with City View',
    description: 'Modern penthouse located in the heart of the city with stunning skyline views, fully equipped kitchen, and contemporary furnishings.',
    location: 'Downtown',
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    pricePerNight: 250,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=400&h=300&fit=crop'
    ],
    amenities: ['WiFi', 'Kitchen', 'Air Conditioning', 'Heating', 'Washer', 'Dryer', 'TV', 'Parking'],
    rating: 4.9,
    reviews: 128,
    availability: {
      startDate: '2025-01-15',
      endDate: '2025-12-31'
    },
    stripePriceId: 'price_1OL7ZA4eZvKYlo2CblCH01OJ'
  },
  {
    id: 'listing-2',
    title: 'Cozy Beach House with Private Access',
    description: 'Charming beachfront property with direct sandy beach access, perfect for families and friends looking for a relaxing getaway.',
    location: 'Coastal Area',
    bedrooms: 2,
    bathrooms: 1.5,
    guests: 4,
    pricePerNight: 180,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1520541898575-8ecbb3ee4d8f?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop'
    ],
    amenities: ['WiFi', 'Beach Access', 'Kitchen', 'Parking', 'Grill', 'Hot Tub', 'Fire Pit'],
    rating: 4.8,
    reviews: 95,
    availability: {
      startDate: '2025-02-01',
      endDate: '2025-12-20'
    },
    stripePriceId: 'price_1OL7ZB4eZvKYlo2CblCH02OJ'
  },
  {
    id: 'listing-3',
    title: 'Mountain Retreat with Forest Views',
    description: 'Peaceful mountain cabin surrounded by nature, featuring a fireplace, large windows with forest views, and a spacious deck for relaxation.',
    location: 'Mountain Region',
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    pricePerNight: 150,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop'
    ],
    amenities: ['WiFi', 'Fireplace', 'Kitchen', 'Hiking Trails', 'Deck', 'Hot Shower', 'Mountain View'],
    rating: 4.7,
    reviews: 82,
    availability: {
      startDate: '2025-01-20',
      endDate: '2025-11-30'
    },
    stripePriceId: 'price_1OL7ZC4eZvKYlo2CblCH03OJ'
  }
];

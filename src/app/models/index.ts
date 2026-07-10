// Export de tous les modèles pour un import plus propre
export * from './service.model';

// Ajout de nouveaux types si nécessaire
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'guest';
}

export interface Booking {
  id: string;
  propertyId: string;
  startDate: Date;
  endDate: Date;
  guestCount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Property {
  id: string;
  ownerId: string;
  type: 'apartment' | 'house' | 'room';
  address: Address;
  amenities: string[];
  pricing: PricingInfo;
}

interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

interface PricingInfo {
  basePrice: number;
  currency: string;
  cleaningFee: number;
  commission: number;
}
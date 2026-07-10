export interface OfferConfig {
  id: 'travel' | 'business' | 'serenity';
  name: string;
  emoji: string;
  description: string;
  isPopular?: boolean;
  tagline?: string;
  tagBg?: string;
  pricing: {
    options: PricingOption[];
    note?: string;
  };
  features: string[] | FeatureGroup[];
  additionalServices: AdditionalService[];
  priceComparison?: PriceComparison;
  highlights?: Highlight[];
  ctaText: string;
  ctaColor?: string;
}

export interface PricingOption {
  name: string;
  value: string;
  highlight?: boolean;
}

export interface AdditionalService {
  name: string;
  price: string;
  description?: string;
}

export interface FeatureGroup {
  name: string;
  items: string[];
}

export interface PriceComparison {
  title: string;
  items: PriceComparisonItem[];
  totalSaving: string;
}

export interface PriceComparisonItem {
  name: string;
  normal: string;
  premium: string;
}

export interface Highlight {
  icon: string;
  title: string;
  description: string;
}
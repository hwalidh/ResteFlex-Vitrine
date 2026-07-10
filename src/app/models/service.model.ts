export interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
}

export interface Package {
  id: number;
  name: string;
  description: string;
  price: string;
  features: string[];
  commitment?: string;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}
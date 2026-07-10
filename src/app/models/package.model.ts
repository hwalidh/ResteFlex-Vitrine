import { FormGroup } from '@angular/forms';

export interface PackageConfig {
  id: 'travel' | 'business' | 'serenity';
  name: string;
  emoji: string;
  description: string;
  formFields: PackageFormField[];
}

export interface PackageFormField {
  name: string;
  type: 'text' | 'number' | 'select' | 'date';
  label: string;
  placeholder?: string;
  options?: { id: string; name: string; }[];
  required?: boolean;
  emoji?: string;
}

export interface PackageData {
  [key: string]: any;
}
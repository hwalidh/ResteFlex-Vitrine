export interface EmailTemplateParams {
  to_name: string;
  from_name: string;
  from_email: string;
  pack_type: string;
  message: string;
  [key: string]: any;
}

export interface TravelPackEmailParams extends EmailTemplateParams {
  propertyType: string;
  propertyStyle: string;
  surface: string;
  location: string;
  availabilityStart: string;
  availabilityEnd: string;
}

export interface BusinessPackEmailParams extends EmailTemplateParams {
  propertyCount: number;
  investmentType: string;
  currentRevenue: string;
}

export interface SerenityPackEmailParams extends EmailTemplateParams {
  propertyType: string;
  surface: string;
  location: string;
  currentRent: string;
  propertyValue: string;
}
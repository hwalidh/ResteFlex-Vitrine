import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './components/services/services.component';
import { OffersComponent } from './components/offers/offers.component';
import { ContactComponent } from './components/contact/contact.component';
import { ListingsComponent } from './components/listings/listings.component';
import { BookingComponent } from './components/booking/booking.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'offers', component: OffersComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'listings', component: ListingsComponent },
  { path: 'booking/:id', component: BookingComponent },
  { path: '**', redirectTo: '' }
];
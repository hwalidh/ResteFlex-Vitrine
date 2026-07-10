import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AirbnbListing } from '../../models/listing.model';
import { ListingService } from '../../services/listing.service';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss'],
  providers: []
})
export class ListingsComponent implements OnInit {
  listings: AirbnbListing[] = [];
  filteredListings: AirbnbListing[] = [];
  isLoading = true;
  selectedListing: AirbnbListing | null = null;

  filterCriteria = {
    location: '',
    minPrice: 0,
    maxPrice: 500,
    minBedrooms: 1,
    minGuests: 1
  };

  constructor(private listingService: ListingService) { }

  ngOnInit(): void {
    this.loadListings();
  }

  loadListings(): void {
    this.listingService.getAllListings().subscribe({
      next: (listings) => {
        this.listings = listings;
        this.filteredListings = listings;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading listings:', err);
        this.isLoading = false;
      }
    });
  }

  applyFilters(): void {
    this.listingService.searchListings({
      location: this.filterCriteria.location,
      minPrice: this.filterCriteria.minPrice,
      maxPrice: this.filterCriteria.maxPrice,
      minBedrooms: this.filterCriteria.minBedrooms,
      minGuests: this.filterCriteria.minGuests
    }).subscribe({
      next: (listings) => {
        this.filteredListings = listings;
      }
    });
  }

  selectListing(listing: AirbnbListing): void {
    this.selectedListing = listing;
  }

  closeDetailView(): void {
    this.selectedListing = null;
  }

  calculateStayPrice(checkIn: string, checkOut: string, listing: AirbnbListing): number {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return nights * listing.pricePerNight;
  }

  goToBooking(listing: AirbnbListing): void {
    console.log('Navigate to booking page for:', listing.id);
    // Navigate to booking component
  }
}

package com.resteflex.service;

import com.resteflex.entity.Listing;
import com.resteflex.repository.ListingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ListingService {
    private final ListingRepository listingRepository;

    public List<Listing> getAllListings() {
        return listingRepository.findAll();
    }

    public Listing getListingById(String id) {
        return listingRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Listing not found: " + id));
    }

    public List<Listing> searchByLocation(String location) {
        return listingRepository.findByLocation(location);
    }

    public List<Listing> searchByPriceRange(Double minPrice, Double maxPrice) {
        return listingRepository.findByPriceBetween(minPrice, maxPrice);
    }

    public List<Listing> searchByGuests(Integer guests) {
        return listingRepository.findByGuestsGreaterThanEqual(guests);
    }

    public Listing createListing(Listing listing) {
        return listingRepository.save(listing);
    }

    public Listing updateListing(String id, Listing listing) {
        Listing existing = getListingById(id);
        if (listing.getTitle() != null) existing.setTitle(listing.getTitle());
        if (listing.getDescription() != null) existing.setDescription(listing.getDescription());
        if (listing.getPrice() != null) existing.setPrice(listing.getPrice());
        if (listing.getLocation() != null) existing.setLocation(listing.getLocation());
        if (listing.getBedrooms() != null) existing.setBedrooms(listing.getBedrooms());
        if (listing.getBathrooms() != null) existing.setBathrooms(listing.getBathrooms());
        if (listing.getGuests() != null) existing.setGuests(listing.getGuests());
        if (listing.getImageUrl() != null) existing.setImageUrl(listing.getImageUrl());
        if (listing.getImages() != null) existing.setImages(listing.getImages());
        if (listing.getAmenities() != null) existing.setAmenities(listing.getAmenities());
        return listingRepository.save(existing);
    }

    public void deleteListing(String id) {
        listingRepository.deleteById(id);
    }
}

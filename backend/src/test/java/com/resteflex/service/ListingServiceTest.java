package com.resteflex.service;

import com.resteflex.entity.Listing;
import com.resteflex.repository.ListingRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ListingServiceTest {

    @Mock
    private ListingRepository listingRepository;

    @InjectMocks
    private ListingService listingService;

    private Listing testListing;

    @BeforeEach
    void setUp() {
        testListing = Listing.builder()
                .id("1")
                .title("Test Listing")
                .description("Test Description")
                .price(100.0)
                .location("Paris")
                .bedrooms(2)
                .bathrooms(1.0)
                .guests(4)
                .imageUrl("http://example.com/image.jpg")
                .amenities(new String[]{"WiFi", "TV"})
                .build();
    }

    @Test
    void testGetAllListings() {
        when(listingRepository.findAll()).thenReturn(List.of(testListing));

        List<Listing> result = listingService.getAllListings();

        assertEquals(1, result.size());
        assertEquals("Test Listing", result.get(0).getTitle());
        verify(listingRepository, times(1)).findAll();
    }

    @Test
    void testGetListingById() {
        when(listingRepository.findById("1")).thenReturn(Optional.of(testListing));

        Listing result = listingService.getListingById("1");

        assertEquals("Test Listing", result.getTitle());
        verify(listingRepository, times(1)).findById("1");
    }

    @Test
    void testGetListingByIdNotFound() {
        when(listingRepository.findById("999")).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> listingService.getListingById("999"));
    }

    @Test
    void testCreateListing() {
        when(listingRepository.save(any(Listing.class))).thenReturn(testListing);

        Listing result = listingService.createListing(testListing);

        assertEquals("Test Listing", result.getTitle());
        verify(listingRepository, times(1)).save(testListing);
    }

    @Test
    void testUpdateListing() {
        when(listingRepository.findById("1")).thenReturn(Optional.of(testListing));
        when(listingRepository.save(any(Listing.class))).thenReturn(testListing);

        Listing updatedListing = Listing.builder().title("Updated").build();
        Listing result = listingService.updateListing("1", updatedListing);

        assertEquals("Updated", result.getTitle());
        verify(listingRepository, times(1)).save(any(Listing.class));
    }

    @Test
    void testDeleteListing() {
        listingService.deleteListing("1");
        verify(listingRepository, times(1)).deleteById("1");
    }

    @Test
    void testSearchByLocation() {
        when(listingRepository.findByLocation("Paris")).thenReturn(List.of(testListing));

        List<Listing> result = listingService.searchByLocation("Paris");

        assertEquals(1, result.size());
        assertEquals("Paris", result.get(0).getLocation());
    }

    @Test
    void testSearchByPriceRange() {
        when(listingRepository.findByPriceBetween(50.0, 150.0)).thenReturn(List.of(testListing));

        List<Listing> result = listingService.searchByPriceRange(50.0, 150.0);

        assertEquals(1, result.size());
        assertEquals(100.0, result.get(0).getPrice());
    }
}

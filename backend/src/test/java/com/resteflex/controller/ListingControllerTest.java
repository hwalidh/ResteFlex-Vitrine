package com.resteflex.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.resteflex.entity.Listing;
import com.resteflex.service.ListingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.NoSuchElementException;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class ListingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ListingService listingService;

    @Autowired
    private ObjectMapper objectMapper;

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
    void testGetAllListings() throws Exception {
        when(listingService.getAllListings()).thenReturn(List.of(testListing));

        mockMvc.perform(get("/api/listings")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Test Listing"))
                .andExpect(jsonPath("$[0].price").value(100.0));

        verify(listingService, times(1)).getAllListings();
    }

    @Test
    void testGetListingById() throws Exception {
        when(listingService.getListingById("1")).thenReturn(testListing);

        mockMvc.perform(get("/api/listings/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Test Listing"));

        verify(listingService, times(1)).getListingById("1");
    }

    @Test
    void testGetListingByIdNotFound() throws Exception {
        when(listingService.getListingById("999"))
                .thenThrow(new NoSuchElementException("Listing not found"));

        mockMvc.perform(get("/api/listings/999")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    void testCreateListing() throws Exception {
        when(listingService.createListing(any(Listing.class))).thenReturn(testListing);

        mockMvc.perform(post("/api/listings")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(testListing)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("Test Listing"));

        verify(listingService, times(1)).createListing(any(Listing.class));
    }

    @Test
    void testSearchByLocation() throws Exception {
        when(listingService.searchByLocation("Paris")).thenReturn(List.of(testListing));

        mockMvc.perform(get("/api/listings/search/location?location=Paris")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].location").value("Paris"));
    }

    @Test
    void testSearchByPrice() throws Exception {
        when(listingService.searchByPriceRange(50.0, 150.0)).thenReturn(List.of(testListing));

        mockMvc.perform(get("/api/listings/search/price?min=50&max=150")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].price").value(100.0));
    }

    @Test
    void testDeleteListing() throws Exception {
        mockMvc.perform(delete("/api/listings/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());

        verify(listingService, times(1)).deleteListing("1");
    }
}

package com.resteflex.service;

import com.resteflex.dto.BookingRequest;
import com.resteflex.entity.Booking;
import com.resteflex.entity.Listing;
import com.resteflex.repository.BookingRepository;
import com.resteflex.repository.ListingRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BookingServiceTest {

    @Mock
    private BookingRepository bookingRepository;

    @Mock
    private ListingRepository listingRepository;

    @Mock
    private StripeService stripeService;

    @Mock
    private ICalService iCalService;

    @InjectMocks
    private BookingService bookingService;

    private Listing testListing;
    private BookingRequest bookingRequest;

    @BeforeEach
    void setUp() {
        testListing = Listing.builder()
                .id("listing-1")
                .title("Test Listing")
                .price(100.0)
                .location("Paris")
                .build();

        bookingRequest = BookingRequest.builder()
                .listingId("listing-1")
                .email("test@example.com")
                .checkIn(LocalDate.now().plusDays(1))
                .checkOut(LocalDate.now().plusDays(5))
                .guests(2)
                .build();
    }

    @Test
    void testCreateBooking() {
        when(listingRepository.findById("listing-1")).thenReturn(Optional.of(testListing));
        when(bookingRepository.findByListingId("listing-1")).thenReturn(List.of());

        Booking booking = Booking.builder()
                .id("booking-1")
                .listing(testListing)
                .email("test@example.com")
                .checkIn(bookingRequest.getCheckIn())
                .checkOut(bookingRequest.getCheckOut())
                .guests(2)
                .totalPrice(400.0)
                .status(Booking.BookingStatus.PENDING)
                .build();

        when(bookingRepository.save(any(Booking.class))).thenReturn(booking);

        Booking result = bookingService.createBooking(bookingRequest);

        assertEquals("test@example.com", result.getEmail());
        assertEquals(Booking.BookingStatus.PENDING, result.getStatus());
        verify(bookingRepository, times(1)).save(any(Booking.class));
    }

    @Test
    void testCreateBookingListingNotFound() {
        when(listingRepository.findById("invalid-id")).thenReturn(Optional.empty());

        BookingRequest invalidRequest = BookingRequest.builder()
                .listingId("invalid-id")
                .build();

        assertThrows(NoSuchElementException.class, () -> bookingService.createBooking(invalidRequest));
    }

    @Test
    void testGetBookingById() {
        Booking booking = Booking.builder().id("booking-1").build();
        when(bookingRepository.findById("booking-1")).thenReturn(Optional.of(booking));

        Booking result = bookingService.getBookingById("booking-1");

        assertEquals("booking-1", result.getId());
    }

    @Test
    void testGetBookingsByEmail() {
        Booking booking = Booking.builder().email("test@example.com").build();
        when(bookingRepository.findByEmail("test@example.com")).thenReturn(List.of(booking));

        List<Booking> result = bookingService.getBookingsByEmail("test@example.com");

        assertEquals(1, result.size());
    }

    @Test
    void testCancelBooking() {
        Booking booking = Booking.builder()
                .id("booking-1")
                .status(Booking.BookingStatus.PENDING)
                .build();

        when(bookingRepository.findById("booking-1")).thenReturn(Optional.of(booking));
        when(bookingRepository.save(any(Booking.class))).thenReturn(booking);

        bookingService.cancelBooking("booking-1");

        assertEquals(Booking.BookingStatus.CANCELLED, booking.getStatus());
        verify(iCalService, times(1)).removeBookingFromCalendar(booking);
    }

    @Test
    void testConfirmPayment() {
        Booking booking = Booking.builder()
                .id("booking-1")
                .status(Booking.BookingStatus.PENDING)
                .build();

        when(bookingRepository.findById("booking-1")).thenReturn(Optional.of(booking));
        when(bookingRepository.save(any(Booking.class))).thenReturn(booking);

        bookingService.confirmPayment("booking-1", "stripe-payment-123");

        assertEquals(Booking.BookingStatus.PAID, booking.getStatus());
        assertEquals("stripe-payment-123", booking.getStripePaymentId());
    }
}

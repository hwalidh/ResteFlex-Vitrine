package com.resteflex.service;

import com.resteflex.dto.BookingRequest;
import com.resteflex.entity.Booking;
import com.resteflex.entity.Listing;
import com.resteflex.repository.BookingRepository;
import com.resteflex.repository.ListingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepository;
    private final ListingRepository listingRepository;
    private final StripeService stripeService;
    private final ICalService iCalService;

    public Booking createBooking(BookingRequest request) {
        Listing listing = listingRepository.findById(request.getListingId())
                .orElseThrow(() -> new NoSuchElementException("Listing not found"));

        // Vérifier les dates disponibles
        checkAvailability(listing.getId(), request.getCheckIn(), request.getCheckOut());

        // Créer la réservation
        Booking booking = Booking.builder()
                .listing(listing)
                .email(request.getEmail())
                .checkIn(request.getCheckIn())
                .checkOut(request.getCheckOut())
                .guests(request.getGuests())
                .totalPrice(calculatePrice(listing.getPrice(), request.getCheckIn(), request.getCheckOut()))
                .status(Booking.BookingStatus.PENDING)
                .build();

        Booking saved = bookingRepository.save(booking);

        // Ajouter au calendrier iCal
        iCalService.addBookingToCalendar(saved);

        return saved;
    }

    public Booking getBookingById(String id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Booking not found: " + id));
    }

    public List<Booking> getBookingsByEmail(String email) {
        return bookingRepository.findByEmail(email);
    }

    public List<Booking> getBookingsByListing(String listingId) {
        return bookingRepository.findByListingId(listingId);
    }

    public Booking confirmPayment(String bookingId, String stripePaymentId) {
        Booking booking = getBookingById(bookingId);
        booking.setStripePaymentId(stripePaymentId);
        booking.setStatus(Booking.BookingStatus.PAID);
        return bookingRepository.save(booking);
    }

    public void cancelBooking(String bookingId) {
        Booking booking = getBookingById(bookingId);
        booking.setStatus(Booking.BookingStatus.CANCELLED);
        bookingRepository.save(booking);
        iCalService.removeBookingFromCalendar(booking);
    }

    private void checkAvailability(String listingId, LocalDate checkIn, LocalDate checkOut) {
        List<Booking> conflictingBookings = bookingRepository.findByListingId(listingId).stream()
                .filter(b -> b.getStatus() != Booking.BookingStatus.CANCELLED)
                .filter(b -> !(checkOut.isBefore(b.getCheckIn()) || checkIn.isAfter(b.getCheckOut())))
                .toList();

        if (!conflictingBookings.isEmpty()) {
            throw new IllegalArgumentException("Les dates ne sont pas disponibles");
        }
    }

    private Double calculatePrice(Double pricePerNight, LocalDate checkIn, LocalDate checkOut) {
        long nights = java.time.temporal.ChronoUnit.DAYS.between(checkIn, checkOut);
        return pricePerNight * nights;
    }
}

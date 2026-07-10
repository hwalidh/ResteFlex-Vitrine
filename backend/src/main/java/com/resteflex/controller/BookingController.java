package com.resteflex.controller;

import com.resteflex.dto.BookingRequest;
import com.resteflex.dto.BookingResponse;
import com.resteflex.service.BookingService;
import com.resteflex.service.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/bookings")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@Tag(name = "Bookings", description = "Gestion des réservations")
public class BookingController {
    private final BookingService bookingService;
    private final StripeService stripeService;

    @PostMapping
    @Operation(summary = "Créer une réservation", description = "Crée une nouvelle réservation pour un logement")
    @ApiResponse(responseCode = "201", description = "Réservation créée")
    public ResponseEntity<BookingResponse> createBooking(@RequestBody BookingRequest request) {
        var booking = bookingService.createBooking(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(BookingResponse.fromEntity(booking));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Récupérer une réservation", description = "Retourne les détails d'une réservation")
    @ApiResponse(responseCode = "200", description = "Réservation trouvée")
    @ApiResponse(responseCode = "404", description = "Réservation non trouvée")
    public ResponseEntity<BookingResponse> getBooking(
            @Parameter(description = "ID de la réservation") @PathVariable String id) {
        var booking = bookingService.getBookingById(id);
        return ResponseEntity.ok(BookingResponse.fromEntity(booking));
    }

    @GetMapping("/email/{email}")
    @Operation(summary = "Récupérer les réservations par email", description = "Retourne toutes les réservations d'un utilisateur")
    @ApiResponse(responseCode = "200", description = "Réservations trouvées")
    public ResponseEntity<List<BookingResponse>> getBookingsByEmail(
            @Parameter(description = "Email de l'utilisateur") @PathVariable String email) {
        var bookings = bookingService.getBookingsByEmail(email);
        return ResponseEntity.ok(bookings.stream().map(BookingResponse::fromEntity).toList());
    }

    @GetMapping("/listing/{listingId}")
    @Operation(summary = "Récupérer les réservations par logement", description = "Retourne toutes les réservations d'un logement")
    @ApiResponse(responseCode = "200", description = "Réservations trouvées")
    public ResponseEntity<List<BookingResponse>> getBookingsByListing(
            @Parameter(description = "ID du logement") @PathVariable String listingId) {
        var bookings = bookingService.getBookingsByListing(listingId);
        return ResponseEntity.ok(bookings.stream().map(BookingResponse::fromEntity).toList());
    }

    @PostMapping("/{id}/checkout")
    @Operation(summary = "Créer session Stripe", description = "Crée une session Stripe Checkout pour payer la réservation")
    @ApiResponse(responseCode = "200", description = "Session créée",
            content = @Content(schema = @Schema(type = "object", example = "{\"sessionId\":\"cs_test_...\"}")))
    public ResponseEntity<Map<String, String>> createCheckoutSession(
            @Parameter(description = "ID de la réservation") @PathVariable String id,
            @RequestBody Map<String, String> payload) throws StripeException {
        var booking = bookingService.getBookingById(id);
        Session session = stripeService.createCheckoutSession(id, booking.getTotalPrice(), payload.get("email"));
        return ResponseEntity.ok(Map.of("sessionId", session.getId()));
    }

    @PostMapping("/{id}/confirm")
    @Operation(summary = "Confirmer le paiement", description = "Valide le paiement Stripe et confirme la réservation")
    @ApiResponse(responseCode = "200", description = "Paiement confirmé")
    public ResponseEntity<BookingResponse> confirmPayment(
            @Parameter(description = "ID de la réservation") @PathVariable String id,
            @RequestBody Map<String, String> payload) {
        var booking = bookingService.confirmPayment(id, payload.get("stripePaymentId"));
        return ResponseEntity.ok(BookingResponse.fromEntity(booking));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Annuler une réservation", description = "Annule une réservation et la supprime du calendrier")
    @ApiResponse(responseCode = "204", description = "Réservation annulée")
    public ResponseEntity<Void> cancelBooking(
            @Parameter(description = "ID de la réservation") @PathVariable String id) {
        bookingService.cancelBooking(id);
        return ResponseEntity.noContent().build();
    }
}

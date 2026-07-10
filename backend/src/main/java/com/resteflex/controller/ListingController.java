package com.resteflex.controller;

import com.resteflex.entity.Listing;
import com.resteflex.service.ListingService;
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

@RestController
@RequestMapping("/listings")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@Tag(name = "Listings", description = "Gestion des logements")
public class ListingController {
    private final ListingService listingService;

    @GetMapping
    @Operation(summary = "Récupérer tous les logements", description = "Retourne la liste complète des logements disponibles")
    @ApiResponse(responseCode = "200", description = "Liste des logements récupérée",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Listing.class)))
    public ResponseEntity<List<Listing>> getAllListings() {
        return ResponseEntity.ok(listingService.getAllListings());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Récupérer un logement", description = "Retourne les détails d'un logement spécifique")
    @ApiResponse(responseCode = "200", description = "Logement trouvé")
    @ApiResponse(responseCode = "404", description = "Logement non trouvé")
    public ResponseEntity<Listing> getListingById(
            @Parameter(description = "ID du logement") @PathVariable String id) {
        return ResponseEntity.ok(listingService.getListingById(id));
    }

    @GetMapping("/search/location")
    @Operation(summary = "Rechercher par localisation", description = "Cherche les logements par localisation")
    @ApiResponse(responseCode = "200", description = "Logements trouvés")
    public ResponseEntity<List<Listing>> searchByLocation(
            @Parameter(description = "Localisation") @RequestParam String location) {
        return ResponseEntity.ok(listingService.searchByLocation(location));
    }

    @GetMapping("/search/price")
    @Operation(summary = "Rechercher par prix", description = "Cherche les logements dans une gamme de prix")
    @ApiResponse(responseCode = "200", description = "Logements trouvés")
    public ResponseEntity<List<Listing>> searchByPrice(
            @Parameter(description = "Prix minimum") @RequestParam Double min,
            @Parameter(description = "Prix maximum") @RequestParam Double max) {
        return ResponseEntity.ok(listingService.searchByPriceRange(min, max));
    }

    @GetMapping("/search/guests")
    @Operation(summary = "Rechercher par nombre d'hôtes", description = "Cherche les logements pour un nombre d'hôtes")
    @ApiResponse(responseCode = "200", description = "Logements trouvés")
    public ResponseEntity<List<Listing>> searchByGuests(
            @Parameter(description = "Nombre minimum d'hôtes") @RequestParam Integer guests) {
        return ResponseEntity.ok(listingService.searchByGuests(guests));
    }

    @PostMapping
    @Operation(summary = "Créer un logement", description = "Crée un nouveau logement")
    @ApiResponse(responseCode = "201", description = "Logement créé")
    public ResponseEntity<Listing> createListing(@RequestBody Listing listing) {
        return ResponseEntity.status(HttpStatus.CREATED).body(listingService.createListing(listing));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Modifier un logement", description = "Met à jour un logement existant")
    @ApiResponse(responseCode = "200", description = "Logement modifié")
    public ResponseEntity<Listing> updateListing(
            @Parameter(description = "ID du logement") @PathVariable String id,
            @RequestBody Listing listing) {
        return ResponseEntity.ok(listingService.updateListing(id, listing));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Supprimer un logement", description = "Supprime un logement et tous ses réservations")
    @ApiResponse(responseCode = "204", description = "Logement supprimé")
    public ResponseEntity<Void> deleteListing(
            @Parameter(description = "ID du logement") @PathVariable String id) {
        listingService.deleteListing(id);
        return ResponseEntity.noContent().build();
    }
}

# ResteFlex Listings Service - Backend

Microservice SpringBoot pour la gestion des logements et réservations avec intégration Stripe et synchronisation calendrier iCal.

## 🚀 Quick Start

### Prérequis
- Java 21+
- Maven 3.9+
- PostgreSQL (via Supabase)
- Stripe Account

### Installation

```bash
cd backend

# Variables d'environnement
export DB_PASSWORD=your_supabase_password
export JWT_SECRET=your-jwt-secret-min-32-chars
export STRIPE_SECRET_KEY=sk_test_...
export STRIPE_PUBLISHABLE_KEY=pk_test_...

# Build et run local
mvn clean install
mvn spring-boot:run
```

### Docker

```bash
docker-compose up -d listings-api
# API: http://localhost:8080/api
# Swagger UI: http://localhost:8080/api/swagger-ui.html
```

## 📚 Documentation API

### Swagger UI
- **URL**: http://localhost:8080/api/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8080/api/v3/api-docs

### Endpoints principaux

#### Listings
```bash
# Tous les logements
curl http://localhost:8080/api/listings

# Détail logement
curl http://localhost:8080/api/listings/{id}

# Recherche par localisation
curl http://localhost:8080/api/listings/search/location?location=Paris

# Recherche par prix
curl http://localhost:8080/api/listings/search/price?min=100&max=200

# Recherche par hôtes
curl http://localhost:8080/api/listings/search/guests?guests=4

# Créer logement
curl -X POST http://localhost:8080/api/listings \
  -H "Content-Type: application/json" \
  -d '{...}'

# Modifier logement
curl -X PUT http://localhost:8080/api/listings/{id} \
  -H "Content-Type: application/json" \
  -d '{...}'

# Supprimer logement
curl -X DELETE http://localhost:8080/api/listings/{id}
```

#### Bookings
```bash
# Créer réservation
curl -X POST http://localhost:8080/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "listingId": "...",
    "email": "user@example.com",
    "checkIn": "2024-12-15",
    "checkOut": "2024-12-20",
    "guests": 2
  }'

# Détail réservation
curl http://localhost:8080/api/bookings/{id}

# Réservations par email
curl http://localhost:8080/api/bookings/email/{email}

# Réservations par logement
curl http://localhost:8080/api/bookings/listing/{listingId}

# Créer session Stripe
curl -X POST http://localhost:8080/api/bookings/{id}/checkout \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com"}'

# Confirmer paiement
curl -X POST http://localhost:8080/api/bookings/{id}/confirm \
  -H "Content-Type: application/json" \
  -d '{"stripePaymentId": "pi_..."}'

# Annuler réservation
curl -X DELETE http://localhost:8080/api/bookings/{id}
```

## 🧪 Tests

### Exécuter les tests

```bash
# Tous les tests
mvn test

# Tests spécifiques
mvn test -Dtest=ListingServiceTest

# Avec couverture de code (JaCoCo)
mvn clean test jacoco:report
# Rapport: target/site/jacoco/index.html
```

### Structure des tests
- `service/`: Tests unitaires des services (Mockito)
- `controller/`: Tests d'intégration des contrôleurs (MockMvc)

## 🏗️ Architecture

### Entités JPA
- **Listing**: Logement avec 15 photos max
- **Booking**: Réservation avec statut (PENDING, PAID, CONFIRMED, CANCELLED)

### Services
- **ListingService**: CRUD listings + recherche
- **BookingService**: CRUD bookings + gestion disponibilité + iCal
- **StripeService**: Gestion sessions checkout Stripe
- **ICalService**: Synchronisation calendrier iCal (bookings.ics)

### Contrôleurs
- **ListingController**: `/api/listings` (CRUD + recherche)
- **BookingController**: `/api/bookings` (réservations + Stripe)

## 📋 Features

✅ CRUD Listings (15 photos max)
✅ CRUD Bookings
✅ Recherche (location, prix, guests)
✅ Vérification disponibilité
✅ Stripe Checkout Sessions
✅ iCal Synchronization
✅ JWT Authentication (ready)
✅ PostgreSQL Supabase
✅ Swagger/OpenAPI
✅ Tests unitaires + d'intégration
✅ Docker support
✅ Nginx API Gateway

## 🔐 Environnement

| Variable | Description | Exemple |
|---|---|---|
| `DB_USER` | PostgreSQL user | `postgres` |
| `DB_PASSWORD` | PostgreSQL password | `***` |
| `JWT_SECRET` | Secret JWT | `your-secret-key-min-32-chars` |
| `STRIPE_SECRET_KEY` | Clé secrète Stripe | `sk_test_...` |
| `STRIPE_PUBLISHABLE_KEY` | Clé publique Stripe | `pk_test_...` |

## 📦 Dépendances principales

- Spring Boot 3.2.0
- Spring Data JPA
- Spring Security + JWT
- PostgreSQL Driver
- Stripe Java SDK
- iCal4j (calendrier)
- Swagger/SpringDoc OpenAPI
- JUnit 5 + Mockito (tests)
- JaCoCo (couverture code)

## 🚢 Déploiement

### Production

```bash
# Build image
docker build -t listings-api:latest ./backend

# Docker Compose prod
docker-compose -f docker-compose.prod.yml up -d

# Logs
docker-compose logs -f listings-api
```

### Health Check
```bash
curl http://localhost:8080/api/actuator/health
```

## 📝 Logging

Niveaux configurés dans `application.yml`:
- `ROOT`: INFO
- `com.resteflex`: DEBUG
- `org.springframework.security`: DEBUG

## 🤝 Contributing

1. Créer une branche: `git checkout -b feat/ma-feature`
2. Commit: `git commit -m "feat: description"`
3. Push: `git push origin feat/ma-feature`
4. PR vers `feat/listings-springboot`

## 📞 Support

- Issues: GitHub Issues
- Email: support@resteflex.fr

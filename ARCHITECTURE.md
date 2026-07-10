# ResteFlex - Microservices Architecture

## Structure

```
ResteFlex---Draft/
├── (frontend Angular - site vitrine)
├── backend/                    (SpringBoot Microservice)
│   ├── pom.xml
│   ├── Dockerfile
│   ├── src/main/java/com/resteflex/
│   │   ├── entity/             (JPA Entities)
│   │   ├── dto/                (Data Transfer Objects)
│   │   ├── repository/         (JPA Repositories)
│   │   ├── service/            (Business Logic)
│   │   └── controller/         (REST Controllers)
│   └── src/main/resources/
│       └── application.yml
├── docker-compose.yml          (Orchestration)
├── nginx-gateway.conf          (API Gateway)
└── .env                        (Variables d'environnement)
```

## Branches

- `main` → Site vitrine (Angular, Netlify)
- `feat/listings-springboot` → Module listings (SpringBoot + PostgreSQL Supabase)

## Services

### Frontend (Angular)
- Déployé sur Netlify
- URL: https://resteflex-conciergerie.fr
- Appelle `/api/...` → routé vers SpringBoot via Nginx

### Backend (SpringBoot)
- Port: `8080`
- API: `http://localhost:8080/api`
- Base de données: PostgreSQL Supabase

### Nginx Gateway
- Port: `80` (dev) / `443` (prod)
- Route `/api/*` → SpringBoot (8080)
- Gestion CORS, compression, SSL

## Quick Start

### Développement local

```bash
# Variables d'environnement
cat > .env << EOF
DB_PASSWORD=your_supabase_password
JWT_SECRET=your-jwt-secret
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
EOF

# Build et lancer les services
docker-compose up -d

# API disponible à : http://localhost/api
# Swagger: http://localhost:8080/api/swagger-ui.html
```

### Frontend Angular

```bash
npm install
npm start
# http://localhost:4200
```

## Features

### Listings
- ✅ CRUD listings (GET, POST, PUT, DELETE)
- ✅ Recherche (location, prix, guests)
- ✅ Support 15 photos par logement

### Bookings
- ✅ Créer réservation
- ✅ Vérifier disponibilité
- ✅ Synchronisation calendrier iCal
- ✅ Calcul prix automatique

### Paiement
- ✅ Intégration Stripe
- ✅ Checkout Session
- ✅ Webhook confirmation

### Authentification
- ✅ JWT (Bearer tokens)
- ✅ CORS configuré

## API Endpoints

### Listings
```
GET    /api/listings              - Tous les logements
GET    /api/listings/{id}         - Détail logement
GET    /api/listings/search/location?location=Paris
GET    /api/listings/search/price?min=100&max=200
GET    /api/listings/search/guests?guests=4
POST   /api/listings              - Créer logement
PUT    /api/listings/{id}         - Modifier logement
DELETE /api/listings/{id}         - Supprimer logement
```

### Bookings
```
POST   /api/bookings              - Créer réservation
GET    /api/bookings/{id}         - Détail réservation
GET    /api/bookings/email/{email} - Réservations utilisateur
GET    /api/bookings/listing/{listingId} - Réservations logement
POST   /api/bookings/{id}/checkout - Créer session Stripe
POST   /api/bookings/{id}/confirm - Confirmer paiement
DELETE /api/bookings/{id}         - Annuler réservation
```

## Calendrier iCal

Le calendrier est synchronisé automatiquement:
- Ajout événement lors création réservation
- Suppression lors annulation
- Fichier: `calendars/bookings.ics`
- Compatible: Google Calendar, Outlook, Apple Calendar

## Variables d'environnement

| Variable | Description |
|---|---|
| `DB_PASSWORD` | PostgreSQL Supabase password |
| `JWT_SECRET` | Secret JWT (min 32 caractères) |
| `STRIPE_SECRET_KEY` | Clé secrète Stripe |
| `STRIPE_PUBLISHABLE_KEY` | Clé publique Stripe |

## Déploiement Production

```bash
# Build images
docker-compose build

# Pousser vers registry
docker tag listings-api:latest your-registry/listings-api:latest
docker push your-registry/listings-api:latest

# Sur serveur production
docker pull your-registry/listings-api:latest
docker-compose -f docker-compose.prod.yml up -d
```

## Monitoring

```bash
# Logs
docker-compose logs -f listings-api

# Health check
curl http://localhost/health

# Metrics
curl http://localhost:8080/api/actuator
```

## Notes

- JWT expiration: 24h (configurable)
- CORS activé pour `http://localhost:4200` (dev)
- En production, mettre à jour origins CORS
- Stripe webhook: à configurer dans Stripe Dashboard

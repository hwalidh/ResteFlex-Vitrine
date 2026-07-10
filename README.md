# ResteFlex Conciergerie 🏡

Site vitrine de **ResteFlex Conciergerie** — gestion locative intelligente à Paris.  
Construit avec Angular 19, TailwindCSS, Supabase PostgreSQL et Dockerisé avec Nginx.

---

## 🚀 Démarrage rapide

### Avec Docker (recommandé)

```bash
# Build et lancement
docker compose up -d

# Accès : http://localhost:4200
```

```bash
# Rebuild après modifications
docker compose up -d --build
```

### En local (développement)

```bash
# Installation des dépendances
npm install

# Serveur de développement avec hot reload
npm start

# Accès : http://localhost:4200
```

---

## 🗄️ Base de données (Supabase PostgreSQL)

Le projet utilise **Supabase** comme base de données hébergée pour les logements et les réservations.

### Setup initial (une seule fois)

Les tables doivent être créées manuellement dans Supabase **avant le premier déploiement**:

1. Aller sur: https://supabase.com/dashboard/project/ocutxszgjnmztdawuwgt/sql/new
2. Exécuter le SQL suivant:

```sql
CREATE TABLE IF NOT EXISTS public.listings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  location VARCHAR(255) NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms NUMERIC NOT NULL,
  guests INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  amenities TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INTEGER NOT NULL,
  total_price NUMERIC(10,2) NOT NULL,
  stripe_payment_id VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "listings_public_read" ON public.listings FOR SELECT USING (true);
CREATE POLICY "listings_public_insert" ON public.listings FOR INSERT WITH CHECK (true);
CREATE POLICY "bookings_public_insert" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "bookings_public_read" ON public.bookings FOR SELECT USING (true);
```

### Seeding automatique

Le script `npm run seed` est exécuté automatiquement par Netlify à chaque déploiement via `netlify.toml`:

```
build command: npm run build && npm run seed
```

- ✅ Vérifie si les données existent déjà (idempotent)
- ✅ Insère 3 logements de test si la table est vide
- ✅ Ne re-seede jamais si des données existent

Pour seeder manuellement en local:

```bash
npm run seed
```

### Variables d'environnement Netlify

À ajouter dans **Netlify → Site settings → Environment variables**:

| Variable | Valeur |
|---|---|
| `SUPABASE_URL` | `https://ocutxszgjnmztdawuwgt.supabase.co` |
| `SUPABASE_ANON_KEY` | Clé publique Supabase |

---

## 🐳 Docker

| Fichier | Rôle |
|---|---|
| `Dockerfile` | Build multi-stage : Node 20 (build Angular) → Nginx Alpine (prod) |
| `docker-compose.yml` | Service unique exposé sur le port `4200` |
| `nginx.conf` | Config Nginx avec routing Angular, cache assets, gzip |

```bash
# Build l'image manuellement
docker build -t resteflex-app .

# Voir les logs
docker logs resteflex-concierge

# Arrêter
docker compose down
```

---

## 📁 Structure du projet

```
src/
├── app/
│   ├── components/
│   │   ├── home/                  # Page d'accueil
│   │   ├── listings/              # Grille des logements Airbnb
│   │   ├── booking/               # Détail logement + réservation Stripe
│   │   ├── contact/               # Formulaire multi-étapes
│   │   ├── services/              # Page services
│   │   ├── offers/                # Page offres
│   │   ├── header/                # Header fixe + scrollspy
│   │   └── shared/
│   │       ├── calendly-button/   # Bouton RDV flottant
│   │       ├── modal/
│   │       └── success-popup/
│   ├── models/
│   ├── services/
│   │   ├── supabase.service.ts    # CRUD listings & bookings
│   │   └── seeder.service.ts      # Seeding client-side au démarrage
│   └── app.routes.ts
├── environments/
│   ├── environment.ts             # Dev config
│   └── environment.prod.ts        # Prod config
├── assets/
└── index.html

scripts/
└── seed.mjs                       # Script Node.js de seeding (lancé au build Netlify)

netlify/
└── functions/
    └── seed-database.ts           # Netlify Function (backup)

netlify.toml                       # Config build + functions + redirects
sql-migration.sql                  # Schema SQL complet
```

---

## 🛠️ Stack technique

| Technologie | Version | Usage |
|---|---|---|
| Angular | 19 | Framework principal |
| TailwindCSS | 3 | Styles utilitaires |
| TypeScript | 5 | Langage |
| SCSS | — | Styles composants |
| Supabase | — | PostgreSQL hébergé (listings, bookings) |
| Stripe | — | Paiement en ligne |
| Nginx | Alpine | Serveur de production |
| Node | 20 Alpine | Build stage Docker |

---

## 📜 Scripts

```bash
npm start          # Serveur de développement
npm run build      # Build production (dist/demo/)
npm run seed       # Seeder la base de données Supabase
npm run test       # Tests unitaires
```

---

## 🌿 Branches

| Branche | Rôle |
|---|---|
| `main` | Production stable (auto-deploy Netlify) |
| `airbnb-stripe-integration` | Feature branche mergée dans main |

---

## 🔗 Intégrations

- **Supabase** — PostgreSQL hébergé, listings et réservations
- **Stripe** — Paiement en ligne (`@stripe/stripe-js`)
- **Calendly** — Prise de rendez-vous via widget popup
- **WhatsApp** — Lien direct `wa.me/33650329658`
- **Netlify Functions** — Envoi d'emails + seeding base de données
- **Google Tag Manager** — ID `GTM-NVDSW42J`

---

## 📐 Conventions

- Composants Angular **standalone**
- Styles composants en **SCSS** avec notation BEM
- Classes utilitaires **Tailwind** pour le layout
- `scroll-padding-top: 140px` global pour compenser le header fixe

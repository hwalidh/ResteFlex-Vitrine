# ResteFlex Vitrine 🏡

Site vitrine de **ResteFlex Conciergerie** — gestion locative intelligente à Paris.
Construit avec Angular 19, TailwindCSS et déployé sur Netlify.

> ⚠️ Ce repo est **uniquement** le site vitrine (pages marketing).
> Les logements, réservations et paiements sont gérés dans des repos séparés.

---

## 🏗️ Architecture microservices

| Repo | Rôle | Déploiement |
|---|---|---|
| **ResteFlex-Vitrine** (ce repo) | Site vitrine statique | Netlify |
| [ResteFlex-Listings](https://github.com/hwalidh/ResteFlex-Listings) | Frontend logements & réservation | Netlify |
| [ResteFlex-Backend](https://github.com/hwalidh/ResteFlex-Backend) | API SpringBoot (listings, bookings, Stripe) | Docker |

---

## 🚀 Démarrage rapide

### En local

```bash
npm install
npm start
# http://localhost:4200
```

### Avec Docker

```bash
docker compose up -d
# http://localhost:80
```

---

## 📁 Structure

```
src/
├── app/
│   ├── components/
│   │   ├── home/           # Page d'accueil
│   │   ├── services/       # Page services
│   │   ├── offers/         # Page offres
│   │   ├── contact/        # Formulaire multi-étapes
│   │   ├── header/         # Header fixe + scrollspy
│   │   └── shared/
│   │       ├── calendly-button/   # Bouton RDV flottant
│   │       ├── modal/
│   │       └── success-popup/
│   ├── data/               # Configs offres & packages
│   ├── models/             # Interfaces TypeScript
│   ├── services/           # Email service (Netlify Function)
│   └── app.routes.ts
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
└── assets/

netlify/
└── functions/
    └── send-email.ts       # Envoi d'emails via Resend

netlify.toml                # Config build + functions + redirects
```

---

## 🛠️ Stack technique

| Technologie | Usage |
|---|---|
| Angular 19 | Framework frontend |
| TailwindCSS 3 | Styles utilitaires |
| TypeScript 5 | Langage |
| SCSS | Styles composants |
| Netlify Functions | Envoi d'emails (Resend) |
| Nginx Alpine | Serveur Docker production |

---

## 🔗 Intégrations

- **Calendly** — Prise de RDV via widget popup (`calendly.com/hamatwalid/30min`)
- **WhatsApp** — Lien direct `wa.me/33650329658`
- **Resend** — Envoi d'emails via Netlify Function
- **Google Tag Manager** — ID `GTM-NVDSW42J`

> ❌ Pas de Supabase
> ❌ Pas de Stripe
> ❌ Pas d'appel au backend SpringBoot

---

## 📜 Scripts

```bash
npm start        # Développement (localhost:4200)
npm run build    # Build production → dist/resteflex-vitrine
npm run test     # Tests unitaires
```

---

## 🐳 Docker

```bash
# Build
docker build -t resteflex-vitrine .

# Lancer
docker compose up -d

# Logs
docker logs resteflex-vitrine

# Arrêter
docker compose down
```

---

## 🌿 Branches

| Branche | Rôle |
|---|---|
| `main` | Production (auto-deploy Netlify) |
| `feat/*` | Nouvelles fonctionnalités |

---

## 🔐 Variables d'environnement Netlify

| Variable | Usage |
|---|---|
| `RESEND_API_KEY` | Envoi d'emails via Netlify Function |

---

## 📐 Conventions

- Composants Angular **standalone**
- Styles en **SCSS** avec notation BEM
- Classes utilitaires **Tailwind** pour le layout
- `scroll-padding-top: 140px` pour compenser le header fixe

# ResteFlex Conciergerie 🏡

Site vitrine de **ResteFlex Conciergerie** — gestion locative intelligente à Paris.  
Construit avec Angular 19, TailwindCSS et Dockerisé avec Nginx.

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
│   │   │   └── sections/
│   │   │       ├── hero/          # Section hero avec scroll indicator
│   │   │       ├── presentation/  # Présentation du service
│   │   │       ├── about/         # À propos
│   │   │       ├── services-overview/
│   │   │       ├── travel-pack/
│   │   │       ├── business-pack/
│   │   │       ├── serenity-pack/
│   │   │       └── testimonials/
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
│   └── app.routes.ts
├── assets/
├── global_styles.css
└── index.html
```

---

## 🛠️ Stack technique

| Technologie | Version | Usage |
|---|---|---|
| Angular | 19 | Framework principal |
| TailwindCSS | 3 | Styles utilitaires |
| TypeScript | 5 | Langage |
| SCSS | — | Styles composants |
| Nginx | Alpine | Serveur de production |
| Node | 20 Alpine | Build stage Docker |
| Calendly | Widget externe | Prise de RDV |

---

## 📜 Scripts

```bash
npm start          # Serveur de développement
npm run build      # Build production (dist/demo/)
npm run lint       # ESLint
npm run test       # Tests unitaires
```

---

## 🌿 Branches

| Branche | Rôle |
|---|---|
| `main` | Production stable |
| `fix/*` | Corrections de bugs |
| `feat/*` | Nouvelles fonctionnalités |

---

## 🔗 Intégrations

- **Calendly** — Prise de rendez-vous via widget popup (`calendly.com/hamatwalid/30min`)
- **WhatsApp** — Lien direct `wa.me/33650329658`
- **Netlify Functions** — Envoi d'emails via `netlify/functions/send-email.ts`
- **Google Tag Manager** — ID `GTM-NVDSW42J`

---

## 📐 Conventions

- Composants Angular **standalone**
- Styles composants en **SCSS** avec notation BEM
- Classes utilitaires **Tailwind** pour le layout
- `scroll-padding-top: 140px` global pour compenser le header fixe + scrollspy

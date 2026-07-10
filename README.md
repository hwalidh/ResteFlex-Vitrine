# StayFlex Concierge

Une application de conciergerie intelligente pour la gestion locative.

## 🚀 Démarrage rapide

```bash
# Installation des dépendances
npm install

# Lancement du serveur de développement
npm run dev

# Construction pour la production
npm run build
```

## 📁 Structure du projet

```
src/
├── app/
│   ├── components/         # Composants de l'application
│   │   ├── home/          # Page d'accueil et ses sections
│   │   │   └── sections/  # Sections modulaires de la page d'accueil
│   │   ├── services/      # Page des services
│   │   ├── contact/       # Page de contact
│   │   └── header/        # En-tête de l'application
│   ├── models/            # Interfaces et types
│   └── app.routes.ts      # Configuration du routage
├── assets/                # Ressources statiques
└── styles/               # Styles globaux
```

## 🛠️ Technologies utilisées

- Angular 17
- TailwindCSS
- TypeScript

## 🔧 Scripts disponibles

- `npm run dev`: Lance le serveur de développement
- `npm run build`: Construit l'application pour la production
- `npm run test`: Lance les tests
- `npm run lint`: Vérifie le code avec ESLint

## 📝 Conventions de code

- Utilisation de TypeScript strict
- Composants standalone
- Styles modulaires avec SCSS
- BEM pour les classes CSS personnalisées
- Composants atomiques et réutilisables
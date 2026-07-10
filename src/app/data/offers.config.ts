import { OfferConfig } from '../models/offer.model';

export const OFFERS_CONFIG: OfferConfig[] = [
  {
    id: 'travel',
    name: 'Travel Pack',
    emoji: '🏖️',
    description: 'Pour les nomades digitaux et voyageurs',
    pricing: {
      options: [
        { name: 'Sans abonnement', value: '20%' },
        { name: 'Avec Flexibility', value: '15%' }
      ],
      note: 'Abonnement Flexibility : 29,99€/mois'
    },
    features: [
      'Gestion des réservations complète',
      'Ménage de Compét\' (sur devis)',
      'Support ultra réactif',
      'Vérification après chaque séjour',
      'Support 24/7'
    ],
    additionalServices: [
      { name: 'Photos professionnelles', price: '90€' },
      { name: 'Création d\'annonce (par plateforme)', price: '25€' },
      { name: 'Intervention sur place', price: '100€' }
    ],
    ctaText: 'Je teste ! 🚀'
  },
  {
    id: 'business',
    name: 'Business Pack',
    emoji: '💼',
    description: 'Pour les investisseurs malins',
    isPopular: true,
    tagline: 'Populaire 🔥',
    pricing: {
      options: [
        { name: 'Sans engagement', value: '25%' },
        { name: 'Engagement 1 an', value: '20%' },
        { name: 'Engagement 2 ans', value: '18%', highlight: true }
      ]
    },
    features: [
      'Création d\'annonces gratuite',
      'Optimisation IA des revenus',
      'Photos pro (avec engagement)',
      'Guide d\'accueil offert',
      'Support VIP 24/7'
    ],
    additionalServices: [
      { name: 'Site professionnel', price: '300€-500€' },
      { name: 'Guide d\'accueil (sans engagement)', price: '70€' },
      { name: 'Photos pro (sans engagement)', price: '100€' }
    ],
    ctaText: 'Je maximise ! 🚀'
  },
  {
    id: 'serenity',
    name: 'Serenity Pack',
    emoji: '🏡',
    description: 'Loyer garanti supérieur au marché',
    tagline: 'Nouveau 🌟',
    tagBg: 'from-emerald-600 to-teal-600',
    pricing: {
      options: [
        { name: 'Loyer garanti', value: '+10%' },
        { name: 'Frais de service', value: '0€' }
      ]
    },
    features: [
      'Loyer versé même en cas d\'inoccupation',
      'Entretien professionnel du bien',
      'Assurance tous risques incluse',
      'Restitution garantie en parfait état'
    ],
    additionalServices: [
      { name: 'Valorisation du bien', price: 'Inclus' },
      { name: 'Maintenance préventive', price: 'Inclus' },
      { name: 'Assurance premium', price: 'Inclus' }
    ],
    ctaText: 'Ça m\'intéresse ! 🚀',
    ctaColor: 'from-emerald-500 to-teal-500'
  }
];
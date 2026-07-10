import { PackageConfig } from '../models/package.model';

export const PACKAGES_CONFIG: PackageConfig[] = [
  {
    id: 'travel',
    name: 'Travel Pack',
    emoji: '🏖️',
    description: 'Pour les nomades digitaux et les voyageurs qui veulent rentabiliser leur appart pendant leurs aventures !',
    formFields: [
      {
        name: 'propertyType',
        type: 'select',
        label: 'C\'est quoi ton bien ?',
        emoji: '🏠',
        options: [
          { id: 'apartment', name: 'Appartement' },
          { id: 'studio', name: 'Studio' },
          { id: 'room', name: 'Chambre' },
          { id: 'house', name: 'Maison' }
        ],
        required: true
      },
      {
        name: 'propertyStyle',
        type: 'select',
        label: 'Le style de ton bien',
        emoji: '✨',
        options: [
          { id: 'modern', name: 'Moderne & Design' },
          { id: 'classic', name: 'Classique & Élégant' },
          { id: 'new', name: 'Neuf & Contemporain' },
          { id: 'old', name: 'Ancien avec Charme' }
        ]
      },
      {
        name: 'surface',
        type: 'text',
        label: 'La taille en m² (même à peu près)',
        emoji: '📏'
      },
      {
        name: 'location',
        type: 'text',
        label: 'Où ça se trouve ?',
        emoji: '📍'
      },
      {
        name: 'availabilityStart',
        type: 'date',
        label: 'Dispo à partir de quand ?',
        emoji: '📅'
      },
      {
        name: 'availabilityEnd',
        type: 'date',
        label: 'Jusqu\'à quand ?',
        emoji: '📅'
      }
    ]
  },
  {
    id: 'business',
    name: 'Business Pack',
    emoji: '💼',
    description: 'Pour les investisseurs malins qui veulent maximiser leurs revenus sans prise de tête !',
    formFields: [
      {
        name: 'propertyCount',
        type: 'number',
        label: 'Combien de biens à gérer ?',
        emoji: '🏢'
      },
      {
        name: 'investmentType',
        type: 'select',
        label: 'Type de projet',
        emoji: '💰',
        options: [
          { id: 'existing', name: 'Déjà en location (on optimise !)' },
          { id: 'new', name: 'Nouveau projet (on démarre !)' },
          { id: 'mix', name: 'Un peu des deux (on gère !)' }
        ]
      },
      {
        name: 'currentRevenue',
        type: 'text',
        label: 'Revenus actuels (t\'inquiète, on va les booster ! 🚀)',
        emoji: '📈'
      }
    ]
  },
  {
    id: 'serenity',
    name: 'Serenity Pack',
    emoji: '🏡',
    description: 'Pour ceux qui veulent un loyer garanti supérieur au marché avec une tranquillité absolue !',
    formFields: [
      {
        name: 'propertyType',
        type: 'select',
        label: 'Type de bien',
        emoji: '🏠',
        options: [
          { id: 'apartment', name: 'Appartement' },
          { id: 'studio', name: 'Studio' },
          { id: 'house', name: 'Maison' }
        ]
      },
      {
        name: 'surface',
        type: 'text',
        label: 'Surface en m²',
        emoji: '📏'
      },
      {
        name: 'location',
        type: 'text',
        label: 'Localisation',
        emoji: '📍'
      },
      {
        name: 'currentRent',
        type: 'text',
        label: 'Loyer actuel',
        emoji: '💰'
      },
      {
        name: 'propertyValue',
        type: 'text',
        label: 'Valeur estimée du bien',
        emoji: '💎'
      }
    ]
  }
];
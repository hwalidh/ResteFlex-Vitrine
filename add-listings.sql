-- Ajouter 3 logements supplémentaires pour tester l'affichage

INSERT INTO listings (title, description, price, location, bedrooms, bathrooms, guests, image_url, amenities) VALUES

(
  'Studio Moderne Marseille',
  'Petit studio lumineux et contemporain à Marseille proche du Vieux Port. Idéal pour les voyageurs en solo ou couples. Cuisine équipée, salle de bain moderne, accès WiFi haut débit.',
  89.00,
  'Marseille, Provence-Alpes-Côte d''Azur',
  1,
  1,
  2,
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  ARRAY['WiFi', 'Cuisine équipée', 'Douche italienne', 'Climatisation', 'TV écran plat', 'Micro-ondes']
),

(
  'Maison de Vacances Provence',
  'Charmante maison en pierre en pleine Provence avec jardin fleuri. Terrasse avec pergola, piscine partagée, calme assuré. Vue sur les montagnes du Luberon. Parfait pour famille ou groupe d''amis.',
  165.00,
  'Lourmarin, Provence',
  3,
  2,
  7,
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  ARRAY['Piscine partagée', 'Jardin', 'Terrasse', 'Cuisine provençale', 'Barbecue', 'Cheminée', 'WiFi', 'Parking']
),

(
  'Loft Industriel Bordeaux',
  'Spacieux loft avec hauts plafonds dans ancien entrepôt rénové. Décoration moderne épurée, grandes fenêtres lumineuses. Situé en plein centre de Bordeaux, proche restaurants et commerces. Idéal pour couple ou petit groupe.',
  145.00,
  'Bordeaux, Nouvelle-Aquitaine',
  2,
  1.5,
  4,
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  ARRAY['WiFi haut débit', 'Loft spacieux', 'Cuisine américaine', 'Salle d''eau moderne', 'Climatisation', 'Ascenseur', 'Espace de travail', 'TV smart']
);

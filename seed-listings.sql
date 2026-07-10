-- Vider les logements existants et en ajouter 3 complets pour le test
DELETE FROM listings;

INSERT INTO listings (title, description, price, location, bedrooms, bathrooms, guests, image_url, amenities) 
VALUES 
(
  'Luxe Penthouse Paris',
  'Magnifique penthouse avec vue panoramique sur la Tour Eiffel. Entièrement équipé avec cuisine haut de gamme, salon spacieux et terrasse privée. Parfait pour un séjour inoubliable à Paris.',
  185.00,
  'Paris, Île-de-France',
  3,
  2,
  6,
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&w=800&q=80',
  ARRAY['WiFi haut débit', 'Climatisation', 'Cuisine équipée', 'Terrasse', 'Vue panoramique', 'Lave-linge', 'TV écran plat', 'Chauffage central']
),
(
  'Villa Côte d''Azur avec Piscine',
  'Superbe villa provençale en bord de mer avec piscine privée chauffée. Jardin méditerranéen aménagé, accès direct à la plage et proche des restaurants. Idéal pour des vacances en famille.',
  225.00,
  'Antibes, Côte d''Azur',
  4,
  3,
  8,
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&w=800&q=80',
  ARRAY['Piscine privée', 'Accès plage', 'Jardin aménagé', 'BBQ', 'Cuisine moderne', 'Air conditionné', 'WiFi', 'Parking', 'Jacuzzi']
),
(
  'Appartement Bourgeois Lyon Centre',
  'Élégant appartement haussmannien au cœur de Lyon. Décoration soignée, belle hauteur sous plafond, proche du Vieux Lyon et de la Presqu''île. Séjour confortable et culturel.',
  125.00,
  'Lyon, Rhône-Alpes',
  2,
  1,
  4,
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&w=800&q=80',
  ARRAY['WiFi', 'Cuisine équipée', 'Chauffage', 'Ascenseur', 'Lave-linge', 'TV', 'Terrasse balcon', 'Proximité transports']
);

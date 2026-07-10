-- Create listings table
CREATE TABLE IF NOT EXISTS listings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  location VARCHAR(255) NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  guests INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  amenities TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INTEGER NOT NULL,
  total_price NUMERIC(10, 2) NOT NULL,
  stripe_payment_id VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_listings_location ON listings(location);
CREATE INDEX idx_bookings_listing_id ON bookings(listing_id);
CREATE INDEX idx_bookings_email ON bookings(email);

-- Seed sample data: 3 Airbnb-style properties
INSERT INTO listings (title, description, price, location, bedrooms, bathrooms, guests, image_url, amenities) VALUES
(
  'Luxe Penthouse Paris',
  'Magnifique penthouse avec vue panoramique sur la Tour Eiffel. Entièrement équipé avec cuisine haut de gamme, salon spacieux et terrasse privée. Parfait pour un séjour inoubliable à Paris.',
  185.00,
  'Paris, Île-de-France',
  3,
  2,
  6,
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
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
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
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
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  ARRAY['WiFi', 'Cuisine équipée', 'Chauffage', 'Ascenseur', 'Lave-linge', 'TV', 'Terrasse balcon', 'Proximité transports']
);

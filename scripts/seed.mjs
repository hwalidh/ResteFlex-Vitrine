import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env['SUPABASE_URL'] || 'https://ocutxszgjnmztdawuwgt.supabase.co';
const SUPABASE_KEY = process.env['SUPABASE_ANON_KEY'] || 'sb_publishable_7-jupaDnqhSq7u-vrs5Cpg_4DsoOYgQ';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const listings = [
  {
    title: 'Luxe Penthouse Paris',
    description: 'Magnifique penthouse avec vue panoramique sur la Tour Eiffel. Entièrement équipé avec cuisine haut de gamme, salon spacieux et terrasse privée. Parfait pour un séjour inoubliable à Paris.',
    price: 185.00,
    location: 'Paris, Île-de-France',
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    image_url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&w=800&q=80',
    amenities: ['WiFi haut débit', 'Climatisation', 'Cuisine équipée', 'Terrasse', 'Vue panoramique', 'Lave-linge', 'TV écran plat', 'Chauffage central']
  },
  {
    title: "Villa Côte d'Azur avec Piscine",
    description: 'Superbe villa provençale en bord de mer avec piscine privée chauffée. Jardin méditerranéen aménagé, accès direct à la plage et proche des restaurants. Idéal pour des vacances en famille.',
    price: 225.00,
    location: "Antibes, Côte d'Azur",
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
    image_url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&w=800&q=80',
    amenities: ['Piscine privée', 'Accès plage', 'Jardin aménagé', 'BBQ', 'Cuisine moderne', 'Air conditionné', 'WiFi', 'Parking', 'Jacuzzi']
  },
  {
    title: 'Appartement Bourgeois Lyon Centre',
    description: "Élégant appartement haussmannien au cœur de Lyon. Décoration soignée, belle hauteur sous plafond, proche du Vieux Lyon et de la Presqu'île. Séjour confortable et culturel.",
    price: 125.00,
    location: 'Lyon, Rhône-Alpes',
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    image_url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&w=800&q=80',
    amenities: ['WiFi', 'Cuisine équipée', 'Chauffage', 'Ascenseur', 'Lave-linge', 'TV', 'Terrasse balcon', 'Proximité transports']
  }
];

async function seed() {
  console.log('🔍 Checking database...');

  const { data, error } = await supabase
    .from('listings')
    .select('id')
    .limit(1);

  if (error) {
    console.error('❌ Error connecting to Supabase:', error.message);
    process.exit(1);
  }

  if (data && data.length > 0) {
    console.log('✅ Database already seeded, skipping.');
    process.exit(0);
  }

  console.log('🌱 Seeding 3 listings...');

  const { error: insertError } = await supabase
    .from('listings')
    .insert(listings);

  if (insertError) {
    console.error('❌ Error seeding:', insertError.message);
    process.exit(1);
  }

  console.log('✅ Database seeded successfully with 3 listings!');
  process.exit(0);
}

seed();

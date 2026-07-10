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
    image_url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
      'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
      'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80'
    ],
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
    image_url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80',
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&q=80',
      'https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=800&q=80',
      'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80',
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&q=80',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
      'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80'
    ],
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
    image_url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80',
      'https://images.unsplash.com/photo-1565183928294-7063f23ce0f8?w=800&q=80',
      'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&q=80',
      'https://images.unsplash.com/photo-1618219944342-824e40a13285?w=800&q=80',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80',
      'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80',
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&q=80',
      'https://images.unsplash.com/photo-1560448075-bb485b067938?w=800&q=80',
      'https://images.unsplash.com/photo-1617098900591-3f90928e8c54?w=800&q=80',
      'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=800&q=80',
      'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=800&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80'
    ],
    amenities: ['WiFi', 'Cuisine équipée', 'Chauffage', 'Ascenseur', 'Lave-linge', 'TV', 'Terrasse balcon', 'Proximité transports']
  }
];

async function seed() {
  console.log('🔍 Checking database...');

  const { data, error } = await supabase
    .from('listings')
    .select('id, images')
    .limit(1);

  if (error) {
    console.error('❌ Error connecting to Supabase:', error.message);
    process.exit(1);
  }

  // Update images if listings exist but no images yet
  if (data && data.length > 0) {
    if (!data[0].images || data[0].images.length === 0) {
      console.log('📸 Updating listings with photo galleries...');
      for (const listing of listings) {
        await supabase
          .from('listings')
          .update({ images: listing.images })
          .eq('title', listing.title);
      }
      console.log('✅ Photo galleries updated!');
    } else {
      console.log('✅ Database already seeded, skipping.');
    }
    process.exit(0);
  }

  console.log('🌱 Seeding 3 listings with photo galleries...');

  const { error: insertError } = await supabase
    .from('listings')
    .insert(listings);

  if (insertError) {
    console.error('❌ Error seeding:', insertError.message);
    process.exit(1);
  }

  console.log('✅ Database seeded successfully with 3 listings (15 photos each)!');
  process.exit(0);
}

seed();

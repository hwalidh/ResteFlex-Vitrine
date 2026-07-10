import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Check if tables already exist by trying to query
    const { data: existingData, error: checkError } = await supabase
      .from('listings')
      .select('id')
      .limit(1);

    // If tables exist and have data, skip seeding
    if (!checkError && existingData && existingData.length > 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          message: 'Database already seeded', 
          status: 'skipped' 
        })
      };
    }

    // Create tables if they don't exist
    const { error: createError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.listings (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          price NUMERIC(10, 2) NOT NULL,
          location VARCHAR(255) NOT NULL,
          bedrooms INTEGER NOT NULL,
          bathrooms NUMERIC NOT NULL,
          guests INTEGER NOT NULL,
          image_url TEXT NOT NULL,
          amenities TEXT[] DEFAULT ARRAY[]::TEXT[],
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS public.bookings (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
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

        CREATE INDEX IF NOT EXISTS idx_listings_location ON public.listings(location);
        CREATE INDEX IF NOT EXISTS idx_bookings_listing_id ON public.bookings(listing_id);
        CREATE INDEX IF NOT EXISTS idx_bookings_email ON public.bookings(email);
      `
    });

    // Insert sample data
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
        title: 'Villa Côte d\'Azur avec Piscine',
        description: 'Superbe villa provençale en bord de mer avec piscine privée chauffée. Jardin méditerranéen aménagé, accès direct à la plage et proche des restaurants. Idéal pour des vacances en famille.',
        price: 225.00,
        location: 'Antibes, Côte d\'Azur',
        bedrooms: 4,
        bathrooms: 3,
        guests: 8,
        image_url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&w=800&q=80',
        amenities: ['Piscine privée', 'Accès plage', 'Jardin aménagé', 'BBQ', 'Cuisine moderne', 'Air conditionné', 'WiFi', 'Parking', 'Jacuzzi']
      },
      {
        title: 'Appartement Bourgeois Lyon Centre',
        description: 'Élégant appartement haussmannien au cœur de Lyon. Décoration soignée, belle hauteur sous plafond, proche du Vieux Lyon et de la Presqu\'île. Séjour confortable et culturel.',
        price: 125.00,
        location: 'Lyon, Rhône-Alpes',
        bedrooms: 2,
        bathrooms: 1,
        guests: 4,
        image_url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&w=800&q=80',
        amenities: ['WiFi', 'Cuisine équipée', 'Chauffage', 'Ascenseur', 'Lave-linge', 'TV', 'Terrasse balcon', 'Proximité transports']
      }
    ];

    const { error: insertError } = await supabase
      .from('listings')
      .insert(listings);

    if (insertError) {
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'Failed to insert listings', 
          details: insertError 
        })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Database seeded successfully', 
        status: 'completed',
        listingsCount: 3
      })
    };
  } catch (error) {
    console.error('Seeding error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Unexpected error during seeding',
        details: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};

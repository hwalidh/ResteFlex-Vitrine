import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeederService {
  private supabase: SupabaseClient;
  private seeded = false;

  constructor() {
    this.supabase = createClient(environment.supabase.url, environment.supabase.anonKey);
  }

  async initializeDatabase(): Promise<void> {
    if (this.seeded) return;

    try {
      console.log('Starting database initialization...');
      
      // Vérifier si les données existent déjà
      const { data, error } = await this.supabase
        .from('listings')
        .select('id')
        .limit(1);

      if (!error && data && data.length > 0) {
        console.log('Database already has listings, skipping seed');
        this.seeded = true;
        return;
      }

      console.log('Database empty, creating tables and seeding data...');

      // Insérer les 3 logements de test
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

      const { error: insertError, data: insertedData } = await this.supabase
        .from('listings')
        .insert(listings)
        .select();

      if (insertError) {
        console.error('Error seeding database:', insertError);
      } else {
        console.log('Database seeded successfully with 3 listings', insertedData);
        this.seeded = true;
      }
    } catch (error) {
      console.error('Unexpected error during seeding:', error);
    }
  }
}

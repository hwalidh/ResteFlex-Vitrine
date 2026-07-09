import { Injectable } from '@angular/core';
import {
  TravelPackEmailParams,
  BusinessPackEmailParams,
  SerenityPackEmailParams
} from '../models/email.model';

// En local (docker) la function tourne via Netlify CLI.
// En production Netlify, l'URL relative /.netlify/functions/send-email fonctionne automatiquement.
const FUNCTION_URL = '/.netlify/functions/send-email';

@Injectable({ providedIn: 'root' })
export class EmailService {

  sendTravelPackEmail(params: TravelPackEmailParams): Promise<boolean> {
    return this.send('travel', {
      from_name:         params.from_name,
      from_email:        params.from_email,
      from_phone:        params.from_phone || '',
      message:           params.message,
      propertyType:      params.propertyType,
      propertyStyle:     params.propertyStyle,
      surface:           params.surface,
      location:          params.location,
      availabilityStart: this.formatDate(params.availabilityStart),
      availabilityEnd:   this.formatDate(params.availabilityEnd),
    });
  }

  sendBusinessPackEmail(params: BusinessPackEmailParams): Promise<boolean> {
    return this.send('business', {
      from_name:      params.from_name,
      from_email:     params.from_email,
      from_phone:     params.from_phone || '',
      message:        params.message,
      propertyCount:  params.propertyCount,
      investmentType: this.investmentLabel(params.investmentType),
      currentRevenue: params.currentRevenue,
    });
  }

  sendSerenityPackEmail(params: SerenityPackEmailParams): Promise<boolean> {
    return this.send('serenity', {
      from_name:     params.from_name,
      from_email:    params.from_email,
      from_phone:    params.from_phone || '',
      message:       params.message,
      propertyType:  params.propertyType,
      surface:       params.surface,
      location:      params.location,
      currentRent:   params.currentRent,
      propertyValue: params.propertyValue,
    });
  }

  // ── Privé ────────────────────────────────────────────────────────────────

  private async send(packType: string, data: Record<string, any>): Promise<boolean> {
    try {
      const res = await fetch(FUNCTION_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ packType, ...data }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error('[EmailService] Erreur Resend :', err);
        return false;
      }
      return true;
    } catch (err) {
      console.error('[EmailService] Fetch échoué :', err);
      return false;
    }
  }

  private formatDate(iso: string): string {
    if (!iso) return 'Non spécifié';
    return new Date(iso).toLocaleDateString('fr-FR', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  }

  private investmentLabel(id: string): string {
    const labels: Record<string, string> = {
      existing: 'Biens déjà en location',
      new:      'Nouveau projet',
      mix:      'Mix des deux',
    };
    return labels[id] ?? id;
  }
}

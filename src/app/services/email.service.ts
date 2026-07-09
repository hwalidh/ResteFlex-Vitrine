import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import {
  EmailTemplateParams,
  TravelPackEmailParams,
  BusinessPackEmailParams,
  SerenityPackEmailParams
} from '../models/email.model';

// ─── Config ────────────────────────────────────────────────────────────────
const EMAILJS_PUBLIC_KEY  = 'NnBbZBZ1s92vIo5CK';
const EMAILJS_SERVICE_ID  = 'service_mynhvri';

const TEMPLATES = {
  TRAVEL:   'template_dkqxg6j',
  BUSINESS: 'template_za456ha',
  SERENITY: 'template_za456ha'   // TODO: remplacer par un vrai template Serenity
} as const;

const INVESTMENT_TYPE_LABELS: Record<string, string> = {
  existing: 'Biens déjà en location',
  new:      'Nouveau projet',
  mix:      'Mix des deux'
};
// ───────────────────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class EmailService {

  private initialized = false;

  constructor() {
    this.init();
  }

  // ── Public API ────────────────────────────────────────────────────────────

  sendTravelPackEmail(params: TravelPackEmailParams): Promise<boolean> {
    return this.send(TEMPLATES.TRAVEL, {
      ...params,
      subject: `Nouvelle demande Travel Pack - ${params.from_name}`,
      property_type:    params.propertyType  || 'Non spécifié',
      property_style:   params.propertyStyle || 'Non spécifié',
      surface:          params.surface ? `${params.surface} m²` : 'Non spécifiée',
      location:         params.location || 'Non spécifiée',
      availability_start: this.formatDate(params.availabilityStart),
      availability_end:   this.formatDate(params.availabilityEnd),
      property_details: [
        '🏠 DÉTAILS DU BIEN',
        '──────────────',
        `• Type de bien : ${params.propertyType  || 'Non spécifié'}`,
        `• Style        : ${params.propertyStyle || 'Non spécifié'}`,
        `• Surface      : ${params.surface ? params.surface + ' m²' : 'Non spécifiée'}`,
        `• Localisation : ${params.location || 'Non spécifiée'}`,
        '',
        '📅 DISPONIBILITÉS',
        '──────────────',
        `• Du : ${this.formatDate(params.availabilityStart)}`,
        `• Au : ${this.formatDate(params.availabilityEnd)}`,
        '',
        ...this.clientBlock(params),
        ...this.messageBlock(params.message)
      ].join('\n')
    });
  }

  sendBusinessPackEmail(params: BusinessPackEmailParams): Promise<boolean> {
    return this.send(TEMPLATES.BUSINESS, {
      ...params,
      subject:          `Nouvelle demande Business Pack - ${params.from_name}`,
      property_count:   params.propertyCount || 'Non spécifié',
      investment_type:  INVESTMENT_TYPE_LABELS[params.investmentType] ?? 'Non spécifié',
      current_revenue:  params.currentRevenue || 'Non spécifié',
      business_details: [
        '💼 DÉTAILS BUSINESS',
        '──────────────',
        `• Nombre de biens        : ${params.propertyCount || 'Non spécifié'}`,
        `• Type d'investissement  : ${INVESTMENT_TYPE_LABELS[params.investmentType] ?? 'Non spécifié'}`,
        `• Revenus actuels        : ${params.currentRevenue || 'Non spécifiés'}`,
        '',
        ...this.clientBlock(params),
        ...this.messageBlock(params.message)
      ].join('\n')
    });
  }

  sendSerenityPackEmail(params: SerenityPackEmailParams): Promise<boolean> {
    return this.send(TEMPLATES.SERENITY, {
      ...params,
      subject: `Nouvelle demande Serenity Pack - ${params.from_name}`,
      property_details: [
        '🏠 DÉTAILS DU BIEN',
        '──────────────',
        `• Type de bien    : ${params.propertyType  || 'Non spécifié'}`,
        `• Surface         : ${params.surface ? params.surface + ' m²' : 'Non spécifiée'}`,
        `• Localisation    : ${params.location || 'Non spécifiée'}`,
        `• Loyer actuel    : ${params.currentRent   || 'Non spécifié'}`,
        `• Valeur du bien  : ${params.propertyValue || 'Non spécifiée'}`,
        '',
        ...this.clientBlock(params),
        ...this.messageBlock(params.message)
      ].join('\n')
    });
  }

  // ── Private helpers ───────────────────────────────────────────────────────

  private async init(): Promise<void> {
    if (this.initialized) return;
    try {
      await emailjs.init(EMAILJS_PUBLIC_KEY);
      this.initialized = true;
    } catch (err) {
      console.error('[EmailService] Initialisation échouée :', err);
    }
  }

  private async send(templateId: string, params: EmailTemplateParams): Promise<boolean> {
    if (!this.initialized) await this.init();
    try {
      const res = await emailjs.send(EMAILJS_SERVICE_ID, templateId, params);
      return res.status === 200;
    } catch (err) {
      console.error('[EmailService] Envoi échoué :', err);
      return false;
    }
  }

  /** Formate une date ISO en français (ex: "12 janvier 2025"). */
  private formatDate(iso: string): string {
    if (!iso) return 'Non spécifié';
    return new Date(iso).toLocaleDateString('fr-FR', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  }

  /** Bloc "Informations client" commun à tous les emails. */
  private clientBlock(p: EmailTemplateParams): string[] {
    return [
      '👤 INFORMATIONS CLIENT',
      '──────────────',
      `• Nom   : ${p.from_name}`,
      `• Email : ${p.from_email}`,
      ''
    ];
  }

  /** Bloc "Message" commun à tous les emails. */
  private messageBlock(msg: string | undefined): string[] {
    return [
      '💭 MESSAGE',
      '──────────────',
      msg || 'Aucun message supplémentaire',
      '',
      '──────────────',
      'Envoyé depuis ResteFlex Conciergerie'
    ];
  }
}

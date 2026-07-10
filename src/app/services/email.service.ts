import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { EmailTemplateParams, TravelPackEmailParams, BusinessPackEmailParams, SerenityPackEmailParams } from '../models/email.model';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly PUBLIC_KEY = 'NnBbZBZ1s92vIo5CK';
  private readonly SERVICE_ID = 'service_mynhvri';
  private readonly TEMPLATES = {
    TRAVEL: 'template_dkqxg6j',
    BUSINESS: 'template_za456ha',
    // Temporarily use business template for serenity pack
    SERENITY: 'template_za456ha'
  };
  private initialized = false;

  constructor() {
    this.initEmailJS();
  }

  private async initEmailJS() {
    if (!this.initialized) {
      try {
        await emailjs.init(this.PUBLIC_KEY);
        this.initialized = true;
      } catch (error) {
        console.error('Failed to initialize EmailJS:', error);
      }
    }
  }

  async sendTravelPackEmail(params: TravelPackEmailParams): Promise<boolean> {
    const formattedParams = this.formatTravelPackParams(params);
    return this.sendEmailTemplate(this.TEMPLATES.TRAVEL, formattedParams);
  }

  async sendBusinessPackEmail(params: BusinessPackEmailParams): Promise<boolean> {
    const formattedParams = this.formatBusinessPackParams(params);
    return this.sendEmailTemplate(this.TEMPLATES.BUSINESS, formattedParams);
  }

  async sendSerenityPackEmail(params: SerenityPackEmailParams): Promise<boolean> {
    const formattedParams = this.formatSerenityPackParams(params);
    return this.sendEmailTemplate(this.TEMPLATES.SERENITY, formattedParams);
  }

  private async sendEmailTemplate(templateId: string, params: EmailTemplateParams): Promise<boolean> {
    try {
      if (!this.initialized) {
        await this.initEmailJS();
      }

      const response = await emailjs.send(
        this.SERVICE_ID,
        templateId,
        params
      );

      return response.status === 200;
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      return false;
    }
  }

  private formatTravelPackParams(params: TravelPackEmailParams): EmailTemplateParams {
    const formattedDate = (date: string) => {
      if (!date) return 'Non spécifié';
      return new Date(date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    };

    return {
      ...params,
      subject: `Nouvelle demande Travel Pack - ${params.from_name}`,
      property_type: params.propertyType || 'Non spécifié',
      property_style: params.propertyStyle || 'Non spécifié',
      surface: params.surface ? `${params.surface} m²` : 'Non spécifiée',
      location: params.location || 'Non spécifiée',
      availability_start: formattedDate(params.availabilityStart),
      availability_end: formattedDate(params.availabilityEnd),
      property_details: `
🏠 DÉTAILS DU BIEN
──────────────
• Type de bien : ${params.propertyType || 'Non spécifié'}
• Style : ${params.propertyStyle || 'Non spécifié'}
• Surface : ${params.surface ? params.surface + ' m²' : 'Non spécifiée'}
• Localisation : ${params.location || 'Non spécifiée'}

📅 DISPONIBILITÉS
──────────────
• Du : ${formattedDate(params.availabilityStart)}
• Au : ${formattedDate(params.availabilityEnd)}

👤 INFORMATIONS CLIENT
──────────────
• Nom : ${params.from_name}
• Email : ${params.from_email}

💭 MESSAGE
──────────────
${params.message || 'Aucun message supplémentaire'}

──────────────
Envoyé depuis StayFlex Conciergerie
      `.trim()
    };
  }

  private formatBusinessPackParams(params: BusinessPackEmailParams): EmailTemplateParams {
    const investmentTypes = {
      'existing': 'Biens déjà en location',
      'new': 'Nouveau projet',
      'mix': 'Mix des deux'
    };

    return {
      ...params,
      subject: `Nouvelle demande Business Pack - ${params.from_name}`,
      property_count: params.propertyCount || 'Non spécifié',
      investment_type: params.investmentType ? investmentTypes[params.investmentType as keyof typeof investmentTypes] : 'Non spécifié',
      current_revenue: params.currentRevenue || 'Non spécifié',
      business_details: `
💼 DÉTAILS BUSINESS
──────────────
• Nombre de biens : ${params.propertyCount || 'Non spécifié'}
• Type d'investissement : ${params.investmentType ? investmentTypes[params.investmentType as keyof typeof investmentTypes] : 'Non spécifié'}
• Revenus actuels : ${params.currentRevenue || 'Non spécifiés'}

👤 INFORMATIONS CLIENT
──────────────
• Nom : ${params.from_name}
• Email : ${params.from_email}

💭 MESSAGE
──────────────
${params.message || 'Aucun message supplémentaire'}

──────────────
Envoyé depuis StayFlex Conciergerie
      `.trim()
    };
  }

  private formatSerenityPackParams(params: SerenityPackEmailParams): EmailTemplateParams {
    return {
      ...params,
      subject: `Nouvelle demande Serenity Pack - ${params.from_name}`,
      property_details: `
🏠 DÉTAILS DU BIEN
──────────────
• Type de bien : ${params.propertyType || 'Non spécifié'}
• Surface : ${params.surface ? params.surface + ' m²' : 'Non spécifiée'}
• Localisation : ${params.location || 'Non spécifiée'}
• Loyer actuel : ${params.currentRent || 'Non spécifié'}
• Valeur du bien : ${params.propertyValue || 'Non spécifiée'}

👤 INFORMATIONS CLIENT
──────────────
• Nom : ${params.from_name}
• Email : ${params.from_email}

💭 MESSAGE
──────────────
${params.message || 'Aucun message supplémentaire'}

──────────────
Envoyé depuis StayFlex Conciergerie
      `.trim()
    };
  }
}
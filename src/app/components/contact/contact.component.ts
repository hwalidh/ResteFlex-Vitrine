import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { EmailService } from '../../services/email.service';
import {
  TravelPackEmailParams,
  BusinessPackEmailParams,
  SerenityPackEmailParams
} from '../../models/email.model';
import { SuccessPopupComponent } from '../shared/success-popup/success-popup.component';
import { PACKAGES_CONFIG } from '../../data/packages.config';

type PackId = 'travel' | 'business' | 'serenity';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SuccessPopupComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [
    trigger('stepAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(24px)' }),
        animate('350ms cubic-bezier(0.4,0,0.2,1)',
          style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in',
          style({ opacity: 0, transform: 'translateY(-16px)' }))
      ])
    ])
  ]
})
export class ContactComponent {

  // ── État ───────────────────────────────────────────────────────────────
  currentStep  = 0;
  isSubmitting = false;
  submitted    = false;
  emailError   = false;

  // ── Étapes ────────────────────────────────────────────────────────────
  readonly steps = [
    { name: 'Pack',    emoji: '🎯' },
    { name: 'Contact', emoji: '👋' },
    { name: 'Détails', emoji: '🏠' },
    { name: 'Message', emoji: '✉️' }
  ];

  // ── Données de référence ───────────────────────────────────────────────
  readonly packages = PACKAGES_CONFIG;

  readonly propertyTypes = [
    { id: 'apartment', name: 'Appartement' },
    { id: 'studio',    name: 'Studio' },
    { id: 'room',      name: 'Chambre' },
    { id: 'house',     name: 'Maison' }
  ];

  readonly propertyStyles = [
    { id: 'modern',  name: 'Moderne & Design' },
    { id: 'classic', name: 'Classique & Élégant' },
    { id: 'new',     name: 'Neuf & Contemporain' },
    { id: 'old',     name: 'Ancien avec Charme' }
  ];

  // ── Formulaire réactif ─────────────────────────────────────────────────
  readonly contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService
  ) {
    this.contactForm = this.fb.group({
      // Étape 1
      projectType: ['', Validators.required],
      // Étape 2
      name:  ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^(\+?\d[\d\s\-().]{7,14}\d)$/)]],
      // Étape 3 — Travel
      propertyType:      [''],
      propertyStyle:     [''],
      surface:           [''],
      location:          [''],
      availabilityStart: [''],
      availabilityEnd:   [''],
      // Étape 3 — Business
      propertyCount:  [''],
      investmentType: [''],
      currentRevenue: [''],
      // Étape 3 — Serenity
      currentRent:   [''],
      propertyValue: [''],
      // Étape 4
      message: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  // ── Getters ────────────────────────────────────────────────────────────

  get selectedPack(): PackId {
    return this.contactForm.get('projectType')?.value as PackId;
  }

  get messageLength(): number {
    return this.contactForm.get('message')?.value?.length ?? 0;
  }

  get remainingChars(): number {
    return Math.max(0, 20 - this.messageLength);
  }

  get step2Valid(): boolean {
    return (
      !!this.contactForm.get('name')?.valid &&
      !!this.contactForm.get('email')?.valid &&
      !!this.contactForm.get('phone')?.valid
    );
  }

  // ── Navigation ─────────────────────────────────────────────────────────

  nextStep()     { if (this.currentStep < this.steps.length - 1) this.currentStep++; }
  previousStep() { if (this.currentStep > 0) this.currentStep--; }
  selectPack(id: PackId) { this.contactForm.patchValue({ projectType: id }); }

  // ── Validation ─────────────────────────────────────────────────────────

  isInvalid(field: string): boolean {
    const ctrl = this.contactForm.get(field);
    return !!ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }

  // ── Soumission ─────────────────────────────────────────────────────────

  async onSubmit(): Promise<void> {
    if (!this.contactForm.valid) {
      Object.values(this.contactForm.controls).forEach(c => c.markAsTouched());
      return;
    }
    this.isSubmitting = true;
    this.emailError   = false;
    try {
      const ok = await this.sendEmail(this.contactForm.value);
      ok ? (this.submitted = true) : (this.emailError = true);
    } catch (err) {
      console.error('[Contact] Erreur envoi :', err);
      this.emailError = true;
    } finally {
      this.isSubmitting = false;
    }
  }

  closePopup() { this.submitted = false; }

  // ── Envoi email ────────────────────────────────────────────────────────

  private sendEmail(d: any): Promise<boolean> {
    const base = {
      to_name:    'Walid',
      from_name:  d.name,
      from_email: d.email,
      from_phone: d.phone || 'Non renseigné',
      pack_type:  this.labelOf(this.packages, d.projectType),
      message:    d.message || ''
    };

    switch (d.projectType as PackId) {
      case 'travel':
        return this.emailService.sendTravelPackEmail({
          ...base,
          propertyType:      this.labelOf(this.propertyTypes,  d.propertyType),
          propertyStyle:     this.labelOf(this.propertyStyles, d.propertyStyle),
          surface:           d.surface,
          location:          d.location,
          availabilityStart: d.availabilityStart,
          availabilityEnd:   d.availabilityEnd
        } as TravelPackEmailParams);

      case 'business':
        return this.emailService.sendBusinessPackEmail({
          ...base,
          propertyCount:  d.propertyCount,
          investmentType: d.investmentType,
          currentRevenue: d.currentRevenue
        } as BusinessPackEmailParams);

      case 'serenity':
        return this.emailService.sendSerenityPackEmail({
          ...base,
          propertyType:  this.labelOf(this.propertyTypes, d.propertyType),
          surface:       d.surface,
          location:      d.location,
          currentRent:   d.currentRent,
          propertyValue: d.propertyValue
        } as SerenityPackEmailParams);

      default:
        return Promise.resolve(false);
    }
  }

  private labelOf(list: { id: string; name: string }[], id: string): string {
    return list.find(i => i.id === id)?.name ?? id;
  }
}

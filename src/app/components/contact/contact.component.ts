import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailService } from '../../services/email.service';
import { TravelPackEmailParams, BusinessPackEmailParams, SerenityPackEmailParams } from '../../models/email.model';
import { SuccessPopupComponent } from '../shared/success-popup/success-popup.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SuccessPopupComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  submitted = false;
  currentStep = 0;
  emailError = false;

  steps = [
    { name: 'Pack', emoji: '🎯' },
    { name: 'Contact', emoji: '👋' },
    { name: 'Détails', emoji: '🏠' },
    { name: 'Message', emoji: '✉️' }
  ];

  projectTypes = [
    {
      id: 'travel' as const,
      name: 'Travel Pack',
      emoji: '🏖️',
      description: 'Pour les nomades digitaux et les voyageurs qui veulent rentabiliser leur appart pendant leurs aventures !'
    },
    {
      id: 'business' as const,
      name: 'Business Pack',
      emoji: '💼',
      description: 'Pour les investisseurs malins qui veulent maximiser leurs revenus sans prise de tête !'
    },
    {
      id: 'serenity' as const,
      name: 'Serenity Pack',
      emoji: '🏡',
      description: 'Pour ceux qui veulent un loyer garanti supérieur au marché avec une tranquillité absolue !'
    }
  ];

  propertyTypes = [
    { id: 'apartment', name: 'Appartement' },
    { id: 'studio', name: 'Studio' },
    { id: 'room', name: 'Chambre' },
    { id: 'house', name: 'Maison' }
  ];

  propertyStyles = [
    { id: 'modern', name: 'Moderne & Design' },
    { id: 'classic', name: 'Classique & Élégant' },
    { id: 'new', name: 'Neuf & Contemporain' },
    { id: 'old', name: 'Ancien avec Charme' }
  ];

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService
  ) {
    this.contactForm = this.fb.group({
      projectType: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      propertyType: [''],
      propertyStyle: [''],
      surface: [''],
      location: [''],
      availabilityStart: [''],
      availabilityEnd: [''],
      propertyCount: [''],
      investmentType: [''],
      currentRevenue: [''],
      currentRent: [''],
      propertyValue: [''],
      message: ['', [Validators.required, Validators.minLength(50)]]
    });
  }

  get selectedPack(): 'travel' | 'business' | 'serenity' {
    return this.contactForm.get('projectType')?.value;
  }

  get isTravelPack(): boolean {
    return this.selectedPack === 'travel';
  }

  get isBusinessPack(): boolean {
    return this.selectedPack === 'business';
  }

  get isSerenityPack(): boolean {
    return this.selectedPack === 'serenity';
  }

  get messageLength(): number {
    return this.contactForm.get('message')?.value?.length || 0;
  }

  get remainingCharacters(): number {
    return Math.max(0, 50 - this.messageLength);
  }

  selectProjectType(typeId: 'travel' | 'business' | 'serenity') {
    this.contactForm.patchValue({ projectType: typeId });
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  closePopup() {
    this.submitted = false;
  }

  async onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.emailError = false;
      
      try {
        const formData = this.contactForm.value;
        const success = await this.sendEmailByPackType(formData);

        if (success) {
          this.submitted = true;
        } else {
          this.emailError = true;
        }
      } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
        this.emailError = true;
      } finally {
        this.isSubmitting = false;
      }
    } else {
      Object.keys(this.contactForm.controls).forEach(key => {
        const control = this.contactForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }

  private async sendEmailByPackType(formData: any): Promise<boolean> {
    const baseParams = {
      to_name: 'Walid',
      from_name: formData.name,
      from_email: formData.email,
      pack_type: this.getPackTypeName(formData.projectType),
      message: formData.message || ''
    };

    switch (formData.projectType) {
      case 'travel':
        return this.emailService.sendTravelPackEmail({
          ...baseParams,
          propertyType: this.getPropertyTypeName(formData.propertyType),
          propertyStyle: this.getPropertyStyleName(formData.propertyStyle),
          surface: formData.surface,
          location: formData.location,
          availabilityStart: formData.availabilityStart,
          availabilityEnd: formData.availabilityEnd
        });

      case 'business':
        return this.emailService.sendBusinessPackEmail({
          ...baseParams,
          propertyCount: formData.propertyCount,
          investmentType: formData.investmentType,
          currentRevenue: formData.currentRevenue
        });

      case 'serenity':
        return this.emailService.sendSerenityPackEmail({
          ...baseParams,
          propertyType: this.getPropertyTypeName(formData.propertyType),
          surface: formData.surface,
          location: formData.location,
          currentRent: formData.currentRent,
          propertyValue: formData.propertyValue
        });

      default:
        return false;
    }
  }

  private getPackTypeName(id: string): string {
    return this.projectTypes.find(type => type.id === id)?.name || id;
  }

  private getPropertyTypeName(id: string): string {
    return this.propertyTypes.find(type => type.id === id)?.name || id;
  }

  private getPropertyStyleName(id: string): string {
    return this.propertyStyles.find(style => style.id === id)?.name || id;
  }
}
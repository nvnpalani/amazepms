import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('reveal') revealElements!: QueryList<ElementRef>;
  private observer: IntersectionObserver | null = null;

  form = { name: '', phone: '', service: '', message: '' };
  submitted = false;
  hasError = false;
  isSaving = false;
  saveError = false;
  saveSuccess = false;

  get isFormValid(): boolean {
    return !!(
      this.form.name && 
      this.form.name.trim() !== '' && 
      this.form.phone && 
      this.form.phone.length === 10 && 
      this.form.service
    );
  }

  onPhoneInput(event: any) {
    let value = event.target.value;
    value = value.replace(/[^0-9]/g, '');
    if (value.length > 10) {
      value = value.substring(0, 10);
    }
    this.form.phone = value;
    event.target.value = value;
    
    // Reset submitted state if user starts typing again
    if (this.submitted) {
      this.submitted = false;
    }
  }

  services = [
    'Flex Printing', 'Banner Printing', 'Advertisement Boards',
    'Bus Advertisement Stickers', 'Auto Advertisement Stickers',
    'Street Advertisement', 'ID Card Printing', 'Brochure Printing',
    'Flyer Printing', 'Notice Printing', 'Coupon Cards', 'Store Boards',
    'Social Media Posters', 'Event & Function Advertising', 'Promotional Printing'
  ];

  constructor(private contactService: ContactService) {}

  submit() {
    if (!this.isFormValid) {
      return;
    }
    this.hasError = false;
    this.isSaving = true;
    this.saveError = false;
    
    // Save to MongoDB using Backend API
    this.contactService.submitContact(this.form).subscribe({
      next: (response) => {
        this.isSaving = false;
        this.saveSuccess = true;
        this.submitted = true;
        
        // Reset form
        this.form = { name: '', phone: '', service: '', message: '' };
        
        // Reset button state to normal after 5 seconds
        setTimeout(() => {
          this.submitted = false;
        }, 5000);
      },
      error: (err) => {
        console.error('API Error:', err);
        this.isSaving = false;
        this.saveError = true;
      }
    });
  }

  closePopup() {
    this.saveSuccess = false;
  }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
    }, { threshold: 0.1 });
    this.revealElements.forEach(el => this.observer?.observe(el.nativeElement));
  }

  ngOnDestroy() { this.observer?.disconnect(); }
}

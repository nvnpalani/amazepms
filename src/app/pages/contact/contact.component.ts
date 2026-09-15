import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

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

  services = [
    'Flex Printing', 'Banner Printing', 'Advertisement Boards',
    'Bus Advertisement Stickers', 'Auto Advertisement Stickers',
    'Street Advertisement', 'ID Card Printing', 'Brochure Printing',
    'Flyer Printing', 'Notice Printing', 'Coupon Cards', 'Store Boards',
    'Social Media Posters', 'Event & Function Advertising', 'Promotional Printing'
  ];

  submit() {
    if (!this.form.name || !this.form.phone || !this.form.service) {
      this.hasError = true;
      return;
    }
    this.hasError = false;
    this.submitted = true;
    const msg = encodeURIComponent(
      `Hello AK CREATION!\n\nName: ${this.form.name}\nPhone: ${this.form.phone}\nService: ${this.form.service}\nMessage: ${this.form.message || 'N/A'}`
    );
    window.open(`https://wa.me/916369562986?text=${msg}`, '_blank');
  }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
    }, { threshold: 0.1 });
    this.revealElements.forEach(el => this.observer?.observe(el.nativeElement));
  }

  ngOnDestroy() { this.observer?.disconnect(); }
}

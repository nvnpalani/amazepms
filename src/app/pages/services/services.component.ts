import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Printer, RectangleHorizontal, Store, PanelsTopLeft, Bus, CarFront, MapPin, Image, BadgeCheck, BookOpen, FileText, ClipboardList, Ticket, Share2, Briefcase, CalendarDays, Sparkles } from 'lucide-angular';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('reveal') revealElements!: QueryList<ElementRef>;
  private observer: IntersectionObserver | null = null;

  readonly icons = { Printer, RectangleHorizontal, Store, PanelsTopLeft, Bus, CarFront, MapPin, Image, BadgeCheck, BookOpen, FileText, ClipboardList, Ticket, Share2, Briefcase, CalendarDays, Sparkles };

  categories = [
    {
      id: 'print-display',
      title: 'Print & Display',
      subtitle: 'Large format, high-impact visual printing.',
      color: 'navy',
      icon: this.icons.Printer,
      services: [
        { name: 'Flex Printing', desc: 'Vibrant, durable flex prints for any size and purpose.', icon: this.icons.Printer, image: 'assets/home/ak_placeholder.png' },
        { name: 'Banner Printing', desc: 'High-resolution banners for events, shops and promotions.', icon: this.icons.RectangleHorizontal, image: 'assets/home/ak_placeholder.png' },
        { name: 'Store Boards', desc: 'Professional shop and store name boards.', icon: this.icons.Store, image: 'assets/home/ak_placeholder.png' },
        { name: 'Advertisement Boards', desc: 'Permanent and semi-permanent advertisement boards.', icon: this.icons.PanelsTopLeft, image: 'assets/home/ak_placeholder.png' },
      ]
    },
    {
      id: 'outdoor',
      title: 'Outdoor Advertising',
      subtitle: 'Reach customers where they travel every day.',
      color: 'teal',
      icon: this.icons.Bus,
      services: [
        { name: 'Bus Advertisement', desc: 'Full and partial bus wrap advertising stickers.', icon: this.icons.Bus, image: 'assets/home/ak_placeholder.png' },
        { name: 'Auto Advertisement', desc: 'Auto-rickshaw advertisement stickers for local reach.', icon: this.icons.CarFront, image: 'assets/home/ak_placeholder.png' },
        { name: 'Street Advertisement', desc: 'Roadside and street-level advertising solutions.', icon: this.icons.MapPin, image: 'assets/home/ak_placeholder.png' },
        { name: 'Sunpack Sheet', desc: 'Weather-resistant sunpack sheet displays.', icon: this.icons.Image, image: 'assets/home/ak_placeholder.png' },
      ]
    },
    {
      id: 'business-print',
      title: 'Business Printing',
      subtitle: 'Professional print materials for your everyday business needs.',
      color: 'red',
      icon: this.icons.BadgeCheck,
      services: [
        { name: 'ID Card Printing', desc: 'Staff and student ID cards with professional finish.', icon: this.icons.BadgeCheck, image: 'assets/home/ak_placeholder.png' },
        { name: 'Brochure Printing', desc: 'Folded brochures for product and service marketing.', icon: this.icons.BookOpen, image: 'assets/home/ak_placeholder.png' },
        { name: 'Flyer Printing', desc: 'Single or double-sided promotional flyers.', icon: this.icons.FileText, image: 'assets/home/ak_placeholder.png' },
        { name: 'Notice Printing', desc: 'Formal notices, circulars and announcements.', icon: this.icons.ClipboardList, image: 'assets/home/ak_placeholder.png' },
        { name: 'Coupon Cards', desc: 'Discount and loyalty coupon card printing.', icon: this.icons.Ticket, image: 'assets/home/ak_placeholder.png' },
      ]
    },
    {
      id: 'digital-promo',
      title: 'Digital & Promotional',
      subtitle: 'Modern promotional designs for online and offline.',
      color: 'yellow',
      icon: this.icons.Share2,
      services: [
        { name: 'Social Media Posters', desc: 'Designed posters for Facebook, Instagram and WhatsApp.', icon: this.icons.Share2, image: 'assets/home/ak_placeholder.png' },
        { name: 'Advertisement Materials', desc: 'Branded promotional materials for businesses.', icon: this.icons.Briefcase, image: 'assets/home/ak_placeholder.png' },
        { name: 'Event Advertising', desc: 'Complete advertising packages for events and functions.', icon: this.icons.CalendarDays, image: 'assets/home/ak_placeholder.png' },
        { name: 'Promotional Printing', desc: 'Full range of promotional print materials.', icon: this.icons.Sparkles, image: 'assets/home/ak_placeholder.png' },
      ]
    }
  ];

  ngAfterViewInit() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
    }, { threshold: 0.1 });
    this.revealElements.forEach(el => this.observer?.observe(el.nativeElement));
  }

  ngOnDestroy() { this.observer?.disconnect(); }
}

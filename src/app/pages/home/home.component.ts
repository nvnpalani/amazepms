import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Trophy, Zap, Palette, Briefcase, Truck, IndianRupee, Printer, Bus, BadgeCheck, Smartphone, CheckCircle2, Building2, GraduationCap, PartyPopper, Users, User, Star, MapPin } from 'lucide-angular';

interface PortfolioItem {
  img: string;
  title: string;
  category: string;
  tags: string[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, LucideAngularModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('reveal') revealElements!: QueryList<ElementRef>;

  private observer: IntersectionObserver | null = null;
  private carouselTimer: any;

  // Icons used in template
  readonly icons = { Trophy, Zap, Palette, Briefcase, Truck, IndianRupee, Printer, Bus, BadgeCheck, Smartphone, CheckCircle2, Building2, GraduationCap, PartyPopper, Users, User, Star, MapPin };

  // ΓöÇΓöÇΓöÇ Hero Slides ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
  slides = [
    { title: 'Printing & Advertising<br>Solutions for Everyone', desc: 'From business cards to large flex banners, we deliver high-quality printing tailored to your brand identity.', image: 'assets/home/ak_placeholder.png', badge: 'Welcome to AK CREATION' },
    { title: 'Make Your Brand<br><span class="text-[var(--teal)]">Impossible to Miss</span>', desc: 'Stand out with our custom outdoor advertising and promotional materials designed to capture attention.', image: 'assets/home/ak_placeholder.png', badge: 'Outdoor Advertising' },
    { title: 'Professional Quality,<br><span class="text-[var(--primary-light)]">Every Single Print</span>', desc: 'We combine state-of-the-art printing technology with creative design to bring your vision to life.', image: 'assets/home/ak_placeholder.png', badge: 'Premium Quality' },
  ];
  currentSlide = 0;

  // ΓöÇΓöÇΓöÇ Trust Features ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
  trustItems = [
    { icon: this.icons.Trophy, label: 'Quality Focused', desc: 'Sharp, clean and professional results every time.' },
    { icon: this.icons.Zap, label: 'Fast Turnaround', desc: 'Efficient service for time-sensitive requirements.' },
    { icon: this.icons.Palette, label: 'Creative Support', desc: 'Design solutions built around your needs.' },
    { icon: this.icons.Briefcase, label: 'Business Ready', desc: 'Serving businesses, shops and institutions.' },
    { icon: this.icons.Truck, label: 'Reliable Delivery', desc: 'Every project completed as promised.' },
    { icon: this.icons.IndianRupee, label: 'Affordable Pricing', desc: 'Practical solutions without unnecessary costs.' },
  ];

  serviceCategories = [
    { title: 'Print & Display', desc: 'High-impact visual printing for events and promotions.', icon: this.icons.Printer, color: 'navy', image: 'assets/home/ak_placeholder.png', services: ['Flex Printing', 'Banner Printing', 'Store Boards'] },
    { title: 'Outdoor Advertising', desc: 'Reach customers where they travel every day.', icon: this.icons.Bus, color: 'teal', image: 'assets/home/ak_placeholder.png', services: ['Bus Advertisement', 'Auto Advertisement', 'Sunpack Sheets'] },
    { title: 'Business Printing', desc: 'Professional print materials for daily business needs.', icon: this.icons.BadgeCheck, color: 'red', image: 'assets/home/ak_placeholder.png', services: ['ID Cards', 'Brochures', 'Flyers', 'Coupons'] },
    { title: 'Digital & Promotional', desc: 'Modern promotional designs for online and offline.', icon: this.icons.Smartphone, color: 'yellow', image: 'assets/home/ak_placeholder.png', services: ['Social Media Posters', 'Event Advertising'] }
  ];

  whyChooseItems = [
    { title: 'Quality Printing', desc: 'Sharp, clean and professional print output for every project.', icon: this.icons.Trophy },
    { title: 'Fast Turnaround', desc: 'Efficient service designed for your deadlines and schedules.', icon: this.icons.Zap },
    { title: 'Creative Support', desc: 'Design-focused solutions built entirely around your needs.', icon: this.icons.Palette },
    { title: 'Affordable Pricing', desc: 'Practical, transparent pricing without unnecessary costs.', icon: this.icons.IndianRupee },
    { title: 'Personalized Service', desc: 'Direct attention and care for every single project.', icon: this.icons.Users },
    { title: 'Reliable Delivery', desc: 'Focused on completing every job exactly as promised.', icon: this.icons.CheckCircle2 },
  ];

  industries = [
    { icon: this.icons.Building2, label: 'Shops & Showrooms' },
    { icon: this.icons.Briefcase, label: 'Businesses & Companies' },
    { icon: this.icons.GraduationCap, label: 'Schools & Colleges' },
    { icon: this.icons.PartyPopper, label: 'Events & Functions' },
    { icon: this.icons.User, label: 'Individuals' },
    { icon: this.icons.Star, label: 'Local Brands' },
  ];

  
  portfolioItems: PortfolioItem[] = [
    { img: 'assets/home/ak_placeholder.png', title: 'Corporate Brochure Design', category: 'Brochures', tags: ['Print', 'Business'] },
    { img: 'assets/home/ak_placeholder.png', title: 'Shop Opening Flex Banner', category: 'Flex Printing', tags: ['Events', 'Outdoor'] },
    { img: 'assets/home/ak_placeholder.png', title: 'Local Bus Advertisement', category: 'Advertisement', tags: ['Vehicle', 'Outdoor'] },
    { img: 'assets/home/ak_placeholder.png', title: 'Staff ID Cards', category: 'ID Cards', tags: ['Corporate', 'Identity'] },
    { img: 'assets/home/ak_placeholder.png', title: 'Store Name Board', category: 'Store Boards', tags: ['Signage', 'Shop'] },
    { img: 'assets/home/ak_placeholder.png', title: 'Event Advertising Package', category: 'Events', tags: ['Promo', 'Print'] },
  ];

  activeFilter = 'All';
  portfolioFilters = ['All', 'Flex', 'Banners', 'Advertisement', 'ID Cards', 'Brochures', 'Store Boards'];

  get filteredPortfolio(): PortfolioItem[] {
    if (this.activeFilter === 'All') return this.portfolioItems;
    return this.portfolioItems.filter(item => item.tags.includes(this.activeFilter));
  }

  contactForm = {
    name: '',
    phone: '',
    service: '',
    message: ''
  };
  formSubmitted = false;
  formError = false;

  services = [
    'Flex Printing', 'Banner Printing', 'Advertisement Boards',
    'Bus Advertisement Stickers', 'Auto Advertisement Stickers',
    'Street Advertisement', 'ID Card Printing', 'Brochure Printing',
    'Flyer Printing', 'Notice Printing', 'Coupon Cards', 'Store Boards',
    'Social Media Posters', 'Event & Function Advertising', 'Promotional Printing'
  ];

  
  ngOnInit() {
    this.startCarousel();
  }

  ngAfterViewInit() {
    this.setupRevealObserver();
  }

  ngOnDestroy() {
    this.stopCarousel();
    this.observer?.disconnect();
  }

  // Carousel
  startCarousel() {
    this.carouselTimer = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 5000);
  }

  stopCarousel() {
    clearInterval(this.carouselTimer);
  }

  goToSlide(i: number) {
    this.currentSlide = i;
    this.stopCarousel();
    this.startCarousel();
  }

  // Portfolio filter
  setFilter(filter: string) {
    this.activeFilter = filter;
  }

  // Contact form
  submitForm() {
    if (!this.contactForm.name || !this.contactForm.phone || !this.contactForm.service) {
      this.formError = true;
      return;
    }
    this.formError = false;
    this.formSubmitted = true;
    const msg = `Hello AK CREATION,%0A%0AName: ${this.contactForm.name}%0APhone: ${this.contactForm.phone}%0AService: ${this.contactForm.service}%0AMessage: ${this.contactForm.message}`;
    window.open(`https://wa.me/919597440361?text=${msg}`, '_blank');
  }

  openWhatsApp() {
    window.open('https://wa.me/919597440361', '_blank');
  }

  // Scroll reveal
  private setupRevealObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.12 });

    this.revealElements.forEach(el => this.observer?.observe(el.nativeElement));
  }
}

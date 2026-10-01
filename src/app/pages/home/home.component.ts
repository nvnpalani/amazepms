import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Trophy, Zap, Palette, Briefcase, Truck, IndianRupee, Printer, Bus, BadgeCheck, Smartphone, CheckCircle2, Building2, GraduationCap, PartyPopper, Users, User, Star, MapPin, Store, Layers, Quote, Megaphone, FileText, LayoutGrid } from 'lucide-angular';

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
  readonly icons = { Trophy, Zap, Palette, Briefcase, Truck, IndianRupee, Printer, Bus, BadgeCheck, Smartphone, CheckCircle2, Building2, GraduationCap, PartyPopper, Users, User, Star, MapPin, Store, Layers, Quote, Megaphone, FileText, LayoutGrid };

  slides = [
    {
      title: 'Make Your Brand<br><span class="text-[var(--teal)]">Impossible to Miss</span>',
      desc: 'Stand out with our custom outdoor advertising and promotional materials designed to capture attention.',
      badge: 'Outdoor Advertising',
      quote: 'High-impact outdoor visibility that turns everyday traffic into loyal customers.'
    },
    {
      title: 'Branding, Printing,<br><span class="text-[var(--teal)]">Advertising & LED Signage</span>',
      desc: 'From visiting cards to 3D LED signage, vehicle branding, and custom displays, we deliver high-quality solutions tailored to your brand.',
      badge: 'Welcome to AK CREATION',
      quote: 'Crafting bold, memorable brand experiences that elevate your business above the rest.'
    },
    {
      title: 'Professional Quality,<br><span class="text-[var(--teal)]">Every Single Print</span>',
      desc: 'We combine state-of-the-art printing technology with creative design to bring your vision to life.',
      badge: 'Premium Quality',
      quote: 'State-of-the-art print technology delivering vibrant colors, precision, and longevity.'
    },
  ];
  currentSlide = 0;

  trustItems = [
    { icon: this.icons.Trophy, label: 'Quality Focused', desc: 'Sharp, clean and professional results every time.' },
    { icon: this.icons.Zap, label: 'Fast Turnaround', desc: 'Efficient service for time-sensitive requirements.' },
    { icon: this.icons.Palette, label: 'Creative Support', desc: 'Design solutions built around your needs.' },
    { icon: this.icons.Briefcase, label: 'Business Ready', desc: 'Serving businesses, shops and institutions.' },
    { icon: this.icons.Truck, label: 'Reliable Delivery', desc: 'Every project completed as promised.' },
    { icon: this.icons.IndianRupee, label: 'Affordable Pricing', desc: 'Practical solutions without unnecessary costs.' },
  ];

  serviceCategories = [
    {
      id: 'signage-led',
      title: 'LED & Illuminated Signage',
      desc: 'High-impact 3D illuminated boards, LED video walls, and modern storefront exterior elevations.',
      icon: this.icons.Store,
      color: 'navy',
      image: 'assets/our_work/led-sign-board/led-singage (1).jpg',
      services: ['LED Sign Board', 'UV Fabric Backlight', 'UV Flex Backlight', 'LED Video Wall']
    },
    {
      id: 'boards-sheets',
      title: 'Boards & Rigid Sheet Works',
      desc: 'Premium acrylic 3D lettering, retro-reflective boards, and durable rigid sheet branding solutions.',
      icon: this.icons.Layers,
      color: 'teal',
      image: 'assets/our_work/acrylic-board/d(1).jpeg',
      services: ['Acrylic Board', 'Reflective Board', 'Direction Board', 'Sunpack Sheet']
    },
    {
      id: 'vehicle-outdoor',
      title: 'Vehicle & Outdoor Branding',
      desc: 'Mobile transit advertisements, roadshow canopies, and high-visibility walking promotions.',
      icon: this.icons.Bus,
      color: 'red',
      image: 'assets/our_work/bus-branding/bus (1).jpeg',
      services: ['Bus Branding', 'Auto Branding', 'Look Walker Ads', 'Road Show Canopy']
    },
    {
      id: 'print-display',
      title: 'Print, Display & Interior Media',
      desc: 'High-volume marketing flyers, roll-up standees, customized wall murals, and branded floor mats.',
      icon: this.icons.Printer,
      color: 'yellow',
      image: 'assets/our_work/roll-up-standee/R-1.jpg',
      services: ['Vinyl & Foam Sheet', 'Roll Up Standee', 'Wall Poster & Flyer', 'Wallpaper & Floor Mat']
    }
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
    'LED Sign Board & Exterior Elevation',
    'UV Fabric Backlight Board',
    'UV Flex Backlight Board',
    'Indoor & Outdoor LED Video Wall Display',
    'Acrylic Board',
    'Reflective Board',
    'Foam Sheet',
    'Sunpack Sheet',
    'Bus Branding',
    'Auto Branding',
    'Look Walker Branding',
    'Road Show Canopy',
    'Offset Visiting Card',
    'Roll Up Standee',
    'Wall Poster & Flayer',
    'Wallpaper & Floor Mat'
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

  getServiceSlug(svc: string): string {
    const map: Record<string, string> = {
      'LED Sign Board': 'led-sign-board',
      'UV Fabric Backlight': 'uv-fabric-backlight',
      'UV Flex Backlight': 'uv-flex-backlight',
      'LED Video Wall': 'led-video-wall',
      'Acrylic Board': 'acrylic-board',
      'Reflective Board': 'reflective-board',
      'Direction Board': 'direction-board',
      'Foam Sheet': 'direction-board',
      'Sunpack Sheet': 'sunpack-sheet',
      'Bus Branding': 'bus-branding',
      'Auto Branding': 'auto-branding',
      'Look Walker Ads': 'look-walker-branding',
      'Road Show Canopy': 'road-show-canopy',
      'Vinyl & Foam Sheet': 'vinyl-foam-sheet-printing',
      'Vinyl & Foam Sheet Printing': 'vinyl-foam-sheet-printing',
      'Vinyl Sticker Printing': 'vinyl-foam-sheet-printing',
      'Visiting Cards': 'offset-visiting-card',
      'Roll Up Standee': 'roll-up-standee',
      'Wall Poster & Flyer': 'wall-poster-flayer',
      'Wallpaper & Floor Mat': 'wallpaper-floor-mat'
    };
    return map[svc] || 'led-sign-board';
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

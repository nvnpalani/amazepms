import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { 
  LucideAngularModule, 
  Store, 
  Sparkles, 
  PanelsTopLeft, 
  Monitor, 
  BadgeCheck, 
  Shield, 
  Layers, 
  Image, 
  Bus, 
  CarFront, 
  User, 
  Truck, 
  Printer, 
  RectangleHorizontal, 
  FileText, 
  Palette,
  Eye,
  Images,
  ArrowRight,
  CheckCircle,
  Zap,
  Clock,
  ExternalLink,
  Compass
} from 'lucide-angular';
import { SERVICES_CATEGORIES, ServiceCategory, ServiceItem, getAllServices } from '../../data/services.data';
import { ServicesApiService } from '../../services/services-api.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('reveal') revealElements!: QueryList<ElementRef>;
  private observer: IntersectionObserver | null = null;

  readonly icons = { 
    Store, 
    Sparkles, 
    PanelsTopLeft, 
    Monitor, 
    BadgeCheck, 
    Shield, 
    Layers, 
    Image, 
    Bus, 
    CarFront, 
    User, 
    Truck, 
    Printer, 
    RectangleHorizontal, 
    FileText, 
    Palette,
    Eye,
    Images,
    ArrowRight,
    CheckCircle,
    Zap,
    Clock,
    ExternalLink,
    Compass
  };

  categories: ServiceCategory[] = SERVICES_CATEGORIES;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicesApi: ServicesApiService
  ) {}

  ngOnInit() {
    this.loadDynamicServices();

    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        this.scrollToCategory(fragment);
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    });

    this.route.queryParams.subscribe(params => {
      const serviceParam = params['service'];
      if (serviceParam) {
        const clean = serviceParam.trim().toLowerCase();
        const all = getAllServices();
        const found = all.find(s => 
          s.id.toLowerCase() === clean ||
          s.name.toLowerCase() === clean ||
          s.name.toLowerCase().replace(/&/g, '').replace(/\s+/g, '-').includes(clean) ||
          clean.includes(s.id.toLowerCase())
        );
        if (found) {
          this.router.navigate(['/services', found.id]);
        }
      }
    });
  }

  loadDynamicServices() {
    this.servicesApi.getCategories().subscribe({
      next: (apiCats) => {
        if (!apiCats || apiCats.length === 0) return;

        this.servicesApi.getServices().subscribe({
          next: (apiServices) => {
            const staticAll = getAllServices();
            const dynamicCategories: ServiceCategory[] = apiCats.map(cat => {
              const catServices = (apiServices || []).filter(s => {
                const catId = typeof s.categoryId === 'object' ? s.categoryId?._id : s.categoryId;
                return catId === cat._id || s.categorySlug === cat.slug;
              });

              const mappedServices: ServiceItem[] = catServices.map(svc => {
                const staticMatch = staticAll.find(st => st.id === svc.slug || st.name.toLowerCase() === svc.name.toLowerCase());
                return {
                  id: svc.slug || svc._id,
                  name: svc.name,
                  desc: svc.description || staticMatch?.desc || '',
                  image: svc.image || staticMatch?.image || 'assets/service/led-sign-board.png',
                  images: staticMatch?.images || [svc.image || 'assets/service/led-sign-board.png'],
                  categoryId: cat.slug || cat._id,
                  categoryTitle: cat.name,
                  categoryColor: cat.color || 'navy',
                  specs: staticMatch?.specs,
                  features: staticMatch?.features,
                  applications: staticMatch?.applications
                };
              });

              return {
                id: cat.slug,
                title: cat.name,
                subtitle: cat.subtitle || '',
                color: cat.color || 'navy',
                imageUrl: cat.imageUrl || this.getCategoryFallbackImage(cat.slug),
                services: mappedServices.length > 0 ? mappedServices : (SERVICES_CATEGORIES.find(c => c.id === cat.slug)?.services || [])
              };
            });

            if (dynamicCategories.length > 0) {
              this.categories = dynamicCategories;
              setTimeout(() => {
                this.setupObserver();
              }, 50);
            }
          },
          error: (err) => console.warn('Could not load dynamic services, using static fallback:', err)
        });
      },
      error: (err) => console.warn('Could not load dynamic categories, using static fallback:', err)
    });
  }

  getCategoryFallbackImage(catId: string): string {
    switch (catId) {
      case 'signage-led': return 'assets/service/led-sign-board.png';
      case 'rigid-boards': return 'assets/service/sunboard-sheet.png';
      case 'vehicle-transit': return 'assets/service/auto-stickers.png';
      case 'commercial-print': return 'assets/service/flex-banner.png';
      default: return 'assets/service/led-sign-board.png';
    }
  }

  onServiceClick(catId: string) {
    if (typeof window !== 'undefined' && window.history) {
      window.history.replaceState(null, '', `/services#${catId}`);
    }
  }

  scrollToCategory(categoryId: string) {
    const doScroll = () => {
      const element = document.getElementById(categoryId);
      if (element) {
        element.scrollIntoView({ behavior: 'instant', block: 'start' });
        return true;
      }
      return false;
    };

    if (!doScroll()) {
      requestAnimationFrame(() => {
        if (!doScroll()) {
          setTimeout(() => doScroll(), 50);
        }
      });
    }
  }

  trackByCat(index: number, cat: ServiceCategory): string {
    return cat.id;
  }

  trackBySvc(index: number, svc: ServiceItem): string {
    return svc.id;
  }

  getCategoryIcon(id: string) {
    const map: Record<string, any> = {
      'signage-led': this.icons.Store,
      'boards-sheets': this.icons.Layers,
      'vehicle-outdoor': this.icons.Truck,
      'print-display': this.icons.Printer,
    };
    return map[id] || this.icons.Store;
  }

  getServiceIcon(id: string) {
    const map: Record<string, any> = {
      'led-sign-board': this.icons.Store,
      'uv-fabric-backlight': this.icons.Sparkles,
      'uv-flex-backlight': this.icons.PanelsTopLeft,
      'led-video-wall': this.icons.Monitor,
      'acrylic-board': this.icons.BadgeCheck,
      'reflective-board': this.icons.Shield,
      'direction-board': this.icons.Compass,
      'foam-sheet': this.icons.Layers,
      'sunpack-sheet': this.icons.Image,
      'bus-branding': this.icons.Bus,
      'auto-branding': this.icons.CarFront,
      'look-walker-branding': this.icons.User,
      'road-show-canopy': this.icons.Truck,
      'vinyl-foam-sheet-printing': this.icons.Palette,
      'vinyl-sticker-printing': this.icons.Palette,
      'offset-visiting-card': this.icons.Printer,
      'roll-up-standee': this.icons.RectangleHorizontal,
      'wall-poster-flayer': this.icons.FileText,
      'wallpaper-floor-mat': this.icons.Palette,
    };
    return map[id] || this.icons.Store;
  }

  ngAfterViewInit() {
    this.setupObserver();
    if (this.revealElements) {
      this.revealElements.changes.subscribe(() => {
        this.setupObserver();
      });
    }
  }

  private setupObserver() {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.05, rootMargin: '50px' });

    setTimeout(() => {
      this.revealElements?.forEach(el => {
        const rect = el.nativeElement.getBoundingClientRect();
        if (rect.top < window.innerHeight + 100) {
          el.nativeElement.classList.add('is-visible');
        }
        this.observer?.observe(el.nativeElement);
      });
    }, 60);
  }

  ngOnDestroy() { 
    this.observer?.disconnect(); 
  }
}

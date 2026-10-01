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
    private router: Router
  ) {}

  ngOnInit() {
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
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
    }, { threshold: 0.1 });
    this.revealElements.forEach(el => this.observer?.observe(el.nativeElement));
  }

  ngOnDestroy() { 
    this.observer?.disconnect(); 
  }
}

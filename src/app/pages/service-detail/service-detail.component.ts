import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChildren, QueryList, HostListener } from '@angular/core';
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
  X,
  ChevronLeft,
  ChevronRight,
  Images,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Zap,
  Clock,
  MessageCircle,
  Share2,
  Check
} from 'lucide-angular';
import { ServiceItem, getServiceById, getRelatedServices } from '../../data/services.data';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit, AfterViewInit, OnDestroy {
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
    X,
    ChevronLeft,
    ChevronRight,
    Images,
    ArrowRight,
    ArrowLeft,
    CheckCircle,
    Zap,
    Clock,
    MessageCircle,
    Share2,
    Check
  };

  service: ServiceItem | null = null;
  relatedServices: ServiceItem[] = [];
  activeImageIndex: number = 0;
  isLightboxOpen: boolean = false;
  copiedUrl: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadService(id);
      }
    });
  }

  loadService(id: string) {
    const found = getServiceById(id);
    if (found) {
      this.service = found;
      this.activeImageIndex = 0;
      this.isLightboxOpen = false;
      this.relatedServices = getRelatedServices(found.categoryId, found.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Fallback redirect to services list if service id not found
      this.router.navigate(['/services']);
    }
  }

  selectImage(index: number) {
    this.activeImageIndex = index;
  }

  nextImage(event?: MouseEvent) {
    if (event) event.stopPropagation();
    if (this.service && this.service.images.length > 0) {
      this.activeImageIndex = (this.activeImageIndex + 1) % this.service.images.length;
    }
  }

  prevImage(event?: MouseEvent) {
    if (event) event.stopPropagation();
    if (this.service && this.service.images.length > 0) {
      this.activeImageIndex = (this.activeImageIndex - 1 + this.service.images.length) % this.service.images.length;
    }
  }

  openLightbox(index: number = 0) {
    this.activeImageIndex = index;
    this.isLightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.isLightboxOpen = false;
    document.body.style.overflow = '';
  }

  copyPageUrl() {
    navigator.clipboard.writeText(window.location.href);
    this.copiedUrl = true;
    setTimeout(() => {
      this.copiedUrl = false;
    }, 2000);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.isLightboxOpen) {
      if (event.key === 'Escape') this.closeLightbox();
      if (event.key === 'ArrowRight') this.nextImage();
      if (event.key === 'ArrowLeft') this.prevImage();
    }
  }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
    }, { threshold: 0.1 });
    this.revealElements.forEach(el => this.observer?.observe(el.nativeElement));
    
    this.revealElements.changes.subscribe(() => {
      this.observer?.disconnect();
      this.revealElements.forEach(el => this.observer?.observe(el.nativeElement));
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    document.body.style.overflow = '';
  }
}

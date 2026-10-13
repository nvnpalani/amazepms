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
import { ServicesApiService, ProjectImageData } from '../../services/services-api.service';

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
  uploadedProjectImages: ProjectImageData[] = [];
  activeImageIndex: number = 0;
  isLightboxOpen: boolean = false;
  copiedUrl: boolean = false;

  // Touch swipe support for mobile & tablet
  private touchStartX: number = 0;
  private touchStartY: number = 0;
  private touchEndX: number = 0;
  private touchEndY: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ServicesApiService
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
    const staticFound = getServiceById(id);
    if (staticFound) {
      this.service = { ...staticFound, images: [...staticFound.images] };
      this.activeImageIndex = 0;
      this.isLightboxOpen = false;
      this.relatedServices = getRelatedServices(staticFound.categoryId, staticFound.id);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }

    // Now query backend API for live service and uploaded project gallery photos
    this.api.getServiceByIdOrSlug(id).subscribe({
      next: (res) => {
        if (res && res.service) {
          const apiSvc = res.service;
          this.uploadedProjectImages = res.projectImages || [];

          if (!this.service) {
            // If static service did not exist, construct from API
            const catName = typeof apiSvc.categoryId === 'object' ? apiSvc.categoryId?.name : 'Services';
            const catSlug = typeof apiSvc.categoryId === 'object' ? apiSvc.categoryId?.slug : 'signage-led';
            this.service = {
              id: apiSvc.slug || apiSvc._id,
              name: apiSvc.name,
              desc: apiSvc.description || '',
              image: apiSvc.image || 'assets/service/led-sign-board.png',
              images: this.uploadedProjectImages.map(p => p.imageUrl),
              categoryId: catSlug,
              categoryTitle: catName,
              categoryColor: 'navy',
              features: apiSvc.features || [],
              applications: apiSvc.applications || [],
              specs: apiSvc.specs || {}
            };
            if (this.service.images.length === 0 && apiSvc.image) {
              this.service.images = [apiSvc.image];
            }
            this.relatedServices = getRelatedServices(catSlug, this.service.id);
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          } else {
            // Append newly uploaded project photos to the service images array so slider/lightbox includes them
            if (this.uploadedProjectImages.length > 0) {
              const uploadedUrls = this.uploadedProjectImages.map(p => p.imageUrl);
              const combined = Array.from(new Set([...uploadedUrls, ...this.service.images]));
              this.service.images = combined;
            }
          }
        } else if (!staticFound) {
          this.router.navigate(['/services']);
        }
      },
      error: () => {
        if (!staticFound) {
          this.router.navigate(['/services']);
        }
      }
    });
  }

  openProjectImageLightbox(imageUrl: string) {
    if (!this.service) return;
    const index = this.service.images.indexOf(imageUrl);
    if (index >= 0) {
      this.openLightbox(index);
    } else {
      this.service.images.push(imageUrl);
      this.openLightbox(this.service.images.length - 1);
    }
  }

  selectImage(index: number) {
    this.activeImageIndex = index;
    this.scrollActiveThumbnail(index);
  }

  nextImage(event?: MouseEvent) {
    if (event) event.stopPropagation();
    if (this.service && this.service.images.length > 0) {
      this.activeImageIndex = (this.activeImageIndex + 1) % this.service.images.length;
      this.scrollActiveThumbnail(this.activeImageIndex);
    }
  }

  prevImage(event?: MouseEvent) {
    if (event) event.stopPropagation();
    if (this.service && this.service.images.length > 0) {
      this.activeImageIndex = (this.activeImageIndex - 1 + this.service.images.length) % this.service.images.length;
      this.scrollActiveThumbnail(this.activeImageIndex);
    }
  }

  onTouchStart(event: TouchEvent) {
    if (event.touches && event.touches.length > 0) {
      this.touchStartX = event.touches[0].clientX;
      this.touchStartY = event.touches[0].clientY;
    }
  }

  onTouchEnd(event: TouchEvent) {
    if (event.changedTouches && event.changedTouches.length > 0) {
      this.touchEndX = event.changedTouches[0].clientX;
      this.touchEndY = event.changedTouches[0].clientY;
      this.handleSwipe();
    }
  }

  private handleSwipe() {
    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;

    // Must be predominantly horizontal gesture and exceed 40px threshold
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        // Swiped Left -> Next Image
        this.nextImage();
      } else {
        // Swiped Right -> Previous Image
        this.prevImage();
      }
    }
  }

  scrollActiveThumbnail(index: number) {
    setTimeout(() => {
      const thumb = document.getElementById(`thumb-${index}`);
      if (thumb) {
        thumb.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }

      const lightboxThumb = document.getElementById(`lightbox-thumb-${index}`);
      if (lightboxThumb) {
        lightboxThumb.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }, 60);
  }

  openLightbox(index: number = 0) {
    this.activeImageIndex = index;
    this.isLightboxOpen = true;
    document.body.style.overflow = 'hidden';
    this.scrollActiveThumbnail(index);
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

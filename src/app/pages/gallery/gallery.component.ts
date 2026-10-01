import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChildren, QueryList, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { 
  LucideAngularModule, 
  Search, 
  ArrowLeft, 
  Images, 
  Eye, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Layers,
  Store,
  Bus,
  Palette
} from 'lucide-angular';

export interface GalleryAlbum {
  id: string;
  title: string;
  category: string;
  coverImg: string;
  description?: string;
  images: string[];
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('reveal') revealElements!: QueryList<ElementRef>;
  private observer: IntersectionObserver | null = null;

  readonly icons = { 
    Search, 
    ArrowLeft, 
    Images, 
    Eye, 
    X, 
    ChevronLeft, 
    ChevronRight, 
    Sparkles,
    Layers,
    Store,
    Bus,
    Palette
  };

  activeFilter = 'All';
  filters = ['All', 'LED & Signage', 'Boards & Sheets', 'Transit & Outdoor', 'Vinyl & Print'];

  // Current selected album/service for full view
  selectedAlbum: GalleryAlbum | null = null;

  // Lightbox state
  activeLightboxIndex: number | null = null;

  // Complete 16 categories / services catalog
  albums: GalleryAlbum[] = [
    // 1. LED & Signage
    {
      id: 'led-sign-board',
      title: 'LED Sign Board & Exterior Elevation',
      category: 'LED & Signage',
      coverImg:    'assets/service/L(3).jpeg' ,
      description: 'Custom 3D LED acrylic letters and ACP front architectural elevation works.',
      images: [
        'assets/service/L(3).jpeg' 
      ]
    },
    {
      id: 'uv-fabric-backlight',
      title: 'UV Fabric Backlight Board',
      category: 'LED & Signage',
      coverImg: 'assets/home/ak_cat_print_1789362413492.png',
      description: 'Frameless fabric LED lightboxes with vibrant glare-free UV backlighting.',
      images: [
        'assets/home/ak_cat_print_1789362413492.png'
      ]
    },
    {
      id: 'uv-flex-backlight',
      title: 'UV Flex Backlight Board',
      category: 'LED & Signage',
      coverImg: 'assets/home/ak_services_flex_1789359427264.png',
      description: 'High-durability weather-resistant UV flex glow signboards for shop fronts.',
      images: [
        'assets/home/ak_services_flex_1789359427264.png'
      ]
    },
    {
      id: 'led-video-wall',
      title: 'Indoor & Outdoor LED Video Wall Display',
      category: 'LED & Signage',
      coverImg: 'assets/home/ak_hero_bg_1789359389445.png',
      description: 'Ultra-bright commercial HD LED video screens for events and retail showrooms.',
      images: [
        'assets/home/ak_hero_bg_1789359389445.png'
      ]
    },

    // 2. Boards & Rigid Sheet Works
    {
      id: 'acrylic-board',
      title: 'Acrylic Board',
      category: 'Boards & Sheets',
      coverImg: 'assets/home/ak_cat_business_1789362524376.png',
      description: 'Precision laser-cut 3D acrylic embossed lettering and corporate reception displays.',
      images: [
        'assets/home/ak_cat_business_1789362524376.png'
      ]
    },
    {
      id: 'reflective-board',
      title: 'Reflective Board',
      category: 'Boards & Sheets',
      coverImg: 'assets/home/ak_placeholder.png',
      description: 'High-visibility retro-reflective directional boards and night-glow safety markers.',
      images: [
        'assets/home/ak_placeholder.png'
      ]
    },
    {
      id: 'direction-board',
      title: 'Direction Board',
      category: 'Boards & Sheets',
      coverImg: 'assets/our_work/reflective-board/d(1).jpeg',
      description: 'High-visibility industrial and campus wayfinding direction boards with night-glow retro-reflectivity.',
      images: [
        'assets/our_work/reflective-board/d(1).jpeg',
        'assets/our_work/reflective-board/d(2).jpeg',
        'assets/our_work/reflective-board/d(3).jpeg'
      ]
    },
    {
      id: 'sunpack-sheet',
      title: 'Sunpack Sheet',
      category: 'Boards & Sheets',
      coverImg: 'assets/our_work/sunpack-sheet/spo-1.png',
      description: 'Cost-effective, waterproof fluted PP sunpack boards manufactured for mass outdoor campaigns.',
      images: [
        'assets/our_work/sunpack-sheet/spo-1.png',
        'assets/our_work/sunpack-sheet/spo-2.png',
        'assets/our_work/sunpack-sheet/spo-3.png',
        'assets/our_work/sunpack-sheet/spo-4.png',
        'assets/our_work/sunpack-sheet/spo-5.png',
        'assets/our_work/sunpack-sheet/spo-6.png'
      ]
    },

    // 3. Outdoor & Transit Advertising
    {
      id: 'bus-backside-ads',
      title: 'Bus Backside Ads',
      category: 'Transit & Outdoor',
      coverImg: 'assets/service/bus.png',
      description: 'City-wide mobile brand visibility through high-impact transit bus rear panel advertising.',
      images: [
        'assets/service/bus.png'
      ]
    },
    {
      id: 'auto-backside-ads',
      title: 'Auto Backside Ads',
      category: 'Transit & Outdoor',
      coverImg: 'assets/home/ak-flex.png',
      description: 'Hyper-local street-level reach targeting crowded junctions with auto-rickshaw back ads.',
      images: [
        'assets/home/ak-flex.png'
      ]
    },
    {
      id: 'look-walker-ads',
      title: 'Look Walker Ads',
      category: 'Transit & Outdoor',
      coverImg: 'assets/home/ak_cat_digital_1789362542891.png',
      description: 'Eye-catching illuminated wearable backpack walking billboards for public gathering points.',
      images: [
        'assets/home/ak_cat_digital_1789362542891.png'
      ]
    },
    {
      id: 'road-show-ads',
      title: 'Road Show Ads',
      category: 'Transit & Outdoor',
      coverImg: 'assets/home/ak_new_hero_1789362368634.png',
      description: 'Custom vehicle fabrication, roadshow campaign setups, and dynamic mobile displays.',
      images: [
        'assets/home/ak_new_hero_1789362368634.png'
      ]
    },

    // 4. Vinyl, Print & Interior Branding
    {
      id: 'vinyl-foam-sheet-printing',
      title: 'Vinyl & Foam Sheet Printing',
      category: 'Vinyl & Print',
      coverImg: 'assets/our_work/vinyl-sticker-printing/v-1.png',
      description: 'High-definition waterproof vinyl decals, frosted glass window films, and rigid foam board mounting.',
      images: [
        'assets/our_work/vinyl-sticker-printing/v-1.png',
        'assets/our_work/vinyl-sticker-printing/v-2.png',
        'assets/our_work/foam-sheet/form_sheet (1).jpg',
        'assets/our_work/foam-sheet/form_sheet (2).jpg'
      ],
    },
    {
      id: 'roll-up-standee',
      title: 'Roll Up Standee',
      category: 'Vinyl & Print',
      coverImg: 'assets/home/ak_svc_banner_1789362648557.png',
      description: 'Premium lightweight aluminum roll-up pull standees for conferences and showrooms.',
      images: [
        'assets/home/ak_svc_banner_1789362648557.png'
      ]
    },
    {
      id: 'wall-poster-flayer',
      title: 'Wall Poster & Flayer',
      category: 'Vinyl & Print',
      coverImg: 'assets/home/ak_new_about_1789362399471.png',
      description: 'High-volume vibrant marketing flyers, brochures, and full-color wall posters.',
      images: [
        'assets/home/ak_new_about_1789362399471.png'
      ]
    },
    {
      id: 'wallpaper-floor-mat',
      title: 'Wallpaper & Floor Mat',
      category: 'Vinyl & Print',
      coverImg: 'assets/home/ak-hero-bg.png',
      description: 'Custom corporate wall murals, textured aesthetic wallpapers, and anti-skid floor mats.',
      images: [
        'assets/home/ak-hero-bg.png'
      ]
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Listen for query parameters (e.g., from Services page)
    this.route.queryParams.subscribe(params => {
      const serviceParam = params['service'];
      if (serviceParam) {
        this.openServiceByParam(serviceParam);
      } else {
        this.selectedAlbum = null;
      }
    });
  }

  // Filtered list of albums for Category overview (1 cover per service)
  get filteredAlbums(): GalleryAlbum[] {
    if (this.activeFilter === 'All') return this.albums;
    return this.albums.filter(a => a.category === this.activeFilter);
  }

  // Get sibling albums in same category for quick switcher
  get siblingAlbums(): GalleryAlbum[] {
    if (!this.selectedAlbum) return [];
    return this.albums.filter(a => a.category === this.selectedAlbum?.category);
  }

  // Find and open album by service name or id
  openServiceByParam(param: string) {
    const clean = param.trim().toLowerCase();
    const found = this.albums.find(a => 
      a.id.toLowerCase() === clean ||
      a.title.toLowerCase() === clean ||
      a.title.toLowerCase().replace(/&/g, '').replace(/\s+/g, '-').includes(clean) ||
      clean.includes(a.id.toLowerCase()) ||
      clean.includes(a.title.toLowerCase())
    );

    if (found) {
      this.selectedAlbum = found;
      this.activeFilter = found.category;
    }
  }

  // User clicks an album card
  selectAlbum(album: GalleryAlbum) {
    this.selectedAlbum = album;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { service: album.id },
      queryParamsHandling: 'merge'
    });
    window.scrollTo({ top: 350, behavior: 'smooth' });
  }

  // User clicks back to category list
  backToCategories() {
    this.selectedAlbum = null;
    this.closeLightbox();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { service: null },
      queryParamsHandling: 'merge'
    });
  }

  // Filter change
  setFilter(f: string) {
    this.activeFilter = f;
    this.selectedAlbum = null;
    this.closeLightbox();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { service: null },
      queryParamsHandling: 'merge'
    });
  }

  // Lightbox controls
  openLightbox(index: number) {
    this.activeLightboxIndex = index;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.activeLightboxIndex = null;
    document.body.style.overflow = '';
  }

  nextImage() {
    if (this.selectedAlbum && this.activeLightboxIndex !== null) {
      this.activeLightboxIndex = (this.activeLightboxIndex + 1) % this.selectedAlbum.images.length;
    }
  }

  prevImage() {
    if (this.selectedAlbum && this.activeLightboxIndex !== null) {
      this.activeLightboxIndex = (this.activeLightboxIndex - 1 + this.selectedAlbum.images.length) % this.selectedAlbum.images.length;
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.activeLightboxIndex !== null) {
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

import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Search } from 'lucide-angular';

interface GalleryItem {
  img: string;
  title: string;
  category: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('reveal') revealElements!: QueryList<ElementRef>;
  private observer: IntersectionObserver | null = null;
  readonly icons = { Search };

  activeFilter = 'All';
  filters = ['All', 'Flex', 'Banner', 'Advertisement', 'ID Cards', 'Brochures', 'Store Board', 'Social Media'];

  galleryItems: GalleryItem[] = [
    { img: 'assets/home/ak_flex_feature_1789362383873.png', title: 'Flex Printing - Shop Opening', category: 'Flex' },
    { img: 'assets/home/ak_svc_banner_1789362648557.png', title: 'Premium Event Banner', category: 'Banner' },
    { img: 'assets/home/ak_cat_outdoor_1789362504808.png', title: 'Advertisement Board', category: 'Advertisement' },
    { img: 'assets/home/ak_cat_print_1789362413492.png', title: 'Promotional Banner', category: 'Banner' },
    { img: 'assets/home/ak_cat_business_1789362524376.png', title: 'Business Store Board', category: 'Store Board' },
    { img: 'assets/home/ak_new_about_1789362399471.png', title: 'Corporate Brochure', category: 'Brochures' },
    { img: 'assets/home/ak_cat_digital_1789362542891.png', title: 'ID Card - Staff Batch', category: 'ID Cards' },
    { img: 'assets/home/ak_hero_bg_1789359389445.png', title: 'Social Media Poster Design', category: 'Social Media' },
    { img: 'assets/home/ak-about.png', title: 'Street Advertisement Banner', category: 'Advertisement' },
    { img: 'assets/home/ak-flex.png', title: 'Function Event Flex', category: 'Flex' },
    { img: 'assets/home/ak_services_flex_1789359427264.png', title: 'Product Brochure', category: 'Brochures' },
    { img: 'assets/home/ak_svc_flex_1789362562200.png', title: 'Store Name Board', category: 'Store Board' },
  ];

  get filtered(): GalleryItem[] {
    if (this.activeFilter === 'All') return this.galleryItems;
    return this.galleryItems.filter(i => i.category === this.activeFilter);
  }

  setFilter(f: string) { 
    this.activeFilter = f; 
  }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
    }, { threshold: 0.1 });
    
    // Initial observation
    this.revealElements.forEach(el => this.observer?.observe(el.nativeElement));

    // Re-observe when DOM items change due to filtering
    this.revealElements.changes.subscribe(() => {
      this.observer?.disconnect();
      this.revealElements.forEach(el => this.observer?.observe(el.nativeElement));
    });
  }

  ngOnDestroy() { this.observer?.disconnect(); }
}

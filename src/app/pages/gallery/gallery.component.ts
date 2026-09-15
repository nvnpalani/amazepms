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
  filters = ['All', 'Flex', 'Banners', 'Advertisement', 'ID Cards', 'Brochures', 'Store Boards', 'Social Media'];

  galleryItems: GalleryItem[] = [
    { img: 'assets/home/ak_placeholder.png',    title: 'Flex Printing ΓÇö Shop Opening', category: 'Flex' },
    { img: 'assets/home/ak_placeholder.png',  title: 'Event Banner Design',           category: 'Banners' },
    { img: 'assets/home/ak_placeholder.png', title: 'Advertisement Board',           category: 'Advertisement' },
    { img: 'assets/home/ak_placeholder.png',    title: 'Promotional Banner',            category: 'Banners' },
    { img: 'assets/home/ak_placeholder.png',title: 'Business Store Board',          category: 'Store Boards' },
    { img: 'assets/home/ak_placeholder.png',   title: 'Corporate Brochure',            category: 'Brochures' },
    { img: 'assets/home/ak_placeholder.png',title: 'ID Card ΓÇö Staff Batch',         category: 'ID Cards' },
    { img: 'assets/home/ak_placeholder.png', title: 'Social Media Poster Design',    category: 'Social Media' },
    { img: 'assets/home/ak_placeholder.png', title: 'Street Advertisement Banner',   category: 'Advertisement' },
    { img: 'assets/home/ak_placeholder.png',    title: 'Function Event Flex',           category: 'Flex' },
    { img: 'assets/home/ak_placeholder.png',title: 'Product Brochure',              category: 'Brochures' },
    { img: 'assets/home/ak_placeholder.png',   title: 'Store Name Board',              category: 'Store Boards' },
  ];

  get filtered(): GalleryItem[] {
    if (this.activeFilter === 'All') return this.galleryItems;
    return this.galleryItems.filter(i => i.category === this.activeFilter);
  }

  setFilter(f: string) { this.activeFilter = f; }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
    }, { threshold: 0.1 });
    this.revealElements.forEach(el => this.observer?.observe(el.nativeElement));
  }

  ngOnDestroy() { this.observer?.disconnect(); }
}

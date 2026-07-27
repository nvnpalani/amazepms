import { Component, OnInit, ElementRef, ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('animateOnScroll') animatedElements!: QueryList<ElementRef>;
  private observer: IntersectionObserver | null = null;

  galleryItems = [
    { title: 'Client 1', img: '/assets/gallery/client (1).png' },
    { title: 'Client 2', img: '/assets/gallery/client (2).png' },
    { title: 'Client 3', img: '/assets/gallery/client (3).png' },
    { title: 'Client 4', img: '/assets/gallery/client (4).png' },
    { title: 'Client 5', img: '/assets/gallery/client (5).png' },
    { title: 'Client 6', img: '/assets/gallery/client (6).png' }
  ];

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  // Filtering logic removed as requested by UI changes

  private setupIntersectionObserver() {
    if (this.observer) {
      this.observer.disconnect();
    }
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, options);

    // Wait a tick for angular to render DOM elements if filtered
    setTimeout(() => {
      const elements = document.querySelectorAll('.animateOnScroll, .gallery-card');
      elements.forEach(el => {
        if (this.observer) {
          this.observer.observe(el);
        }
      });
    }, 50);
  }
}

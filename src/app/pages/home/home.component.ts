import { Component, OnInit, ElementRef, ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('animateOnScroll') animatedElements!: QueryList<ElementRef>;
  private observer: IntersectionObserver | null = null;

  slides = [
    {
      title: 'Amaze Property<br>Management<br><span class="highlight-blue">Solutions Pvt. Ltd.</span>',
      desc: 'A one stop solution for all your property<br>management needs.',
      image: '/assets/home/hero-bg.jpg'
    },
    {
      title: 'Security<br><span class="highlight-blue">Services</span>',
      desc: 'Professional and reliable security services to keep your premises safe 24/7.',
      image: '/assets/home/security.png'
    },
    {
      title: 'House Keeping<br><span class="highlight-blue">Services</span>',
      desc: 'Maintaining pristine environments with our expert housekeeping solutions.',
      image: '/assets/home/house_keeping.png'
    },
    {
      title: 'Help Desk<br><span class="highlight-blue">Management Services</span>',
      desc: 'Efficient help desk services to streamline your operations and support.',
      image: '/assets/home/help_desk.jpg'
    },
    {
      title: 'Technical<br><span class="highlight-blue">Services</span>',
      desc: 'Expert technical maintenance and support for all your facility needs.',
      image: '/assets/home/technical.png'
    },
    {
      title: 'Pest Control<br><span class="highlight-blue">Services</span>',
      desc: 'Comprehensive pest control solutions for a healthy and safe environment.',
      image: '/assets/home/pest_control.png'
    },
    {
      title: 'Parking<br><span class="highlight-blue">Management</span>',
      desc: 'Organized and secure parking management tailored to your facility.',
      image: '/assets/home/parking.png'
    },
    {
      title: 'Landscaping<br><span class="highlight-blue">Services</span>',
      desc: 'Beautiful and sustainable landscaping to enhance your property aesthetics.',
      image: '/assets/home/landsacping.png'
    }
  ];
  currentDeptIndex = 0;
  private carouselTimer: any;

  ngOnInit() {
    this.startCarousel();
  }

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.stopCarousel();
  }

  // Carousel Methods
  startCarousel() {
    this.carouselTimer = setInterval(() => {
      this.nextDept();
    }, 4000); // 4 seconds delay
  }

  stopCarousel() {
    if (this.carouselTimer) {
      clearInterval(this.carouselTimer);
    }
  }

  nextDept() {
    this.currentDeptIndex = (this.currentDeptIndex + 1) % this.slides.length;
  }

  prevDept() {
    this.currentDeptIndex = (this.currentDeptIndex - 1 + this.slides.length) % this.slides.length;
  }

  goToDept(index: number) {
    this.currentDeptIndex = index;
    this.stopCarousel();
    this.startCarousel();
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, options);

    this.animatedElements.forEach(el => {
      if (this.observer) {
        this.observer.observe(el.nativeElement);
      }
    });
  }
}

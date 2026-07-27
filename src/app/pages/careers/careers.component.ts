import { Component, OnInit, ElementRef, ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('animateOnScroll') animatedElements!: QueryList<ElementRef>;
  private observer: IntersectionObserver | null = null;

  openings = [
    { title: 'Facility Manager', experience: '5+ Years', location: 'Chennai', icon: 'building' },
    { title: 'Assistant Facility Manager', experience: '3+ Years', location: 'Coimbatore', icon: 'users' },
    { title: 'Operations Manager', experience: '7+ Years', location: 'Chennai', icon: 'settings' },
    { title: 'Security Officer', experience: '2+ Years', location: 'Bangalore', icon: 'shield' },
    { title: 'Electrician', experience: '1-3 Years', location: 'Chennai', icon: 'lightning' },
    { title: 'Field Officer – Technical', experience: '2+ Years', location: 'Madurai', icon: 'clipboard' },
    { title: 'Field Officer – Security', experience: '2+ Years', location: 'Chennai', icon: 'shield' },
    { title: 'Plumber', experience: '1-3 Years', location: 'Chennai', icon: 'settings' },
    { title: 'Carpenter', experience: '1-3 Years', location: 'Chennai', icon: 'settings' },
    { title: 'Gardener', experience: '1-3 Years', location: 'Chennai', icon: 'building' },
    { title: 'House Keeping Supervisor', experience: '3+ Years', location: 'Chennai', icon: 'users' },
    { title: 'House Keeper', experience: '1-2 Years', location: 'Chennai', icon: 'users' },
    { title: 'Fire & Safety Technicians', experience: '2+ Years', location: 'Chennai', icon: 'shield' },
    { title: 'Help Desk Executive', experience: '1-3 Years', location: 'Chennai', icon: 'users' }
  ];

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver() {
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

    this.animatedElements.forEach(el => {
      if (this.observer) {
        this.observer.observe(el.nativeElement);
      }
    });
  }
}

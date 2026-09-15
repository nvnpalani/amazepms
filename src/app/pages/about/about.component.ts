import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Target, Telescope, Gem, Building2, Briefcase, GraduationCap, PartyPopper, User, Star, CheckCircle2 } from 'lucide-angular';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('reveal') revealElements!: QueryList<ElementRef>;
  private observer: IntersectionObserver | null = null;

  readonly icons = { Target, Telescope, Gem, Building2, Briefcase, GraduationCap, PartyPopper, User, Star, CheckCircle2 };

  values = [
    { title: 'Our Mission', desc: 'To provide high-quality printing and advertising solutions that help every business communicate their message clearly and professionally.', icon: this.icons.Target, color: 'teal' },
    { title: 'Our Vision', desc: 'To be the most trusted printing and advertising partner for businesses across Tamil Nadu, known for quality, reliability and creativity.', icon: this.icons.Telescope, color: 'navy' },
    { title: 'Our Values', desc: 'Quality in every print. Respect for every client. Commitment to every deadline. Creativity in every design.', icon: this.icons.Gem, color: 'red' }
  ];

  industries = [
    { icon: this.icons.Building2, label: 'Shops & Showrooms' },
    { icon: this.icons.Briefcase, label: 'Businesses & Companies' },
    { icon: this.icons.GraduationCap, label: 'Schools & Colleges' },
    { icon: this.icons.PartyPopper, label: 'Events & Functions' },
    { icon: this.icons.User, label: 'Individuals' },
    { icon: this.icons.Star, label: 'Local Brands' },
  ];

  features = ['Quality Printing', 'Fast Turnaround', 'Creative Design', 'Reliable Delivery', 'Affordable Pricing', 'Personalized Service'];

  ngAfterViewInit() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
    }, { threshold: 0.12 });
    this.revealElements.forEach(el => this.observer?.observe(el.nativeElement));
  }

  ngOnDestroy() { this.observer?.disconnect(); }
}

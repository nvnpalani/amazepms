import { Component, ElementRef, ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Industry {
  id: string;
  title: string;
  items: string[];
  expanded: boolean;
  colorClass: string;
}

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('animateOnScroll') animatedElements!: QueryList<ElementRef>;
  private observer: IntersectionObserver | null = null;
  
  selectedIndustry: string | null = null;

  industries: Industry[] = [
    {
      id: 'commercial',
      title: 'Commercial & IT Parks',
      colorClass: 'text-orange',
      expanded: false,
      items: [
        'Sohini Tech Park', 'BSR Tech Park', 'Divyasree NSL (Orion Campus)', 'Kapil Towers', 
        'Astra Towers', 'Lanco IT', 'Rajapushpa Summit', 'Cyperoptics', 'IVY Infotech', 
        'L&T Metro Stations', 'Purva Summit', 'Kapil Business Park', 'I Labs', 
        'Sattva Knowledge Park', 'Tech Mahindra', 'T Hub', 'Tech Ridge', 'Cyber Towers', 
        'Aurobindo Galaxy', 'Kapil Kavuri Hub', 'Sitel India Pvt Ltd', 'Jocota', 
        'Moschip', 'Smart Drive', 'I Sprout'
      ]
    },
    {
      id: 'residential',
      title: 'Residential Communities',
      colorClass: 'text-blue',
      expanded: false,
      items: [
        'Golf Edge Residences', 'Aparna Silver Oak', 'Mahindra Ashvitha', 'Golf View', 
        'Ramky Towers', 'Rajapushpa Imperia', 'Lanco Hills', 'Rajapushpa Provincia', 
        'Krinss Villas', 'Hill County', 'Rajapushpa Greendale', 'Jains Balaji', 
        'Kalpatharu Residency', 'Sri Sai Ram Towers', 'The Botanika', 'My Home Mangla', 
        'Rainbow Vista', 'North Star Villas', 'Rajapushpa Regalia', 'Rajapushpa Atria', 
        'Manjeera Diamond Tower', 'L&T Serene County', 'Aparna Hill Park Sarovar', 
        'My Home Avatar', 'Rajapushpa Eterna', 'Hill Ridge Villas', 'Aditya Empress', 
        'Prajay Megapolis'
      ]
    },
    {
      id: 'malls',
      title: 'Malls, Multiplexes & Retail',
      colorClass: 'text-purple',
      expanded: false,
      items: [
        'Nexus Mall', 'Marina Mall', 'Phoenix Market City', 'GMS Mall', 'Lulu Mall', 
        'DSL Mall', 'L&T Mall - Punjagutta', 'Rajapushpa Provincia', 'L&T Mall - Hitech City', 
        'L&T Mall - Musarambagh', 'Max Stores', 'Time Zone', 'Life Style'
      ]
    },
    {
      id: 'hospitals',
      title: 'Hospitals & Clinics',
      colorClass: 'text-red',
      expanded: false,
      items: [
        'Rainbow Hospitals', 'Oliva Clinics', 'Star Health', 'Rainbow Vista'
      ]
    },
    {
      id: 'educational',
      title: 'Educational Institutions',
      colorClass: 'text-green',
      expanded: false,
      items: [
        'Institute of Public Enterprise', 'Institute of Public Enterprise', 'NICMAR', 
        'Nalsar', 'EFL University', 'Administrative Staff College of India', 
        'Aga Khan Academy', 'KL University', 'Delhi Public School', 
        'Mahindra and Mahindra University', 'Analog IAS Academy'
      ]
    },
    {
      id: 'manufacturing',
      title: 'Manufacturing & Pharma',
      colorClass: 'text-pink',
      expanded: false,
      items: [
        'Vidur Pharma', 'Srivar Pharma', 'MSN Pharma', 'Renew Power Projects', 
        'Astra Microwave Products', 'UB Beer Ltd', 'BMM Ispat Ltd', 'VRKP Steels Ltd', 
        'Pokarna Ltd', 'MSPL Ltd', 'RMIL Ltd'
      ]
    },
    {
      id: 'warehouses',
      title: 'Warehouses',
      colorClass: 'text-cyan',
      expanded: false,
      items: [
        'Max', 'Life Style', 'RIL', 'Metro', 'UB Beer', 'Emirates Logistics', 'Nippon', 'ITC'
      ]
    }
  ];

  // Provide an array of numbers for the logo carousel iteration
  carouselLogos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  
  activeTooltip: any = null;
  tooltipStyle: any = { opacity: 0 };

  showTooltip(event: MouseEvent, name: string, val: string, pct: string) {
    this.activeTooltip = { name, val, pct };
    this.updateTooltipPosition(event);
  }

  updateTooltipPosition(event: MouseEvent) {
    if (this.activeTooltip) {
      this.tooltipStyle = {
        left: (event.clientX + 15) + 'px',
        top: (event.clientY + 15) + 'px',
        opacity: 1
      };
    }
  }

  hideTooltip() {
    this.activeTooltip = null;
    this.tooltipStyle = { opacity: 0 };
  }

  constructor(private el: ElementRef) {}

  get displayedIndustries() {
    if (this.selectedIndustry) {
      return this.industries.filter(ind => ind.id === this.selectedIndustry);
    }
    return this.industries;
  }

  toggleViewAll(industry: Industry) {
    industry.expanded = !industry.expanded;
  }

  selectIndustry(id: string | null) {
    if (this.selectedIndustry === id) {
      this.selectedIndustry = null;
    } else {
      this.selectedIndustry = id;
    }
    
    this.industries.forEach(ind => ind.expanded = false);
    
    if (this.selectedIndustry) {
       setTimeout(() => {
          const el = document.getElementById('client-lists-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
       }, 50);
    }
  }

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

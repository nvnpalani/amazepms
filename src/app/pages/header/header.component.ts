import { Component, OnInit, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isMobileMenuOpen = false;
  isScrolled = false;

  navLinks = [
    { label: 'Home',     path: '/',        exact: true },
    { label: 'About',    path: '/about',   exact: false },
    { label: 'Services', path: '/services',exact: false },
    { label: 'Our Work', path: '/gallery', exact: false },
    { label: 'Contact',  path: '/contact', exact: false },
  ];

  ngOnInit() {
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 30;
  }



  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }
}

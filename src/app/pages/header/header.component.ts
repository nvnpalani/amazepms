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
  isDarkMode = false;
  isThemeDropdownOpen = false;
  isMobileMenuOpen = false;

  defaultColors = [
    '#1a4cd2', // Original Blue
    '#dc2626', // Red
    '#16a34a', // Green
    '#9333ea'  // Purple
  ];

  ngOnInit() {
    // Load saved preferences
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      document.body.classList.add('dark-theme');
    }

    const savedColor = localStorage.getItem('primary-color');
    if (savedColor) {
      document.documentElement.style.setProperty('--primary-color', savedColor);
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }

  toggleThemeDropdown() {
    this.isThemeDropdownOpen = !this.isThemeDropdownOpen;
  }
  
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  
  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  changePrimaryColor(color: string) {
    document.documentElement.style.setProperty('--primary-color', color);
    localStorage.setItem('primary-color', color);
    this.isThemeDropdownOpen = false;
  }

  onCustomColorChange(event: any) {
    const color = event.target.value;
    this.changePrimaryColor(color);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Close dropdown if clicked outside
    const target = event.target as HTMLElement;
    if (!target.closest('.theme-switcher-container') && this.isThemeDropdownOpen) {
      this.isThemeDropdownOpen = false;
    }
  }
}

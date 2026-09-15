import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  year = new Date().getFullYear();

  quickLinks = [
    { label: 'Home',        path: '/',         exact: true  },
    { label: 'About',       path: '/about',    exact: false },
    { label: 'Services',    path: '/services', exact: false },
    { label: 'Our Work',    path: '/gallery',  exact: false },
    { label: 'Contact',     path: '/contact',  exact: false },
  ];

  serviceLinks = [
    'Flex Printing', 'Banner Printing', 'Advertisement Boards',
    'ID Card Printing', 'Brochure Printing', 'Flyer Printing',
    'Store Boards', 'Social Media Designs'
  ];
}

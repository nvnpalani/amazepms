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
    { label: 'About Us',    path: '/about',    exact: false },
    { label: 'Services',    path: '/services', exact: false },
    { label: 'Contact Us',  path: '/contact',  exact: false },
  ];

  servicesCol1 = [
    'LED Sign Board & Elevation',
    'UV Fabric Backlight Board',
    'UV Flex Backlight Board',
    'LED Video Wall Display',
    'Acrylic Board',
    'Reflective Board',
    'Foam Sheet',
    'Sunpack Sheet'
  ];

  servicesCol2 = [
    'Bus Backside Ads',
    'Auto Backside Ads',
    'Look Walker Ads',
    'Road Show Ads',
    'Vinyl Sticker Printing',
    'Roll Up Standee',
    'Wall Poster & Flayer',
    'Wallpaper & Floor Mat'
  ];
}

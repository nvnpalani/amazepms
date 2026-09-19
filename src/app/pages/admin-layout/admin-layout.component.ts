import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent implements OnInit {
  isDropdownOpen = false;
  newMessagesCount = 0;

  constructor(
    private authService: AuthService, 
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit() {
    this.contactService.getMessages().subscribe({
      next: (messages: any[]) => {
        const lastRead = localStorage.getItem('lastReadNotifications');
        // If no last read date, default to 24 hours ago
        const lastReadDate = lastRead ? new Date(lastRead) : new Date(Date.now() - 24 * 60 * 60 * 1000);
        
        this.newMessagesCount = messages.filter(m => m.createdAt && new Date(m.createdAt) > lastReadDate).length;
      }
    });
  }

  onNotificationClick() {
    this.newMessagesCount = 0;
    localStorage.setItem('lastReadNotifications', new Date().toISOString());
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onLogout(event: Event) {
    event.preventDefault(); 
    this.authService.logout();
    this.router.navigate(['/admin-login'], { replaceUrl: true });
  }
}

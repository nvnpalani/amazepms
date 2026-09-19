import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-admin-notifications',
  imports: [CommonModule],
  templateUrl: './admin-notifications.component.html',
  styleUrl: './admin-notifications.component.css'
})
export class AdminNotificationsComponent implements OnInit {
  notifications: any[] = [];

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getMessages().subscribe({
      next: (messages: any[]) => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        // Filter messages from last 24h as notifications
        this.notifications = messages.filter(m => m.createdAt && new Date(m.createdAt) > yesterday);
      }
    });
  }
}

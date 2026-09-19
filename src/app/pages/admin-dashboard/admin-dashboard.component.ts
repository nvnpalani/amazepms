import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  totalMessages = 0;
  newMessages = 0;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getMessages().subscribe({
      next: (messages: any[]) => {
        this.totalMessages = messages.length;
        
        // Calculate new messages (last 24 hours)
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        this.newMessages = messages.filter(m => {
          if (!m.createdAt) return false;
          return new Date(m.createdAt) > yesterday;
        }).length;
      },
      error: (err) => console.error('Error fetching dashboard data:', err)
    });
  }
}

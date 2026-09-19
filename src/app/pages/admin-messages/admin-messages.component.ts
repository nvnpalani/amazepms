import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-messages',
  imports: [CommonModule],
  templateUrl: './admin-messages.component.html',
  styleUrl: './admin-messages.component.css'
})
export class AdminMessagesComponent implements OnInit {
  messages: any[] = [];
  
  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getMessages().subscribe({
      next: (data) => {
        this.messages = data;
      },
      error: (err) => {
        console.error('Error fetching messages', err);
      }
    });
  }
}

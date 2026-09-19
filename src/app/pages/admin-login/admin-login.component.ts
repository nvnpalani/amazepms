import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/admin/dashboard'], { replaceUrl: true });
    }
  }

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        if (res && res.success) {
          this.router.navigate(['/admin/dashboard'], { replaceUrl: true });
        } else {
          this.errorMessage = 'Invalid Username or Password!';
        }
      },
      error: (err) => {
        this.errorMessage = 'Invalid Username or Password!';
      }
    });
  }
}

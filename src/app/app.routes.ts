import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AdminLayoutComponent } from './pages/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminMessagesComponent } from './pages/admin-messages/admin-messages.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminNotificationsComponent } from './pages/admin-notifications/admin-notifications.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'messages', component: AdminMessagesComponent },
      { path: 'notifications', component: AdminNotificationsComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

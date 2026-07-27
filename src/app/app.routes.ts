import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { RecruitmentsComponent } from './pages/recruitments/recruitments.component';
import { StrengthComponent } from './pages/strength/strength.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { CareersComponent } from './pages/careers/careers.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'recruitments', component: RecruitmentsComponent },
  { path: 'strength', component: StrengthComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'careers', component: CareersComponent },
  { path: 'contact', component: ContactComponent },
];

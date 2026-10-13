import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

export interface CategoryData {
  _id: string;
  name: string;
  slug: string;
  imageUrl?: string;
  cloudinaryPublicId?: string;
  subtitle?: string;
  color?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ServiceData {
  _id: string;
  categoryId: any;
  categorySlug?: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  cloudinaryPublicId?: string;
  features?: string[];
  applications?: string[];
  specs?: any;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectImageData {
  _id: string;
  categoryId: any;
  serviceId: any;
  imageUrl: string;
  cloudinaryPublicId?: string;
  projectName?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServicesApiService {
  private baseUrl = 'http://localhost:5000/api'; // Primary API url
  // private baseUrl = 'https://ak-backend-tqdj.onrender.com/api'; // Live server fallback

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('isAdminLoggedIn') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // ================= CATEGORIES =================
  getCategories(): Observable<CategoryData[]> {
    return this.http.get<CategoryData[]>(`${this.baseUrl}/categories`).pipe(
      catchError(err => {
        console.warn('Could not fetch categories from API:', err);
        return of([]);
      })
    );
  }

  createCategory(formData: FormData): Observable<CategoryData> {
    return this.http.post<CategoryData>(`${this.baseUrl}/categories`, formData, {
      headers: this.getAuthHeaders()
    });
  }

  updateCategory(id: string, formData: FormData): Observable<CategoryData> {
    return this.http.put<CategoryData>(`${this.baseUrl}/categories/${id}`, formData, {
      headers: this.getAuthHeaders()
    });
  }

  deleteCategory(id: string, force: boolean = false): Observable<any> {
    const params = new HttpParams().set('force', force.toString());
    return this.http.delete(`${this.baseUrl}/categories/${id}`, {
      headers: this.getAuthHeaders(),
      params
    });
  }

  // ================= SERVICES =================
  getServices(categoryId?: string, categorySlug?: string): Observable<ServiceData[]> {
    let params = new HttpParams();
    if (categoryId) params = params.set('categoryId', categoryId);
    if (categorySlug) params = params.set('categorySlug', categorySlug);

    return this.http.get<ServiceData[]>(`${this.baseUrl}/services`, { params }).pipe(
      catchError(err => {
        console.warn('Could not fetch services from API:', err);
        return of([]);
      })
    );
  }

  getServiceByIdOrSlug(idOrSlug: string): Observable<{ service: ServiceData; projectImages: ProjectImageData[] } | null> {
    return this.http.get<{ service: ServiceData; projectImages: ProjectImageData[] }>(`${this.baseUrl}/services/${idOrSlug}`).pipe(
      catchError(err => {
        console.warn(`Could not fetch service ${idOrSlug} from API:`, err);
        return of(null);
      })
    );
  }

  createService(formData: FormData): Observable<ServiceData> {
    return this.http.post<ServiceData>(`${this.baseUrl}/services`, formData, {
      headers: this.getAuthHeaders()
    });
  }

  updateService(id: string, formData: FormData): Observable<ServiceData> {
    return this.http.put<ServiceData>(`${this.baseUrl}/services/${id}`, formData, {
      headers: this.getAuthHeaders()
    });
  }

  deleteService(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/services/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // ================= PROJECT IMAGES =================
  getProjectImages(categoryId?: string, serviceId?: string): Observable<ProjectImageData[]> {
    let params = new HttpParams();
    if (categoryId) params = params.set('categoryId', categoryId);
    if (serviceId) params = params.set('serviceId', serviceId);

    return this.http.get<ProjectImageData[]>(`${this.baseUrl}/project-images`, { params }).pipe(
      catchError(err => {
        console.warn('Could not fetch project images from API:', err);
        return of([]);
      })
    );
  }

  getServiceProjectImages(serviceId: string): Observable<ProjectImageData[]> {
    return this.http.get<ProjectImageData[]>(`${this.baseUrl}/services/${serviceId}/images`).pipe(
      catchError(err => {
        console.warn(`Could not fetch images for service ${serviceId}:`, err);
        return of([]);
      })
    );
  }

  uploadProjectImage(serviceId: string, formData: FormData): Observable<ProjectImageData> {
    return this.http.post<ProjectImageData>(`${this.baseUrl}/services/${serviceId}/images`, formData, {
      headers: this.getAuthHeaders()
    });
  }

  deleteProjectImage(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/services/images/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}

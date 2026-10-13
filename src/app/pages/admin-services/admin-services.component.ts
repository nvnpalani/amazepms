import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicesApiService, CategoryData, ServiceData, ProjectImageData } from '../../services/services-api.service';

@Component({
  selector: 'app-admin-services',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-services.component.html',
  styleUrls: ['./admin-services.component.css']
})
export class AdminServicesComponent implements OnInit {
  categories: CategoryData[] = [];
  allServices: ServiceData[] = [];
  filteredServices: ServiceData[] = [];
  projectImages: ProjectImageData[] = [];
  
  // Filters
  selectedCategoryFilter: string = '';
  selectedServiceFilter: string = '';
  searchQuery: string = '';

  isLoading: boolean = false;
  isUploading: boolean = false;
  showUploadModal: boolean = false;
  showAddServiceModal: boolean = false;

  // Upload Project Image form model
  uploadCategoryId: string = '';
  uploadServiceId: string = '';
  uploadProjectName: string = '';
  uploadDescription: string = '';
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  uploadError: string = '';

  // New Service form model
  newServiceCategoryId: string = '';
  newServiceName: string = '';
  newServiceDesc: string = '';
  newServiceFile: File | null = null;
  newServicePreview: string | null = null;
  newServiceError: string = '';
  isSavingService: boolean = false;

  // Toast feedback
  toastMessage: string = '';
  toastType: 'success' | 'error' = 'success';

  constructor(private api: ServicesApiService) {}

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.isLoading = true;
    this.api.getCategories().subscribe({
      next: (cats) => {
        this.categories = cats || [];
        this.api.getServices().subscribe({
          next: (svcs) => {
            this.allServices = svcs || [];
            this.filteredServices = [...this.allServices];
            this.loadProjectImages();
          },
          error: () => {
            this.isLoading = false;
          }
        });
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  loadProjectImages(): void {
    this.isLoading = true;
    this.api.getProjectImages(this.selectedCategoryFilter, this.selectedServiceFilter).subscribe({
      next: (images) => {
        this.projectImages = images || [];
        this.isLoading = false;
      },
      error: (err) => {
        this.showToast('Failed to load project images', 'error');
        this.isLoading = false;
      }
    });
  }

  onCategoryFilterChange(): void {
    if (this.selectedCategoryFilter) {
      this.filteredServices = this.allServices.filter(s => {
        const catId = typeof s.categoryId === 'object' ? s.categoryId?._id : s.categoryId;
        return catId === this.selectedCategoryFilter;
      });
    } else {
      this.filteredServices = [...this.allServices];
    }
    this.selectedServiceFilter = '';
    this.loadProjectImages();
  }

  onServiceFilterChange(): void {
    this.loadProjectImages();
  }

  get displayedImages(): ProjectImageData[] {
    if (!this.searchQuery.trim()) {
      return this.projectImages;
    }
    const q = this.searchQuery.toLowerCase().trim();
    return this.projectImages.filter(img => 
      (img.projectName && img.projectName.toLowerCase().includes(q)) ||
      (img.description && img.description.toLowerCase().includes(q))
    );
  }

  // ================= UPLOAD PROJECT IMAGE =================
  openUploadModal(): void {
    this.showUploadModal = true;
    this.uploadCategoryId = this.selectedCategoryFilter || (this.categories[0]?._id || '');
    this.onUploadCategoryChange();
    this.uploadProjectName = '';
    this.uploadDescription = '';
    this.selectedFile = null;
    this.imagePreview = null;
    this.uploadError = '';
  }

  closeUploadModal(): void {
    this.showUploadModal = false;
    this.selectedFile = null;
    this.imagePreview = null;
    this.uploadError = '';
  }

  onUploadCategoryChange(): void {
    const svcs = this.allServices.filter(s => {
      const catId = typeof s.categoryId === 'object' ? s.categoryId?._id : s.categoryId;
      return catId === this.uploadCategoryId;
    });
    this.uploadServiceId = svcs[0]?._id || '';
  }

  get servicesForUpload(): ServiceData[] {
    return this.allServices.filter(s => {
      const catId = typeof s.categoryId === 'object' ? s.categoryId?._id : s.categoryId;
      return catId === this.uploadCategoryId;
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files?.[0];
    this.processFile(file);
  }

  onFileDropped(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.processFile(event.dataTransfer.files[0]);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  private processFile(file: File | undefined): void {
    if (!file) return;

    this.uploadError = '';
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowed.includes(file.type)) {
      this.uploadError = 'Please select a valid image (JPG, PNG, or WEBP).';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      this.uploadError = 'Image size must be less than 5MB.';
      return;
    }

    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  removeSelectedFile(): void {
    this.selectedFile = null;
    this.imagePreview = null;
    this.uploadError = '';
  }

  uploadProjectImage(): void {
    if (!this.uploadCategoryId) {
      this.uploadError = 'Please select a Category.';
      return;
    }
    if (!this.uploadServiceId) {
      this.uploadError = 'Please select a Service.';
      return;
    }
    if (!this.selectedFile) {
      this.uploadError = 'Please select a Project Image.';
      return;
    }

    this.isUploading = true;
    this.uploadError = '';

    const formData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('categoryId', this.uploadCategoryId);
    if (this.uploadProjectName.trim()) {
      formData.append('projectName', this.uploadProjectName.trim());
    }
    if (this.uploadDescription.trim()) {
      formData.append('description', this.uploadDescription.trim());
    }

    this.api.uploadProjectImage(this.uploadServiceId, formData).subscribe({
      next: (created) => {
        this.isUploading = false;
        this.showToast('Project image uploaded to Cloudinary successfully!', 'success');
        this.closeUploadModal();
        this.loadProjectImages(); // Automatically refreshes the gallery without browser reload
      },
      error: (err) => {
        this.isUploading = false;
        this.uploadError = err?.error?.error || 'Failed to upload image. Please try again.';
      }
    });
  }

  deleteProjectImage(img: ProjectImageData): void {
    const confirmDelete = confirm(`Are you sure you want to delete this project image${img.projectName ? ' (' + img.projectName + ')' : ''}?`);
    if (!confirmDelete) return;

    this.api.deleteProjectImage(img._id).subscribe({
      next: () => {
        this.showToast('Image deleted from Cloudinary & database.', 'success');
        this.loadProjectImages();
      },
      error: (err) => {
        this.showToast(err?.error?.error || 'Failed to delete image', 'error');
      }
    });
  }

  // ================= ADD NEW SERVICE MODAL =================
  openAddServiceModal(): void {
    this.showAddServiceModal = true;
    this.newServiceCategoryId = this.selectedCategoryFilter || (this.categories[0]?._id || '');
    this.newServiceName = '';
    this.newServiceDesc = '';
    this.newServiceFile = null;
    this.newServicePreview = null;
    this.newServiceError = '';
  }

  closeAddServiceModal(): void {
    this.showAddServiceModal = false;
    this.newServiceFile = null;
    this.newServicePreview = null;
    this.newServiceError = '';
  }

  onNewServiceFile(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      this.newServiceFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.newServicePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  saveNewService(): void {
    if (!this.newServiceCategoryId) {
      this.newServiceError = 'Please select a category.';
      return;
    }
    if (!this.newServiceName.trim()) {
      this.newServiceError = 'Service name is required.';
      return;
    }

    this.isSavingService = true;
    this.newServiceError = '';

    const formData = new FormData();
    formData.append('categoryId', this.newServiceCategoryId);
    formData.append('name', this.newServiceName.trim());
    if (this.newServiceDesc.trim()) {
      formData.append('description', this.newServiceDesc.trim());
    }
    if (this.newServiceFile) {
      formData.append('image', this.newServiceFile);
    }

    this.api.createService(formData).subscribe({
      next: (created) => {
        this.isSavingService = false;
        this.showToast(`Service "${created.name}" created successfully!`, 'success');
        this.closeAddServiceModal();
        this.loadInitialData();
      },
      error: (err) => {
        this.isSavingService = false;
        this.newServiceError = err?.error?.error || 'Failed to create service.';
      }
    });
  }

  getServiceName(serviceId: any): string {
    if (!serviceId) return '';
    if (typeof serviceId === 'object' && serviceId.name) return serviceId.name;
    const found = this.allServices.find(s => s._id === serviceId);
    return found ? found.name : '';
  }

  getCategoryName(categoryId: any): string {
    if (!categoryId) return '';
    if (typeof categoryId === 'object' && categoryId.name) return categoryId.name;
    const found = this.categories.find(c => c._id === categoryId);
    return found ? found.name : '';
  }

  showToast(message: string, type: 'success' | 'error'): void {
    this.toastMessage = message;
    this.toastType = type;
    setTimeout(() => {
      this.toastMessage = '';
    }, 4000);
  }
}

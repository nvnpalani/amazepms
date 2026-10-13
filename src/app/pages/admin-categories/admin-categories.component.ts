import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicesApiService, CategoryData, ServiceData, ProjectImageData } from '../../services/services-api.service';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {
  categories: CategoryData[] = [];
  services: ServiceData[] = [];
  projectImages: ProjectImageData[] = [];

  activeCategoryIndex: number = 0;
  filterCategoryIndex: number = -1; // -1 means All Categories (exact services page view)
  selectedServiceId: string = '';
  viewMode: 'list' | 'detail' = 'list'; // 'list' = exact services page view, 'detail' = dedicated individual card page (NO POPUP)
  isLoading: boolean = false;
  isProcessing: boolean = false;

  // Modals state
  showCardMediaModal: boolean = false;
  showFrontImageModal: boolean = false;
  showInsideImageModal: boolean = false;
  showEditServiceModal: boolean = false;
  showAddServiceModal: boolean = false;
  lightboxImageUrl: string | null = null;

  // Center Confirmation Dialog state (blurs background while keeping it visible)
  showConfirmModal: boolean = false;
  confirmTitle: string = '';
  confirmMessage: string = '';
  confirmActionType: 'delete_inside_image' | 'delete_front_image' | 'delete_card' | null = null;
  pendingDeleteInsideImage: ProjectImageData | null = null;
  pendingDeleteService: ServiceData | null = null;
  pendingDeleteItemName: string = '';
  pendingDeletePreviewUrl: string = '';
  isConfirmDeleting: boolean = false;

  // File upload state
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  uploadError: string = '';
  projectNameInput: string = '';
  projectDescInput: string = '';

  // Service form state
  serviceNameInput: string = '';
  serviceDescInput: string = '';

  // Toast message
  toastMessage: string = '';
  toastType: 'success' | 'error' = 'success';

  constructor(
    private api: ServicesApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData(): void {
    this.isLoading = true;
    this.api.getCategories().subscribe({
      next: (cats) => {
        this.categories = cats || [];
        this.api.getServices().subscribe({
          next: (svcs) => {
            this.services = svcs || [];
            this.api.getProjectImages().subscribe({
              next: (imgs) => {
                this.projectImages = imgs || [];
                this.isLoading = false;
                this.checkUrlForCard();
              },
              error: () => {
                this.isLoading = false;
                this.checkUrlForCard();
              }
            });
          },
          error: () => this.isLoading = false
        });
      },
      error: () => {
        this.showToast('Failed to load categories', 'error');
        this.isLoading = false;
      }
    });
  }

  checkUrlForCard(): void {
    this.route.queryParams.subscribe(params => {
      const cardId = params['cardId'];
      if (cardId && this.services.length > 0) {
        const found = this.services.find(s => s._id === cardId);
        if (found) {
          this.selectedServiceId = found._id;
          const cat = this.categories.find(c => {
            const catId = typeof found.categoryId === 'object' ? found.categoryId?._id : found.categoryId;
            const catSlug = typeof found.categoryId === 'object' ? found.categoryId?.slug : found.categorySlug;
            return catId === c._id || catSlug === c.slug;
          });
          if (cat) {
            this.activeCategoryIndex = this.categories.indexOf(cat);
          }
          this.viewMode = 'detail';
          return;
        }
      }
      this.viewMode = 'list';
      this.autoSelectFirstCard();
    });
  }

  get activeCategory(): CategoryData | null {
    if (!this.categories || this.categories.length === 0) return null;
    return this.categories[this.activeCategoryIndex] || this.categories[0];
  }

  getDisplayedCategories(): CategoryData[] {
    if (this.filterCategoryIndex === -1) {
      return this.categories;
    }
    const cat = this.categories[this.filterCategoryIndex];
    return cat ? [cat] : this.categories;
  }

  setFilterCategory(index: number): void {
    this.filterCategoryIndex = index;
    if (index >= 0) {
      this.activeCategoryIndex = index;
    }
  }

  getCategoryIndex(category: CategoryData): number {
    return this.categories.findIndex(c => c._id === category._id);
  }

  selectCategoryTab(index: number): void {
    this.activeCategoryIndex = index;
    this.autoSelectFirstCard();
  }

  openCardDetailPage(svc: ServiceData, cat?: CategoryData, event?: Event): void {
    if (event) event.stopPropagation();
    this.selectedServiceId = svc._id;
    if (cat) {
      const idx = this.getCategoryIndex(cat);
      if (idx >= 0) this.activeCategoryIndex = idx;
    }
    this.viewMode = 'detail';
    this.showCardMediaModal = false; // ensure modal is not active
    this.router.navigate([], { queryParams: { cardId: svc._id } });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goBackToList(): void {
    this.viewMode = 'list';
    this.showCardMediaModal = false;
    this.router.navigate([], { queryParams: {} });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openCardMediaModal(svc: ServiceData, cat?: CategoryData, event?: Event): void {
    this.openCardDetailPage(svc, cat, event);
  }

  closeCardMediaModal(): void {
    this.goBackToList();
  }

  openChangeFrontImageForService(svc: ServiceData, cat?: CategoryData, event?: Event): void {
    if (event) event.stopPropagation();
    this.selectedServiceId = svc._id;
    if (cat) {
      const idx = this.getCategoryIndex(cat);
      if (idx >= 0) this.activeCategoryIndex = idx;
    }
    this.openChangeFrontImageModal();
  }

  openEditServiceForService(svc: ServiceData, cat?: CategoryData, event?: Event): void {
    if (event) event.stopPropagation();
    this.selectedServiceId = svc._id;
    if (cat) {
      const idx = this.getCategoryIndex(cat);
      if (idx >= 0) this.activeCategoryIndex = idx;
    }
    this.openEditServiceModal();
  }

  deleteCardService(svc: ServiceData, event?: Event): void {
    if (event) event.stopPropagation();
    this.selectedServiceId = svc._id;
    this.openConfirmModal(
      'delete_card',
      'Delete Service Card?',
      `Are you sure you want to delete the card "${svc.name}" and all its inside gallery photos?`,
      { service: svc, previewUrl: svc.image, itemName: svc.name }
    );
  }

  openAddServiceForCategory(cat: CategoryData, event?: Event): void {
    if (event) event.stopPropagation();
    const idx = this.getCategoryIndex(cat);
    if (idx >= 0) this.activeCategoryIndex = idx;
    this.openAddServiceModal();
  }

  getServicesForCategory(category: CategoryData): ServiceData[] {
    if (!category) return [];
    return this.services.filter(s => {
      const catId = typeof s.categoryId === 'object' ? s.categoryId?._id : s.categoryId;
      const catSlug = typeof s.categoryId === 'object' ? s.categoryId?.slug : s.categorySlug;
      return catId === category._id || catSlug === category.slug;
    });
  }

  getServicesForActiveCategory(): ServiceData[] {
    const currentCat = this.activeCategory;
    if (!currentCat) return [];
    return this.getServicesForCategory(currentCat);
  }

  autoSelectFirstCard(): void {
    const list = this.getServicesForActiveCategory();
    if (list && list.length > 0) {
      const exists = list.some(s => s._id === this.selectedServiceId);
      if (!exists) {
        this.selectedServiceId = list[0]._id;
      }
    } else {
      this.selectedServiceId = '';
    }
  }

  selectCard(service: ServiceData): void {
    this.selectedServiceId = service._id;
  }

  get selectedService(): ServiceData | null {
    if (!this.selectedServiceId) {
      const list = this.getServicesForActiveCategory();
      return list[0] || null;
    }
    return this.services.find(s => s._id === this.selectedServiceId) || null;
  }

  get selectedCardInsideImages(): ProjectImageData[] {
    const svc = this.selectedService;
    if (!svc) return [];
    return this.getInsideImagesForService(svc);
  }

  getInsideImagesForService(service: ServiceData | string): ProjectImageData[] {
    if (!service) return [];
    const svcId = typeof service === 'string' ? service : service._id;
    const svcSlug = typeof service === 'string' ? '' : service.slug;

    return this.projectImages.filter(img => {
      const sId = typeof img.serviceId === 'object' ? img.serviceId?._id : img.serviceId;
      const sSlug = typeof img.serviceId === 'object' ? img.serviceId?.slug : '';
      return sId === svcId || (svcSlug && sSlug === svcSlug);
    });
  }

  // ================= FRONT IMAGE MANAGEMENT =================
  openChangeFrontImageModal(): void {
    if (!this.selectedService) return;
    this.selectedFile = null;
    this.imagePreview = null;
    this.uploadError = '';
    this.showFrontImageModal = true;
  }

  closeFrontImageModal(): void {
    this.showFrontImageModal = false;
    this.selectedFile = null;
    this.imagePreview = null;
    this.uploadError = '';
  }

  saveFrontImage(): void {
    const svc = this.selectedService;
    if (!svc) return;
    if (!this.selectedFile) {
      this.uploadError = 'Please choose or drop an image.';
      return;
    }

    this.isProcessing = true;
    this.uploadError = '';

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    this.api.updateService(svc._id, formData).subscribe({
      next: (updated) => {
        svc.image = updated.image;
        this.isProcessing = false;
        this.showToast('Front image updated successfully!', 'success');
        this.closeFrontImageModal();
      },
      error: (err) => {
        this.isProcessing = false;
        this.uploadError = err?.error?.error || 'Failed to update front image.';
      }
    });
  }

  // ================= CUSTOM CENTER CONFIRMATION MODAL =================
  openConfirmModal(
    type: 'delete_inside_image' | 'delete_front_image' | 'delete_card',
    title: string,
    message: string,
    extra?: { insideImg?: ProjectImageData; service?: ServiceData; previewUrl?: string; itemName?: string }
  ): void {
    this.confirmActionType = type;
    this.confirmTitle = title;
    this.confirmMessage = message;
    this.pendingDeleteInsideImage = extra?.insideImg || null;
    this.pendingDeleteService = extra?.service || null;
    this.pendingDeleteItemName = extra?.itemName || '';
    this.pendingDeletePreviewUrl = extra?.previewUrl || '';
    this.isConfirmDeleting = false;
    this.showConfirmModal = true;
  }

  closeConfirmModal(): void {
    if (this.isConfirmDeleting) return;
    this.showConfirmModal = false;
    this.confirmActionType = null;
    this.pendingDeleteInsideImage = null;
    this.pendingDeleteService = null;
    this.pendingDeleteItemName = '';
    this.pendingDeletePreviewUrl = '';
  }

  onConfirmDelete(): void {
    if (this.isConfirmDeleting) return;

    if (this.confirmActionType === 'delete_inside_image') {
      this.executeDeleteInsideImage();
    } else if (this.confirmActionType === 'delete_front_image') {
      this.executeDeleteFrontImage();
    } else if (this.confirmActionType === 'delete_card') {
      this.executeDeleteSelectedCard();
    }
  }

  deleteFrontImage(event?: Event): void {
    if (event) event.stopPropagation();
    const svc = this.selectedService;
    if (!svc) return;

    this.openConfirmModal(
      'delete_front_image',
      'Remove Front Cover Image?',
      `Are you sure you want to remove the front cover image of "${svc.name}"?`,
      { service: svc, previewUrl: svc.image, itemName: svc.name }
    );
  }

  private executeDeleteFrontImage(): void {
    const svc = this.pendingDeleteService || this.selectedService;
    if (!svc) {
      this.closeConfirmModal();
      return;
    }

    this.isConfirmDeleting = true;
    const formData = new FormData();
    formData.append('removeImage', 'true');

    this.api.updateService(svc._id, formData).subscribe({
      next: () => {
        svc.image = '';
        this.isConfirmDeleting = false;
        this.closeConfirmModal();
        this.showToast('Front image removed successfully.', 'success');
      },
      error: (err) => {
        this.isConfirmDeleting = false;
        this.showToast(err?.error?.error || 'Failed to remove front image', 'error');
      }
    });
  }

  // ================= INSIDE PROJECT IMAGES MANAGEMENT =================
  openAddInsideImageModal(): void {
    if (!this.selectedService) return;
    this.selectedFile = null;
    this.imagePreview = null;
    this.projectNameInput = '';
    this.projectDescInput = '';
    this.uploadError = '';
    this.showInsideImageModal = true;
  }

  closeInsideImageModal(): void {
    this.showInsideImageModal = false;
    this.selectedFile = null;
    this.imagePreview = null;
    this.uploadError = '';
  }

  saveInsideImage(): void {
    const svc = this.selectedService;
    if (!svc) return;
    if (!this.selectedFile) {
      this.uploadError = 'Please select an image file to upload.';
      return;
    }

    this.isProcessing = true;
    this.uploadError = '';

    const currentCat = this.activeCategory;
    const formData = new FormData();
    formData.append('image', this.selectedFile);
    if (currentCat) {
      formData.append('categoryId', currentCat._id);
    }
    if (this.projectNameInput.trim()) {
      formData.append('projectName', this.projectNameInput.trim());
    }
    if (this.projectDescInput.trim()) {
      formData.append('description', this.projectDescInput.trim());
    }

    this.api.uploadProjectImage(svc._id, formData).subscribe({
      next: (created) => {
        this.projectImages.unshift(created);
        this.isProcessing = false;
        this.showToast('New inside gallery image added successfully!', 'success');
        this.closeInsideImageModal();
      },
      error: (err) => {
        this.isProcessing = false;
        this.uploadError = err?.error?.error || 'Failed to upload inside image.';
      }
    });
  }

  deleteInsideImage(img: ProjectImageData, event?: Event): void {
    if (event) event.stopPropagation();
    this.openConfirmModal(
      'delete_inside_image',
      'Delete Inside Photo?',
      'Are you sure you want to delete this inside gallery photo? This action cannot be undone.',
      { insideImg: img, previewUrl: img.imageUrl, itemName: img.projectName || 'Inside Gallery Photo' }
    );
  }

  private executeDeleteInsideImage(): void {
    const img = this.pendingDeleteInsideImage;
    if (!img) {
      this.closeConfirmModal();
      return;
    }

    this.isConfirmDeleting = true;
    this.api.deleteProjectImage(img._id).subscribe({
      next: () => {
        this.projectImages = this.projectImages.filter(i => i._id !== img._id);
        this.isConfirmDeleting = false;
        this.closeConfirmModal();
        this.showToast('Inside gallery photo deleted successfully.', 'success');
      },
      error: (err) => {
        this.isConfirmDeleting = false;
        this.showToast(err?.error?.error || 'Failed to delete inside image', 'error');
      }
    });
  }

  // ================= SERVICE CARD EDIT & DELETE =================
  openEditServiceModal(): void {
    const svc = this.selectedService;
    if (!svc) return;
    this.serviceNameInput = svc.name;
    this.serviceDescInput = svc.description || '';
    this.showEditServiceModal = true;
  }

  closeEditServiceModal(): void {
    this.showEditServiceModal = false;
  }

  saveEditService(): void {
    const svc = this.selectedService;
    if (!svc) return;
    if (!this.serviceNameInput.trim()) {
      this.showToast('Service name is required', 'error');
      return;
    }

    this.isProcessing = true;
    const formData = new FormData();
    formData.append('name', this.serviceNameInput.trim());
    formData.append('description', this.serviceDescInput.trim());

    this.api.updateService(svc._id, formData).subscribe({
      next: (updated) => {
        svc.name = updated.name;
        svc.description = updated.description;
        this.isProcessing = false;
        this.showToast('Service card updated successfully!', 'success');
        this.closeEditServiceModal();
      },
      error: (err) => {
        this.isProcessing = false;
        this.showToast(err?.error?.error || 'Failed to update service', 'error');
      }
    });
  }

  deleteSelectedCard(event?: Event): void {
    if (event) event.stopPropagation();
    const svc = this.selectedService;
    if (!svc) return;

    this.openConfirmModal(
      'delete_card',
      'Delete Service Card?',
      `Are you sure you want to delete the card "${svc.name}" and all its inside gallery photos?`,
      { service: svc, previewUrl: svc.image, itemName: svc.name }
    );
  }

  private executeDeleteSelectedCard(): void {
    const svc = this.pendingDeleteService || this.selectedService;
    if (!svc) {
      this.closeConfirmModal();
      return;
    }

    this.isConfirmDeleting = true;
    this.api.deleteService(svc._id).subscribe({
      next: () => {
        this.services = this.services.filter(s => s._id !== svc._id);
        this.projectImages = this.projectImages.filter(i => {
          const sId = typeof i.serviceId === 'object' ? i.serviceId?._id : i.serviceId;
          return sId !== svc._id;
        });
        this.isConfirmDeleting = false;
        this.closeConfirmModal();
        this.showToast(`Card "${svc.name}" deleted successfully.`, 'success');
        if (this.viewMode === 'detail') {
          this.goBackToList();
        } else {
          this.autoSelectFirstCard();
        }
      },
      error: (err) => {
        this.isConfirmDeleting = false;
        this.showToast(err?.error?.error || 'Failed to delete service card', 'error');
      }
    });
  }

  // ================= ADD NEW CARD =================
  openAddServiceModal(): void {
    this.serviceNameInput = '';
    this.serviceDescInput = '';
    this.selectedFile = null;
    this.imagePreview = null;
    this.uploadError = '';
    this.showAddServiceModal = true;
  }

  closeAddServiceModal(): void {
    this.showAddServiceModal = false;
    this.selectedFile = null;
    this.imagePreview = null;
    this.uploadError = '';
  }

  saveNewServiceCard(): void {
    const currentCat = this.activeCategory;
    if (!currentCat) return;

    if (!this.serviceNameInput.trim()) {
      this.uploadError = 'Service name is required.';
      return;
    }

    this.isProcessing = true;
    this.uploadError = '';

    const formData = new FormData();
    formData.append('categoryId', currentCat._id);
    formData.append('name', this.serviceNameInput.trim());
    formData.append('description', this.serviceDescInput.trim());
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.api.createService(formData).subscribe({
      next: (created) => {
        this.services.push(created);
        this.selectedServiceId = created._id;
        this.isProcessing = false;
        this.showToast(`Card "${created.name}" created successfully!`, 'success');
        this.closeAddServiceModal();
      },
      error: (err) => {
        this.isProcessing = false;
        this.uploadError = err?.error?.error || 'Failed to create service.';
      }
    });
  }

  // ================= LIGHTBOX PREVIEW =================
  openLightbox(url: string): void {
    this.lightboxImageUrl = url;
  }

  closeLightbox(): void {
    this.lightboxImageUrl = null;
  }

  // ================= FILE HANDLERS =================
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

  showToast(message: string, type: 'success' | 'error'): void {
    this.toastMessage = message;
    this.toastType = type;
    setTimeout(() => {
      this.toastMessage = '';
    }, 4000);
  }
}

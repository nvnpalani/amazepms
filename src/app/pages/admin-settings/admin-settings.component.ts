import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="settings-page">
      <div class="page-header">
        <h1 class="page-title">Admin Settings &amp; Configuration</h1>
        <p class="page-subtitle">System status, storage configuration, and environment details.</p>
      </div>

      <div class="cards-grid">
        <div class="card">
          <div class="card-icon teal">
            <i class="fa-solid fa-cloud"></i>
          </div>
          <div class="card-content">
            <h3>Cloudinary Image Storage</h3>
            <p class="status-badge active"><i class="fa-solid fa-circle-check"></i> Enabled &amp; Integrated</p>
            <p class="card-desc">Uploaded category &amp; client project images are processed without saving on local Render disk.</p>
            <div class="config-note">
              <code>Folder: amazon-signs/categories &amp; amazon-signs/services</code>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-icon blue">
            <i class="fa-solid fa-database"></i>
          </div>
          <div class="card-content">
            <h3>MongoDB Database</h3>
            <p class="status-badge active"><i class="fa-solid fa-circle-check"></i> Connected</p>
            <p class="card-desc">Categories, Services, and Project Image metadata are stored in MongoDB with full relational integrity.</p>
          </div>
        </div>

        <div class="card">
          <div class="card-icon amber">
            <i class="fa-solid fa-shield-halved"></i>
          </div>
          <div class="card-content">
            <h3>Admin Security &amp; JWT</h3>
            <p class="status-badge active"><i class="fa-solid fa-lock"></i> Protected</p>
            <p class="card-desc">All create, update, delete, and image upload endpoints are protected by token authentication.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .settings-page { padding: 8px 0; }
    .page-header { margin-bottom: 28px; }
    .page-title { font-size: 26px; font-weight: 800; color: #111827; margin: 0 0 6px 0; }
    .page-subtitle { color: #6b7280; font-size: 14px; margin: 0; }
    .cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; }
    .card { background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; display: flex; gap: 20px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.04); }
    .card-icon { width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
    .card-icon.teal { background: #f0fdfa; color: #0d9488; }
    .card-icon.blue { background: #eff6ff; color: #2563eb; }
    .card-icon.amber { background: #fffbeb; color: #d97706; }
    .card-content h3 { font-size: 17px; font-weight: 700; color: #111827; margin: 0 0 8px 0; }
    .status-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: 9999px; margin-bottom: 10px; }
    .status-badge.active { background: #ecfdf5; color: #059669; }
    .card-desc { font-size: 13px; color: #6b7280; line-height: 1.5; margin: 0 0 12px 0; }
    .config-note code { font-size: 11px; background: #f1f5f9; padding: 4px 8px; border-radius: 6px; color: #334155; }
  `]
})
export class AdminSettingsComponent {}

import { Component } from '@angular/core';

/**
 * Settings Component
 * Application settings and configuration feature
 */
@Component({
  selector: 'app-settings',
  standalone: true,
  template: `
    <div class="settings-container">
      <h1>Settings</h1>
      <p>Configure your application preferences and account settings.</p>

      <div class="settings-layout">
        <aside class="settings-sidebar">
          <nav class="settings-nav">
            <a href="#" class="nav-item active">Account</a>
            <a href="#" class="nav-item">Preferences</a>
            <a href="#" class="nav-item">Notifications</a>
            <a href="#" class="nav-item">Integrations</a>
            <a href="#" class="nav-item">API Keys</a>
            <a href="#" class="nav-item">Billing</a>
          </nav>
        </aside>

        <main class="settings-content">
          <section class="settings-section">
            <h2>Account Settings</h2>
            <div class="settings-group">
              <label>Email Address</label>
              <input type="email" value="user@example.com" />
            </div>
            <div class="settings-group">
              <label>Full Name</label>
              <input type="text" value="John Doe" />
            </div>
            <div class="settings-group">
              <label>Organization</label>
              <input type="text" value="AI Automation Lab" />
            </div>
            <button class="btn btn-primary">Save Changes</button>
          </section>

          <section class="settings-section">
            <h2>Security</h2>
            <div class="settings-group">
              <label>Password</label>
              <button class="btn btn-secondary">Change Password</button>
            </div>
            <div class="settings-group">
              <label>Two-Factor Authentication</label>
              <button class="btn btn-secondary">Enable 2FA</button>
            </div>
          </section>
        </main>
      </div>
    </div>
  `,
  styles: [
    `
      .settings-container {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
      }

      h1 {
        margin-bottom: 1rem;
        font-size: 2rem;
      }

      h2 {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
        border-bottom: 2px solid #f0f0f0;
        padding-bottom: 1rem;
      }

      p {
        color: #666;
        margin-bottom: 2rem;
      }

      .settings-layout {
        display: grid;
        grid-template-columns: 200px 1fr;
        gap: 2rem;
      }

      .settings-sidebar {
        background: #f9f9f9;
        border-radius: 8px;
        padding: 1rem;
        height: fit-content;
      }

      .settings-nav {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .nav-item {
        padding: 0.75rem 1rem;
        border-radius: 4px;
        text-decoration: none;
        color: #333;
        transition: background-color 0.2s ease;
        display: block;
      }

      .nav-item:hover,
      .nav-item.active {
        background-color: #e8f4f1;
        color: #0f766e;
        font-weight: 600;
      }

      .settings-content {
        background: white;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 2rem;
      }

      .settings-section {
        margin-bottom: 2rem;
      }

      .settings-section:last-child {
        margin-bottom: 0;
      }

      .settings-group {
        margin-bottom: 1.5rem;
      }

      .settings-group label {
        display: block;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }

      .settings-group input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
      }

      .btn {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 600;
        transition: background-color 0.2s ease;
      }

      .btn-primary {
        background-color: #0f766e;
        color: white;
      }

      .btn-primary:hover {
        background-color: #115e59;
      }

      .btn-secondary {
        background-color: #e8e8e8;
        color: #333;
      }

      .btn-secondary:hover {
        background-color: #d0d0d0;
      }

      @media (max-width: 768px) {
        .settings-layout {
          grid-template-columns: 1fr;
        }

        .settings-sidebar {
          display: flex;
        }

        .settings-nav {
          flex-direction: row;
          flex-wrap: wrap;
        }

        .nav-item {
          flex: 1;
          min-width: 150px;
        }
      }
    `,
  ],
})
export class SettingsComponent {}

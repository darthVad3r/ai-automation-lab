import { Component } from '@angular/core';

/**
 * Workflows Component
 * Workflows management feature page
 */
@Component({
  selector: 'app-workflows',
  standalone: true,
  template: `
    <div class="workflows-container">
      <h1>Workflows</h1>
      <p>Manage and monitor your automation workflows.</p>

      <div class="workflows-toolbar">
        <button class="btn btn-primary">Create Workflow</button>
        <input type="text" placeholder="Search workflows..." class="search-input" />
      </div>

      <section class="workflows-table">
        <table>
          <thead>
            <tr>
              <th>Workflow Name</th>
              <th>Status</th>
              <th>Created</th>
              <th>Last Run</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Email Campaign</td>
              <td><span class="badge badge-active">Active</span></td>
              <td>2 days ago</td>
              <td>1 hour ago</td>
              <td><button>Edit</button></td>
            </tr>
            <tr>
              <td>Report Generation</td>
              <td><span class="badge badge-active">Active</span></td>
              <td>1 week ago</td>
              <td>Yesterday</td>
              <td><button>Edit</button></td>
            </tr>
            <tr>
              <td>Data Sync</td>
              <td><span class="badge badge-inactive">Inactive</span></td>
              <td>2 weeks ago</td>
              <td>Never</td>
              <td><button>Edit</button></td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
  styles: [
    `
      .workflows-container {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
      }

      h1 {
        margin-bottom: 1rem;
        font-size: 2rem;
      }

      p {
        color: #666;
        margin-bottom: 2rem;
      }

      .workflows-toolbar {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
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

      .search-input {
        flex: 1;
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
      }

      .workflows-table {
        overflow-x: auto;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        border: 1px solid #ddd;
        border-radius: 4px;
        overflow: hidden;
      }

      thead {
        background: #f5f5f5;
        border-bottom: 2px solid #ddd;
      }

      th {
        padding: 1rem;
        text-align: left;
        font-weight: 600;
      }

      td {
        padding: 1rem;
        border-bottom: 1px solid #eee;
      }

      .badge {
        padding: 0.25rem 0.75rem;
        border-radius: 999px;
        font-size: 0.85rem;
        font-weight: 600;
      }

      .badge-active {
        background: #d4edda;
        color: #155724;
      }

      .badge-inactive {
        background: #f8d7da;
        color: #721c24;
      }

      button {
        padding: 0.5rem 1rem;
        background: #0f766e;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9rem;
      }

      button:hover {
        background: #115e59;
      }
    `,
  ],
})
export class WorkflowsComponent {}

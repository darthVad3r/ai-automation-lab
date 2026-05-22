import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface QuickAction {
  readonly label: string;
  readonly hint: string;
  readonly route: string;
}

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="quick-actions surface-card" aria-labelledby="quick-actions-title">
      <header class="quick-actions__header">
        <h2 id="quick-actions-title">Quick Actions</h2>
        <p>Jump to common destinations while data wiring is in progress.</p>
      </header>

      <div class="quick-actions__grid">
        @for (action of actions; track action.label) {
          <a class="quick-actions__button" [routerLink]="action.route">
            <span>{{ action.label }}</span>
            <small>{{ action.hint }}</small>
          </a>
        }
      </div>
    </section>
  `,
  styles: [
    `
      .quick-actions {
        display: grid;
        gap: var(--lab-space-6);
        align-content: start;
      }

      .quick-actions__header {
        display: grid;
        gap: var(--lab-space-2);
      }

      .quick-actions__header h2 {
        font-size: var(--lab-text-2xl);
      }

      .quick-actions__grid {
        display: grid;
        gap: var(--lab-space-3);
      }

      .quick-actions__button {
        display: grid;
        gap: var(--lab-space-1);
        border: 1px solid var(--lab-line);
        border-radius: var(--lab-radius-md);
        padding: var(--lab-space-4);
        background: var(--lab-surface-muted);
        color: var(--lab-ink);
        text-decoration: none;
        transition:
          border-color 0.2s ease,
          transform 0.2s ease,
          box-shadow 0.2s ease;
      }

      .quick-actions__button span {
        font-weight: 700;
      }

      .quick-actions__button small {
        color: var(--lab-ink-soft);
        font-size: var(--lab-text-sm);
      }

      .quick-actions__button:hover {
        border-color: var(--lab-color-primary);
        box-shadow: var(--lab-shadow-1);
        transform: translateY(-1px);
      }
    `,
  ],
})
export class QuickActionsComponent {
  readonly actions: readonly QuickAction[] = [
    {
      label: 'Create Workflow',
      hint: 'Go to workflow orchestration',
      route: '/workflows',
    },
    {
      label: 'Open Assistant',
      hint: 'Enter your account workspace',
      route: '/login',
    },
    {
      label: 'View Logs',
      hint: 'Review latest activity feed',
      route: '/dashboard',
    },
    {
      label: 'Book Strategy Call',
      hint: 'Coordinate implementation support',
      route: '/book',
    },
    {
      label: 'Open Settings',
      hint: 'Adjust environment preferences',
      route: '/settings',
    },
  ];
}

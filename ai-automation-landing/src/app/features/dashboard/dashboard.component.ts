import { ChangeDetectionStrategy, Component } from '@angular/core';

import { KpiCardComponent } from './kpi-card.component';
import { ProgressSectionComponent } from './progress-section.component';
import { QuickActionsComponent } from './quick-actions.component';

type KpiTone = 'primary' | 'success' | 'info' | 'neutral';

interface KpiItem {
  readonly label: string;
  readonly value: string;
  readonly delta: string;
  readonly tone: KpiTone;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [KpiCardComponent, ProgressSectionComponent, QuickActionsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dashboard">
      <header class="dashboard__header surface-card">
        <p class="dashboard__eyebrow">Operations Command Center</p>
        <h1>Dashboard</h1>
        <p>
          Placeholder surface for automation metrics, rollout progress, and quick routing shortcuts.
        </p>
      </header>

      <section class="dashboard__kpis" aria-label="Key performance indicators">
        @for (kpi of kpis; track kpi.label) {
          <app-kpi-card
            [label]="kpi.label"
            [value]="kpi.value"
            [delta]="kpi.delta"
            [tone]="kpi.tone"
          />
        }
      </section>

      <section class="dashboard__main-grid" aria-label="Dashboard progress and shortcuts">
        <app-progress-section class="dashboard__panel" />
        <app-quick-actions class="dashboard__panel" />
      </section>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .dashboard {
        width: min(1120px, 100%);
        margin-inline: auto;
        padding: var(--lab-space-8) var(--lab-space-4) var(--lab-space-10);
        display: grid;
        gap: var(--lab-space-6);
        overflow-x: clip;
      }

      .dashboard__header {
        display: grid;
        gap: var(--lab-space-3);
        min-width: 0;
      }

      .dashboard__header h1 {
        font-size: var(--lab-text-3xl);
      }

      .dashboard__header p {
        max-width: 66ch;
      }

      .dashboard__eyebrow {
        margin: 0;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--lab-color-primary-strong);
        font-weight: 700;
        font-size: var(--lab-text-xs);
      }

      .dashboard__kpis {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: var(--lab-space-4);
      }

      .dashboard__main-grid {
        display: grid;
        grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
        gap: var(--lab-space-4);
      }

      .dashboard__panel {
        min-width: 0;
      }

      @media (max-width: 1000px) {
        .dashboard__kpis {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .dashboard__main-grid {
          grid-template-columns: minmax(0, 1fr);
        }
      }

      @media (max-width: 640px) {
        .dashboard {
          padding-inline: var(--lab-space-3);
          padding-top: var(--lab-space-6);
        }

        .dashboard__kpis {
          grid-template-columns: minmax(0, 1fr);
        }
      }
    `,
  ],
})
export class DashboardComponent {
  readonly kpis: readonly KpiItem[] = [
    {
      label: 'Workflows Run',
      value: '284',
      delta: '+12.4% from last week',
      tone: 'primary',
    },
    {
      label: 'Active Automations',
      value: '19',
      delta: '+3 launched this sprint',
      tone: 'success',
    },
    {
      label: 'Success Rate',
      value: '98.1%',
      delta: '+0.7% stability lift',
      tone: 'info',
    },
    {
      label: 'Queued Tasks',
      value: '42',
      delta: 'Next dispatch in 5 min',
      tone: 'neutral',
    },
  ];
}

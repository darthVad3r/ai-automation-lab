import { ChangeDetectionStrategy, Component } from '@angular/core';

interface ProgressItem {
  readonly stage: string;
  readonly owner: string;
  readonly completion: number;
}

@Component({
  selector: 'app-progress-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="progress surface-card" aria-labelledby="progress-title">
      <header class="progress__header">
        <h2 id="progress-title">Progress Tracking</h2>
        <p>Placeholder rollout milestones for in-flight automation initiatives.</p>
      </header>

      <ul class="progress__list" aria-label="Automation initiative progress">
        @for (item of items; track item.stage) {
          <li class="progress__item">
            <div class="progress__line">
              <p class="progress__stage">{{ item.stage }}</p>
              <p class="progress__percent">{{ item.completion }}%</p>
            </div>
            <p class="progress__owner">Owner: {{ item.owner }}</p>
            <div
              class="progress__bar"
              role="progressbar"
              [attr.aria-valuemin]="0"
              [attr.aria-valuemax]="100"
              [attr.aria-valuenow]="item.completion"
              [attr.aria-label]="item.stage + ' completion'"
            >
              <span [style.width.%]="item.completion"></span>
            </div>
          </li>
        }
      </ul>
    </section>
  `,
  styles: [
    `
      .progress {
        display: grid;
        gap: var(--lab-space-6);
      }

      .progress__header {
        display: grid;
        gap: var(--lab-space-2);
      }

      .progress__header h2 {
        font-size: var(--lab-text-2xl);
      }

      .progress__list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: var(--lab-space-4);
      }

      .progress__item {
        padding: var(--lab-space-4);
        border: 1px solid var(--lab-line);
        border-radius: var(--lab-radius-md);
        background: var(--lab-surface-muted);
        min-width: 0;
      }

      .progress__line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--lab-space-3);
      }

      .progress__stage,
      .progress__percent {
        margin: 0;
        color: var(--lab-ink);
        font-weight: 600;
      }

      .progress__owner {
        margin: var(--lab-space-1) 0 var(--lab-space-3);
        font-size: var(--lab-text-sm);
      }

      .progress__bar {
        height: var(--lab-space-2);
        border-radius: var(--lab-radius-pill);
        background: color-mix(in srgb, var(--lab-line) 70%, transparent);
        overflow: hidden;
      }

      .progress__bar span {
        display: block;
        height: 100%;
        background: linear-gradient(90deg, var(--lab-color-primary), var(--lab-color-accent-cyan));
        border-radius: inherit;
      }
    `,
  ],
})
export class ProgressSectionComponent {
  readonly items: readonly ProgressItem[] = [
    {
      stage: 'Email Triage Agent',
      owner: 'Ops Team Alpha',
      completion: 72,
    },
    {
      stage: 'CRM Sync Automation',
      owner: 'RevOps Squad',
      completion: 54,
    },
    {
      stage: 'Onboarding Workflow Pack',
      owner: 'Implementation Team',
      completion: 39,
    },
    {
      stage: 'Weekly Intelligence Digest',
      owner: 'Knowledge Ops',
      completion: 86,
    },
  ];
}

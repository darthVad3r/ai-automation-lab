import { ChangeDetectionStrategy, Component, input } from '@angular/core';

type KpiTone = 'primary' | 'success' | 'info' | 'neutral';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article
      class="kpi surface-card"
      [class.kpi--primary]="tone() === 'primary'"
      [class.kpi--success]="tone() === 'success'"
      [class.kpi--info]="tone() === 'info'"
    >
      <p class="kpi__label">{{ label() }}</p>
      <p class="kpi__value">{{ value() }}</p>
      <p class="kpi__delta">{{ delta() }}</p>
    </article>
  `,
  styles: [
    `
      .kpi {
        display: grid;
        gap: var(--lab-space-2);
        min-width: 0;
        border-radius: var(--lab-radius-lg);
      }

      .kpi__label {
        margin: 0;
        font-size: var(--lab-text-sm);
        color: var(--lab-ink-soft);
        font-weight: 600;
      }

      .kpi__value {
        margin: 0;
        font-size: clamp(var(--lab-text-xl), 4vw, var(--lab-text-3xl));
        color: var(--lab-ink);
        font-family: var(--lab-font-display);
        line-height: 1;
      }

      .kpi__delta {
        margin: 0;
        font-size: var(--lab-text-sm);
        color: var(--lab-ink-soft);
      }

      .kpi--primary {
        border-color: color-mix(in srgb, var(--lab-color-primary) 35%, var(--lab-line));
      }

      .kpi--success {
        border-color: color-mix(in srgb, var(--lab-success) 45%, var(--lab-line));
      }

      .kpi--info {
        border-color: color-mix(in srgb, var(--lab-info) 45%, var(--lab-line));
      }
    `,
  ],
})
export class KpiCardComponent {
  readonly label = input.required<string>();

  readonly value = input.required<string>();

  readonly delta = input.required<string>();

  readonly tone = input<KpiTone>('neutral');
}

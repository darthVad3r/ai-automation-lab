import { ChangeDetectionStrategy, Component, input } from '@angular/core';

let cardInstanceCount = 0;

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  readonly title = input<string>('');

  readonly subtitle = input<string>('');

  readonly surface = input<'default' | 'muted'>('default');

  readonly titleId = `ui-card-title-${++cardInstanceCount}`;
}

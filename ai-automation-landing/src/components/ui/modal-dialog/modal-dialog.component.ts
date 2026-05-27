import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
  effect,
  inject,
  input,
  output,
} from '@angular/core';

import { ModalDialogIdService } from './modal-dialog-id.service';
import { ModalDialogRegistryService } from './modal-dialog-registry.service';

export type DialogCloseReason = 'close-button' | 'backdrop' | 'escape';

@Component({
  selector: 'app-modal-dialog',
  standalone: true,
  templateUrl: './modal-dialog.component.html',
  styleUrl: './modal-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDialogComponent implements OnDestroy {
  private readonly idService = inject(ModalDialogIdService);

  private readonly registry = inject(ModalDialogRegistryService);

  @ViewChild('dialogPanel')
  private readonly dialogPanel?: ElementRef<HTMLElement>;

  readonly open = input<boolean>(false);

  readonly title = input.required<string>();

  readonly description = input<string>('');

  readonly closeOnBackdrop = input<boolean>(true);

  readonly dialogInstanceId = this.idService.createId('ui-dialog');

  readonly titleId = `${this.dialogInstanceId}-title`;

  readonly descriptionId = `${this.dialogInstanceId}-description`;

  readonly closed = output<DialogCloseReason>();

  private lastFocusedElement: HTMLElement | null = null;

  private previousOpen = false;

  constructor() {
    effect(() => {
      const isOpen = this.open();

      if (isOpen && !this.previousOpen) {
        this.registerOpenDialog();
        this.capturePreviouslyFocusedElement();

        if (typeof document !== 'undefined') {
          queueMicrotask(() => {
            const panel = this.dialogPanel?.nativeElement;

            if (!this.open() || !panel?.isConnected) {
              return;
            }

            this.focusFirstElement();
          });
        }
      } else if (!isOpen && this.previousOpen) {
        this.unregisterOpenDialog();
        this.restoreFocus();
      }

      this.previousOpen = isOpen;
    });
  }

  ngOnDestroy(): void {
    if (this.open()) {
      this.restoreFocus();
    }

    this.unregisterOpenDialog();
  }

  closeFromButton(): void {
    this.closed.emit('close-button');
  }

  closeFromBackdrop(): void {
    if (!this.closeOnBackdrop()) {
      return;
    }

    this.closed.emit('backdrop');
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: Event): void {
    if (!this.open() || !this.isTopMostDialog() || !(event instanceof KeyboardEvent)) {
      return;
    }

    event.preventDefault();
    this.closed.emit('escape');
  }

  @HostListener('document:keydown.tab', ['$event'])
  onTab(event: Event): void {
    if (!this.open() || !this.isTopMostDialog() || !(event instanceof KeyboardEvent)) {
      return;
    }

    const panel = this.dialogPanel?.nativeElement;

    if (!panel) {
      return;
    }

    const focusables = this.getFocusableElements(panel);

    if (!focusables.length) {
      panel.focus();
      event.preventDefault();
      return;
    }

    const first = focusables[0];
    const last = focusables.at(-1);
    const active = document.activeElement as HTMLElement | null;

    if (!active || !panel.contains(active)) {
      (event.shiftKey ? (last ?? first) : first).focus();
      event.preventDefault();
      return;
    }

    if (event.shiftKey && active === first && last) {
      last.focus();
      event.preventDefault();
      return;
    }

    if (!event.shiftKey && active === last) {
      first.focus();
      event.preventDefault();
    }
  }

  private capturePreviouslyFocusedElement(): void {
    this.lastFocusedElement =
      typeof document === 'undefined' ? null : (document.activeElement as HTMLElement | null);
  }

  private restoreFocus(): void {
    if (typeof document === 'undefined') {
      return;
    }

    const fallbackTarget = document.body;

    if (this.lastFocusedElement?.isConnected) {
      this.lastFocusedElement.focus();
      return;
    }

    if (fallbackTarget && typeof fallbackTarget.focus === 'function') {
      fallbackTarget.focus();
    }
  }

  private focusFirstElement(): void {
    const panel = this.dialogPanel?.nativeElement;

    if (!panel) {
      return;
    }

    const focusables = this.getFocusableElements(panel);
    (focusables[0] ?? panel).focus();
  }

  private getFocusableElements(root: HTMLElement): HTMLElement[] {
    const selector = [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    return Array.from(root.querySelectorAll<HTMLElement>(selector)).filter(
      (el) => !el.hasAttribute('aria-hidden')
    );
  }

  private registerOpenDialog(): void {
    this.registry.register(this.dialogInstanceId);
  }

  private unregisterOpenDialog(): void {
    this.registry.unregister(this.dialogInstanceId);
  }

  private isTopMostDialog(): boolean {
    return this.registry.isTopMost(this.dialogInstanceId);
  }
}

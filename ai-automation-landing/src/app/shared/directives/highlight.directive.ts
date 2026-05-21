import { Directive, HostBinding, Input } from '@angular/core';

/**
 * Highlight Directive placeholder
 * Adds highlight effect on hover or interaction
 */
@Directive({
  selector: '[appHighlight]',
  standalone: true,
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class HighlightDirective {
  @Input() highlightColor = 'yellow';

  @HostBinding('style.backgroundColor')
  protected backgroundColor = '';

  onMouseEnter() {
    this.backgroundColor = this.highlightColor;
  }

  onMouseLeave() {
    this.backgroundColor = '';
  }
}

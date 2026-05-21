import { Directive, ElementRef, Input } from '@angular/core';

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

  constructor(private readonly el: ElementRef<HTMLElement>) {}

  onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = this.highlightColor;
  }

  onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = '';
  }
}

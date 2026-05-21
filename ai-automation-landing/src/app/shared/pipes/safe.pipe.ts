import { Pipe, PipeTransform } from '@angular/core';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
  SafeScript,
  SafeStyle,
  SafeUrl,
} from '@angular/platform-browser';

/**
 * Safe Pipe placeholder
 * Sanitizes HTML/URL content for safe template binding
 */
@Pipe({
  name: 'safe',
  standalone: true,
})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(
    value: string | null | undefined,
    type: 'html' | 'url' | 'style' | 'script' | 'resource' = 'html'
  ): SafeHtml | SafeUrl | SafeResourceUrl | SafeStyle | SafeScript | null {
    if (value == null) {
      return null;
    }

    switch (type) {
      case 'html':
        return this.sanitizer.bypassSecurityTrustHtml(value);
      case 'url':
        return this.sanitizer.bypassSecurityTrustUrl(value);
      case 'style':
        return this.sanitizer.bypassSecurityTrustStyle(value);
      case 'script':
        return this.sanitizer.bypassSecurityTrustScript(value);
      case 'resource':
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
    }
  }
}

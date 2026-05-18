import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CtaButtonComponent } from './cta-button.component';

describe('CtaButtonComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtaButtonComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('renders an internal router link by default', () => {
    const fixture = TestBed.createComponent(CtaButtonComponent);
    fixture.componentRef.setInput('label', 'Book now');
    fixture.componentRef.setInput('link', '/book');
    fixture.detectChanges();

    const anchor = fixture.nativeElement.querySelector('a.cta') as HTMLAnchorElement;
    expect(anchor.textContent?.trim()).toBe('Book now');
    expect(anchor.getAttribute('href')).toContain('/book');
    expect(anchor.getAttribute('target')).toBeNull();
  });

  it('renders external link attributes when external is true', () => {
    const fixture = TestBed.createComponent(CtaButtonComponent);
    fixture.componentRef.setInput('label', 'Open docs');
    fixture.componentRef.setInput('link', 'https://example.com/docs');
    fixture.componentRef.setInput('external', true);
    fixture.detectChanges();

    const anchor = fixture.nativeElement.querySelector('a.cta') as HTMLAnchorElement;
    expect(anchor.textContent?.trim()).toBe('Open docs');
    expect(anchor.getAttribute('href')).toBe('https://example.com/docs');
    expect(anchor.getAttribute('target')).toBe('_blank');
    expect(anchor.getAttribute('rel')).toBe('noopener noreferrer');
  });
});

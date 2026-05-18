import { TestBed } from '@angular/core/testing';
import { FeatureCardComponent } from './feature-card.component';

describe('FeatureCardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureCardComponent]
    }).compileComponents();
  });

  it('renders title and body', () => {
    const fixture = TestBed.createComponent(FeatureCardComponent);
    fixture.componentRef.setInput('title', 'Faster onboarding');
    fixture.componentRef.setInput('body', 'Reusable templates speed up launches.');
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h3')?.textContent).toContain('Faster onboarding');
    expect(el.querySelector('.card__body')?.textContent).toContain(
      'Reusable templates speed up launches.'
    );
  });

  it('conditionally renders eyebrow when provided', () => {
    const fixture = TestBed.createComponent(FeatureCardComponent);
    fixture.componentRef.setInput('title', 'Ops');
    fixture.componentRef.setInput('body', 'Body');
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.card__eyebrow')).toBeNull();

    fixture.componentRef.setInput('eyebrow', 'Included');
    fixture.detectChanges();

    expect(el.querySelector('.card__eyebrow')?.textContent).toContain('Included');
  });
});

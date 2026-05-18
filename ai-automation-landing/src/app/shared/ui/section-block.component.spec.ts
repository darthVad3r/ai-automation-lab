import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SectionBlockComponent } from './section-block.component';

@Component({
  standalone: true,
  imports: [SectionBlockComponent],
  template: `
    <app-section-block
      [title]="title"
      [eyebrow]="eyebrow"
      [subtitle]="subtitle"
      [variant]="variant"
    >
      <span class="projected">Projected body</span>
    </app-section-block>
  `
})
class HostComponent {
  title = 'Section title';
  eyebrow = '';
  subtitle = '';
  variant: 'light' | 'muted' = 'light';
}

describe('SectionBlockComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent]
    }).compileComponents();
  });

  it('renders title and projected content', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('.section__title')?.textContent).toContain('Section title');
    expect(el.querySelector('.projected')?.textContent).toContain('Projected body');
  });

  it('conditionally renders optional fields and variant class', () => {
    const defaultFixture = TestBed.createComponent(HostComponent);
    defaultFixture.detectChanges();

    const defaultEl = defaultFixture.nativeElement as HTMLElement;
    const defaultSection = defaultEl.querySelector('.section') as HTMLElement;
    expect(defaultSection.classList.contains('light')).toBe(true);
    expect(defaultEl.querySelector('.section__eyebrow')).toBeNull();
    expect(defaultEl.querySelector('.section__subtitle')).toBeNull();

    const populatedFixture = TestBed.createComponent(HostComponent);
    populatedFixture.componentInstance.eyebrow = 'Why this matters';
    populatedFixture.componentInstance.subtitle = 'Supporting text';
    populatedFixture.componentInstance.variant = 'muted';
    populatedFixture.detectChanges();

    const populatedEl = populatedFixture.nativeElement as HTMLElement;
    const populatedSection = populatedEl.querySelector('.section') as HTMLElement;
    expect(populatedSection.classList.contains('muted')).toBe(true);
    expect(populatedEl.querySelector('.section__eyebrow')?.textContent).toContain('Why this matters');
    expect(populatedEl.querySelector('.section__subtitle')?.textContent).toContain('Supporting text');
  });
});

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
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const section = el.querySelector('.section') as HTMLElement;
    expect(section.classList.contains('light')).toBe(true);
    expect(el.querySelector('.section__eyebrow')).toBeNull();
    expect(el.querySelector('.section__subtitle')).toBeNull();

    fixture.componentInstance.eyebrow = 'Why this matters';
    fixture.componentInstance.subtitle = 'Supporting text';
    fixture.componentInstance.variant = 'muted';
    fixture.detectChanges();

    expect(section.classList.contains('muted')).toBe(true);
    expect(el.querySelector('.section__eyebrow')?.textContent).toContain('Why this matters');
    expect(el.querySelector('.section__subtitle')?.textContent).toContain('Supporting text');
  });
});

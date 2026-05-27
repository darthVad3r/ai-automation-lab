import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import {
  GapToken,
  LayoutMode,
  SpacingLayoutPrimitivesComponent,
} from './spacing-layout-primitives.component';

@Component({
  standalone: true,
  imports: [SpacingLayoutPrimitivesComponent],
  template: `
    <app-spacing-layout-primitives [mode]="mode" [gap]="gap" [columns]="columns" [wrap]="wrap">
      <span>One</span>
      <span>Two</span>
      <span>Three</span>
    </app-spacing-layout-primitives>
  `,
})
class HostComponent {
  mode: LayoutMode = 'stack';

  gap: GapToken = '6';

  columns = 3;

  wrap = false;
}

describe('SpacingLayoutPrimitivesComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
  });

  it('renders projected content with stack mode by default', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    const layout = fixture.nativeElement.querySelector('.ui-layout') as HTMLElement;

    expect(layout.classList.contains('ui-layout--stack')).toBe(true);
    expect(layout.children.length).toBe(3);
  });

  it('applies grid mode and tokenized columns style', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.componentInstance.mode = 'grid';
    fixture.componentInstance.columns = 4;
    fixture.detectChanges();

    const layout = fixture.nativeElement.querySelector('.ui-layout') as HTMLElement;

    expect(layout.classList.contains('ui-layout--grid')).toBe(true);
    expect(layout.style.getPropertyValue('--ui-layout-columns')).toBe('4');
  });

  it('applies tokenized gap css variable', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.componentInstance.gap = '10';
    fixture.detectChanges();

    const layout = fixture.nativeElement.querySelector('.ui-layout') as HTMLElement;

    expect(layout.style.getPropertyValue('--ui-layout-gap')).toBe(
      'var(--lab-space-10, var(--lab-space-4))'
    );
  });

  it('encodes fallback token when an unexpected gap value is set at runtime', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.componentInstance.gap = '999' as unknown as GapToken;
    fixture.detectChanges();

    const layout = fixture.nativeElement.querySelector('.ui-layout') as HTMLElement;

    expect(layout.style.getPropertyValue('--ui-layout-gap')).toBe(
      'var(--lab-space-999, var(--lab-space-4))'
    );
  });

  it('applies wrap modifier for inline layouts', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.componentInstance.mode = 'inline';
    fixture.componentInstance.wrap = true;
    fixture.detectChanges();

    const layout = fixture.nativeElement.querySelector('.ui-layout') as HTMLElement;

    expect(layout.classList.contains('ui-layout--inline')).toBe(true);
    expect(layout.classList.contains('ui-layout--wrap')).toBe(true);
  });

  it('falls back to 1 column when columns is NaN', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.componentInstance.mode = 'grid';
    fixture.componentInstance.columns = Number.NaN;
    fixture.detectChanges();

    const layout = fixture.nativeElement.querySelector('.ui-layout') as HTMLElement;

    expect(layout.style.getPropertyValue('--ui-layout-columns')).toBe('1');
  });
});

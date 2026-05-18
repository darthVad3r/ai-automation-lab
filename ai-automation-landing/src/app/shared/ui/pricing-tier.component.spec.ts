import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PricingTierComponent } from './pricing-tier.component';
import { PricingPlan } from '../../core/services/landing-content.service';

describe('PricingTierComponent', () => {
  const basePlan: PricingPlan = {
    name: 'Growth',
    price: '$4,000',
    description: 'Scale with automation.',
    features: ['Feature A', 'Feature B'],
    ctaLabel: 'Book Growth Plan',
    ctaLink: '/book'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingTierComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('renders plan details and features', () => {
    const fixture = TestBed.createComponent(PricingTierComponent);
    fixture.componentRef.setInput('plan', basePlan);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h3')?.textContent).toContain('Growth');
    expect(el.querySelector('.tier__price')?.textContent).toContain('$4,000');
    expect(el.querySelectorAll('.tier__features li').length).toBe(2);
    expect(el.querySelector('app-cta-button')?.textContent).toContain('Book Growth Plan');
  });

  it('adds featured class for highlighted plans', () => {
    const fixture = TestBed.createComponent(PricingTierComponent);
    fixture.componentRef.setInput('plan', { ...basePlan, highlighted: true });
    fixture.detectChanges();

    const tier = fixture.nativeElement.querySelector('.tier') as HTMLElement;
    expect(tier.classList.contains('tier--featured')).toBe(true);
  });
});

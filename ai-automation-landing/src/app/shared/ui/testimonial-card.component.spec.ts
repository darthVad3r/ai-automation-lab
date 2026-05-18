import { TestBed } from '@angular/core/testing';
import { TestimonialCardComponent } from './testimonial-card.component';

describe('TestimonialCardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonialCardComponent]
    }).compileComponents();
  });

  it('renders quote, name, and role', () => {
    const fixture = TestBed.createComponent(TestimonialCardComponent);
    fixture.componentRef.setInput('quote', 'Huge operational lift.');
    fixture.componentRef.setInput('name', 'Jane Doe');
    fixture.componentRef.setInput('role', 'Operations Lead');
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.testimonial__quote')?.textContent).toContain('Huge operational lift.');
    expect(el.querySelector('.testimonial__author')?.textContent).toContain('Jane Doe');
    expect(el.querySelector('.testimonial__role')?.textContent).toContain('Operations Lead');
  });

  it('wraps quote with smart quotes in template output', () => {
    const fixture = TestBed.createComponent(TestimonialCardComponent);
    fixture.componentRef.setInput('quote', 'Reliable and fast.');
    fixture.componentRef.setInput('name', 'Client');
    fixture.componentRef.setInput('role', 'Founder');
    fixture.detectChanges();

    const quote = fixture.nativeElement.querySelector('.testimonial__quote')?.textContent ?? '';
    expect(quote).toContain('“Reliable and fast.”');
  });
});

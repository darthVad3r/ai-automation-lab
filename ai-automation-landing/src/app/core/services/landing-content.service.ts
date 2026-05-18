import { Injectable } from '@angular/core';

/** Pricing model used by pricing-focused UI components. */
export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaLink: string;
  highlighted?: boolean;
}

/** Provides all editable landing-page content and offer metadata. */
@Injectable({ providedIn: 'root' })
export class LandingContentService {
  readonly bookingUrl = 'https://calendly.com/your-handle/discovery-call';
  readonly kitCheckoutUrl = 'https://checkout.example.com/ai-agent-starter-kit';

  /** Returns the core problem statements shown on the landing page. */
  getProblemPoints(): string[] {
    return [
      'Manual workflows slow down delivery and create bottlenecks.',
      'Teams struggle to connect tools, data, and AI agents reliably.',
      'Most automations break when ownership and architecture are unclear.'
    ];
  }

  /** Returns the core solution statements shown on the landing page. */
  getSolutionPoints(): string[] {
    return [
      'Production-ready AI agent workflows aligned to your process.',
      'Clear architecture, observability, and handoff documentation.',
      'Fast implementation with reusable templates and components.'
    ];
  }

  /** Returns pricing plans rendered in the reusable pricing tier UI. */
  getPricingPlans(): PricingPlan[] {
    return [
      {
        name: 'Starter',
        price: '$1,500',
        description: 'Best for validating one high-impact workflow.',
        features: [
          '1 workflow automation map',
          '1 custom AI agent setup',
          '1 team enablement session'
        ],
        ctaLabel: 'Start with Starter',
        ctaLink: '/book'
      },
      {
        name: 'Growth',
        price: '$4,000',
        description: 'For teams scaling automation across operations.',
        features: [
          'Up to 3 workflow automations',
          'Agent orchestration blueprint',
          'Implementation support + QA'
        ],
        ctaLabel: 'Book Growth Plan',
        ctaLink: '/book',
        highlighted: true
      },
      {
        name: 'Scale',
        price: 'Custom',
        description: 'Enterprise-grade workflows and governance.',
        features: [
          'Multi-team automation architecture',
          'Security and compliance alignment',
          'Dedicated technical advisory'
        ],
        ctaLabel: 'Talk to Sales',
        ctaLink: '/book'
      }
    ];
  }

  /** Returns feature bullets used in the starter kit section. */
  getStarterKitPoints(): string[] {
    return [
      'Angular-ready starter project structure',
      'Reusable prompts and agent workflow templates',
      'Deployment checklist and scaling notes'
    ];
  }

  /** Returns testimonial placeholders until production testimonials are added. */
  getTestimonials(): Array<{ name: string; role: string; quote: string }> {
    return [
      {
        name: 'Client Name',
        role: 'Operations Lead',
        quote: 'Placeholder testimonial: add a real customer success quote here.'
      },
      {
        name: 'Client Name',
        role: 'Founder',
        quote: 'Placeholder testimonial: describe measurable impact from automation.'
      }
    ];
  }
}

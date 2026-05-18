# AI Automation Landing (Angular)

Single-page Angular landing site for:

- AI Automation & Agent Workflow service
- AI Agent Starter Kit product

## Implemented scope

- Clean modern landing layout
- Hero section with CTA
- Problem, solution, pricing, starter kit sections
- Testimonials placeholder
- Book call CTA
- Mobile responsive SCSS
- Reusable UI components
- SEO metadata (title + meta description + OG tags)
- Fast-load route-level lazy loading
- No backend required

## High-level architecture

- **Shell-first routing:** `SiteShellComponent` provides shared navigation/footer and hosts route content.
- **Feature modules by route:** page-level components live in `src/app/modules/*` and are lazy-loaded from `app.routes.ts`.
- **Core services:** centralized app content (`LandingContentService`) and SEO application (`SeoService`).
- **Reusable UI layer:** shared presentational components in `src/app/shared/ui/*` keep page templates consistent.
- **Route-driven SEO:** each route provides metadata via `data.seo`; shell applies it on navigation.

## Routes

- `/` → Landing page
- `/book` → Calendar link page
- `/kit` → Product checkout link page

## API reference summary

### Core services

| API | Type | Summary |
| --- | --- | --- |
| `LandingContentService` | Service | Source of page copy, pricing plans, testimonials, and outbound URLs. |
| `SeoService` | Service | Applies title/meta/canonical tags and JSON-LD structured data to the document head. |
| `PricingPlan` | Interface | Data contract used by pricing components for plan rendering. |
| `SeoMetadata` | Interface | Route-level SEO contract consumed by the shell and SEO service. |

### Route and config APIs

| API | Type | Summary |
| --- | --- | --- |
| `routes` | `Routes` constant | Defines lazy-loaded routes and per-route SEO metadata. |
| `appConfig` | `ApplicationConfig` constant | Registers router providers and application-wide dependencies. |

### UI and page component APIs

| API | Type | Summary |
| --- | --- | --- |
| `SiteShellComponent` | Layout component | Shared shell applying SEO metadata and rendering navigation/footer. |
| `LandingPageComponent` | Page component | Main marketing page assembling all shared sections. |
| `BookPageComponent` | Page component | Focused call-booking conversion page. |
| `KitPageComponent` | Page component | Product page for the starter kit checkout flow. |
| `CtaButtonComponent` | UI component | Internal/external CTA button primitive. |
| `FeatureCardComponent` | UI component | Reusable feature/benefit card. |
| `SectionBlockComponent` | UI component | Section wrapper with heading/subtitle/variant support. |
| `PricingTierComponent` | UI component | Primary pricing plan card used on landing page. |
| `PricingCardComponent` | UI component | Alternate pricing card variant for plan presentation. |
| `TestimonialCardComponent` | UI component | Testimonial display card for quote, author, and role. |

## Project structure (high level)

```text
src/app/
  core/services/
    landing-content.service.ts
    seo.service.ts
  features/
    landing/landing-page.component.ts
    book/book-page.component.ts
    kit/kit-page.component.ts
  shared/ui/
    cta-button.component.ts
    section-block.component.ts
    pricing-card.component.ts
    testimonial-card.component.ts
  app.routes.ts
  app.ts
```

## Run locally

```bash
npm install
npm start
```

Open `http://localhost:4200`.

## Build

```bash
npm run build
```

Production artifacts are generated in `dist/ai-automation-landing`.

## Test

```bash
npm test -- --watch=false
```

## Deployment instructions

### Static hosting (recommended)

This project is optimized for static deployment.

1. Build:

```bash
npm run build
```

2. Deploy assets from:

```text
dist/ai-automation-landing/browser
```

3. Configure SPA fallback (if host requires it) to `index.html`.

Examples: Azure Static Web Apps, Netlify, Vercel, Cloudflare Pages, GitHub Pages.

## Content placeholders to update

- `bookingUrl` in `landing-content.service.ts`
- `kitCheckoutUrl` in `landing-content.service.ts`
- Pricing text and feature bullets
- Testimonials with real client proof

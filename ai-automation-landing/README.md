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

## Routes

- `/` → Landing page
- `/book` → Calendar link page
- `/kit` → Product checkout link page

## Architecture Overview

This project follows a **feature-first, scalable Angular architecture** designed for maintainability and growth.

### Folder Structure

```text
src/
├── app/
│   ├── core/                          # Singleton services & app-wide utilities
│   │   ├── services/                  # HTTP services, SEO, config, etc.
│   │   ├── interceptors/              # HTTP interceptors (auth, errors, logging)
│   │   └── guards/                    # Route guards (auth, permissions)
│   │
│   ├── shared/                        # Reusable, import-safe components
│   │   ├── ui/                        # Dumb UI components (buttons, cards, etc.)
│   │   ├── pipes/                     # Custom pipes (safe, date, etc.)
│   │   ├── directives/                # Custom directives (highlight, etc.)
│   │   └── layout/                    # Layout shell & layout components
│   │
│   ├── features/                      # Feature modules (lazy-loaded)
│   │   ├── landing/                   # Landing page feature
│   │   ├── book/                      # Booking page feature
│   │   └── kit/                       # Starter kit feature
│   │
│   ├── layout/                        # Application layout structure
│   │   ├── shell/                     # Shell component (router outlet host)
│   │   ├── navigation/                # Header/nav components
│   │   └── sidebar/                   # Sidebar components (if needed)
│   │
│   └── app.ts                         # Root component
│
├── styles/                            # Global SCSS
│   ├── _variables.scss                # Colors, spacing, typography
│   ├── _mixins.scss                   # Reusable SCSS utilities
│   └── global.scss                    # Global reset & base styles
│
├── assets/                            # Static files (images, icons, fonts)
└── styles.scss                        # Global stylesheet entry point
```

### Architecture Principles

#### 1. **Core Module** (Singleton Services)

- Imported **once in the root only**
- Contains app-wide services, interceptors, guards
- Examples: `SeoService`, `AuthGuard`, `HttpInterceptor`
- **Rule**: Do not import Core in features or shared

#### 2. **Shared Module** (Reusable Components)

- Import-safe across the entire app
- Contains dumb UI components, pipes, directives
- **No providers** (except standalone component defaults)
- Examples: `CtaButton`, `SafePipe`, `HighlightDirective`
- **Rule**: Shared is safe to use everywhere

#### 3. **Features** (Lazy-Loaded Modules)

- Independent feature sets, lazy-loaded via routing
- Each feature can have its own:
  - Components
  - Services (feature-scoped)
  - State (NgRx slices, if using state management)
  - Pipes & directives (feature-only)
- Examples: `landing/`, `book/`, `kit/`
- **Rule**: Features are independent; prefer shallow imports

#### 4. **Layout** (Application Shell)

- Contains the main shell component with router outlet
- Manages header, footer, navigation structure
- Currently in `/shared/layout/site-shell.component.ts`
- Components: Shell, Navigation, Sidebar
- **Rule**: Layout is part of the core shell; loaded once

#### 5. **Global Styles**

- SCSS variables: colors, spacing, typography, breakpoints
- SCSS mixins: flexbox utilities, responsive breakpoints, utilities
- Global reset & base styles: typography, links, forms
- All imported into root `styles.scss`

### Import Path Aliases

TypeScript path aliases are configured in `tsconfig.json`:

```json
{
  "baseUrl": "src",
  "paths": {
    "@app/*": ["app/*"],
    "@core/*": ["app/core/*"],
    "@shared/*": ["app/shared/*"],
    "@features/*": ["app/features/*"],
    "@layout/*": ["app/layout/*"],
    "@assets/*": ["assets/*"]
  }
}
```

**Usage Examples:**

```typescript
// Instead of: import { SeoService } from '../../../core/services/seo.service';
import { SeoService } from '@core/services/seo.service';

// Instead of: import { CtaButton } from '../../../shared/ui/cta-button.component';
import { CtaButton } from '@shared/ui/cta-button.component';

// Instead of: import { LandingPageComponent } from '../../../features/landing/landing-page.component';
import { LandingPageComponent } from '@features/landing/landing-page.component';
```

### Import Rules

1. **Core** can import from: Core itself
2. **Shared** can import from: Shared itself, Core
3. **Features** can import from: Features itself, Shared, Core
4. **Layout** can import from: Layout itself, Shared, Core

**Anti-patterns to avoid:**

- ❌ Core importing from Features or Shared (breaks singleton principle)
- ❌ Shared importing from Features (breaks reusability)
- ❌ Features importing from other Features (use Router for cross-feature communication)
- ❌ Deep relative paths like `../../../../core/services/` (use path aliases instead)

### Project structure (detailed)

```text
src/app/
  core/
    services/
      landing-content.service.ts
      seo.service.ts
    interceptors/
      http.interceptor.ts                 (placeholder)
    guards/
      auth.guard.ts                       (placeholder)

  shared/
    ui/
      cta-button.component.ts
      feature-card.component.ts
      pricing-card.component.ts
      pricing-tier.component.ts
      section-block.component.ts
      testimonial-card.component.ts
    pipes/
      safe.pipe.ts                        (placeholder)
    directives/
      highlight.directive.ts              (placeholder)
    layout/
      site-shell.component.ts

  features/
    landing/
      landing-page.component.ts
    book/
      book-page.component.ts
    kit/
      kit-page.component.ts

  layout/
    shell/
      shell.component.ts                  (placeholder for extension)
    navigation/
      navigation.component.ts             (placeholder)
    sidebar/
      sidebar.component.ts                (placeholder)

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

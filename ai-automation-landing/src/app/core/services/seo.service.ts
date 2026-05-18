import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

/** Structured data entry used to render JSON-LD script tags. */
export interface SeoStructuredDataEntry {
  id: string;
  schema: object;
}

/** SEO metadata contract consumed by route data and shell orchestration. */
export interface SeoMetadata {
  title: string;
  description: string;
  canonicalUrl?: string;
  structuredData?: SeoStructuredDataEntry[];
}

/** Centralized helper for applying page-level SEO metadata and structured data. */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);

  constructor(
    private readonly title: Title,
    private readonly meta: Meta
  ) {}

  /** Applies all supported metadata values for the current route. */
  applyMetadata(metadata: SeoMetadata): void {
    this.setPageMeta(metadata.title, metadata.description);

    if (metadata.canonicalUrl) {
      this.setCanonicalUrl(metadata.canonicalUrl);
    }

    metadata.structuredData?.forEach((entry) => {
      this.setStructuredData(entry.id, entry.schema);
    });
  }

  /** Updates title and social meta tags. */
  setPageMeta(pageTitle: string, description: string): void {
    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
  }

  /** Creates or updates the canonical link element. */
  setCanonicalUrl(url: string): void {
    let link = this.document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', url);
  }

  /** Replaces a JSON-LD script block identified by the provided id. */
  setStructuredData(id: string, schema: object): void {
    const scriptId = `structured-data-${id}`;
    const existing = this.document.getElementById(scriptId);

    if (existing) {
      existing.remove();
    }

    const script = this.document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }
}

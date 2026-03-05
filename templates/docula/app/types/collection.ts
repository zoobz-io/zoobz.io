import type { PageCollections } from "@nuxt/content";

export interface DoculaExample {
  code: string;
  lang: string;
}

export interface DoculaHero {
  tagline: string;
  taglineHighlight?: string;
  description?: string;
  action?: Link;
  example?: DoculaExample;
}

export interface DoculaCollection {
  key: keyof PageCollections;
  title: string;
  hero: DoculaHero;
  highlights: DoculaLandingHighlights;
  capabilities: DoculaLandingCapabilities;
  install: DoculaLandingInstall;
  articles: DoculaArticles;
  repo: string;
  navIcons?: Record<string, IconAlias>;
}

export interface DoculaVersion {
  current: string;
  versions: string[];
  latest: string;
}

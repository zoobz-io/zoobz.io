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

export interface DoculaCapability {
  feature: string;
  description: string;
  link?: Link;
}

export interface DoculaHighlight {
  icon: IconAlias;
  title: string;
  description: string;
}

export interface DoculaLandingCapabilities {
  type: "capabilities";
  title?: string;
  description?: string;
  items: DoculaCapability[];
}

export interface DoculaLandingHighlights {
  type: "highlights";
  title?: string;
  description?: string;
  items: DoculaHighlight[];
}

export interface DoculaLandingInstall {
  type: "install";
  title?: string;
  description?: string;
  code: string;
  lang: string;
  note?: string;
}

export type DoculaLandingSection =
  | DoculaLandingCapabilities
  | DoculaLandingHighlights
  | DoculaLandingInstall;

export interface DoculaCollection {
  key: keyof PageCollections;
  title: string;
  hero: DoculaHero;
  landing?: DoculaLandingSection[];
  repo?: string;
  navIcons?: Record<string, IconAlias>;
}

export interface DoculaVersion {
  current: string;
  versions: string[];
  latest: string;
}

declare module "nuxt/schema" {
  interface AppConfigInput {
    title?: string;
    collection?: DoculaCollection;
    version?: DoculaVersion;
  }
}

export default defineAppConfig({
  title: "Foundation",
  collection: undefined as unknown as DoculaCollection,
});

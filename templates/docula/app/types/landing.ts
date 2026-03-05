export interface DoculaStat {
  label: string;
  value: string;
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

export interface DoculaLandingHighlights {
  title?: string;
  description?: string;
  items: DoculaHighlight[];
}

export interface DoculaLandingCapabilities {
  title?: string;
  description?: string;
  items: DoculaCapability[];
}

export interface DoculaLandingInstall {
  title?: string;
  description?: string;
  code: string;
  lang: string;
  note?: string;
}

export interface DoculaArticles {
  title?: string;
  description?: string;
}

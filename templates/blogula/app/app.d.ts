import type { BlogulaSocial, BlogulaEvent } from "./types/blogula";

declare module "nuxt/schema" {
  interface AppConfigInput {
    title?: string;
    github?: string;
    contacts?: Link[];
    socials?: BlogulaSocial[];
    events?: BlogulaEvent[];
    copyright?: string;
  }
}

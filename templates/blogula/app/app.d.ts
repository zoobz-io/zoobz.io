import type { BlogulaSocial, BlogulaEvent } from "./types/blogula";

declare module "nuxt/schema" {
  interface AppConfigInput {
    title?: string;
    socials?: BlogulaSocial[];
    events?: BlogulaEvent[];
    copyright?: string;
  }
}

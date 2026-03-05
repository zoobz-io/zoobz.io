declare module "nuxt/schema" {
  interface AppConfigInput {
    title?: string;
    collection?: DoculaCollection;
    version?: DoculaVersion;
  }
}

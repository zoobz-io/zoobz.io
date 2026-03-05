import { createResolver, defineNuxtModule } from "@nuxt/kit";

const { resolve } = createResolver(import.meta.url);

export default defineNuxtModule({
  meta: {
    name: "@zoobz.io/docula-css",
    configKey: "doculaCss",
  },
  defaults: {
    enabled: false,
  },
  setup(options, nuxt) {
    if (!options.enabled) return;
    nuxt.options.css.push(resolve("../assets/components/index.css"));
  },
});

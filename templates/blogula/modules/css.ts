import { createResolver, defineNuxtModule } from "@nuxt/kit";

const { resolve } = createResolver(import.meta.url);

export default defineNuxtModule({
  meta: {
    name: "@zoobz-io/blogula-css",
    configKey: "blogulaCss",
  },
  defaults: {
    enabled: false,
  },
  setup(options, nuxt) {
    if (!options.enabled) return;
    nuxt.options.css.push(resolve("../assets/components/index.css"));
  },
});

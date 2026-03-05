import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2025-11-17",
  extends: ["@zoobz.io/blocks"],
  modules: ["@pinia/nuxt"],
  devtools: { enabled: false },
  css: ["@zoobz.io/appula/assets/components/index.css"],
});

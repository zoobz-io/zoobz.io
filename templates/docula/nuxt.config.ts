import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2025-11-17",
  extends: ["@zoobz-io/prose", "@zoobz-io/github"],
  modules: ["nuxt-typed-router", "@nuxt/fonts"],
  imports: {
    dirs: ["app/types"],
  },
  fonts: {
    families: [
      {
        name: "Hack",
        provider: "local",
        weights: [400, 700],
      },
    ],
    defaults: {
      weights: [400, 700],
    },
  },
  app: {
    head: {
      title: "Docula",
      meta: [
        {
          name: "description",
          content: "Documentation site built with Foundation",
        },
      ],
    },
  },
});

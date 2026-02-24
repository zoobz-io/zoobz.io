import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2025-11-17",
  extends: ["@foundation/prose", "@foundation/github"],
  modules: ["nuxt-typed-router"],
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

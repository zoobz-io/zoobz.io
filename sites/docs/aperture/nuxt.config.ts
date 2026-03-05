import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2025-11-17",
  extends: ["@zoobz.io/docula"],
  modules: ["nuxt-typed-router"],
  doculaCss: { enabled: true },
  github: { repo: "zoobzio/aperture" },
  app: {
    head: {
      title: "Zoobz Docs",
      meta: [
        {
          name: "description",
          content: "Documentation for zoobz.io projects",
        },
      ],
    },
  },
});

import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2025-11-17",
  extends: ["@zoobz-io/docula"],
  modules: ["nuxt-typed-router"],
  site: { url: "https://chit.zoobz.io" },
  doculaCss: { enabled: true },
  github: { repo: "zoobz-io/chit" },
  app: {
    head: {
      title: "Zoobz Docs",
      meta: [
        {
          name: "description",
          content: "Documentation for zoobz.io projects",
        },
      ],
      link: [{ rel: "icon", href: "/favicon.ico" }],
    },
  },
});

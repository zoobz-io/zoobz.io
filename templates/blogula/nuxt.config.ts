import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2025-11-17",
  extends: ["@zoobz.io/prose"],
  modules: ["@nuxt/fonts"],
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
  nitro: {
    prerender: {
      routes: ["/rss.xml"],
    },
  },
  app: {
    head: {
      title: "Blogula",
      meta: [
        {
          name: "description",
          content: "Blog site built with Foundation",
        },
      ],
      link: [
        {
          rel: "alternate",
          type: "application/rss+xml",
          title: "RSS Feed",
          href: "/rss.xml",
        },
      ],
    },
  },
});

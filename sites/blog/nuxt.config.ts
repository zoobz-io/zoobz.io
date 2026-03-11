import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2025-11-17",
  extends: ["@zoobz.io/blogula"],
  blogulaCss: { enabled: true },
  site: {
    url: "https://blog.zoobz.io",
    name: "zoobzio",
    description: "Thoughts and updates from zoobz.io",
  },
  app: {
    head: {
      title: "zoobzio",
      meta: [
        {
          name: "description",
          content: "Thoughts and updates from zoobz.io",
        },
      ],
    },
  },
});

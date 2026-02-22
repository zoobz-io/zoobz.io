import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2025-11-17",
  extends: ["@foundation/blogula"],
  app: {
    head: {
      title: "Zoobz Blog",
      meta: [
        {
          name: "description",
          content: "Thoughts and updates from zoobz.io",
        },
      ],
    },
  },
});

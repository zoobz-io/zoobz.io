import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2025-11-17",
  extends: ["@foundation/appula"],
  modules: ["./modules/vicky"],
  runtimeConfig: {
    vicky: {
      openapiUrl: "http://localhost:8080/openapi",
      apiUrl: "http://localhost:8080",
    },
  },
  app: {
    head: {
      title: "Vicky",
      meta: [
        {
          name: "description",
          content: "Vicky application",
        },
      ],
    },
  },
});

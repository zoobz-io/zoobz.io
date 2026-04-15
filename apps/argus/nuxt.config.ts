import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2025-11-17",
  extends: ["@zoobz-io/blocks"],
  modules: ["nuxt-auth-utils"],
  imports: {
    dirs: ["types", "stores"],
  },
  runtimeConfig: {
    argus: {
      backendUrl: "http://localhost:8080",
    },
    session: {
      maxAge: 60 * 60 * 24 * 7, // 1 week
    },
    oauth: {
      zitadel: {
        clientId: "",
        domain: "",
      },
    },
    public: {
      argus: {
        apiUrl: "http://localhost:3000/api",
      },
    },
  },
  app: {
    head: {
      title: "argus",
      meta: [
        {
          name: "description",
          content: "argus application",
        },
      ],
    },
  },
});

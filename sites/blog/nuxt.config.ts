import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2025-11-17",
  extends: ["@zoobz-io/blogula"],
  blogulaCss: { enabled: true },
  blogulaProjects: {
    repos: [
      "zoobz-io/fig",
      "zoobz-io/flux",
      "zoobz-io/capitan",
      "zoobz-io/herald",
      "zoobz-io/aperture",
      "zoobz-io/dbml",
      "zoobz-io/astql",
      "zoobz-io/lucene",
      "zoobz-io/vecna",
      "zoobz-io/soy",
      "zoobz-io/edamame",
      "zoobz-io/grub",
      "zoobz-io/pipz",
      "zoobz-io/flume",
      "zoobz-io/openapi",
      "zoobz-io/rocco",
      "zoobz-io/sctx",
      "zoobz-io/zyn",
      "zoobz-io/cogito",
      "zoobz-io/chit",
      "zoobz-io/vex",
      "zoobz-io/sentinel",
      "zoobz-io/clockz",
      "zoobz-io/slush",
      "zoobz-io/cereal",
      "zoobz-io/check",
    ],
  },
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

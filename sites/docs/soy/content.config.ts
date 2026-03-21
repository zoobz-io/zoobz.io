import { defineCollection, defineContentConfig, z } from "@nuxt/content";
import { defineGitHubTagSource } from "@zoobz-io/github/sources/github-tags";
import { defineGitHubResourceSource } from "@zoobz-io/github/sources/github-resources";

export default defineContentConfig({
  collections: {
    soy: defineCollection({
      type: "page",
      source: defineGitHubTagSource({
        repository: "zoobz-io/soy",
        docsPath: "docs",
      }),
      schema: z.object({
        author: z.string().optional(),
        published: z.date().optional(),
        updated: z.date().optional(),
        readtime: z.string().optional(),
        tags: z.array(z.string()).optional(),
      }),
    }),
    resources: defineCollection({
      type: "page",
      source: defineGitHubResourceSource({
        repository: "zoobz-io/soy",
      }),
      schema: z.object({
        icon: z.string().optional(),
      }),
    }),
  },
});

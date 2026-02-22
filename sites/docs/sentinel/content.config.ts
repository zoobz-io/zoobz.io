import { defineCollection, defineContentConfig, z } from "@nuxt/content";
import { defineGitHubTagSource } from "@foundation/github/sources/github-tags";

export default defineContentConfig({
  collections: {
    sentinel: defineCollection({
      type: "page",
      source: defineGitHubTagSource({
        repository: "zoobzio/sentinel",
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
  },
});

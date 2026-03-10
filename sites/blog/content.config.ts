import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    landing: defineCollection({
      type: "page",
      source: "landing.md",
    }),
    posts: defineCollection({
      type: "page",
      source: "posts/**",
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

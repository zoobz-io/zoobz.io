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
        published: z.string().optional(),
        updated: z.string().optional(),
        readtime: z.string().optional(),
        tags: z.array(z.string()).optional(),
      }),
    }),
  },
});

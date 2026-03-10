<script setup lang="ts">
const route = useRoute();

const contentPath = computed(() => {
  const s = route.params.slug;
  if (!s || (Array.isArray(s) && s.length === 0)) return "/";
  return `/${Array.isArray(s) ? s.join("/") : s}`;
});

const { data: post } = await useAsyncData(`post-${contentPath.value}`, () =>
  queryCollection("posts").path(contentPath.value).first(),
);

if (!post.value) {
  throw createError({ statusCode: 404, message: "Post not found" });
}

useHead({
  title: post.value.title,
});

useSchemaOrg([
  defineArticle({
    headline: post.value.title,
    description: post.value.description,
    datePublished: post.value.published,
    dateModified: post.value.updated ?? post.value.published,
    author: post.value.author
      ? { name: post.value.author, url: `https://github.com/${post.value.author}` }
      : undefined,
  }),
]);

useSeoMeta({
  description: post.value.description,
  ogTitle: post.value.title,
  ogDescription: post.value.description,
  ogType: "article",
  articlePublishedTime: post.value.published,
  articleModifiedTime: post.value.updated ?? post.value.published,
  articleAuthor: post.value.author,
  twitterCard: "summary",
  twitterTitle: post.value.title,
  twitterDescription: post.value.description,
});
</script>

<template>
  <Container>
    <Section>
      <Attribution
        :author="post.author"
        :published="post.published"
        :updated="post.updated"
        :readtime="post.readtime"
        :share="true"
        :share-title="post.title"
      />
      <Article>
        <H1>{{ post.title }}</H1>
        <ContentRenderer :value="post" />
      </Article>
      <Surround
        collection="posts"
        :path="contentPath"
        :order="{ field: 'published', direction: 'DESC' }"
        prev-label="Newer"
        next-label="Older"
      />
    </Section>
    <Nav>
      <Aside>
        <Toc
          v-if="post.body?.toc?.links"
          :links="post.body.toc.links"
        />
      </Aside>
    </Nav>
  </Container>
</template>

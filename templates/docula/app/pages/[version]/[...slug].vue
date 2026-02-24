<script setup lang="ts">
const route = useRoute();
const { collection: collectionConfig } = useAppConfig();

if (!collectionConfig?.key) {
  throw createError({
    statusCode: 500,
    statusMessage:
      "Docula: No collection configured. Define `collection` in app.config.ts",
  });
}

const contentPath = computed(() => {
  const version = route.params.version;
  const slug = route.params.slug;
  const parts = Array.isArray(slug) ? slug : [slug];
  return `/${version}/${parts.join("/")}`;
});

const { data: content } = await useAsyncData(
  `content-${contentPath.value}`,
  () =>
    queryCollection(collectionConfig.key).path(contentPath.value).first(),
);

if (!content.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

useHead({
  title: content.value?.title ?? "Docula",
});

definePageMeta({
  layout: "article",
});
</script>

<template>
  <DocsArticle
    :collection="collectionConfig.key"
    :path="contentPath"
    :content="content!"
    :repo="collectionConfig.repo"
  />
</template>

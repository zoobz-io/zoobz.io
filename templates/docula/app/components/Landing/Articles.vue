<script setup lang="ts">
import type { PageCollections } from "@nuxt/content";

defineProps<{
  articles: DoculaArticles;
  collection: keyof PageCollections;
  versionPrefix: string;
}>();
</script>

<template>
  <LandingSection :title="articles.title" :description="articles.description">
    <ContentTable :collection="collection" :version-prefix="versionPrefix" />
  </LandingSection>
</template>

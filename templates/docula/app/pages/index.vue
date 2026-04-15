<script setup lang="ts">
const {
  collection: {
    key,
    title,
    hero,
    articles,
    highlights,
    capabilities,
  },
} = useAppConfig();

if (!key) {
  throw createError({
    statusCode: 500,
    statusMessage:
      "Docula: No collection configured. Define `collection` in app.config.ts",
  });
}

const { latest } = useVersion();

useHead({
  title,
});
</script>

<template>
  <div class="f-landing">
    <LandingHero :hero="hero" :version-prefix="latest" />
    <LandingStats />
    <LandingHighlights :highlights="highlights" />
    <LandingCapabilities :capabilities="capabilities" :version-prefix="latest" />
    <LandingArticles
      :articles="articles"
      :collection="key"
      :version-prefix="latest"
    />
  </div>
</template>

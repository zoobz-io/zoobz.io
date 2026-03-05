<script setup lang="ts">
import type { ParsedContentv2 } from "@nuxt/content";

interface ContentWithMeta extends ParsedContentv2 {
  stem?: string;
  author?: string;
  published?: string;
  updated?: string;
  readtime?: string;
}

const props = defineProps<{
  collection: string;
  path: string;
  content: ContentWithMeta;
  repo?: string;
}>();

const editUrl = computed(() => {
  if (!props.repo || !props.content?.stem) return undefined;
  const repoBase = props.repo.replace(/\/$/, "");
  // stem is "v1.0.3/1.learn/concepts" — strip the version prefix to get the repo-relative docs path
  const stem = props.content.stem;
  const docsRelative = stem.replace(/^[^/]+\//, "");
  return `${repoBase}/edit/main/docs/${docsRelative}.md`;
});
</script>

<template>
  <Container>
    <Section>
      <Attribution
        :author="content?.author"
        :published="content?.published"
        :updated="content?.updated"
        :readtime="content?.readtime"
        :edit-url="editUrl"
      />
      <Article>
        <ContentRenderer :value="content" />
      </Article>
      <Surround :collection="collection" :path="path" />
    </Section>
    <Right>
      <Toc v-if="content?.body?.toc?.links" :links="content.body.toc.links" />
    </Right>
  </Container>
</template>

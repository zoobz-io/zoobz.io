<script setup lang="ts">
import type { TimelineItem } from "../components/Timeline.vue";

const appConfig = useAppConfig();

const { data: landing } = await useAsyncData("landing", () =>
  queryCollection("landing").first(),
);

const { data: posts } = await useAsyncData("posts", () =>
  queryCollection("posts").order("published", "DESC").all(),
);

const timelineItems = computed<TimelineItem[]>(() => {
  const postItems: TimelineItem[] = (posts.value ?? []).map((p) => ({
    type: "post" as const,
    id: p.id,
    path: p.path,
    title: p.title,
    description: p.description,
    published: p.published,
    tags: p.tags,
  }));

  const eventItems: TimelineItem[] = (appConfig.events ?? []).map((e) => ({
    type: "event" as const,
    ...e,
  }));

  return [...postItems, ...eventItems].sort((a, b) => {
    const dateA = a.type === "post" ? a.published : a.date;
    const dateB = b.type === "post" ? b.published : b.date;
    if (!dateA) return 1;
    if (!dateB) return -1;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });
});
</script>

<template>
  <div class="f-blog-page">
    <div class="f-blog-lead" />

    <div class="f-blog-hero-section">
      <div class="f-blog-section-inner">
        <Article v-if="landing" class="f-landing-hero">
          <ContentRenderer :value="landing" />
        </Article>
      </div>
    </div>

    <div class="f-blog-timeline-section">
      <div class="f-blog-section-inner">
        <Timeline v-if="timelineItems.length" :items="timelineItems" />
        <P v-else>No posts yet.</P>
      </div>
    </div>
  </div>
</template>

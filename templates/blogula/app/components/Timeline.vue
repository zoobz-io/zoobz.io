<script setup lang="ts">
import type { BlogulaEvent } from "../types/blogula";

export type TimelinePost = {
  type: "post";
  id: string;
  path: string;
  title: string;
  description?: string;
  published?: string;
  tags?: string[];
};

export type TimelineEventItem = BlogulaEvent & { type: "event" };

export type TimelineItem = TimelinePost | TimelineEventItem;

defineProps<{
  items: TimelineItem[];
}>();

const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const itemDate = (item: TimelineItem) =>
  item.type === "post" ? item.published : item.date;

const itemKey = (item: TimelineItem) =>
  item.type === "post" ? item.id : `event-${item.date}-${item.title}`;
</script>

<template>
  <div class="f-timeline">
    <div
      v-for="item in items"
      :key="itemKey(item)"
      class="f-timeline-entry"
      :class="{ 'f-timeline-entry-event': item.type === 'event' }"
    >
      <div class="f-timeline-date">
        <Chip :label="formatDate(itemDate(item))" />
      </div>
      <div class="f-timeline-stem">
        <div class="f-timeline-arm f-timeline-arm-left" />
        <div v-if="item.type === 'post'" class="f-timeline-node" />
        <div v-else class="f-timeline-node-icon">
          <Icon :alias="item.icon" />
        </div>
        <div class="f-timeline-arm f-timeline-arm-right" />
      </div>

      <!-- Post card -->
      <NuxtLink
        v-if="item.type === 'post'"
        :to="item.path"
        class="f-timeline-card"
      >
        <span class="f-timeline-card-title">{{ item.title }}</span>
        <span v-if="item.description" class="f-timeline-card-description">
          {{ item.description }}
        </span>
        <div v-if="item.tags?.length" class="f-timeline-tags">
          <Chip v-for="tag in item.tags" :key="tag" :label="tag" />
        </div>
      </NuxtLink>

      <!-- Event card (with link) -->
      <NuxtLink
        v-else-if="item.link"
        :to="item.link"
        external
        target="_blank"
        class="f-timeline-card"
      >
        <span class="f-timeline-card-title">{{ item.title }}</span>
        <span class="f-timeline-card-description">{{ item.description }}</span>
      </NuxtLink>

      <!-- Event card (no link) -->
      <div v-else class="f-timeline-card">
        <span class="f-timeline-card-title">{{ item.title }}</span>
        <span class="f-timeline-card-description">{{ item.description }}</span>
      </div>
    </div>
  </div>
</template>

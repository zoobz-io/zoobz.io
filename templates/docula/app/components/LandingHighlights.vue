<script setup lang="ts">
import type { DoculaHighlight } from "../app.config";

defineProps<{
  title?: string;
  description?: string;
  items: DoculaHighlight[];
}>();
</script>

<template>
  <div v-if="title" class="f-landing-header">
    <h2 class="f-landing-title">{{ title }}</h2>
    <p v-if="description" class="f-landing-description">
      {{ description }}
    </p>
  </div>
  <div class="f-landing-highlights-grid">
    <div
      v-for="item in items"
      :key="item.title"
      class="f-landing-highlight"
    >
      <Icon :alias="item.icon" class="f-landing-highlight-icon" />
      <h3 class="f-landing-highlight-title">{{ item.title }}</h3>
      <p class="f-landing-highlight-description">{{ item.description }}</p>
    </div>
  </div>
</template>

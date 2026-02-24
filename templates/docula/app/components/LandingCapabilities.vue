<script setup lang="ts">
import type { DoculaCapability } from "../app.config";

defineProps<{
  title?: string;
  description?: string;
  items: DoculaCapability[];
}>();
</script>

<template>
  <div v-if="title" class="f-landing-header">
    <h2 class="f-landing-title">{{ title }}</h2>
    <p v-if="description" class="f-landing-description">
      {{ description }}
    </p>
  </div>
  <div class="f-landing-capabilities-list">
    <div
      v-for="item in items"
      :key="item.feature"
      class="f-landing-capability"
    >
      <div class="f-landing-capability-content">
        <span class="f-landing-capability-feature">{{ item.feature }}</span>
        <span class="f-landing-capability-description">
          {{ item.description }}
        </span>
      </div>
      <NuxtLink
        v-if="item.link"
        :to="item.link.to"
        class="f-landing-capability-link"
      >
        {{ item.link.label }}
        <Icon alias="arrow-right" />
      </NuxtLink>
    </div>
  </div>
</template>

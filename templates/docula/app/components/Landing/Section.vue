<script setup lang="ts">
defineProps<{
  title?: string;
  description?: string;
  alt?: boolean;
}>();
</script>

<template>
  <div class="f-landing-section" :class="{ 'f-landing-section-alt': alt }">
    <div class="f-landing-section-inner">
      <div v-if="title" class="f-landing-header">
        <H2 class="f-landing-title">{{ title }}</H2>
        <P v-if="description" class="f-landing-description">
          {{ description }}
        </P>
      </div>
      <slot />
    </div>
  </div>
</template>

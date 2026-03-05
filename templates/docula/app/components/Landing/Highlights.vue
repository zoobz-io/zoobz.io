<script setup lang="ts">
defineProps<{ highlights: DoculaLandingHighlights }>();
</script>

<template>
  <LandingSection :title="highlights.title" :description="highlights.description">
    <div class="f-landing-highlights-grid">
      <div
        v-for="item in highlights.items"
        :key="item.title"
        class="f-landing-highlight"
      >
        <Icon :alias="item.icon" class="f-landing-highlight-icon" />
        <H3 class="f-landing-highlight-title">{{ item.title }}</H3>
        <P class="f-landing-highlight-description">{{ item.description }}</P>
      </div>
    </div>
  </LandingSection>
</template>

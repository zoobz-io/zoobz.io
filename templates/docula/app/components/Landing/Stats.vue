<script setup lang="ts">
import { stats } from "#github/stats";
</script>

<template>
  <LandingSection v-if="stats.length" alt>
    <div class="f-landing-stats">
      <div
        v-for="item in stats"
        :key="item.label"
        class="f-landing-stat"
      >
        <span class="f-landing-stat-value">{{ item.value }}</span>
        <span class="f-landing-stat-label">{{ item.label }}</span>
      </div>
    </div>
  </LandingSection>
</template>

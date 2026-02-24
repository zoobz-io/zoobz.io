<script setup lang="ts">
defineProps<{
  title?: string;
  description?: string;
  code: string;
  lang: string;
  note?: string;
}>();
</script>

<template>
  <div v-if="title" class="f-landing-header">
    <h2 class="f-landing-title">{{ title }}</h2>
    <p v-if="description" class="f-landing-description">
      {{ description }}
    </p>
  </div>
  <div class="f-landing-install">
    <CodeExample :code="code" :lang="lang" />
    <p v-if="note" class="f-landing-install-note">{{ note }}</p>
  </div>
</template>

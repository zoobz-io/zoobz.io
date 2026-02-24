<script setup lang="ts">
const { code, lang } = defineProps<{
  code: string;
  lang: string;
}>();

const highlighted = useHighlight(code, lang);
</script>

<template>
  <CodePre :code="code">
    <code v-html="highlighted" />
  </CodePre>
</template>

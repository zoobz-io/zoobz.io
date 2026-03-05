<script setup lang="ts">
const { code } = defineProps<{
  code: string;
}>();

const copied = ref(false);

const copyCode = async () => {
  await navigator.clipboard.writeText(code);

  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
};
</script>

<template>
  <Pre>
    <Tooltip align="end" :content="copied ? 'Copied!' : 'Copy code'">
      <Fab class="f-prose-pre" :disabled="copied" :icon="copied ? 'check' : 'copy'" label="Copy code" @click="copyCode" />
    </Tooltip>
    <slot />
  </Pre>
</template>

<style>
.f-pre {
  position: relative;
}

.f-pre .f-prose-pre {
  position: absolute;
  top: var(--ref-spacing-xs);
  right: var(--ref-spacing-xs);
}
</style>

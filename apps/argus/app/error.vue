<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();

function handleClear() {
  clearError({ redirect: "/" });
}
</script>

<template>
  <Main>
    <div class="f-error-page">
      <H1>{{ error.statusCode }}</H1>
      <P>{{ error.message || "An unexpected error occurred" }}</P>
      <Button @click="handleClear">Go home</Button>
    </div>
  </Main>
</template>

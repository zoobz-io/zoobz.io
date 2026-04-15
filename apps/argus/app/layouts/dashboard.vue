<script setup lang="ts">
const { footer } = useAppConfig();
</script>

<template>
  <Main class="f-dashboard">
    <Sidebar />
    <div class="f-dashboard-content">
      <slot />
    </div>
  </Main>
</template>

<style>
@import "~/assets/components/dashboard.css";
</style>

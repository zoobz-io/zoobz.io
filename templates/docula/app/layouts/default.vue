<script setup lang="ts">
const { collection } = useAppConfig();
const { latest } = useVersion();
</script>

<template>
  <Main>
    <TopBar />
    <Left border>
      <ContentTree
        v-if="collection?.key"
        :collection="collection.key"
        :version-prefix="latest"
      />
    </Left>
    <slot />
    <DoculaFooter />
  </Main>
</template>


<script setup lang="ts">
const appConfig = useAppConfig();
</script>

<template>
  <Header>
    <div class="f-topbar-left">
      <slot name="logo">
        <AsciiLogo :text="appConfig.title ?? 'Blogula'" :link="true" />
      </slot>
    </div>
    <div class="f-topbar-center">
      <Search />
    </div>
    <div class="f-topbar-right">
      <slot name="actions">
        <Tooltip>
          <Fab
            icon="rss"
            label="RSS Feed"
            :link="{ to: '/rss.xml', external: true, target: '_blank' }"
          />
          <template #content>RSS Feed</template>
        </Tooltip>
        <Theme />
        <ColorMode />
      </slot>
    </div>
  </Header>
</template>

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
        <div class="f-search-mobile">
          <Search>
            <template #trigger="{ open }">
              <Fab icon="search" label="Search" @click="open" />
            </template>
          </Search>
        </div>
        <Fab
          icon="rss"
          label="RSS Feed"
          :link="{ to: '/rss.xml', external: true, target: '_blank' }"
        />
        <Theme />
        <ColorMode />
      </slot>
    </div>
  </Header>
</template>

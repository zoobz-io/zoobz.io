<script setup lang="ts">
const appConfig = useAppConfig();
const { collection } = appConfig;

const isMac = computed(() => {
  if (typeof navigator !== "undefined") {
    return navigator.platform.toUpperCase().includes("MAC");
  }
  return false;
});

const modKey = computed(() => (isMac.value ? "⌘" : "Ctrl"));
</script>

<template>
  <Header>
    <div class="f-topbar-left">
      <slot name="logo">
        <AsciiLogo :text="appConfig.title ?? 'Docula'" :link="true" />
      </slot>
      <VersionSelector />
    </div>
    <div class="f-topbar-center">
      <Search />
    </div>
    <div class="f-topbar-right">
      <slot name="actions">
        <Tooltip v-if="collection?.repo" align="end">
          <Fab
            shortcut="meta+g"
            icon="github"
            label="GitHub"
            :link="{ label: 'GitHub', to: collection.repo, target: '_blank', external: true }"
          />
          <template #content>
            <span>GitHub</span>
            <Kbd>
              {{ modKey }}
              <Icon alias="plus" />
              G
            </Kbd>
          </template>
        </Tooltip>
        <Theme />
        <ColorMode />
      </slot>
    </div>
  </Header>
</template>

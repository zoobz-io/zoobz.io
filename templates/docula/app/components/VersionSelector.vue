<script setup lang="ts">
const route = useRoute();
const appConfig = useAppConfig();
const { current, versions, latest, latestOnly } = useVersion();

const open = ref(false);

const versionItems = versions.map((v) => ({
  value: v,
  label: v === latest ? `${v} (latest)` : v,
}));

const displayLabel = computed(() => {
  const v = current.value || latest;
  return v === latest ? `${v} (latest)` : v;
});

const releaseUrl = computed(() => {
  const repo = appConfig.collection?.repo;
  if (!repo || !latest) return "";
  return `${repo}/releases/tag/${latest}`;
});

const handleSelect = (version: string) => {
  open.value = false;
  if (version && version !== current.value) {
    const path = route.path.replace(/^\/v[\d.]+/, "");
    navigateTo(`/${version}${path}`);
  }
};
</script>

<template>
  <Button
    v-if="latestOnly && latest"
    :link="{ to: releaseUrl, target: '_blank', external: true }"
  >
    {{ latest }}
    <template #append>
      <Icon alias="external" />
    </template>
  </Button>
  <Popover v-else-if="versionItems.length > 1" v-model:open="open" align="end">
    <Button>
      {{ displayLabel }}
      <Icon alias="chevron-down" />
    </Button>
    <template #content>
      <Command
        :groups="[{ key: 'versions', items: versionItems }]"
        placeholder="Search versions..."
        @select="handleSelect"
        @keydown.escape="open = false"
      />
    </template>
  </Popover>
</template>

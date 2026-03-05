<script setup lang="ts">
const route = useRoute();
const { current, versions, latest } = useVersion();

const open = ref(false);

const versionItems = versions.map((v) => ({
  value: v,
  label: v === latest ? `${v} (latest)` : v,
}));

const displayLabel = computed(() => {
  const v = current.value || latest;
  return v === latest ? `${v} (latest)` : v;
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
  <Popover v-if="versionItems.length > 0" v-model:open="open" align="end">
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

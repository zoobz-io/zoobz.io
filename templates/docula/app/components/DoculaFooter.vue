<script setup lang="ts">
import type { ParsedContentv2 } from "@nuxt/content";

interface ResourceContent extends ParsedContentv2 {
  icon?: string;
}

const RESOURCE_ORDER = ["readme", "security", "contributing", "llms"];

const { data: resources } = await useAsyncData("footer-resources", async () => {
  const items = await queryCollection<ResourceContent>("resources").all();
  return items.sort((a, b) => {
    const aKey = a.stem ?? "";
    const bKey = b.stem ?? "";
    const aIdx = RESOURCE_ORDER.indexOf(aKey);
    const bIdx = RESOURCE_ORDER.indexOf(bKey);
    return (aIdx === -1 ? Infinity : aIdx) - (bIdx === -1 ? Infinity : bIdx);
  });
});

const activeResource = ref<ResourceContent | null>(null);
const dialogOpen = ref(false);
const dialogTitle = ref("");

const openResource = (resource: ResourceContent) => {
  activeResource.value = resource;
  dialogTitle.value = resource.title ?? "";
  dialogOpen.value = true;
};
</script>

<template>
  <Footer>
    <div class="f-docula-footer">
      <div class="f-docula-footer-resources">
        <Tooltip v-for="resource in resources" :key="resource.id">
          <Fab
            :icon="resource.icon ?? 'file'"
            :label="resource.title ?? ''"
            @click="openResource(resource)"
          />
          <template #content>{{ resource.title }}</template>
        </Tooltip>
      </div>
      <span class="f-docula-footer-copyright">&copy; {{ new Date().getFullYear() }} Alexander Thorwaldson</span>
    </div>
    <Dialog
      :title="dialogTitle"
      description=""
      :open="dialogOpen"
      @update:open="dialogOpen = $event"
    >
      <Scroller class="f-docula-footer-dialog-body">
        <Article v-if="activeResource">
          <ContentRenderer :value="activeResource" />
        </Article>
      </Scroller>
    </Dialog>
  </Footer>
</template>

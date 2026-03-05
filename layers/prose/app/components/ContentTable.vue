<script lang="ts">
import type { PageCollections, ContentNavigationItem } from "@nuxt/content";

export interface ContentTableProps {
  collection: keyof PageCollections;
  /** Optional version prefix to filter content (e.g., "v1.0.0") */
  versionPrefix?: string;
}
</script>

<script setup lang="ts">
const { collection, versionPrefix } = defineProps<ContentTableProps>();

const appConfig = useAppConfig();
const navIcons = computed(() => appConfig.collection?.navIcons ?? {});

const { data: navigation } = await useAsyncData(
  `content-table-nav-${String(collection)}`,
  () => queryCollectionNavigation(collection, ["description"]),
);

// Get the version subtree from the navigation
const versionNav = computed(() => {
  if (!navigation.value || !versionPrefix) return navigation.value ?? [];
  const versionNode = navigation.value.find(
    (item: ContentNavigationItem) => item.path === `/${versionPrefix}`,
  );
  return versionNode?.children ?? [];
});
</script>

<template>
  <div class="f-content-table">
    <template v-for="node in versionNav" :key="node.path">
      <!-- Leaf page at root level -->
      <div v-if="!node.children?.length" class="f-content-table-section">
        <div class="f-content-table-grid">
          <div class="f-content-table-entry">
            <Anchor :to="node.path">{{ node.title }}</Anchor>
            <span
              v-if="node.description"
              class="f-content-table-entry-description"
            >
              {{ node.description }}
            </span>
          </div>
        </div>
      </div>
      <!-- Category with children -->
      <div v-else class="f-content-table-section">
        <H3>
          <Icon v-if="node.title && navIcons[node.title]" :alias="navIcons[node.title]" />
          {{ node.title }}
        </H3>
        <div class="f-content-table-grid">
          <div
            v-for="child in node.children"
            :key="child.path"
            class="f-content-table-entry"
          >
            <Anchor :to="child.path" class="f-content-table-entry-title">{{ child.title }}</Anchor>
            <span
              v-if="child.description"
              class="f-content-table-entry-description"
            >
              {{ child.description }}
            </span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

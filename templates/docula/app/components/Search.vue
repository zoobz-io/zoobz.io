<script lang="ts">
export interface SearchProps {
  placeholder?: string;
}
</script>

<script setup lang="ts">
withDefaults(defineProps<SearchProps>(), {
  placeholder: "Search...",
});

const router = useRouter();
const { results, search } = useSearch();
const { collection: collectionConfig } = useAppConfig();
const { current: versionPrefix } = useVersion();

const collection = collectionConfig?.key ?? "content";
const { data: navigation } = await useAsyncData(
  `nav-${collection}`,
  () => queryCollectionNavigation(collection, ["description"]),
);

const pathToIcon = computed(() => {
  const map = new Map<string, IconAlias>();
  if (!collectionConfig?.navIcons || !navigation.value) return map;

  let folders = navigation.value;
  if (versionPrefix.value) {
    const versionNode = folders.find(
      (s) => s.path === `/${versionPrefix.value}`,
    );
    if (versionNode?.children) folders = versionNode.children;
  }

  for (const folder of folders) {
    if (folder.path && folder.title) {
      const icon = collectionConfig.navIcons[folder.title];
      if (icon) {
        map.set(folder.path, icon);
      }
    }
  }
  return map;
});

const getDescription = (path: string): string | undefined => {
  if (!navigation.value) return undefined;

  const walk = (items: typeof navigation.value): string | undefined => {
    for (const item of items) {
      if (item.path === path && typeof item.description === "string") {
        return item.description;
      }
      if (item.children) {
        const found = walk(item.children);
        if (found) return found;
      }
    }
    return undefined;
  };
  return walk(navigation.value);
};

const getIcon = (path: string) => {
  for (const [folderPath, icon] of pathToIcon.value) {
    if (path.startsWith(folderPath)) {
      return icon;
    }
  }
  return undefined;
};

const open = defineModel<boolean>({ default: false });

const searchTerm = ref("");
const isMac = computed(() => {
  if (typeof navigator !== "undefined") {
    return navigator.platform.toUpperCase().includes("MAC");
  }
  return false;
});

const modKey = computed(() => (isMac.value ? "⌘" : "Ctrl"));

const keys = useMagicKeys();
const metaK = computed(() => keys["meta+k"]?.value);
whenever(metaK, () => {
  open.value = !open.value;
});

// Trigger full-text search when searchTerm changes
watch(searchTerm, (value) => {
  search(value);
});

// Navigation groups (default view when no search term)
const navGroups = computed(() => {
  if (!navigation.value) return [];

  let sections = navigation.value;

  if (versionPrefix.value) {
    const versionNode = sections.find(
      (s) => s.path === `/${versionPrefix.value}`,
    );
    if (!versionNode?.children) return [];
    sections = versionNode.children;
  }

  return sections
    .filter((s) => s.children && s.children.length > 0)
    .map((folder) => ({
      key: folder.path,
      items: (folder.children ?? [])
        .filter((child) => !child.children)
        .map((child) => ({
          value: child.path,
          label: child.title,
        })),
    }))
    .filter((g) => g.items.length > 0);
});

// Search result group — deduplicated to page level
const searchGroups = computed(() => {
  if (results.value.length === 0) return [];

  const pageMap = new Map<string, { title: string; score: number }>();
  for (const r of results.value) {
    const existing = pageMap.get(r.path);
    if (!existing || r.score > existing.score) {
      pageMap.set(r.path, {
        title: r.titles.length > 0 ? r.titles[0] : r.title,
        score: r.score,
      });
    }
  }

  return [
    {
      key: "results",
      items: [...pageMap.entries()].map(([path, p]) => ({
        value: path,
        label: p.title,
      })),
    },
  ];
});

const groups = computed(() =>
  searchTerm.value ? searchGroups.value : navGroups.value,
);

const handleSelect = (value: string) => {
  open.value = false;
  searchTerm.value = "";
  router.push(value);
};

const handleOpenChange = (value: boolean) => {
  open.value = value;
  if (!value) {
    searchTerm.value = "";
  }
};
</script>

<template>
  <button class="f-search-trigger" @click="open = true">
    <Icon alias="search" />
    <span class="f-search-trigger-text">{{ placeholder }}</span>
    <Kbd>{{ modKey }} + K</Kbd>
  </button>

  <DialogRoot :open="open" @update:open="handleOpenChange">
    <DialogPortal>
      <DialogOverlay class="f-dialog-overlay" />
      <DialogContent class="f-search-content">
        <VisuallyHidden>
          <DialogTitle>Search</DialogTitle>
        </VisuallyHidden>

        <Command
          v-model:search-term="searchTerm"
          :groups="groups"
          :filtered="!!searchTerm"
          :placeholder="placeholder"
          @select="handleSelect"
          @keydown.escape="handleOpenChange(false)"
        >
          <template #input-icon>
            <Icon alias="search" class="f-search-icon" />
          </template>
          <template #group-label="{ group }">
            <Icon
              v-if="group.label && collectionConfig?.navIcons?.[group.label]"
              :alias="collectionConfig!.navIcons![group.label]"
              class="f-search-icon"
            />
            {{ group.label }}
          </template>
          <template #item="{ item }">
            <Icon
              v-if="getIcon(item.value)"
              :alias="getIcon(item.value)!"
              class="f-search-icon"
            />
            <span>{{ item.label }}</span>
            <span v-if="getDescription(item.value)" class="f-command-item-description">
              {{ getDescription(item.value) }}
            </span>
          </template>
        </Command>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

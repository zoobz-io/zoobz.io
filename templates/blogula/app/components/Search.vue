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

const { data: allPosts } = await useAsyncData("search-all-posts", () =>
  queryCollection("posts").order("published", "DESC").all(),
);

const open = ref(false);
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

watch(searchTerm, (value) => {
  search(value);
});

// Deduplicate results to page level
const searchItems = computed(() => {
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

  return [...pageMap.entries()].map(([path, p]) => ({
    value: path,
    label: p.title,
  }));
});

const postDateMap = computed(() => {
  const map = new Map<string, string>();
  if (!allPosts.value) return map;
  for (const post of allPosts.value) {
    const date = post.updated ?? post.published;
    if (date) {
      const raw = typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)
        ? date + "T00:00:00"
        : date;
      map.set(post.path, new Date(raw).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }));
    }
  }
  return map;
});

const allPostItems = computed(() => {
  if (!allPosts.value) return [];
  return allPosts.value.map((post) => ({
    value: post.path,
    label: post.title,
  }));
});

const groups = computed(() => {
  if (searchTerm.value) {
    if (searchItems.value.length === 0) return [];
    return [{ key: "results", items: searchItems.value }];
  }
  return [{ key: "all", items: allPostItems.value }];
});

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
  <slot name="trigger" :open="() => (open = true)">
    <button class="f-search-trigger" @click="open = true">
      <Icon alias="search" />
      <span class="f-search-trigger-text">{{ placeholder }}</span>
      <Kbd>{{ modKey }} + K</Kbd>
    </button>
  </slot>

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
          <template #item="{ item }">
            <span>{{ item.label }}</span>
            <span v-if="postDateMap.get(item.value)" class="f-command-item-description">
              {{ postDateMap.get(item.value) }}
            </span>
          </template>
        </Command>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
definePageMeta({ layout: "dashboard" });

const store = useDocuments();
const { availableFacets, selectedFacets, dateFilters, keywords, query } = store;

// Debounced semantic search
const searchInput = ref(query.value);
let debounceTimer: ReturnType<typeof setTimeout>;

watch(searchInput, (val) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    query.value = val;
    store.page.value = 1;
    store.search();
  }, 400);
});

// Sync back if query changes externally (e.g. applyView)
watch(query, (val) => {
  if (val !== searchInput.value) searchInput.value = val;
});

await useAsyncData("documents", () =>
  Promise.all([store.search(), store.listViews()]),
);

// Column visibility
const allColumns: DataTableColumn<SearchHit>[] = [
  { key: "document_name", label: "Name", sortable: true, sortKey: "name" },
  { key: "mime_type", label: "Type" },
  { key: "summary", label: "Summary" },
  { key: "score", label: "Score" },
  { key: "created_at", label: "Created", sortable: true },
  { key: "updated_at", label: "Updated", sortable: true },
  { key: "document_id", label: "ID" },
  { key: "version_id", label: "Version ID" },
];

const visibleKeys = ref([
  "mime_type", "summary", "created_at", "updated_at",
]);

const columns = computed(() =>
  allColumns.filter((c) => String(c.key) === "document_name" || visibleKeys.value.includes(String(c.key))),
);

const columnPickerItems = computed(() =>
  allColumns
    .filter((c) => String(c.key) !== "document_name")
    .map((c) => ({
      value: String(c.key),
      label: c.label,
    })),
);

// View selector
const viewSelectorOpen = ref(false);

const viewLabel = computed(() =>
  store.activeView.value?.name ?? "All Documents",
);

const viewItems = computed(() =>
  store.views.value.map((v) => ({
    value: v.id,
    label: v.name,
    disabled: v.id === store.activeView.value?.id,
  })),
);

const handleViewSelect = (id: string) => {
  viewSelectorOpen.value = false;
  const view = store.views.value.find((v) => v.id === id);
  if (view) store.applyView(view);
};

const handleClearView = () => {
  viewSelectorOpen.value = false;
  store.clearView();
};

// View CRUD
const handleAddView = async () => {
  const name = prompt("View name:");
  if (name) await store.createView(name);
};

const handleCloneView = () => {
  if (store.activeView.value) store.cloneView(store.activeView.value.id);
};

const handleEditView = async () => {
  if (!store.activeView.value) return;
  const name = prompt("Rename view:", store.activeView.value.name);
  if (name) await store.updateView(store.activeView.value.id, name);
};

const handleDeleteView = async () => {
  if (!store.activeView.value) return;
  if (confirm(`Delete "${store.activeView.value.name}"?`)) {
    await store.deleteView(store.activeView.value.id);
  }
};

// Group active facets by field for header chips
const activeFacetsByField = computed(() => {
  const grouped: Record<string, { key: string; label: string }[]> = {};
  for (const entry of selectedFacets.value) {
    const idx = entry.indexOf(":");
    const field = entry.slice(0, idx);
    const value = entry.slice(idx + 1);
    if (!grouped[field]) grouped[field] = [];
    grouped[field].push({ key: entry, label: value });
  }
  return grouped;
});

const removeFacet = (key: string) => {
  const next = new Set(selectedFacets.value);
  next.delete(key);
  selectedFacets.value = next;
};
</script>

<template>
  <div class="f-page">
    <div class="f-page-header">
      <button class="f-view-selector-btn" @click="viewSelectorOpen = true">
        <H2>{{ viewLabel }}</H2>
        <Icon alias="chevron-down" />
      </button>
      <Dialog
        :open="viewSelectorOpen"
        title="Views"
        description="Select a saved view"
        @update:open="viewSelectorOpen = $event"
      >
        <Command
          :groups="[{ key: 'views', items: viewItems }]"
          placeholder="Search views..."
          @select="handleViewSelect"
          @keydown.escape="viewSelectorOpen = false"
        >
          <template #item="{ item }">
            <Icon v-if="item.disabled" alias="check" />
            <span class="f-command-item-label">{{ item.label }}</span>
          </template>
          <template #empty>
            <span v-if="!viewItems.length">No saved views</span>
            <span v-else>No matching views</span>
          </template>
        </Command>
        <button
          v-if="store.activeView.value"
          class="f-view-clear-btn"
          @click="handleClearView"
        >
          Clear view
        </button>
      </Dialog>
      <div class="f-page-actions">
        <Fab icon="add" label="Save view" @click="handleAddView" />
        <Fab icon="copy" label="Clone view" :disabled="!store.activeView.value" @click="handleCloneView" />
        <Fab icon="edit" label="Edit view" :disabled="!store.activeView.value" @click="handleEditView" />
        <Fab icon="delete" label="Delete view" :disabled="!store.activeView.value" @click="handleDeleteView" />
      </div>
    </div>
    <div class="f-page-content">
      <div class="f-widget">
        <header class="f-widget-header">
          <div class="f-widget-actions">
            <Input v-model="searchInput" placeholder="Search documents..." class="f-widget-search">
              <template #prepend>
                <Icon alias="search" />
              </template>
            </Input>
            <DataKeywords v-model:keywords="keywords" />
            <DataFacets v-model:selected="selectedFacets" :groups="availableFacets" />
            <DataDateFilters v-model:filters="dateFilters" :fields="store.dateFields" />
          </div>
          <MultiSelect
            v-model="visibleKeys"
            :items="columnPickerItems"
            placeholder="Fields"
          />
        </header>
        <div class="f-widget-body">
          <DataTable :store="store" :columns="columns">
            <template #header="{ column, sort }">
              <button
                v-if="column.sortable"
                type="button"
                class="f-data-table-header-btn"
                @click="sort"
              >
                {{ column.label }}
                <Icon
                  v-if="store.sortField.value === String(column.key)"
                  :alias="store.sortDirection.value === 'asc' ? 'chevron-up' : 'chevron-down'"
                  class="f-data-table-sort-icon"
                />
              </button>
              <span v-else class="f-data-table-header">{{ column.label }}</span>
              <template v-if="activeFacetsByField[String(column.key)]">
                <Chip
                  v-for="facet in activeFacetsByField[String(column.key)]"
                  :key="facet.key"
                  closable
                  @close="removeFacet(facet.key)"
                >
                  {{ facet.label }}
                </Chip>
              </template>
            </template>
            <template #cell="{ row, column, value }">
              <Anchor v-if="column.key === 'document_name'" :to="`/documents/${row.document_id}`">
                {{ value }}
              </Anchor>
              <template v-else>{{ value }}</template>
            </template>
          </DataTable>
        </div>
        <DataPagination :store="store" />
      </div>
    </div>
  </div>
</template>

<style>
@import "~/assets/components/page.css";
@import "~/assets/components/table.css";
@import "~/assets/components/widget.css";
@import "~/assets/components/icon.css";
@import "~/assets/components/input.css";
@import "~/assets/components/scroller.css";
@import "~/assets/components/fab.css";
@import "~/assets/components/select.css";
@import "~/assets/components/dialog.css";
@import "~/assets/components/command.css";
@import "~/assets/components/caption.css";
@import "~/assets/components/popover.css";
@import "~/assets/components/chip.css";
@import "~/assets/components/date-filters.css";
@import "~/assets/components/calendar.css";
@import "~/assets/components/segmented-control.css";
@import "~/assets/components/keywords.css";
@import "~/assets/components/a.css";
@import "~/assets/components/tooltip.css";
@import "~/assets/components/multiselect.css";
@import "~/assets/components/checkbox.css";
</style>

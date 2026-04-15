import { defineStore } from "pinia";

export const accessDocumentStore = defineStore("documents", () => {
  const client = useArgus();

  // Data
  const data = ref<SearchHit[]>([]);
  const loading = ref(false);

  // Pagination
  const page = ref(1);
  const pageSize = ref(20);
  const total = ref(0);
  const hasMore = ref(false);
  const pageCount = computed(
    () => Math.ceil(total.value / pageSize.value) || 1,
  );

  const goToPage = (p: number) => {
    page.value = Math.max(1, Math.min(p, pageCount.value));
    search();
  };

  // Sorting
  const sortField = ref<string | null>("created_at");
  const sortDirection = ref<SortDirection>("desc");

  const sort = (field: string) => {
    if (sortField.value === field) {
      sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
    } else {
      sortField.value = field;
      sortDirection.value = "desc";
    }
    page.value = 1;
    search();
  };

  // Search
  const query = ref("");
  const keywords = ref("");
  const match = ref<MatchMode>("all");

  watch(keywords, () => {
    page.value = 1;
    search();
  });

  // Date filters
  const dateFields: DateFieldConfig[] = [
    { key: "created_at", label: "Created" },
    { key: "updated_at", label: "Updated" },
  ];
  const dateFilters = ref<DateFilter[]>([]);

  // Sync dateFilters → API dates format
  function buildDatesFromFilters(): Record<string, { before?: string; after?: string }> {
    const dates: Record<string, { before?: string; after?: string }> = {};
    for (const f of dateFilters.value) {
      const entry: { before?: string; after?: string } = {};
      if (f.operator === "before") {
        entry.before = f.value.toISOString();
      } else if (f.operator === "after") {
        entry.after = f.value.toISOString();
      } else if (f.operator === "between") {
        entry.after = f.value.toISOString();
        if (f.endValue) entry.before = f.endValue.toISOString();
      }
      dates[f.field] = entry;
    }
    return dates;
  }

  watch(dateFilters, () => {
    page.value = 1;
    search();
  }, { deep: true });

  // Facets
  const facets = ref<Record<string, string[]>>({});
  const responseFacets = ref<Record<string, { value: string; count: number }[]>>({});
  const selectedFacets = ref<Set<string>>(new Set());

  // Transform API response facets → FacetGroup[] for Command component
  const availableFacets = computed<FacetGroup[]>(() => {
    return Object.entries(responseFacets.value).map(([key, items]) => ({
      key,
      label: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      items: items.map((item) => ({
        value: `${key}:${item.value}`,
        label: item.value,
        count: item.count,
      })),
    }));
  });

  // Sync selectedFacets Set → facets Record for API (no search trigger — callers handle that)
  function syncFacetsFromSelection() {
    const grouped: Record<string, string[]> = {};
    for (const entry of selectedFacets.value) {
      const idx = entry.indexOf(":");
      const field = entry.slice(0, idx);
      const value = entry.slice(idx + 1);
      if (!grouped[field]) grouped[field] = [];
      grouped[field].push(value);
    }
    facets.value = grouped;
  }

  // Watch selectedFacets for changes from the Command component
  watch(selectedFacets, () => {
    syncFacetsFromSelection();
    page.value = 1;
    search();
  }, { deep: true });

  const clearFacets = () => {
    selectedFacets.value = new Set();
    query.value = "";
    keywords.value = "";
    page.value = 1;
  };

  // Views
  const views = ref<View[]>([]);
  const activeView = ref<View | null>(null);

  async function listViews() {
    const { data: result, response } = await client.GET("/views");
    useApiError(response, "Failed to load views");
    views.value = result?.views ?? [];
  }

  async function createView(name: string) {
    const { data: result, response } = await client.POST("/views", {
      body: { name, query: buildSearchRequest() },
    });
    useApiError(response, "Failed to create view");
    if (result) {
      activeView.value = result;
      await listViews();
    }
    return result ?? null;
  }

  async function updateView(id: string, name: string) {
    const { data: result, response } = await client.PUT("/views/{id}", {
      params: { path: { id } },
      body: { name, query: buildSearchRequest() },
    });
    useApiError(response, "Failed to update view");
    if (result) {
      activeView.value = result;
      await listViews();
    }
    return result ?? null;
  }

  async function deleteView(id: string) {
    const { response } = await client.DELETE("/views/{id}", {
      params: { path: { id } },
    });
    useApiError(response, "Failed to delete view");
    if (activeView.value?.id === id) {
      activeView.value = null;
    }
    await listViews();
  }

  async function cloneView(id: string) {
    const source = views.value.find((v) => v.id === id) ?? activeView.value;
    if (!source) return null;
    return createView(`${source.name} (copy)`);
  }

  function applyView(view: View) {
    activeView.value = view;
    const q = view.query;
    query.value = q.query ?? "";
    keywords.value = q.keywords ?? "";
    match.value = (q.match as MatchMode) ?? "all";
    sortField.value = q.sort?.field ?? "relevance";
    sortDirection.value = (q.sort?.order as SortDirection) ?? "desc";
    pageSize.value = q.page?.size ?? 20;
    page.value = 1;
    // Rebuild selectedFacets from view's facets — the watcher will sync facets + trigger search
    const entries = new Set<string>();
    for (const [field, values] of Object.entries(q.facets ?? {})) {
      for (const v of values) entries.add(`${field}:${v}`);
    }
    selectedFacets.value = entries;
  }

  function clearView() {
    activeView.value = null;
    query.value = "";
    keywords.value = "";
    match.value = "all";
    sortField.value = "created_at";
    sortDirection.value = "desc";
    page.value = 1;
    pageSize.value = 20;
    dateFilters.value = [];
    // Setting selectedFacets triggers the watcher which syncs facets + calls search
    selectedFacets.value = new Set();
  }

  // Detail
  const document = ref<Document | null>(null);

  async function get(id: string) {
    const { data: doc, response } = await client.GET("/documents/{id}", {
      params: { path: { id } },
    });
    useApiError(response, "Document not found");
    document.value = doc ?? null;
    return document.value;
  }

  // Versions
  const versions = ref<DocumentVersion[]>([]);
  const versionsTotal = ref(0);

  async function listVersions(documentId: string) {
    const { data: result, response } = await client.GET(
      "/documents/{document_id}/versions",
      {
        params: { path: { document_id: documentId } },
      },
    );
    useApiError(response, "Failed to load versions");
    versions.value = result?.versions ?? [];
    versionsTotal.value = result?.total ?? 0;
  }

  // Search
  function buildSearchRequest(): SearchRequest {
    return {
      query: query.value,
      keywords: keywords.value,
      match: match.value,
      facets: facets.value,
      dates: buildDatesFromFilters(),
      sort: {
        field: sortField.value ?? "relevance",
        order: sortDirection.value,
      },
      page: {
        from: (page.value - 1) * pageSize.value,
        size: pageSize.value,
      },
    };
  }

  async function search() {
    const { start, finish } = useLoadingIndicator();
    loading.value = true;
    start();
    try {
      const { data: result, response } = await client.POST(
        "/documents/search",
        { body: buildSearchRequest() },
      );
      useApiError(response, "Search failed");
      data.value = result?.hits ?? [];
      total.value = result?.total ?? 0;
      hasMore.value = result?.page?.has_more ?? false;
      responseFacets.value = result?.facets ?? {};
    } finally {
      finish();
      loading.value = false;
    }
    return data.value;
  }

  return {
    // TableStore
    data,
    loading,
    page,
    pageSize,
    pageCount,
    total,
    hasMore,
    goToPage,
    sortField,
    sortDirection,
    sort,
    query,
    keywords,
    match,
    facets,
    availableFacets,
    selectedFacets,
    clearFacets,
    dateFields,
    dateFilters,

    // Detail
    document,
    get,

    // Versions
    versions,
    versionsTotal,
    listVersions,

    // Views
    views,
    activeView,
    listViews,
    createView,
    updateView,
    deleteView,
    cloneView,
    applyView,
    clearView,

    // Actions
    search,
  };
});

export function useDocuments() {
  const store = accessDocumentStore();
  const {
    data,
    loading,
    page,
    pageSize,
    pageCount,
    total,
    hasMore,
    sortField,
    sortDirection,
    query,
    keywords,
    match,
    facets,
    availableFacets,
    selectedFacets,
    dateFilters,
    document,
    versions,
    versionsTotal,
    views,
    activeView,
  } = storeToRefs(store);

  return {
    // TableStore
    data,
    loading,
    page,
    pageSize,
    pageCount,
    total,
    hasMore,
    goToPage: store.goToPage,
    sortField,
    sortDirection,
    sort: store.sort,
    query,
    keywords,
    match,
    facets,
    availableFacets,
    selectedFacets,
    clearFacets: store.clearFacets,
    dateFields: store.dateFields,
    dateFilters,

    // Detail
    document,
    get: store.get,

    // Versions
    versions,
    versionsTotal,
    listVersions: store.listVersions,

    // Views
    views,
    activeView,
    listViews: store.listViews,
    createView: store.createView,
    updateView: store.updateView,
    deleteView: store.deleteView,
    cloneView: store.cloneView,
    applyView: store.applyView,
    clearView: store.clearView,

    // Actions
    search: store.search,
  };
}

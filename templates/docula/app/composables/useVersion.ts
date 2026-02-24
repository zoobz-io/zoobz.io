export const useVersion = () => {
  const route = useRoute();
  const appConfig = useAppConfig();
  const versionConfig = appConfig.version;

  const versions = versionConfig?.versions ?? [];
  const latest = versionConfig?.latest ?? versions[0] ?? "";

  const current = computed(() => {
    const version = route.params.version;
    return typeof version === "string" ? version : "";
  });

  const isLatest = computed(() => {
    return !current.value || current.value === latest;
  });

  return {
    current,
    versions,
    latest,
    isLatest,
  };
};

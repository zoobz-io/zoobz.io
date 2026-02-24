export default defineNuxtRouteMiddleware((to) => {
  const appConfig = useAppConfig();
  const versionConfig = appConfig.version;
  const versions = versionConfig?.versions ?? [];
  const latest = versionConfig?.latest ?? versions[0] ?? "";

  // Root → redirect to latest version
  if (to.path === "/") {
    if (latest) {
      return navigateTo(`/${latest}`, { redirectCode: 302 });
    }
    return;
  }

  // Validate version param exists in known versions
  const version = to.params.version as string;
  if (version && !versions.includes(version)) {
    throw createError({
      statusCode: 404,
      statusMessage: `Unknown version: ${version}`,
      fatal: true,
    });
  }
});

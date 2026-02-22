export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) return;

  const { isAuthenticated, fetchUser, login } = useAuth();

  if (!isAuthenticated.value) {
    await fetchUser();
  }

  if (!isAuthenticated.value) {
    login();
    return abortNavigation();
  }
});

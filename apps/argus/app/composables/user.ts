export function useUser() {
  const { loggedIn, clear } = useUserSession();
  const store = accessUserStore();
  const { initalized, user } = storeToRefs(store);
  return {
    loggedIn,
    initalized,
    user,
    init: store.init,
    refresh: store.refresh,
    login: () => navigateTo("/auth/zitadel", { external: true }),
    logout: async () => {
      await clear();
      navigateTo("/auth/zitadel", { external: true });
    },
  };
}

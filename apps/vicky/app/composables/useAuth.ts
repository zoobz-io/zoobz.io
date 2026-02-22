import type { components } from "#vicky/types";

type User = components["schemas"]["UserResponse"];

const user = ref<User | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

export function useAuth() {
  const isAuthenticated = computed(() => user.value !== null);

  async function fetchUser(): Promise<User | null> {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch("/api/me", {
        credentials: "include",
      });

      if (response.status === 401) {
        user.value = null;
        return null;
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch user: ${response.status}`);
      }

      user.value = await response.json();
      return user.value;
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Unknown error";
      user.value = null;
      return null;
    } finally {
      loading.value = false;
    }
  }

  function login() {
    window.location.href = "/api/auth/github";
  }

  function logout() {
    window.location.href = "/api/auth/logout";
  }

  return {
    user: readonly(user),
    loading: readonly(loading),
    error: readonly(error),
    isAuthenticated,
    fetchUser,
    login,
    logout,
  };
}

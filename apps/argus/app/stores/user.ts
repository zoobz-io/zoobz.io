import { defineStore } from "pinia";

export const accessUserStore = defineStore("user", () => {
  const user = ref<User | null>(null);
  const initialized = ref(false);

  async function init() {
    if (initialized.value) return;

    await refresh();

    initialized.value = true;
    return initialized.value;
  }

  async function refresh() {
    const client = useArgus();

    const { data, response } = await client.GET("/users/me");
    useApiError(response, "Unauthorized");

    user.value = data ?? null;

    return user.value;
  }

  return { user, initialized, init, refresh };
});

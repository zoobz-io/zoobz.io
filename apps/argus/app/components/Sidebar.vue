<script setup lang="ts">
const { navigation } = useAppConfig();
const { init, user, logout } = useUser();
const { mode, theme, themes, setTheme } = useUntheme();

const isDark = computed(() => mode.value === "dark");
const toggleMode = () => {
  mode.value = isDark.value ? "light" : "dark";
};

const themeOpen = ref(false);

const formatLabel = (t: string) =>
  t
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const themeItems = computed(() =>
  themes.value.map((t) => ({
    value: t,
    label: formatLabel(t),
    disabled: t === theme.value,
  })),
);

const handleThemeSelect = (value: string) => {
  themeOpen.value = false;
  setTheme(value);
};

const { error } = await useAsyncData("init:user", init);
if (error.value) {
  console.warn(error.value);
  throw createError({
    status: 403,
    statusText: "Unauthorized",
  });
}
</script>

<template>
  <Aside class="f-sidebar">
    <div class="f-sidebar-logo">
      <AsciiLogo text="Argus" link />
    </div>
    <NuxtLink to="/search" class="f-sidebar-search">
      <Icon alias="search" />
      <span class="f-sidebar-search-text">Search...</span>
      <Kbd>/</Kbd>
    </NuxtLink>
    <nav v-for="group in navigation" :key="group.label" class="f-sidebar-nav">
      <Caption :icon="group.icon">{{ group.label }}</Caption>
      <div class="f-sidebar-nav-group">
        <NuxtLink
          v-for="item in group.options"
          :key="item.to"
          :to="item.to"
          class="f-sidebar-nav-item"
        >
          <Icon v-if="item.icon" :alias="item.icon" />
          <span class="f-sidebar-nav-label">{{ item.label }}</span>
        </NuxtLink>
      </div>
    </nav>
    <div class="f-sidebar-utilities">
      <Caption icon="user">{{ user.email }}</Caption>
      <button class="f-sidebar-nav-item" @click="themeOpen = true">
        <span class="f-sidebar-nav-label">Set Theme</span>
      </button>
      <Dialog
        :open="themeOpen"
        title="Theme"
        description="Select a theme"
        @update:open="themeOpen = $event"
      >
        <Command
          :groups="[{ key: 'themes', items: themeItems }]"
          placeholder="Search themes..."
          @select="handleThemeSelect"
          @keydown.escape="themeOpen = false"
        >
          <template #item="{ item }">
            <Icon v-if="item.disabled" alias="check" />
            <span class="f-command-item-label">{{ item.label }}</span>
          </template>
        </Command>
      </Dialog>
      <button class="f-sidebar-nav-item" @click="toggleMode">
        <span class="f-sidebar-nav-label">{{
          isDark ? "Dark Mode" : "Light Mode"
        }}</span>
      </button>
      <button class="f-sidebar-nav-item f-sidebar-logout" @click="logout">
        <span class="f-sidebar-nav-label">Logout</span>
      </button>
    </div>
  </Aside>
</template>

<style>
@import "~/assets/components/sidebar.css";
@import "~/assets/components/caption.css";
@import "~/assets/components/icon.css";
@import "~/assets/components/kbd.css";
@import "~/assets/components/dialog.css";
@import "~/assets/components/command.css";
@import "~/assets/components/scroller.css";
</style>

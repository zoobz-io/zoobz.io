<script setup lang="ts">
import type { CommandGroup } from "../types/command";
import type { EnrichedProject } from "../types/blogula";
import { projects } from "#blogula/projects";

const search = ref("");
const selected = ref<Set<string>>(new Set());
const filterOpen = ref(false);
const sortOpen = ref(false);
const sortBy = ref("name");

const activeCount = computed(() => selected.value.size);

const sortOptions = [
  { value: "name", label: "Name" },
  { value: "stargazers_count", label: "Stars" },
  { value: "open_issues_count", label: "Issues" },
  { value: "forks_count", label: "Forks" },
  { value: "updated_at", label: "Updated" },
];

const sortGroups = computed<CommandGroup[]>(() => [
  {
    key: "sort",
    items: sortOptions.map((o) => ({
      ...o,
      disabled: o.value === sortBy.value,
    })),
  },
]);

// Build a single group of all unique topics with repo counts
const topicGroups = computed<CommandGroup[]>(() => {
  const counts = new Map<string, number>();
  for (const project of projects) {
    for (const topic of project.topics) {
      counts.set(topic, (counts.get(topic) || 0) + 1);
    }
  }
  const items = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([topic, count]) => ({
      value: topic,
      label: topic,
      count,
    }));
  return [{ key: "topics", items }];
});

// Filter projects by search text and selected topics, then sort
const filtered = computed(() => {
  const q = search.value.toLowerCase().trim();
  const result = projects.filter((p) => {
    if (selected.value.size > 0 && !p.topics.some((t) => selected.value.has(t))) return false;
    if (q && !(
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.topics.some((t) => t.toLowerCase().includes(q))
    )) return false;
    return true;
  });

  const key = sortBy.value as keyof EnrichedProject;
  return [...result].sort((a, b) => {
    const av = a[key];
    const bv = b[key];
    if (typeof av === "string" && typeof bv === "string") {
      return key === "updated_at" ? bv.localeCompare(av) : av.localeCompare(bv);
    }
    if (typeof av === "number" && typeof bv === "number") return bv - av;
    return 0;
  });
});

const handleSort = (value: string) => {
  sortBy.value = value;
  sortOpen.value = false;
};
</script>

<template>
  <div class="f-projects-container">
    <div class="f-projects-toolbar">
      <input
        v-model="search"
        type="text"
        class="f-projects-search"
        placeholder="Search projects..."
      />
      <Popover v-model:open="filterOpen" align="start">
        <Fab icon="filter" :badge="activeCount > 0 ? activeCount : undefined" />
        <template #content>
          <Command
            v-model:selected="selected"
            :groups="topicGroups"
            placeholder="Search topics..."
            multiple
            @keydown.escape="filterOpen = false"
          />
        </template>
      </Popover>
      <Popover v-model:open="sortOpen" align="end">
        <Fab icon="sort" />
        <template #content>
          <Command
            :groups="sortGroups"
            placeholder="Sort by..."
            @select="handleSort"
            @keydown.escape="sortOpen = false"
          />
        </template>
      </Popover>
    </div>
    <div class="f-projects">
      <NuxtLink
        v-for="project in filtered"
        :key="project.name"
        :to="project.html_url"
        external
        target="_blank"
        class="f-projects-card"
      >
        <div class="f-projects-card-header">
          <Icon alias="github" />
          <span class="f-projects-card-title">{{ project.name }}</span>
        </div>
        <span v-if="project.description" class="f-projects-card-description">
          {{ project.description }}
        </span>
        <div class="f-projects-card-footer">
          <div class="f-projects-card-stats">
            <span class="f-projects-card-stat">
              <Icon alias="star" />
              {{ project.stargazers_count }}
            </span>
            <span class="f-projects-card-stat">
              <Icon alias="fork" />
              {{ project.forks_count }}
            </span>
            <span class="f-projects-card-stat">
              <Icon alias="issue" />
              {{ project.open_issues_count }}
            </span>
          </div>
          <span v-if="project.language" class="f-projects-card-language">
            <span class="f-projects-card-language-dot" />
            {{ project.language }}
          </span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

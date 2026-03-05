<script setup lang="ts">
const props = defineProps<{
  capabilities: DoculaLandingCapabilities;
  versionPrefix: string;
}>();

const items = computed(() =>
  props.capabilities.items.map((item) => ({
    ...item,
    link: item.link && !item.link.external
      ? { ...item.link, to: `/${props.versionPrefix}${item.link.to}` }
      : item.link,
  })),
);
</script>

<template>
  <LandingSection :title="capabilities.title" :description="capabilities.description" alt>
    <table class="f-landing-capabilities-table">
      <thead class="sr-only">
        <tr>
          <th>Feature</th>
          <th>Description</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in items"
          :key="item.feature"
          class="f-landing-capability"
        >
          <td>
            <strong class="f-landing-capability-feature">{{ item.feature }}</strong>
          </td>
          <td>{{ item.description }}</td>
          <td v-if="item.link">
            <Anchor :to="item.link.to" class="f-landing-capability-link">
              {{ item.link.label }}
              <Icon alias="arrow-right" />
            </Anchor>
          </td>
        </tr>
      </tbody>
    </table>
  </LandingSection>
</template>

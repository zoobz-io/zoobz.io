<script setup lang="ts">
const appConfig = useAppConfig();

const socials = computed(() => appConfig.socials ?? []);
const copyright = computed(() => appConfig.copyright ?? "");
</script>

<template>
  <Footer>
    <div class="f-blogula-footer">
      <div class="f-blogula-footer-socials">
        <Fab
          v-for="social in socials"
          :key="social.to"
          :icon="social.icon"
          :label="social.label"
          :link="{ label: social.label, to: social.to, external: true, target: '_blank' }"
        />
      </div>
      <span class="f-blogula-footer-copyright">{{ copyright }}</span>
    </div>
  </Footer>
</template>

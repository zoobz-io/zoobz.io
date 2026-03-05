<script setup lang="ts">
const props = defineProps<{ hero: DoculaHero; versionPrefix: string }>();

const action = computed(() => {
  const a = props.hero.action;
  if (!a || a.external) return a;
  return { ...a, to: `/${props.versionPrefix}${a.to}` };
});
</script>

<template>
  <Container>
    <Section>
      <Hero
        :tagline="hero.tagline"
        :tagline-highlight="hero.taglineHighlight"
        :description="hero.description"
        :action="action"
      >
        <template v-if="hero.example" #showcase>
          <CodeExample :code="hero.example.code" :lang="hero.example.lang" />
        </template>
      </Hero>
    </Section>
  </Container>
</template>

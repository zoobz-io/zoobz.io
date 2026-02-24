<script setup lang="ts">
const { collection: collectionConfig } = useAppConfig();

if (!collectionConfig?.key) {
  throw createError({
    statusCode: 500,
    statusMessage:
      "Docula: No collection configured. Define `collection` in app.config.ts",
  });
}

const { current } = useVersion();

useHead({
  title: collectionConfig.title,
});
</script>

<template>
  <div class="f-landing">
    <Container>
      <Section>
        <Hero
          :tagline="collectionConfig.hero.tagline"
          :tagline-highlight="collectionConfig.hero.taglineHighlight"
          :description="collectionConfig.hero.description"
          :action="collectionConfig.hero.action"
        >
          <template v-if="collectionConfig.hero.example" #showcase>
            <CodeExample
              :code="collectionConfig.hero.example.code"
              :lang="collectionConfig.hero.example.lang"
            />
          </template>
        </Hero>
      </Section>
    </Container>
    <template v-if="collectionConfig.landing">
      <template
        v-for="(section, index) in collectionConfig.landing"
        :key="section.type + section.title"
      >
        <div
          class="f-landing-section"
          :class="{ 'f-landing-section-alt': section.type === 'capabilities' || section.type === 'install' }"
        >
          <div class="f-landing-section-inner">
            <LandingCapabilities
              v-if="section.type === 'capabilities'"
              :title="section.title"
              :description="section.description"
              :items="section.items"
            />
            <LandingHighlights
              v-if="section.type === 'highlights'"
              :title="section.title"
              :description="section.description"
              :items="section.items"
            />
            <LandingInstall
              v-if="section.type === 'install'"
              :title="section.title"
              :description="section.description"
              :code="section.code"
              :lang="section.lang"
              :note="section.note"
            />
          </div>
        </div>
      </template>
    </template>
    <Container>
      <Section>
        <ContentTable
          :collection="collectionConfig.key"
          :version-prefix="current"
        />
      </Section>
    </Container>
  </div>
</template>

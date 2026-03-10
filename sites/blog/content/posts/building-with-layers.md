---
title: Building with Nuxt Layers
description: How a layered architecture keeps a growing monorepo manageable.
author: zoobzio
published: 2026-02-10
tags:
  - nuxt
  - architecture
---

Nuxt layers are one of those features that seem simple on the surface but unlock a remarkably powerful composition model.

## The problem

As a project grows, you start repeating yourself — shared components, shared config, shared utilities. Copy-paste works until it doesn't.

## Layers to the rescue

A Nuxt layer is a self-contained unit that can provide components, composables, pages, layouts, plugins, and configuration. Any Nuxt app can extend one or more layers, inheriting everything they offer.

```typescript
export default defineNuxtConfig({
  extends: ["@zoobz.io/prose"],
});
```

That single line gives you a full content rendering pipeline — markdown processing, syntax highlighting, prose components, the lot.

## Composition over inheritance

The real power is stacking layers. A blog template extends prose, which extends blocks. Each layer adds its concern without coupling to the others.

This isn't theoretical — it's how this very site is built.

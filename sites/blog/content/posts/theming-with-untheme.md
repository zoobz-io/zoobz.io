---
title: Theming Done Right
description: A look at runtime theme switching without the usual CSS headaches.
author: zoobzio
published: 2026-03-01
tags:
  - css
  - theming
  - design
---

Most theming systems fall into one of two camps: compile-time token replacement or massive CSS variable sheets. Neither feels quite right.

## The approach

Untheme takes a different path. Themes are defined as structured objects that map semantic tokens to concrete values. At runtime, switching themes is just swapping one set of CSS custom properties for another.

```typescript
const themes = {
  "one-dark": { primary: "#61afef", background: "#282c34" },
  "catppuccin": { primary: "#cba6f7", background: "#1e1e2e" },
};
```

## Why it works

- **No build step** — themes are applied at runtime
- **Semantic tokens** — code references `--sys-primary`, not `#61afef`
- **Easy to extend** — adding a theme is adding an object

The result is a system that's simple to reason about and trivial to extend.

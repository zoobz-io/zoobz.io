---
title: "The Anatomy of a Modern Vue Component"
description: "Building components that are modular, extensible, and generic to adapt to any use case."
date: 2024-07-24
readIn: 20
category: "Nuxt"
---

When we build components, we want to make sure we expose options for granular control over how the component renders, how it is styled, and the data

## One list to rule them all

Let's pretend we have a very basic list component we are wanting to refactor:

```vue
<script setup lang="ts">
defineProps<{
  items: {
    key: string;
    label: string;
  }[];
}>();
</script>

<template>
  <ul class="ml-2">
    <li v-for="item in items" :key="item.key" class="pa-2 font-bold">
      {{ item.label }}
    </li>
  </ul>
</template>
```

This component will render a simple list, but we want a list component that can render any list we need now or might potentially need in the future. There are some simple improvements to exponentially increase our component's capability...

### The power of primitives

[`radix-vue`](https://radix-vue.com) introduces primitive components that allows us to define the underlying markup at runtime, so instead of statically rendering `ul` and `li` elements in our template we can control the markup with passed properties:

```vue
<script setup lang="ts">
import { Primitive } from "radix-vue";
defineProps<{
  items: {
    key: string;
    label: string;
  }[];
}>();
</script>

<template>
  <Primitive as="ul" class="ml-2">
    <Primitive
      v-for="item in items"
      :key="item.key"
      as="li"
      class="pa-2 font-bold"
    >
      {{ item.label }}
    </Primitive>
  </Primitive>
</template>
```

This is a good start, but we want the parent component that invokes our list to be in control of the markup. We need to provide a system that allows a passed prop to override sensible default configurations for each of our elements:

```vue
<script lang="ts">
// `radix-vue` has powerful primitives that define our markup
import { Primitive } from "radix-vue";
import type { PrimitiveProps } from "radix-vue";

// `defu` helps us deeply merge our `markup` config objects
import { defu } from "defu";

/**
 * Markup controller for a list & listItem elements
 */
export type ListMarkup = {
  list: PrimitiveProps;
  listItem: PrimitiveProps;
};

/**
 * List component properties
 */
export interface ListProps {
  items: {
    key: string;
    label: string;
  }[];
  markup?: Partial<ListMarkup>;
}

/**
 * Grab a `list` markup configuration object w/ the option to override defaults
 *
 * @param markupOverride An optional `markup` configuration object
 * @returns A fully-configured `markup` object w/ sensible defaults
 */
export function useListMarkup(markupOverride: Partial<ListMarkup> = {}) {
  return defu(markupOverride, {
    list: {
      as: "ul",
    },
    listItem: {
      as: "li",
    },
  });
}
</script>

<script setup lang="ts">
const props = defineProps<ListProps>();
const markup = useListMarkup(props.markup);
</script>

<template>
  <Primitive v-bind="markup.list" class="ml-2">
    <Primitive
      v-for="item in items"
      :key="item.key"
      v-bind="markup.listItem"
      class="pa-2 font-bold"
    >
      {{ item.label }}
    </Primitive>
  </Primitive>
</template>
```

Cool! This change lets us pass an object (`markup`) to define what HTML is rendered by the component, with defaults that make sense for our list.

We introduced a second `script` tag which holds all of our imports/exports as well a pattern to override a default configuration using [defu](https://github.com/unjs/defu). This pattern defines a markup configuration that can be extended using a new `markup` prop.

The [primitive props](https://www.radix-vue.com/utilities/primitive.html#primitive) we are extending are simple, but this pattern can be used for any `radix-vue` component with more complex configurations.

### Extensible styling

What about our styling? Can we use the same pattern to override the Tailwind classes our component uses?

```vue
<script lang="ts">
// `radix-vue` has powerful primitives that define our markup
import { Primitive } from "radix-vue";
import type { PrimitiveProps } from "radix-vue";

// `defu` helps us deeply merge our `markup` config objects
import { defu } from "defu";

/**
 * Markup controller for a list & listItem elements
 */
export type ListMarkup = {
  list: PrimitiveProps;
  listItem: PrimitiveProps;
};

/**
 * UI slots for a list component classlists
 */
export type ListUI = {
  list: string;
  listItem: string;
};

/**
 * List component properties
 */
export interface ListProps {
  items: {
    key: string;
    label: string;
  }[];
  markup?: Partial<ListMarkup>;
  ui?: Partial<ListUI>;
}

/**
 * Grab a `list` markup configuration object w/ the option to override defaults
 *
 * @param markupOverride An optional `markup` configuration object
 * @returns A fully-configured `markup` object w/ sensible defaults
 */
export function useListMarkup(markupOverride: Partial<ListMarkup> = {}) {
  return defu(markupOverride, {
    list: {
      as: "ul",
    },
    listItem: {
      as: "li",
    },
  });
}

/**
 * Grab a set of UI classes for a `list` component w/ the option to override defaults
 *
 * @param uiOverride An optional `ui` configuration object
 * @returns A fully-configured `ui` object w/ sensible defaults
 */
export function useListUI(uiOverride: Partial<ListUI> = {}) {
  return defu(uiOverride, {
    list: "ml-2",
    listItem: "pa-2 font-bold",
  });
}
</script>

<script setup lang="ts">
const props = defineProps<ListProps>();
const markup = useListMarkup(props.markup);
const ui = useListUI(props.ui);
</script>

<template>
  <Primitive v-bind="markup.list" :class="ui.list">
    <Primitive
      v-for="item in items"
      :key="item.key"
      v-bind="markup.listItem"
      :class="ui.listItem"
    >
      {{ item.label }}
    </Primitive>
  </Primitive>
</template>
```

Now the style of our component can be completely controlled by the parent component to suit any design needs of our application.

> Consider tools like [`tailwind-variants`](https://www.tailwind-variants.org/) & [`tailwind-merge`](https://github.com/dcastil/tailwind-merge) for a more comprehensive feature set

### Generic iterators

Let's turn our attention to the set of options that are iterated to render the list. Do we know that all lists in our application will have `key` and `label` properties the type currently requires? What about iterating over more complex objects?

Our best option is to use a generic type to represent the objects we are iterating over so that the list item type is defined by the object passed to the component. We can do this by adding a type argument to our prop type as well as the `script setup` tag:

```vue
<script lang="ts">
// `radix-vue` has powerful primitives that define our markup
import { Primitive } from "radix-vue";
import type { PrimitiveProps } from "radix-vue";

// `defu` helps us deeply merge our `markup` config objects
import { defu } from "defu";

/**
 * Markup controller for a list & listItem elements
 */
export type ListMarkup = {
  list: PrimitiveProps;
  listItem: PrimitiveProps;
};

/**
 * UI slots for a list component classlists
 */
export type ListUI = {
  list: string;
  listItem: string;
};

/**
 * List component properties
 */
export interface ListProps<Item extends Record<string, any>> {
  items: Item[];
  itemKey: keyof Item;
  itemLabel: keyof Item;
  markup?: Partial<ListMarkup>;
  ui?: Partial<ListUI>;
}

/**
 * Grab a `list` markup configuration object w/ the option to override defaults
 *
 * @param markupOverride An optional `markup` configuration object
 * @returns A fully-configured `markup` object w/ sensible defaults
 */
export function useListMarkup(markupOverride: Partial<ListMarkup> = {}) {
  return defu(markupOverride, {
    list: {
      as: "ul",
    },
    listItem: {
      as: "li",
    },
  });
}

/**
 * Grab a set of UI classes for a `list` component w/ the option to override defaults
 *
 * @param uiOverride An optional `ui` configuration object
 * @returns A fully-configured `ui` object w/ sensible defaults
 */
export function useListUI(uiOverride: Partial<ListUI> = {}) {
  return defu(uiOverride, {
    list: "ml-2",
    listItem: "pa-2 font-bold",
  });
}
</script>

<script setup lang="ts" generic="Item extends Record<string, any>">
const props = defineProps<ListProps<Item>>();
const markup = useListMarkup(props.markup);
const ui = useListUI(props.ui);
</script>

<template>
  <Primitive v-bind="markup.list" :class="ui.list">
    <Primitive
      v-for="item in items"
      :key="item[itemKey]"
      v-bind="markup.listItem"
      :class="ui.listItem"
    >
      {{ String(item[itemLabel]) }}
    </Primitive>
  </Primitive>
</template>
```

Our component is now agnostic as to what the shape of the object is that it accepts, instead requiring the user to supply keys for the `key` and `label` attributes that are directly extended from the available object type!

### Slots, slots, slots!

What about scenarios where we want to render a list of components rather than a single text element? We need the ability to override any given list element with a component, which we can achieve using slots:

```vue
<script lang="ts">
// `radix-vue` has powerful primitives that define our markup
import { Primitive } from "radix-vue";
import type { PrimitiveProps } from "radix-vue";

// `defu` helps us deeply merge our `markup` config objects
import { defu } from "defu";

/**
 * Markup controller for a list & listItem elements
 */
export type ListMarkup = {
  list: PrimitiveProps;
  listItem: PrimitiveProps;
};

/**
 * UI slots for a list component classlists
 */
export type ListUI = {
  list: string;
  listItem: string;
};

/**
 * List component properties
 */
export interface ListProps<Item extends Record<string, any>> {
  items: Item[];
  itemKey?: keyof Item;
  itemLabel?: keyof Item;
  markup?: Partial<ListMarkup>;
  ui?: Partial<ListUI>;
}

/**
 * Grab a `list` markup configuration object w/ the option to override defaults
 *
 * @param markupOverride An optional `markup` configuration object
 * @returns A fully-configured `markup` object w/ sensible defaults
 */
export function useListMarkup(markupOverride: Partial<ListMarkup> = {}) {
  return defu(markupOverride, {
    list: {
      as: "ul",
    },
    listItem: {
      as: "li",
    },
  });
}

/**
 * Grab a set of UI classes for a `list` component w/ the option to override defaults
 *
 * @param uiOverride An optional `ui` configuration object
 * @returns A fully-configured `ui` object w/ sensible defaults
 */
export function useListUI(uiOverride: Partial<ListUI> = {}) {
  return defu(uiOverride, {
    list: "ml-2",
    listItem: "pa-2 font-bold",
  });
}
</script>

<script setup lang="ts" generic="Item extends Record<string, any>">
const props = defineProps<ListProps<Item>>();
const markup = useListMarkup(props.markup);
const ui = useListUI(props.ui);
</script>

<template>
  <Primitive v-bind="markup.list" :class="ui.list">
    <template v-for="item in items">
      <slot
        name="item"
        :item="item"
        :markup="markup.listItem"
        :ui="ui.listItem"
      >
        <Primitive
          v-if="itemKey && itemLabel"
          v-bind="markup.listItem"
          :class="ui.listItem"
        >
          {{ String(item[itemLabel]) }}
        </Primitive>
      </slot>
    </template>
  </Primitive>
</template>
```

Our component now provides a named `item` slot that can accept any component as an input which takes our component from rendering a list of text to rendering a list of anything we can think of. The slot is also passed the `markup` & `ui` configurations that it can optionally take advantage of.

If the slot is not used, we render our original `li` element via the primitive as a default.

## Project organization

One benefit of moving all of our imports and exports into a separate `script` tag is that we can extract all of that code and have it live as a traditional `ts` module file. This will make the types and utility functions available to anything in our application rather than remaining local to the component itself:

```ts
// ~/src/components/list.ts
import type { PrimitiveProps } from "radix-vue";
import { defu } from "defu";

/**
 * Markup controller for a list & listItem elements
 */
export type ListMarkup = {
  list: PrimitiveProps;
  listItem: PrimitiveProps;
};

/**
 * UI slots for a list component classlists
 */
export type ListUI = {
  list: string;
  listItem: string;
};

/**
 * List component properties
 */
export interface ListProps<Item extends Record<string, any>> {
  items: Item[];
  itemKey?: keyof Item;
  itemLabel?: keyof Item;
  markup?: Partial<ListMarkup>;
  ui?: Partial<ListUI>;
}

/**
 * Grab a `list` markup configuration object w/ the option to override defaults
 *
 * @param markupOverride An optional `markup` configuration object
 * @returns A fully-configured `markup` object w/ sensible defaults
 */
export function useListMarkup(markupOverride: Partial<ListMarkup> = {}) {
  return defu(markupOverride, {
    list: {
      as: "ul",
    },
    listItem: {
      as: "li",
    },
  });
}

/**
 * Grab a set of UI classes for a `list` component w/ the option to override defaults
 *
 * @param uiOverride An optional `ui` configuration object
 * @returns A fully-configured `ui` object w/ sensible defaults
 */
export function useListUI(uiOverride: Partial<ListUI> = {}) {
  return defu(uiOverride, {
    list: "ml-2",
    listItem: "pa-2 font-bold",
  });
}
```

We can then simplify our `vue` component significantly:

```vue
<script setup lang="ts" generic="Item extends Record<string, any>">
// ~/src/components/list.vue
import { Primitive } from "radix-vue";
import { useListMarkup, useListUI } from "~/src/components/list";
import type { ListProps } from "~/src/components/list";

const props = defineProps<ListProps<Item>>();
const markup = useListMarkup(props.markup);
const ui = useListUI(props.ui);
</script>

<template>
  <Primitive v-bind="markup.list" :class="ui.list">
    <template v-for="item in items">
      <slot
        name="item"
        :item="item"
        :markup="markup.listItem"
        :ui="ui.listItem"
      >
        <Primitive
          v-if="itemKey && itemLabel"
          v-bind="markup.listItem"
          :class="ui.listItem"
        >
          {{ String(item[itemLabel]) }}
        </Primitive>
      </slot>
    </template>
  </Primitive>
</template>
```

Awesome!

We now have a list component that is modular, extensible, and generic enough to power any list we can think to build and have established a strong pattern we can adapt when building other components.

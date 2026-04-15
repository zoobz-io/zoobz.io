<script setup lang="ts">
defineProps<{
  border?: boolean;
}>();

const { open } = useNavDrawer();
</script>

<template>
  <Nav class="f-nav-desktop">
    <Aside>
      <slot />
    </Aside>
  </Nav>

  <DialogRoot :open="open" @update:open="(v: boolean) => (open = v)">
    <DialogPortal>
      <DialogOverlay class="f-dialog-overlay f-nav-drawer-overlay" />
      <DialogContent class="f-nav-drawer-content">
        <VisuallyHidden>
          <DialogTitle>Navigation</DialogTitle>
        </VisuallyHidden>
        <Nav>
          <Aside>
            <slot />
          </Aside>
        </Nav>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

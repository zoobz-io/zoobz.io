<script setup lang="ts">
const { error: showError, toasts, remove } = useToast();

function handleError(err: unknown) {
  const message = err instanceof Error ? err.message : "Something went wrong";
  showError(message);
}
</script>

<template>
  <TooltipProvider>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  <!--
  <Toaster>
    <NuxtErrorBoundary @error="handleError">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </NuxtErrorBoundary>
    <Toast
      v-for="toast in toasts"
      :key="toast.id"
      :title="toast.title"
      :description="toast.description"
      :variant="toast.variant"
      :duration="toast.duration"
      @close="remove(toast.id)"
    />
  </Toaster>
  -->
  </TooltipProvider>
</template>

import type { ToastVariant } from "@zoobz-io/blocks/types/toast";

export interface ToastItem {
  id: number;
  title?: string;
  description?: string;
  variant: ToastVariant;
  duration?: number;
}

let nextId = 0;

const toasts = ref<ToastItem[]>([]);

export function useToast() {
  function add(toast: Omit<ToastItem, "id">) {
    toasts.value.push({ ...toast, id: nextId++ });
  }

  function remove(id: number) {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  }

  function info(description: string, title?: string) {
    add({ variant: "info", description, title });
  }

  function success(description: string, title?: string) {
    add({ variant: "success", description, title });
  }

  function warning(description: string, title?: string) {
    add({ variant: "warning", description, title });
  }

  function error(description: string, title?: string) {
    add({ variant: "error", description, title });
  }

  return { toasts: readonly(toasts), add, remove, info, success, warning, error };
}

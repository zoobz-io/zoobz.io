const open = ref(false);

export const useNavDrawer = () => {
  const route = useRoute();

  watch(() => route.fullPath, () => {
    open.value = false;
  });

  return { open };
};

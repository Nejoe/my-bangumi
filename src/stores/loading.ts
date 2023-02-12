import { ref } from "vue";
import { defineStore } from "pinia";

export const useLoadingStore = defineStore("loading", () => {
  const isLoading = ref(false);
  function toggleLoading(val: boolean) {
    isLoading.value = val;
  }

  return { isLoading, toggleLoading };
});

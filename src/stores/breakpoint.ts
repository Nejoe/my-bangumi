import { computed } from "vue";
import { defineStore } from "pinia";
import { useDisplay } from "vuetify";

export const useBreakpointStore = defineStore("breakpoint", () => {
  const isMobile = computed(() => {
    return useDisplay().mobile.value;
  });
  return { isMobile };
});

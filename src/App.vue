<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { useTheme, useDisplay } from "vuetify";
import DrawerList from "@/components/DrawerList.vue";
import { useRouter } from "vue-router";
import { useLoadingStore } from "@/stores/loading";
import { storeToRefs } from "pinia";
import { useAlertStore } from "./stores/alert";
import { useBreakpointStore } from "./stores/breakpoint";

const theme = useTheme();
function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark
    ? "myCustomLightTheme"
    : "dark";
}

const router = useRouter();
const goTo = (path: string, query: any) => {
  router.push({
    path,
    query,
  });
};

const drawer = ref();
// 根据屏幕大小初始化侧边栏
const display = useDisplay();
watchEffect(() => {
  if (!display.mobile.value) {
    drawer.value = true;
  } else {
    drawer.value = false;
  }
});
const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const loadingStore = useLoadingStore();
const { isLoading } = storeToRefs(loadingStore);

const alertStore = useAlertStore();
const { alert } = storeToRefs(alertStore);

const { isMobile } = storeToRefs(useBreakpointStore());
const isMobileClass = computed(() => {
  return isMobile.value ? "text-primary" : "bg-primary text-white";
});
</script>
<template>
  <!-- 应用 -->
  <v-app>
    <v-app-bar :elevation="2" :class="isMobileClass" density="compact">
      <template v-slot:prepend>
        <v-app-bar-nav-icon
          v-if="isMobile"
          @click="toggleDrawer"
        ></v-app-bar-nav-icon>
        <v-app-bar-nav-icon
          v-else
          icon="mdi-home"
          @click="goTo('/', null)"
        ></v-app-bar-nav-icon>

        <v-app-bar-title
          v-show="!isLoading"
          @click="
            () => {
              if (isMobile) {
                goTo('/', null);
              }
            }
          "
          >Bangumi</v-app-bar-title
        >
      </template>
      <v-progress-linear
        v-show="isLoading"
        indeterminate
        rounded
        color="secondary"
      ></v-progress-linear>
      <template v-slot:append>
        <v-btn
          icon="mdi-magnify"
          @click="
            () => {
              if (router.currentRoute.value.path !== '/search') {
                goTo('/search', {
                  keywords: '',
                  type: 0,
                  start: 0,
                });
              } else {
                //滚动到顶部
              }
            }
          "
        >
        </v-btn>
      </template>
    </v-app-bar>
    <v-navigation-drawer
      @close-drawer="toggleDrawer"
      :model-value="drawer"
      @update:model-value="(newValue:boolean) => (drawer = newValue)"
    >
      <DrawerList />
      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            class="bg-primary text-white"
            block
            :prepend-icon="
              theme.global.current.value.dark
                ? 'mdi-weather-night'
                : 'mdi-weather-sunny'
            "
            @click="toggleTheme"
          >
            主题切换
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-snackbar
      v-model="alert.show"
      :timeout="alert.duration"
      :color="alert.type"
      position="sticky"
    >
      {{ alert.message }}
    </v-snackbar>
  </v-app>
</template>
<style scoped></style>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { BASE_IMG } from "@/api/index";
const items = reactive([
  {
    title: "动态广场",
    value: "/",
    icon: "mdi-account-group",
  },
  {
    title: "我的进度",
    value: "/myBangumi",
    icon: "mdi-flag",
  },
  {
    title: "每日放送",
    value: "/calendar",
    icon: "mdi-calendar-week",
  },

  {
    title: "关于",
    value: "/about",
    icon: "mdi-information",
  },
]);
const router = useRouter();
const goTo = (path: string) => {
  router.push(path);
};
// const props = defineProps<{
//   drawer: boolean;
// }>();
// const drawer = ref(false);
// watchEffect(() => {
//   drawer.value = props.drawer;
// });

// defineEmits<{
//   (e: "closeDrawer", value: boolean): void;
// }>();
</script>
<template>
  <!-- 侧边栏 -->
  <v-list>
    <v-list-item
      :prepend-avatar="BASE_IMG"
      title="Sandra Adams"
      subtitle="个人签名"
    ></v-list-item>
  </v-list>
  <v-divider></v-divider>
  <v-list density="comfortable" nav>
    <v-list-item
      v-for="item in items"
      :key="item.value"
      :value="item.value"
      color="primary"
      @click="goTo(item.value)"
    >
      <template v-slot:prepend>
        <v-icon :icon="item.icon"></v-icon>
      </template>
      <v-list-item-title>{{ item.title }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

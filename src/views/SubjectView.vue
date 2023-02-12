<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useGetSubject } from "@/api/getData";
import type { subject } from "@/types";
import { BASE_IMG } from "@/api";
const route = useRoute();
const routeID = ref<number>(parseInt(route.params.id as string));

const subjectData = reactive<subject>({
  date: "",
  platform: "",
  images: {
    common: BASE_IMG,
    large: BASE_IMG,
    medium: BASE_IMG,
    small: BASE_IMG,
    grid: BASE_IMG,
  },
  summary: "",
  name: "",
  name_cn: "",
  tags: [],
  infobox: [],
  rating: {
    count: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
    },
    score: 0,
    total: 0,
  },
  total_episodes: 0,
  collection: {
    doing: 0,
    on_hold: 0,
    dropped: 0,
    wish: 0,
    collect: 0,
  },
  id: 0,
  eps: 0,
  volumes: 0,
  locked: false,
  nsfw: false,
  type: 2,
});

watch(
  () => route.params.id,
  (newVal) => {
    routeID.value = parseInt(newVal as string);
    useGetSubject(routeID.value, (res: any) => {
      Object.assign(subjectData, res);
      console.log(subjectData);
    });
  },
  { immediate: true }
);
</script>
<template>
  <v-container>
    <v-row>
      <v-col>{{ subjectData.summary }}</v-col>
    </v-row>
  </v-container>
</template>

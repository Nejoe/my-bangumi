<script setup lang="ts">
import { useGetCalendar } from "@/api/getData";
import { reactive, onBeforeMount } from "vue";
import TimelineList from "@/components/TimelineList.vue";
import type { dayType } from "@/types";

const weekList: dayType[] = reactive([]);
onBeforeMount(() => {
  useGetCalendar((res: any) => {
    // weekList.value = res;
    // 复制数组
    weekList.push(...res.splice(0, 7));
    console.log("weekList", weekList);
  });
});
</script>
<template>
  <v-container fluid>
    <v-row justify="space-between">
      <v-col v-for="day in weekList" :key="day.weekday.id" justify="center">
        <TimelineList :day="day"
      /></v-col>
    </v-row>
  </v-container>
</template>

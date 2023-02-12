<script setup lang="ts">
import { computed } from "vue";
import { BASE_IMG } from "@/api/index";
import type { dayType } from "@/types";
// 接收参数
const props = defineProps<{
  day: dayType;
}>();
const isToday = computed(() => {
  // 获取时间星期几
  const weekday = new Date().getDay();
  // 判断是否是今天
  if (weekday === props.day.weekday.id) {
    return true;
  } else {
    return false;
  }
});
const textColor = computed(() => {
  return isToday.value ? "text-primary" : "";
});
// const bgColor = computed(() => {
//   return isToday.value ? "bg-primary-lighten-3" : "";
// });
</script>
<template>
  <div :class="textColor">
    {{ props.day.weekday.cn }}
  </div>
  <!-- <v-list :class="bgColor">
    <v-list-item
      v-for="bangumi in props.day.items"
      :key="bangumi.id"
      min-height="200"
    > -->
  <v-sheet
    v-for="bangumi in props.day.items"
    :key="bangumi.id"
    :rounded="true"
    elevation="12"
  >
    <v-hover>
      <template v-slot:default="{ isHovering, props }">
        <v-sheet>
          <v-card
            v-bind="props"
            max-height="200"
            style="margin: 10px 0"
            :color="isHovering ? 'primary' : undefined"
          >
            <v-lazy
              :options="{
                threshold: 0.5,
              }"
              transition="fade-transition"
            >
              <v-img
                max-height="123"
                :src="bangumi.images.large"
                :lazy-src="BASE_IMG"
                cover
              >
                <template v-slot:placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular
                      indeterminate
                      color="primary"
                    ></v-progress-circular>
                  </div>
                </template>
              </v-img>
            </v-lazy>
            <v-card-title :class="textColor">
              {{ bangumi.name
              }}<v-tooltip activator="parent" location="top">{{
                bangumi.name
              }}</v-tooltip>
            </v-card-title>
            <v-card-subtitle> {{ bangumi.name_cn }} </v-card-subtitle>
          </v-card>
        </v-sheet>
      </template>
    </v-hover>
  </v-sheet>
  <!-- </v-list-item>
  </v-list> -->
</template>

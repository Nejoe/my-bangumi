<script setup lang="ts">
import { BASE_IMG } from "@/api";
import { useBreakpointStore } from "@/stores/breakpoint";
import { storeToRefs } from "pinia";
import type { bangumi } from "@/types";
import { subjectIcon } from "@/types";
import { computed } from "vue";
import { useRouter } from "vue-router";
const props = defineProps<{
  subjectList: bangumi[];
}>();
const { isMobile } = storeToRefs(useBreakpointStore());
const size = computed(() => (isMobile.value ? "x-small" : "small"));
const icons = Object.values(subjectIcon);
const isMobileClass = computed(() => {
  return isMobile.value ? ["px-0", "mx-1"] : ["py-5", "mx-4"];
});

const router = useRouter();
const goToSubject = (id: number) => {
  router.push({
    path: `/subject/${id}`,
  });
};
</script>

<template>
  <v-list :class="isMobileClass[0]">
    <v-sheet
      v-for="subject in props.subjectList"
      :key="subject.id"
      elevation="3"
      :class="isMobileClass[1]"
    >
      <v-list-item :rounded="!isMobile" min-height="180">
        <!-- 封面 -->
        <template v-slot:prepend>
          <v-sheet elevation="3" @click="goToSubject(subject.id)">
            <!-- <v-lazy
            :options="{
              threshold: 0.2,
            }"
            transition="scroll-x-transition"
          > -->
            <v-img
              min-width="85"
              cover
              :src="subject.images?.common || BASE_IMG"
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
            <!-- </v-lazy> -->
          </v-sheet>
        </template>
        <!-- 信息 -->
        <v-sheet class="pl-2">
          <!-- 标题 -->
          <v-list-item-title class="d-flex align-center pb-2">
            <v-sheet class="d-flex align-center">
              <!-- <v-tooltip v-if="isMobile" activator="parent" location="top">
                {{ subject.name_cn || subject.name }}
              </v-tooltip> -->
              <v-icon :icon="icons[subject.type]" size="small" color="primary">
              </v-icon>
              <v-sheet
                class="text-secondary text-body truncate hover"
                @click="goToSubject(subject.id)"
              >
                {{ subject.name_cn || subject.name }}
              </v-sheet>
            </v-sheet>

            <v-spacer></v-spacer>

            <!-- 排名 -->
            <v-sheet v-if="subject.rank" class="d-flex justify-end">
              <v-chip color="secondary-darken-2" :size="size">
                Rank&nbsp;{{ subject.rank }}
              </v-chip>
            </v-sheet>
          </v-list-item-title>

          <!-- 副标题 -->
          <v-list-item-subtitle
            v-if="!subject.name || subject.name_cn"
            class="pb-2 d-block text-truncate"
          >
            <!-- <v-tooltip v-if="isMobile" activator="parent" location="top">
              {{ subject.name_cn ? subject.name : "" }}
            </v-tooltip> -->
            {{ subject.name_cn ? subject.name : "" }}
          </v-list-item-subtitle>

          <!-- 简介 -->
          <v-sheet class="d-flex align-center pb-1">
            <!-- <v-sheet class="text-body-2 truncate">
            {{ subject.summary }}
          </v-sheet> -->
            <v-sheet
              v-if="subject.air_date !== '0000-00-00'"
              class="text-body-2 truncate"
            >
              {{ subject.air_date }}
            </v-sheet>

            <v-spacer></v-spacer>

            <!-- 收藏 -->
            <v-btn
              prepend-icon="mdi-tag-plus-outline"
              :size="size"
              color="primary"
              variant="outlined"
            >
              收藏
            </v-btn>
          </v-sheet>
          <!-- 评分 -->
          <v-sheet class="d-flex flex-column align-start pb-2">
            <v-rating
              v-if="subject.rating && subject.rating.total >= 10"
              v-model="subject.rating.halfScore"
              half-increments
              length="5"
              readonly
              color="grey-lighten-1"
              active-color="orange"
              density="compact"
              size="small"
            ></v-rating>
            <v-sheet class="d-flex align-center">
              <v-sheet
                v-if="subject.rating && subject.rating.total >= 10"
                class="text-orange text-body-2"
                >{{ subject.rating.score }}
              </v-sheet>
              <v-sheet class="text-grey-lighten-1 text-body-2">
                {{
                  subject.rating === undefined
                    ? "暂无评分"
                    : subject.rating.total < 10
                    ? "(少于10人评分)"
                    : `(${subject.rating.total}人评分)`
                }}
              </v-sheet>
            </v-sheet>
          </v-sheet>
        </v-sheet>
      </v-list-item>
    </v-sheet>
  </v-list>
</template>
<style scoped>
.v-list > .v-sheet:not(:last-child) {
  margin-bottom: 16px;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-line;
  display: -webkit-box;
  /* 最多显示行数 */
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.hover:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>

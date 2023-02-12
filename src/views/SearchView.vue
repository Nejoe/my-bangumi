<script setup lang="ts">
import { useSearch } from "@/api/getData";
import { reactive, ref, computed, watch } from "vue";
import { useBreakpointStore } from "@/stores/breakpoint";
import SubjectList from "@/components/SubjectList.vue";
import { useRoute, useRouter } from "vue-router";
import type { bangumi, subjectType } from "@/types";
import { subjectIcon } from "@/types";
import { storeToRefs } from "pinia";

// 类型没有5!
const selectList = reactive([
  { title: "全部", value: 0 },
  { title: "书籍", value: 1 },
  { title: "动画", value: 2 },
  { title: "音乐", value: 3 },
  { title: "游戏", value: 4 },
  { title: "三次元", value: 6 },
]);
const icons = [
  subjectIcon.all,
  subjectIcon.book,
  subjectIcon.anime,
  subjectIcon.music,
  subjectIcon.game,
  subjectIcon.null,
  subjectIcon.real,
];

const tab = ref<number>(0);
const router = useRouter();
const handleSearch = () => {
  currentPage.value = 1;
  select.value = tab.value;
  router
    .push({
      path: "/search",
      query: {
        keywords: input.value,
        type: select.value,
        start: (currentPage.value - 1) * pageSize.value,
      },
    })
    .then((err) => {
      // 导航到当前路由会报错，替换为搜索
      if (err) {
        search();
      }
    });
};

const route = useRoute();
const input = ref<string>((route.query.keywords as string) || "");
const focus = ref<boolean>(input.value ? false : true);
const select = ref<subjectType>(parseInt(route.query.type as string) || 0);
const pageChange = (page: number) => {
  currentPage.value = page;
  router.push({
    path: "/search",
    query: {
      keywords: route.query.keywords as string,
      type: parseInt(route.query.type as string),
      start: (currentPage.value - 1) * pageSize.value,
    },
  });
};

// 分页
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const totalPage = ref<number>(1);
const totalVisible = computed<number>(() => {
  return Math.min(totalPage.value, isMobile.value ? 6 : 8);
});
const isSinglePage = computed<boolean>(() => {
  return totalPage.value <= 1;
});

const doneSearch = ref<boolean>(false);
const subjectList = reactive<bangumi[]>([]);
const search = () => {
  if (!route.query.keywords) {
    return;
  }
  doneSearch.value = true;
  // 使路由参数与输入框保持一致
  input.value = route.query.keywords as string;
  select.value = parseInt(route.query.type as string);
  tab.value = select.value;

  // 初始化值
  currentPage.value =
    parseInt(route.query.start as string) / pageSize.value + 1;
  // subjectList.splice(0, subjectList.length);
  totalPage.value = 1;
  // focus.value = false;

  const param = {
    type: parseInt(route.query.type as string),
    keywords: route.query.keywords as string,
    start: parseInt(route.query.start as string),
  };
  useSearch(param, (res: any) => {
    console.log(res);
    totalPage.value = Math.ceil((res.results || 0) / pageSize.value);
    // 一次性赋值，并更改其中部分属性
    subjectList.splice(
      0,
      subjectList.length,
      ...res.list.map((subject: bangumi) => {
        if (subject.rating) {
          subject.rating.halfScore = subject.rating.score / 2;
        }
        return subject;
      })
    );
  });
};

// 操作引起路由参数变化，路由变化引起搜索
watch(
  [() => route.query],
  () => {
    search();
  },
  { immediate: true, deep: true }
);

const { isMobile } = storeToRefs(useBreakpointStore());
const justify = computed(() => {
  return isMobile.value ? "space-evenly" : "center";
});
const cols = computed(() => {
  return isMobile.value ? [4, 12, 12] : [2, 6, 11];
});
const isMobileClass = computed(() => {
  return isMobile.value ? "" : "";
});
</script>
<template>
  <v-container :class="isMobileClass">
    <v-row :justify="justify" align-self="center" :no-gutters="isMobile">
      <!-- <v-col :cols="cols[0]">
        <v-select
          label="类型"
          v-model="select"
          @update:model-value="handleSearch"
          :items="selectList"
          variant="outlined"
          density="compact"
        ></v-select>
      </v-col> -->
      <v-col :cols="cols[1]">
        <v-text-field
          ref="keywords"
          v-model="input"
          variant="outlined"
          density="compact"
          label="条目名称"
          append-inner-icon="mdi-magnify"
          hide-details
          :autofocus="focus"
          @click:append-inner="handleSearch"
          @keydown.enter="handleSearch"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-show="doneSearch">
      <v-col>
        <v-tabs v-model="tab" @update:model-value="handleSearch" grow>
          <v-tab
            class="text-primary"
            v-for="select in selectList"
            :key="select.value"
            :value="select.value"
          >
            <v-icon>{{ icons[select.value] }}</v-icon
            >{{ select.title }}
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>

    <v-row justify="center" v-show="subjectList.length" no-gutters>
      <v-col :cols="cols[2]">
        <SubjectList :subjectList="subjectList" />
      </v-col>
    </v-row>
    <v-row v-show="!isSinglePage">
      <v-col>
        <v-pagination
          v-model="currentPage"
          @update:model-value="pageChange"
          :length="totalPage"
          :total-visible="totalVisible"
          :density="isMobile ? 'compact' : 'comfortable'"
          color="primary"
          rounded="circle"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<style></style>

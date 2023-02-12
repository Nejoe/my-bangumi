import { getData } from "@/api";
import { useLoadingStore } from "@/stores/loading";
import { useAlertStore } from "@/stores/alert";
import type { subjectType } from "@/types";

const { setAlert } = useAlertStore();
const useGet = (url: string, call: Function) => {
  useLoadingStore().toggleLoading(true);
  getData(url)
    .then((res) => {
      new Promise<void>((resolve) => {
        call(res);
        resolve();
      }).catch((error) => {
        console.log("回调执行出错", error);
        setAlert({ type: "error", message: "返回结果出错，请重试" });
      });
    })
    .catch((error) => {
      console.log("请求出错", error);
      setAlert({ type: "error", message: "请求出错，请重试" });
    })
    .finally(() => {
      setTimeout(() => {
        useLoadingStore().toggleLoading(false);
      }, 500);
    });
};

export const useSearch = (
  data: {
    keywords: string;
    type: subjectType;
    responseGroup?: string;
    start?: number;
    max_results?: number;
  },
  call: Function
) => {
  const url = `/search/subject/${data.keywords}?type=${
    data.type
  }&responseGroup=${data.responseGroup || "large"}&start=${
    data.start || 0
  }&max_results=${data.max_results || 10}`;
  useGet(url, call);
};

export const useGetCalendar = (call: Function) => {
  useGet("/calendar", call);
};

export const useGetSubject = (id: number, call: Function) => {
  useGet(`/v0/subjects/${id}`, call);
};

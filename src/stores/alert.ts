import { ref } from "vue";
import { defineStore } from "pinia";
type AlertType = {
  type?: "error" | "success" | "warning" | "info" | undefined;
  message?: string;
  show?: boolean;
  duration?: number;
  variant?:
    | "text"
    | "flat"
    | "elevated"
    | "tonal"
    | "outlined"
    | "plain"
    | undefined;
};
export const useAlertStore = defineStore("alert", () => {
  const alert = ref<AlertType>({
    type: "success",
    message: "",
    show: false,
    duration: 0,
    variant: "text",
  });
  function setAlert(options: AlertType) {
    alert.value = {
      type: options.type,
      message: options.message,
      show: options.show || true,
      duration: options.duration || 2000,
      variant: options.variant,
    };
  }
  return { alert, setAlert };
});

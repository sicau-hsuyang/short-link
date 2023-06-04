import { ElMessage } from "element-plus";
import dayjs from "dayjs";

export function useMessage() {
  return (options: string | Record<string, unknown>) => {
    const mergedOptions = typeof options === "string" ? { message: options } : options;
    ElMessage(mergedOptions);
  };
}

export function useFormatter() {
  function formatTime(v: string | number) {
    console.log(v);
    if (v === "" || v === undefined || v === null) {
      return "--";
    }
    return dayjs(v).format("YYYY-MM-DD hh:mm:ss");
  }

  return {
    formatTime,
  };
}

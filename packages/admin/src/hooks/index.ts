import { ElMessage, ElMessageBox } from "element-plus";
import dayjs from "dayjs";

interface MessageBoxOptions {
  message: string;
}

export function useMessage() {
  return (options: string | Record<string, unknown>) => {
    const mergedOptions = typeof options === "string" ? { message: options } : options;
    ElMessage(mergedOptions);
  };
}

export function useMessageBox() {
  return function messageBox(options: string | MessageBoxOptions) {
    const normalizedOptions =
      typeof options === "string"
        ? {
            message: options,
          }
        : options;
    const mergedOptions = Object.assign(
      {
        title: "提示",
        message: "你确定要操作吗?",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      },
      normalizedOptions
    );
    return new Promise<boolean>((resolve) => {
      ElMessageBox.confirm(mergedOptions.message, mergedOptions.title, {
        confirmButtonText: mergedOptions.confirmButtonText,
        cancelButtonText: mergedOptions.cancelButtonText,
        type: mergedOptions.type,
      })
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          resolve(false);
        });
    });
  };
}

export function useFormatter() {
  function formatTime(v: string | number) {
    if (v === "" || v === undefined || v === null) {
      return "--";
    }
    return dayjs(v).format("YYYY-MM-DD hh:mm:ss");
  }

  return {
    formatTime,
  };
}

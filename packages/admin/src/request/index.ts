import axios, { InternalAxiosRequestConfig } from "axios";
import type { AxiosRequestConfig } from "axios";
import qs from "qs";
const symbolJson = "__cb__request_json__";

interface ServerResponse<T> {
  code: number;
  data: T;
  msg: string;
}

const instance = axios.create({
  timeout: 63 * 1000,
  transformRequest: [
    function (data, headers) {
      // 对于FormData不进行任何转换
      if (data instanceof FormData) {
        return data;
      }
      // 指定以JSON的形式传递给后端
      if (data?.[symbolJson] === true) {
        headers["Content-Type"] = "application/json; charset=utf-8";
        // 删除这个临时字段，不发送给后端
        delete data?.[symbolJson];
        return JSON.stringify(data);
      }
      // 以www-urlencoded的形式传递给后端
      return qs.stringify(data);
    },
  ],
});

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig & { json?: boolean }) => {
    if (config.json) {
      config.data[symbolJson] = true;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use((response) => {
  if (response.status >= 200 && response.status < 300) {
    if (response.config.responseType !== "blob") {
      return response.data;
    } else {
      return response;
    }
  }
});

export const get = <Data = null>(url: string, params: Record<string, any> = {}, config: AxiosRequestConfig = {}) => {
  return instance.get<Data, ServerResponse<Data>>(url, Object.assign({ params: params }, config));
};

export const post = <Data = null>(url: string, data: Record<string, any> = {}, config: AxiosRequestConfig & { json?: boolean } = {}) => {
  return instance.post<Data, ServerResponse<Data>>(url, data, config);
};

export const put = <Data = null>(url: string, data: Record<string, any> = {}, config: AxiosRequestConfig & { json?: boolean } = {}) => {
  return instance.put<Data, ServerResponse<Data>>(url, data, config);
};

export const del = <Data = null>(url: string, params: Record<string, any> = {}, config: AxiosRequestConfig = {}) => {
  return instance.delete<Data, ServerResponse<Data>>(url, Object.assign({ params: params }, config));
};

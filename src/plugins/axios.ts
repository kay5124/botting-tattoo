import type { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import axios from "axios";
import qs from "qs";
import { Notify } from "quasar";
import router from "../router/router";
// import i18n from "./i18n";
import { sleep } from "@/utils/globalFns";

// 全局配置
const VITE_BASE_API = import.meta.env.VITE_API_URL;

const service: AxiosInstance = axios.create({
  baseURL: VITE_BASE_API,
  timeout: 10 * 1000, // 請求超時時間
  withCredentials: false,
  headers: {
    // 'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*", //允許跨域
  },
});

// 請求攔截器
service.interceptors.request.use(
  (config) => {
    const { method, data, headers, url } = config;
    if (["post", "put", "delete"].includes(method?.toLowerCase()) && !(data instanceof FormData)) {
      config.data = qs.parse(data); //序列化
    }

    const token = localStorage.getItem("token");
    const isLangApi = /lang$/.test(url) || /json$/.test(url);
    /** 不是戳語系的API才加上lang的設定 */
    if (!isLangApi) {
      headers.lang = "zh-CN";
    }
    // if (token && headers) headers.Authorization = `Bearer ${token}`;
    if (token && headers) headers.Authorization = `${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error.data.error.message);
  },
);

// 響應攔截器
service.interceptors.response.use(
  async (res: AxiosResponse<any>) => {
    const noUseNotify = (res.config as any)?.noUseNotify ?? false;
    // 對響應數據進行處理，例如檢查統一的字段（如 statusCode
    if (res.status === 200 || res.data.statusCode === 200) {
      if (["post", "put", "delete"].includes(res.config.method?.toLowerCase())) {
        if (!noUseNotify) {
          Notify.create({
            type: "positive",
            position: "top-right",
            message: "成功",
            timeout: 2000,
            progress: true,
          });
        }
      }
      return Promise.resolve(res);
    }
    return Promise.reject(res);
  },
  (error) => {
    // const noUseNotify = error.config?.noUseNotify ?? false;

    if (error.response && error.response.status) {
      if (error.response.status === 400 && (error.response.data.msg === "InvalidToken" || error.response.data.msg === "TokenExpired" || error.response.data.msg.includes("Unauthorization"))) {
        window.location.href = "/login";
      }

      // 錯誤的話還是都通知
      Notify.create({
        color: "red",
        position: "top",
        message: error.response.data.msg,
        icon: "dangerous",
        timeout: 2000,
      });
      return Promise.reject(error);
    }

    Notify.create({
      color: "red",
      position: "top",
      message: "NetworkFailed",
      icon: "wifi_off",
      timeout: 1500,
    });

    return Promise.reject(new Error("NetworkFailed"));
  },
);

const request = {
  get<T = any>(url: string, data?: any): Promise<T> {
    return request.request("GET", url, { params: data });
  },
  post<T = any>(url: string, data?: any, options?): Promise<T> {
    return request.request("POST", url, { data }, options);
  },
  put<T = any>(url: string, data?: any): Promise<T> {
    return request.request("PUT", url, { data });
  },
  delete<T = any>(url: string, data?: any): Promise<T> {
    return request.request("DELETE", url, { params: data });
  },
  request<T = any>(method = "GET", url: string, data?: any, options?: any): Promise<T> {
    return new Promise((resolve, reject) => {
      service({ method, url, ...data, ...options })
        .then((res) => {
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          reject(e);
        });
    });
  },
  awaitGet<T = any>(url: string, data?: any): any {
    return new Promise((resolve, reject) => {
      request
        .request("GET", url, { params: data })
        .then((r) => resolve(r))
        .catch((err) => reject(err.response));
    });
  },
  awaitPost<T = any>(url: string, data?: any): any {
    return new Promise((resolve, reject) => {
      request
        .request("POST", url, { data })
        .then((r) => resolve(r))
        .catch((err) => reject(err.response));
    });
  },
};

export default request;

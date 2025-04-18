/*
 * @Author: yangheng 799644162@qq.com
 * @Date: 2025-04-18 16:23:04
 * @LastEditors: yangheng 799644162@qq.com
 * @LastEditTime: 2025-04-18 20:44:00
 * @FilePath: \vue3-api-demo\src\api\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "axios";
import Cookies from "js-cookie";
// axios.defaults.withCredentials = true;

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  responseType: "json",
  withCredentials: true,
  credentials: "include",
});
// 配置请求拦截器
apiClient.interceptors.request.use(
  async (config) => {
    // 从 Cookie 中获取指定的变量，这里以 'XSRF-TOKEN' 为例
    const xsrfToken = Cookies.get("XSRF-TOKEN");
    if (xsrfToken) {
      // 设置请求头中的 XSRF-TOKEN
      config.headers["X-XSRF-TOKEN"] = xsrfToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 配置响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    const newCsrfToken = response.headers; // 从响应头中获取新的 CSRF 令牌
 
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export const getCsrfToken = async () => {
  await apiClient.get("/csrf-cookie");
};

// 获取服务器及客户端基本信息
export const getBasicInfo = async () => {
  try {
    const response = await apiClient.get("/");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// 登录
export const login = async (credentials) => {
  try {
    await getCsrfToken();
  

    const response = await apiClient.post("/login", credentials);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// 登出
export const logout = async () => {
  try {
    const csrfToken = await getCsrfToken();
    const response = await apiClient.post(
      "/logout",
      {},
      {
        headers: {
          "X-CSRF-Token": csrfToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// 获取用户资料
export const getUserProfile = async () => {
  try {
    const response = await apiClient.get("/api/user");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// 处理 API 错误
const handleApiError = (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        console.error("Bad Request:", error.response.data);
        break;
      case 401:
        console.error("Unauthorized:", error.response.data);
        break;
      case 403:
        console.error("Forbidden:", error.response.data);
        break;
      case 404:
        console.error("Not Found:", error.response.data);
        break;
      case 500:
        console.error("Internal Server Error:", error.response.data);
        break;
      default:
        console.error("Unknown Error:", error.response.data);
    }
  } else if (error.request) {
    console.error("No response received:", error.request);
  } else {
    console.error("Error setting up request:", error.message);
  }
  throw error;
};

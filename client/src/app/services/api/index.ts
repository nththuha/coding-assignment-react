import axios, { AxiosRequestConfig, Method } from "axios";
import logger from "../logger";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function request<T>(
  method: Method,
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T | null> {
  try {
    const res = await api.request<T>({ method, url, data, ...config });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error(
        `API Error: ${method} ${url}`,
        error.response?.status,
        error.response?.data || error.message
      );
    } else {
      logger.error(`Unexpected Error: ${method} ${url}`, error);
    }
    return null;
  }
}

import axios, { Method } from "axios";
import logger from "../logger";

type RequestProps = {
  method: Method;
  url: string;
  data?: Record<string, unknown>;
};

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function request<T>({
  method,
  url,
  data,
}: RequestProps): Promise<T | null> {
  try {
    const res = await api.request<T>({ method, url, data });

    if (res.status === 204) {
      return null;
    }

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error(`[api-error] - ${method} - ${url}: ${error.response}`);
    } else {
      logger.error(`[unexpected-error] - ${method} - ${url}: ${error}`);
    }
    return null;
  }
}

import axios from "axios";
import { REQUEST_URL } from "../constants";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || REQUEST_URL;

let configured = false;

export function configureApiClient() {
  if (configured) return;
  configured = true;

  axios.interceptors.request.use((config) => {
    if (config.url?.startsWith(REQUEST_URL) && API_BASE_URL !== REQUEST_URL) {
      config.url = `${API_BASE_URL}${config.url.slice(REQUEST_URL.length)}`;
    }

    if (!config.headers?.Authorization) {
      const token = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("token="))
        ?.slice("token=".length);

      if (token) {
        config.headers.Authorization = `Bearer ${decodeURIComponent(token)}`;
      }
    }

    return config;
  });

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        window.dispatchEvent(new Event("moa:auth-expired"));
      }
      return Promise.reject(error);
    }
  );
}

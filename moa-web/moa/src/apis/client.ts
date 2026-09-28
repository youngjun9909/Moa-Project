import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

let configured = false;

export function configureApiClient() {
  if (configured) return;
  configured = true;

  axios.interceptors.request.use((config) => {
    if (config.url?.startsWith("http://localhost:8080")) {
      config.url = `${API_BASE_URL}${config.url.slice("http://localhost:8080".length)}`;
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

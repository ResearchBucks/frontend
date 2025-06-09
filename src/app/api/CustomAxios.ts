import axios from "axios";
import { store } from "@/lib/redux/store";
import { clearAuth } from "@/lib/redux/authSlice";

const CustomAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  timeout: 100000,
});

CustomAxios.interceptors.request.use(
  (req) => {
    const state = store.getState();
    console.log("Full auth state in interceptor:", state.auth);

    const accessToken = state.auth.ACCESSTOKEN;

    console.log("Request made with access token:", accessToken);

    if (accessToken) {
      req.headers["token"] = accessToken;
      req.headers["Authorization"] = `Bearer ${accessToken}`;
    } else {
      console.warn("No access token found in state:", state.auth);
    }

    return req;
  },
  (err) => {
    console.error("Request interceptor error:", err);
    return Promise.reject(err);
  }
);

CustomAxios.interceptors.response.use(
  (res) => {
    console.log("Response received:", res.status, res.config.url);
    return res;
  },
  async (err) => {
    const status = err.response ? err.response.status : null;
    const errorMessage = err.response?.data?.details;

    console.error("Response error:", {
      status,
      errorMessage,
      url: err.config?.url,
      data: err.response?.data,
      code: err.code,
    });

    if (err.code === "ECONNABORTED") {
      console.log("Request timed out");
      return Promise.reject(new Error("Request timed out. Please try again."));
    }

    if (
      status === 401 ||
      status === 419 ||
      (status === 500 &&
        errorMessage === "error verifying token: Token is expired")
    ) {
      console.log("Token expired or unauthorized, clearing auth state");
      // store.dispatch(clearAuth());

      return Promise.reject(
        new Error("Session expired. You have been logged out.")
      );
    }

    if (status === 403) {
      console.log("Forbidden access");
      alert("Forbidden access");
      return Promise.reject(err);
    }

    if (status === 400 || status === 404 || status === 409 || status === 500) {
      console.log("Client or server error:", status);
      return Promise.reject(err);
    }

    return Promise.reject(err);
  }
);

export default CustomAxios;

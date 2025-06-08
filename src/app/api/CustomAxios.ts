import axios from "axios"; 
import { store } from "@/lib/redux/store";
import { clearAuth } from "@/lib/redux/authSlice";

const CustomAxios = axios.create({
  baseURL:process.env.NEXT_PUBLIC_API_BASE,
  // timeout:10000,
});

// Add access token to request headers
CustomAxios.interceptors.request.use(
  (req) => {
    const accessToken = store.getState().auth.ACCESSTOKEN;
    if (accessToken) {
      req.headers["token"] = accessToken;
    }
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// Handle response errors
CustomAxios.interceptors.response.use(
  (res) => res,
  async (err) => {
    const status = err.response ? err.response.status : null;
    const errorMessage = err.response?.data?.details;

    // Token expired or unauthorized
    if (
      status === 401 ||
      status === 419 ||
      (status === 500 && errorMessage === "error verifying token: Token is expired")
    ) {
      // Dispatch logout and reject error
      store.dispatch(clearAuth());
      return Promise.reject(new Error("Session expired. You have been logged out."));
    }

    // Forbidden
    if (status === 403) {
      alert("Forbidden access");
      return Promise.reject(err);
    }

    // Bad request or not found
    if (status === 400 || status === 404 || status === 409 || status === 500) {
      return Promise.reject(err);
    }

    return Promise.reject(err);
  }
);

export default CustomAxios;

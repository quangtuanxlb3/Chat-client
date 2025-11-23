import axios from "axios";
import { toast } from "react-toastify";

const AxiosClient = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Gắn token vào request
AxiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("chat-token");

    if (token && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Xử lý response
AxiosClient.interceptors.response.use(
  (response) => {
    if (response?.data?.status === "error" && response?.data?.message) {
      toast.error(response.data.message);
    }

    if (response?.data?.status === "success" && response?.data?.message) {
      toast.success(response.data.message);
    }

    return response.data;
  },
  (error) => {
    // if (error.response?.status === 401) {
    //   // Token invalid hoặc hết hạn
    //   localStorage.removeItem("token");
    //   window.location.href = "/auth/login";
    // }

    return Promise.reject(error);
  },
);

export default AxiosClient;

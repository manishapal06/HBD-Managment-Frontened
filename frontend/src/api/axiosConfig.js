import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // ⬅ change to your backend URL
  withCredentials: true, // for cookies (refresh token)
});

// Attach Access Token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Auto-refresh token on 401 Unauthorized
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalReq = error.config;

    // if access token expired
    if (error.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;

      try {
        const res = await axios.get(
          "http://localhost:5000/api/auth/refresh-token",
          { withCredentials: true }
        );

        const newToken = res.data.accessToken;

        // Save new token
        localStorage.setItem("accessToken", newToken);

        // Retry original request
        originalReq.headers.Authorization = `Bearer ${newToken}`;

        return API(originalReq);
      } catch (err) {
        console.log("Refresh token expired. Logging out...");
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;

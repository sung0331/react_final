import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "http://localhost:8020",
  withCredentials: true, // 쿠키 전송 허용
  validateStatus: (status) => status < 400, // 302 상태도 허용
  headers: {
    "Content-Type":"application/json",
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) =>{
    const accessToken = localStorage.getItem("accessToken");
    if(accessToken){
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 401 Unauthorized 처리
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Access Token 만료 시 Refresh Token으로 갱신
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const { data } = await axios.post("/api/token", { refreshToken });

        // 새 Access Token 저장 및 재요청
        localStorage.setItem("accessToken", data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("토큰 갱신 실패", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
export default axiosInstance
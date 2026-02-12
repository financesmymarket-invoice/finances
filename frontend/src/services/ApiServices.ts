import axios, {
    AxiosError,
    type AxiosInstance,
    type InternalAxiosRequestConfig,
} from "axios";

const baseURL = import.meta.env.VITE_REACT_APP_API_URL;
console.log("Base URL:", import.meta.env.VITE_REACT_APP_API_URL);

const apiService: AxiosInstance = axios.create({ baseURL });

/* ---------- REQUEST ---------- */
apiService.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (!(config.data instanceof FormData)) {
        config.headers["Content-Type"] = "application/json";
    }

   config.headers.Accept = "application/json";

    // Accept-Language
    const lang = navigator.language.split("-")[0] || "uk"; // отримуємо "uk" або "en"
    config.headers["Accept-Language"] = lang;

    // const token = useAuthStore.getState().accessToken;
    // if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
});

/* ---------- RESPONSE ---------- */
/* let isRefreshing = false;
let queue: (() => void)[] = []; */

apiService.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
        const originalRequest = error.config;

        if (
            error.response?.status !== 401 ||
            !originalRequest ||
            originalRequest.url?.startsWith("auth")
        ) {
            return Promise.reject(error);
        }
/* 
        if (!isRefreshing) {
            isRefreshing = true;

            try {
                // const { refreshToken } = useAuthStore.getState();
                // if (!refreshToken) throw new Error("No refresh token");

                // const { data } = await axios.post(
                //     `${baseURL}/auth/refresh`,
                //     { refresh: refreshToken },
                // );

                useAuthStore
                    .getState()
                    .setTokens(data.accessToken, data.refreshToken);

                queue.forEach((cb) => cb());
                queue = [];
            } catch (e) {
                useAuthStore.getState().logout();
                queue = [];
                return Promise.reject(e);
            } finally {
                isRefreshing = false;
            }
        } */

    /*     return new Promise((resolve) => {
            queue.push(() => {
                const token = useAuthStore.getState().accessToken;
                if (token && originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                }
                resolve(apiService(originalRequest));
            });
        }); */
    },
);

export { apiService, baseURL };
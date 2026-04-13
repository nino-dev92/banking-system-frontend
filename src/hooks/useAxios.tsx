import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import apiAxios from "../api/apiAxios";
import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import useRefreshToken from "./useRefreshToken";

const useAxios = (): AxiosInstance => {
  const { auth, setAuth } = useAuth();
  const refresh = useRefreshToken();
  useEffect(() => {
    const requestIntercept: any = apiAxios.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (auth?.accessToken) {
          config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error: any) => Promise.reject(error),
    );

    const responseIntercept: any = apiAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config as InternalAxiosRequestConfig & {
          sent?: boolean;
        };
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          setAuth((prev: any) => ({
            ...prev,
            accessToken: newAccessToken,
          }));
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return apiAxios(prevRequest);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      apiAxios.interceptors.request.eject(requestIntercept);
      apiAxios.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return apiAxios;
};

export default useAxios;

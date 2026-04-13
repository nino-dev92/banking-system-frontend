import { useAuth } from "../context/AuthProvider";
import apiAxios from "../api/apiAxios";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await apiAxios.get("/auth/refresh", {
      withCredentials: true,
    });
    const accessToken = response?.data?.accessToken;
    setAuth((prev: any) => {
      return { ...prev, accessToken: accessToken };
    });
    return accessToken;
  };

  return refresh;
};

export default useRefreshToken;

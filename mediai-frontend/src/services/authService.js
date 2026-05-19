import axiosInstance from "../api/axiosInstance";

export const loginUser = async (loginData) => {
  const response = await axiosInstance.post("/api/auth/login", loginData);

  return response.data;
};

import axiosInstance from "../api/axiosInstance";

// Login User
export const loginUser = async (loginData) => {
  const response = await axiosInstance.post("/api/auth/login", loginData);

  return response.data;
};

// Register User
export const registerUser = async (registerData) => {
  const response = await axiosInstance.post("/api/auth/register", registerData);

  return response.data;
};

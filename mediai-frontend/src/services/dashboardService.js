import axiosInstance from "../api/axiosInstance";

// UI logic -> page
// API logic -> service
export const getAdminDashboardData = async () => {
  const response = await axiosInstance.get("/api/admin/dashboard");

  return response.data;
};

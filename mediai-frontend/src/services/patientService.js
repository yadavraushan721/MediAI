import axiosInstance from "../api/axiosInstance";

// Get All Patients From Appointments
export const getPatients = async () => {
  const response = await axiosInstance.get("/api/admin/appointments");

  return response.data;
};

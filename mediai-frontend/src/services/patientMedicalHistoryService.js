import axiosInstance from "../api/axiosInstance";

// Get Patient Medical History
export const getPatientMedicalHistory = async () => {
  const response = await axiosInstance.get("/api/patient/medical-records");

  return response.data;
};

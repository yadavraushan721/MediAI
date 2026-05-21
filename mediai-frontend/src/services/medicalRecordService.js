import axiosInstance from "../api/axiosInstance";

// Create Medical Record
export const createMedicalRecord = async (recordData) => {
  const response = await axiosInstance.post(
    "/api/doctor/medical-records",
    recordData,
  );

  return response.data;
};

// Get All Medical Records
export const getMedicalRecords = async () => {
  const response = await axiosInstance.get("/api/doctor/medical-records");

  return response.data;
};

// Update Medical Record
export const updateMedicalRecord = async (id, recordData) => {
  const response = await axiosInstance.put(
    `/api/doctor/medical-records/${id}`,
    recordData,
  );

  return response.data;
};

// Delete Medical Record
export const deleteMedicalRecord = async (id) => {
  const response = await axiosInstance.delete(
    `/api/doctor/medical-records/${id}`,
  );

  return response.data;
};

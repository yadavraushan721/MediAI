import axiosInstance from "../api/axiosInstance";

// Get All Doctors
export const getAllDoctors = async () => {
  const response = await axiosInstance.get("/api/admin/doctors");

  return response.data;
};

// Add Doctor
export const addDoctor = async (doctorData) => {
  const response = await axiosInstance.post("/api/admin/doctors", doctorData);

  return response.data;
};

// Delete Doctor
export const deleteDoctor = async (id) => {
  const response = await axiosInstance.delete(`/api/admin/doctors/${id}`);

  return response.data;
};

// Update Doctor
export const updateDoctor = async (id, doctorData) => {
  const response = await axiosInstance.put(
    `/api/admin/doctors/${id}`,
    doctorData,
  );

  return response.data;
};

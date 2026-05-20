import axiosInstance from "../api/axiosInstance";

// Book Appointment
export const bookAppointment = async (appointmentData) => {
  const response = await axiosInstance.post(
    "/api/patient/appointments",
    appointmentData,
  );

  return response.data;
};

// Get Appointments
export const getAppointments = async () => {
  const response = await axiosInstance.get("/api/patient/appointments");

  return response.data;
};

// Cancel Appointment
export const cancelAppointment = async (id) => {
  const response = await axiosInstance.put(
    `/api/patient/appointments/cancel/${id}`,
  );

  return response.data;
};

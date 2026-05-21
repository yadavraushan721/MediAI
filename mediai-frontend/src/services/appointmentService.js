import axiosInstance from "../api/axiosInstance";

// Patient Book Appointment
export const bookAppointment = async (appointmentData) => {
  const response = await axiosInstance.post(
    "/api/patient/appointments",
    appointmentData,
  );

  return response.data;
};

// Patient Get Appointments
export const getAppointments = async () => {
  const response = await axiosInstance.get("/api/patient/appointments");

  return response.data;
};

// Doctor Confirm Appointment
export const confirmAppointment = async (id) => {
  const response = await axiosInstance.put(
    `/api/doctor/appointments/confirm/${id}`,
  );

  return response.data;
};

// Doctor Complete Appointment
export const completeAppointment = async (id) => {
  const response = await axiosInstance.put(
    `/api/doctor/appointments/complete/${id}`,
  );

  return response.data;
};

// Doctor Cancel Appointment
export const cancelAppointment = async (id) => {
  const response = await axiosInstance.put(
    `/api/doctor/appointments/cancel/${id}`,
  );

  return response.data;
};

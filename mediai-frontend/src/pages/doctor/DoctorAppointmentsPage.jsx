import { useEffect, useState } from "react";

import {
  cancelAppointment,
  completeAppointment,
  confirmAppointment,
} from "../../services/appointmentService";
import axiosInstance from "../../api/axiosInstance";

const DoctorAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Fetch Appointments
  const fetchAppointments = async () => {
    try {
      const response = await axiosInstance.get("/api/doctor/appointments");

      setAppointments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Confirm Appointment
  const handleConfirm = async (id) => {
    try {
      await confirmAppointment(id);

      fetchAppointments();
    } catch (error) {
      console.error(error);
    }
  };

  // Complete Appointment
  const handleComplete = async (id) => {
    try {
      await completeAppointment(id);

      fetchAppointments();
    } catch (error) {
      console.error(error);
    }
  };

  // Cancel Appointment
  const handleCancel = async (id) => {
    try {
      await cancelAppointment(id);

      fetchAppointments();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Doctor Appointments</h1>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Patient</th>

              <th className="p-4 text-left">Doctor</th>

              <th className="p-4 text-left">Date</th>

              <th className="p-4 text-left">Time</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-8 text-gray-500">
                  No appointments found
                </td>
              </tr>
            ) : (
              appointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="border-t hover:bg-gray-50 transition duration-200"
                >
                  <td className="p-4">{appointment.patientName}</td>

                  <td className="p-4">{appointment.doctor?.fullName}</td>

                  <td className="p-4">{appointment.appointmentDate}</td>

                  <td className="p-4">{appointment.appointmentTime}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm

                ${
                  appointment.status === "COMPLETED"
                    ? "bg-green-500"
                    : appointment.status === "CONFIRMED"
                      ? "bg-blue-500"
                      : appointment.status === "PENDING"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                }`}
                    >
                      {appointment.status}
                    </span>
                  </td>

                  <td className="p-4 flex gap-3">
                    {appointment.status === "PENDING" && (
                      <button
                        onClick={() => handleConfirm(appointment.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                      >
                        Confirm
                      </button>
                    )}

                    {appointment.status === "CONFIRMED" && (
                      <button
                        onClick={() => handleComplete(appointment.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                      >
                        Complete
                      </button>
                    )}

                    {(appointment.status === "PENDING" ||
                      appointment.status === "CONFIRMED") && (
                      <button
                        onClick={() => handleCancel(appointment.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorAppointmentsPage;

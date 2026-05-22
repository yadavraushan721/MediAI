import { useEffect, useState } from "react";

import {
  cancelAppointment,
  completeAppointment,
  confirmAppointment,
} from "../../services/appointmentService";

import axiosInstance from "../../api/axiosInstance";

import { toast } from "react-toastify";

import { FaCheck, FaTimes, FaClipboardCheck } from "react-icons/fa";

const DoctorAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [actionLoading, setActionLoading] = useState(null);

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

      toast.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  // Confirm Appointment
  const handleConfirm = async (id) => {
    try {
      setActionLoading(id);

      await confirmAppointment(id);

      toast.success("Appointment confirmed");

      fetchAppointments();
    } catch (error) {
      console.error(error);

      toast.error("Failed to confirm appointment");
    } finally {
      setActionLoading(null);
    }
  };

  // Complete Appointment
  const handleComplete = async (id) => {
    try {
      setActionLoading(id);

      await completeAppointment(id);

      toast.success("Appointment completed");

      fetchAppointments();
    } catch (error) {
      console.error(error);

      toast.error("Failed to complete appointment");
    } finally {
      setActionLoading(null);
    }
  };

  // Cancel Appointment
  const handleCancel = async (id) => {
    try {
      setActionLoading(id);

      await cancelAppointment(id);

      toast.success("Appointment cancelled");

      fetchAppointments();
    } catch (error) {
      console.error(error);

      toast.error("Failed to cancel appointment");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="text-3xl font-bold text-blue-600 animate-pulse">
          Loading Appointments...
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Doctor Appointments
        </h1>

        <p className="text-gray-500 mt-2">
          Manage and track all patient appointments.
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <tr>
              <th className="p-5 text-left">Patient</th>

              <th className="p-5 text-left">Doctor</th>

              <th className="p-5 text-left">Date</th>

              <th className="p-5 text-left">Time</th>

              <th className="p-5 text-left">Status</th>

              <th className="p-5 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-10 text-gray-500">
                  No appointments found
                </td>
              </tr>
            ) : (
              appointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="border-t hover:bg-gray-50 transition duration-200"
                >
                  <td className="p-5 font-medium">{appointment.patientName}</td>

                  <td className="p-5">{appointment.doctor?.fullName}</td>

                  <td className="p-5">{appointment.appointmentDate}</td>

                  <td className="p-5">{appointment.appointmentTime}</td>

                  {/* Status */}
                  <td className="p-5">
                    <span
                      className={`px-4 py-2 rounded-full text-white text-sm font-medium

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

                  {/* Actions */}
                  <td className="p-5 flex gap-3 flex-wrap">
                    {appointment.status === "PENDING" && (
                      <button
                        disabled={actionLoading === appointment.id}
                        onClick={() => handleConfirm(appointment.id)}
                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-xl transition"
                      >
                        <FaCheck />

                        {actionLoading === appointment.id
                          ? "Loading..."
                          : "Confirm"}
                      </button>
                    )}

                    {appointment.status === "CONFIRMED" && (
                      <button
                        disabled={actionLoading === appointment.id}
                        onClick={() => handleComplete(appointment.id)}
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-xl transition"
                      >
                        <FaClipboardCheck />

                        {actionLoading === appointment.id
                          ? "Loading..."
                          : "Complete"}
                      </button>
                    )}

                    {(appointment.status === "PENDING" ||
                      appointment.status === "CONFIRMED") && (
                      <button
                        disabled={actionLoading === appointment.id}
                        onClick={() => handleCancel(appointment.id)}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-xl transition"
                      >
                        <FaTimes />

                        {actionLoading === appointment.id
                          ? "Loading..."
                          : "Cancel"}
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

import { useEffect, useState } from "react";

import axiosInstance from "../../api/axiosInstance";

const DoctorDashboard = () => {
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

  // Analytics
  const totalAppointments = appointments.length;

  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "PENDING",
  ).length;

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "COMPLETED",
  ).length;

  const cancelledAppointments = appointments.filter(
    (appointment) => appointment.status === "CANCELLED",
  ).length;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Doctor Dashboard</h1>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-gray-500 text-lg">Total Appointments</h2>

          <p className="text-4xl font-bold text-blue-600 mt-4">
            {totalAppointments}
          </p>
        </div>

        {/* Pending */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-gray-500 text-lg">Pending</h2>

          <p className="text-4xl font-bold text-yellow-500 mt-4">
            {pendingAppointments}
          </p>
        </div>

        {/* Completed */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-gray-500 text-lg">Completed</h2>

          <p className="text-4xl font-bold text-green-600 mt-4">
            {completedAppointments}
          </p>
        </div>

        {/* Cancelled */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-gray-500 text-lg">Cancelled</h2>

          <p className="text-4xl font-bold text-red-500 mt-4">
            {cancelledAppointments}
          </p>
        </div>
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-2xl shadow mt-10 overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">Recent Appointments</h2>
        </div>

        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Patient</th>

              <th className="p-4 text-left">Doctor</th>

              <th className="p-4 text-left">Date</th>

              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {appointments.slice(0, 5).map((appointment) => (
              <tr key={appointment.id} className="border-t">
                <td className="p-4">{appointment.patientName}</td>

                <td className="p-4">{appointment.doctor?.fullName}</td>

                <td className="p-4">{appointment.appointmentDate}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm

                    ${
                      appointment.status === "PENDING"
                        ? "bg-yellow-500"
                        : appointment.status === "COMPLETED"
                          ? "bg-green-600"
                          : "bg-red-500"
                    }
                    `}
                  >
                    {appointment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorDashboard;

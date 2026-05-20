import { useEffect, useState } from "react";

import { getAppointments } from "../../services/appointmentService";

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await getAppointments();

      setAppointments(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Dashboard Counts
  const totalAppointments = appointments.length;

  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "PENDING",
  ).length;

  const cancelledAppointments = appointments.filter(
    (appointment) => appointment.status === "CANCELLED",
  ).length;

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "COMPLETED",
  ).length;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Patient Dashboard</h1>

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
    </div>
  );
};

export default PatientDashboard;

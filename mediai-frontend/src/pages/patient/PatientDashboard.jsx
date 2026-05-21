import { useEffect, useState } from "react";

import { getAppointments } from "../../services/appointmentService";

import {
  FaCalendarCheck,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await getAppointments();

      setAppointments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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

  const stats = [
    {
      title: "Total Appointments",
      value: totalAppointments,
      icon: <FaCalendarCheck />,
      color: "bg-blue-500",
    },
    {
      title: "Pending",
      value: pendingAppointments,
      icon: <FaClock />,
      color: "bg-yellow-500",
    },
    {
      title: "Completed",
      value: completedAppointments,
      icon: <FaCheckCircle />,
      color: "bg-green-500",
    },
    {
      title: "Cancelled",
      value: cancelledAppointments,
      icon: <FaTimesCircle />,
      color: "bg-red-500",
    },
  ];

  // Loading Screen
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <h1 className="text-3xl font-bold text-blue-600 animate-pulse">
          Loading Dashboard...
        </h1>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div
        data-aos="fade-right"
        className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-lg"
      >
        <h1 className="text-4xl font-bold mb-3">Welcome Back 👋</h1>

        <p className="text-lg text-blue-100">
          Manage your appointments and medical history easily.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            data-aos="zoom-in"
            className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition duration-300 hover:-translate-y-1"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">{item.title}</p>

                <h2 className="text-4xl font-bold mt-2">{item.value}</h2>
              </div>

              <div
                className={`${item.color} text-white p-4 rounded-2xl text-2xl`}
              >
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Appointments */}
      <div
        data-aos="fade-up"
        className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition duration-300"
      >
        <h2 className="text-2xl font-bold mb-6">Recent Appointments</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="py-3">Doctor</th>
                <th className="py-3">Date</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {appointments.length > 0 ? (
                appointments.slice(0, 5).map((appointment) => (
                  <tr
                    key={appointment.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-4 font-medium">
                      {appointment.doctorName || "Doctor"}
                    </td>

                    <td>{appointment.appointmentDate || "N/A"}</td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium
                        ${
                          appointment.status === "COMPLETED"
                            ? "bg-green-100 text-green-700"
                            : appointment.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-500">
                    No appointments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;

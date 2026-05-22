import { useEffect, useState } from "react";

import {
  FaUserMd,
  FaCalendarCheck,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { getAdminDashboardData } from "../../services/dashboardService";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await getAdminDashboardData();

      setDashboardData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="text-3xl font-bold text-blue-600 animate-pulse">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  const cards = [
    {
      title: "Total Doctors",
      value: dashboardData?.totalDoctors,
      icon: <FaUserMd />,
      color: "from-blue-500 to-indigo-600",
    },

    {
      title: "Total Appointments",
      value: dashboardData?.totalAppointments,
      icon: <FaCalendarCheck />,
      color: "from-green-500 to-emerald-600",
    },

    {
      title: "Pending Appointments",
      value: dashboardData?.pendingAppointments,
      icon: <FaClock />,
      color: "from-yellow-400 to-orange-500",
    },

    {
      title: "Completed Appointments",
      value: dashboardData?.completedAppointments,
      icon: <FaCheckCircle />,
      color: "from-teal-500 to-cyan-600",
    },

    {
      title: "Cancelled Appointments",
      value: dashboardData?.cancelledAppointments,
      icon: <FaTimesCircle />,
      color: "from-red-500 to-pink-600",
    },
  ];

  const appointmentData = [
    {
      name: "Pending",
      value: dashboardData?.pendingAppointments,
    },

    {
      name: "Completed",
      value: dashboardData?.completedAppointments,
    },

    {
      name: "Cancelled",
      value: dashboardData?.cancelledAppointments,
    },
  ];

  const COLORS = ["#facc15", "#14b8a6", "#ef4444"];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>

        <p className="text-gray-500 mt-2">
          Welcome back! Here's your healthcare system overview.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`bg-gradient-to-r ${card.color}
            text-white rounded-3xl shadow-lg p-6
            hover:scale-105 transition-all duration-300`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-medium opacity-90">{card.title}</h2>

                <p className="text-5xl font-bold mt-4">{card.value}</p>
              </div>

              <div className="text-5xl opacity-80">{card.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* System Overview */}
      <div className="mt-10 bg-white rounded-3xl shadow p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          System Overview
        </h2>

        <p className="text-gray-600 leading-7">
          MediAI healthcare management system is actively managing doctors,
          appointments, and patient workflows efficiently. Monitor appointment
          statuses and healthcare operations in real-time through this
          dashboard.
        </p>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        {/* Bar Chart */}
        <div className="bg-white rounded-3xl shadow p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Appointment Analytics
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={appointmentData}>
              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="value" fill="#3b82f6" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-3xl shadow p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Appointment Status
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={appointmentData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {appointmentData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-10 bg-white rounded-3xl shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>

        <div className="space-y-4">
          <div className="flex justify-between border-b pb-3">
            <p>New appointment booked</p>

            <span className="text-gray-400 text-sm">Just now</span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <p>Doctor profile updated</p>

            <span className="text-gray-400 text-sm">2 hrs ago</span>
          </div>

          <div className="flex justify-between">
            <p>Appointment completed</p>

            <span className="text-gray-400 text-sm">Today</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

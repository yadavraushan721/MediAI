import { useEffect, useState } from "react";

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

      console.log(data);

      setDashboardData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-2xl font-semibold">Loading Dashboard...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Doctors */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold text-gray-600">Total Doctors</h2>

          <p className="text-4xl font-bold text-blue-600 mt-4">
            {dashboardData?.totalDoctors}
          </p>
        </div>

        {/* Total Appointments */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold text-gray-600">
            Total Appointments
          </h2>

          <p className="text-4xl font-bold text-green-600 mt-4">
            {dashboardData?.totalAppointments}
          </p>
        </div>

        {/* Pending */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold text-gray-600">
            Pending Appointments
          </h2>

          <p className="text-4xl font-bold text-yellow-500 mt-4">
            {dashboardData.pendingAppointments}
          </p>
        </div>

        {/* Completed */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold text-gray-600">
            Completed Appointments
          </h2>

          <p className="text-4xl font-bold text-green-500 mt-4">
            {dashboardData?.completedAppointments}
          </p>
        </div>

        {/* Cancelled */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold text-gray-600">
            Cancelled Appointments
          </h2>

          <p className="text-4xl font-bold text-red-500 mt-4">
            {dashboardData?.cancelledAppointments}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

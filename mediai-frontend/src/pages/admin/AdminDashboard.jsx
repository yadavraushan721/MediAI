const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Total Doctors</h2>

          <p className="text-3xl mt-4 text-blue-600">25</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Total Patients</h2>

          <p className="text-3xl mt-4 text-green-600">120</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Appointments</h2>

          <p className="text-3xl mt-4 text-red-600">56</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

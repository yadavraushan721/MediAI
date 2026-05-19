import { Outlet, useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-700 text-white p-5">
        <h1 className="text-2xl font-bold mb-10">MediAI</h1>

        <ul className="space-y-4">
          <li className="hover:bg-blue-800 p-2 rounded cursor-pointer">
            Dashboard
          </li>

          <li className="hover:bg-blue-800 p-2 rounded cursor-pointer">
            Appointments
          </li>

          <li className="hover:bg-blue-800 p-2 rounded cursor-pointer">
            Doctors
          </li>

          <li className="hover:bg-blue-800 p-2 rounded cursor-pointer">
            Patients
          </li>
        </ul>
      </div>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="bg-white shadow p-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Dashboard</h2>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        {/* Page Content */}
        <div className="p-6 overflow-y-auto flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

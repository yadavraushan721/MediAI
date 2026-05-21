import { Outlet, useNavigate, NavLink } from "react-router-dom";

import {
  FaUserMd,
  FaUsers,
  FaCalendarCheck,
  FaTachometerAlt,
  FaNotesMedical,
} from "react-icons/fa";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const email = localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");

    navigate("/login");
  };

  // Dynamic Menu
  const menuItems = {
    ADMIN: [
      {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: <FaTachometerAlt />,
      },
      {
        name: "Doctors",
        path: "/admin/doctors",
        icon: <FaUserMd />,
      },
      {
        name: "Patients",
        path: "/admin/patients",
        icon: <FaUsers />,
      },
      {
        name: "Appointments",
        path: "/admin/appointments",
        icon: <FaCalendarCheck />,
      },
    ],

    DOCTOR: [
      {
        name: "Dashboard",
        path: "/doctor/dashboard",
        icon: <FaTachometerAlt />,
      },
      {
        name: "Appointments",
        path: "/doctor/appointments",
        icon: <FaCalendarCheck />,
      },
      {
        name: "Medical Records",
        path: "/doctor/medical-records",
        icon: <FaNotesMedical />,
      },
    ],

    PATIENT: [
      {
        name: "Dashboard",
        path: "/patient/dashboard",
        icon: <FaTachometerAlt />,
      },
      {
        name: "Appointments",
        path: "/patient/appointments",
        icon: <FaCalendarCheck />,
      },
      {
        name: "Medical History",
        path: "/patient/medical-history",
        icon: <FaNotesMedical />,
      },
    ],
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-700 text-white p-5">
        <h1 className="text-3xl font-bold mb-10">MediAI</h1>

        <ul className="space-y-4">
          {menuItems[role]?.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition 
                ${isActive ? "bg-blue-900" : "hover:bg-blue-800"}`
              }
            >
              {item.icon}

              <span>{item.name}</span>
            </NavLink>
          ))}
        </ul>
      </div>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="bg-white shadow p-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">Dashboard</h2>

            <p className="text-gray-500 text-sm">{email}</p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
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

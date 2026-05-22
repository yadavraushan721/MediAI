import { Outlet, useNavigate, NavLink } from "react-router-dom";

import { useState } from "react";

import {
  FaUserMd,
  FaUsers,
  FaCalendarCheck,
  FaTachometerAlt,
  FaNotesMedical,
  FaUserCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        name: "Profile",
        path: "/admin/profile",
        icon: <FaUserCircle />,
      },

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
        name: "Profile",
        path: "/doctor/profile",
        icon: <FaUserCircle />,
      },

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
        name: "Profile",
        path: "/patient/profile",
        icon: <FaUserCircle />,
      },

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
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-full w-72 bg-gradient-to-b from-blue-700 to-indigo-900 text-white p-5 z-50 transform transition-transform duration-300

        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Mobile Close */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">MediAI</h1>

          <button
            className="lg:hidden text-2xl"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        {/* Menu */}
        <ul className="space-y-4">
          {menuItems[role]?.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 hover:translate-x-1 text-lg

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
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
          {/* Left */}
          <div className="flex items-center gap-4">
            {/* Mobile Hamburger */}
            <button
              className="lg:hidden text-2xl"
              onClick={() => setSidebarOpen(true)}
            >
              <FaBars />
            </button>

            <div>
              <h2 className="text-3xl font-bold">Dashboard</h2>

              <p className="text-gray-500 text-sm">{email}</p>

              <span className="inline-block mt-1 bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                {role}
              </span>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition"
          >
            Logout
          </button>
        </div>

        {/* Page Content */}
        <div className="p-4 md:p-8 overflow-y-auto flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

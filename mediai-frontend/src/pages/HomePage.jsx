import { Link } from "react-router-dom";

import { FaUserMd, FaHeartbeat, FaHospital, FaUserNurse } from "react-icons/fa";

import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex justify-between items-center px-10 py-5 bg-white/80 backdrop-blur-md shadow-sm">
        <h1 className="text-3xl font-extrabold text-blue-700">MediAI</h1>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-5 py-2 border border-blue-700 text-blue-700 rounded-xl hover:bg-blue-50 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-[85vh] flex flex-col-reverse lg:flex-row items-center justify-between px-10 lg:px-20 py-20 bg-gradient-to-br from-blue-50 to-white">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
            AI-Powered
            <span className="text-blue-700"> Healthcare </span>
            Management System
          </h1>

          <p className="text-gray-600 text-lg mt-8 leading-relaxed">
            Manage appointments, doctors, patients, and medical records with an
            intelligent and secure healthcare platform.
          </p>

          <div className="flex gap-5 mt-10">
            <Link
              to="/register"
              className="bg-blue-700 hover:bg-blue-800 hover:scale-105 transition duration-300 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-gray-400 hover:bg-gray-100 hover:scale-105 transition duration-300 px-8 py-4 rounded-2xl text-lg font-semibold"
            >
              Login
            </Link>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 lg:mb-0"
        >
          <img
            src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg"
            alt="Healthcare"
            className="w-[500px] rounded-3xl shadow-2xl"
          />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 px-10 lg:px-20 py-16 bg-white">
        {[
          { number: "10K+", label: "Patients" },
          { number: "500+", label: "Doctors" },
          { number: "50K+", label: "Appointments" },
          { number: "99%", label: "Satisfaction" },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-blue-50 rounded-3xl p-8 text-center shadow hover:shadow-xl transition"
          >
            <h2 className="text-4xl font-extrabold text-blue-700">
              {item.number}
            </h2>

            <p className="text-gray-600 mt-2">{item.label}</p>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="px-10 lg:px-20 py-24 bg-gray-50">
        <h2 className="text-5xl font-bold text-center mb-20">Features</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            {
              icon: <FaHeartbeat />,
              title: "Appointments",
              desc: "Manage appointments efficiently and quickly.",
            },

            {
              icon: <FaHospital />,
              title: "Medical Records",
              desc: "Securely store and access patient records.",
            },

            {
              icon: <FaUserMd />,
              title: "Doctors",
              desc: "Dedicated dashboard for doctors and admins.",
            },

            {
              icon: <FaUserNurse />,
              title: "Role Based Access",
              desc: "Separate dashboards for all users.",
            },
          ].map((feature, index) => (
            <motion.div
              whileHover={{ y: -10 }}
              key={index}
              className="bg-white rounded-3xl p-8 shadow hover:shadow-2xl transition"
            >
              <div className="text-5xl text-blue-700 mb-6">{feature.icon}</div>

              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>

              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-10 lg:px-20 py-24 bg-blue-700 text-white text-center">
        <h2 className="text-5xl font-bold">Ready to Transform Healthcare?</h2>

        <p className="mt-6 text-lg text-blue-100">
          Join MediAI and simplify healthcare management today.
        </p>

        <Link
          to="/register"
          className="inline-block mt-10 bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition"
        >
          Create Account
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center py-8">
        <p>© 2026 MediAI. Built with React & Spring Boot.</p>
      </footer>
    </div>
  );
};

export default HomePage;

import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";

import AdminDashboard from "./pages/admin/AdminDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import PatientDashboard from "./pages/patient/PatientDashboard";

import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

import DoctorsPage from "./pages/admin/DoctorsPage";
import AppointmentsPage from "./pages/patient/AppointmentsPage";
import DoctorAppointmentsPage from "./pages/doctor/DoctorAppointmentsPage";
const App = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="ADMIN">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />

        <Route path="doctors" element={<DoctorsPage />} />
      </Route>

      {/* Doctor Routes */}
      <Route
        path="/doctor"
        element={
          <ProtectedRoute allowedRole="DOCTOR">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DoctorDashboard />} />
        <Route path="appointments" element={<DoctorAppointmentsPage />} />
      </Route>

      {/* Patient Routes */}
      <Route
        path="/patient"
        element={
          <ProtectedRoute allowedRole="PATIENT">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<PatientDashboard />} />

        <Route path="appointments" element={<AppointmentsPage />} />
      </Route>
    </Routes>
  );
};

export default App;

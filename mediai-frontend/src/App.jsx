import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

import AdminDashboard from "./pages/admin/AdminDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import PatientDashboard from "./pages/patient/PatientDashboard";

import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

import DoctorsPage from "./pages/admin/DoctorsPage";
import AppointmentsPage from "./pages/patient/AppointmentsPage";
import DoctorAppointmentsPage from "./pages/doctor/DoctorAppointmentsPage";

import MedicalRecordsPage from "./pages/doctor/MedicalRecordsPage";

import PatientMedicalHistoryPage from "./pages/patient/PatientMedicalHistoryPage";

import PatientsPage from "./pages/admin/PatientsPage";

import AdminAppointmentsPage from "./pages/admin/AdminAppointmentsPage";

const App = () => {
  return (
    <Routes>
      {/* Auth Routes */}
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

        <Route path="patients" element={<PatientsPage />} />

        <Route path="appointments" element={<AdminAppointmentsPage />} />
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
        <Route path="medical-records" element={<MedicalRecordsPage />} />
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

        <Route path="medical-history" element={<PatientMedicalHistoryPage />} />
      </Route>
    </Routes>
  );
};

export default App;

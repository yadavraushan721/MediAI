import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";

import AdminDashboard from "./pages/admin/AdminDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import PatientDashboard from "./pages/patient/PatientDashboard";

import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
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
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>

      {/* Doctor Routes */}
      <Route
        path="/doctor"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DoctorDashboard />} />
      </Route>

      {/* Patient Routes */}
      <Route
        path="/patient"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<PatientDashboard />} />
      </Route>
    </Routes>
  );
};

export default App;

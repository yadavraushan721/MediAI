import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {

  const token = localStorage.getItem("token");

  const role = localStorage.getItem("role");

  // Not Logged In
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Unauthorized Access
  if (role !== allowedRole) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../services/authService";

import { toast } from "react-toastify"; // 

const LoginPage = () => {
  //It helps move user from one page to another.
  // In this case, after a successful login, we want to navigate the user to their respective dashboard based on their role (admin, doctor, or patient). The useNavigate hook provides us with a navigate function that we can call to change the route programmatically.
  const navigate = useNavigate();

  //useState helps React store data dynamically. It allows us to create a state variable (formData) and a function (setFormData) to update that variable. This way, we can keep track of the user's input in the login form and update it as they type.
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Function runs when user types in input.
  // It updates the formData state with the new values from the input fields.
  const handleChange = (e) => {
    setFormData({
      ...formData, // Spread operator copies old values without previous values disappear
      [e.target.name]: e.target.value, //This updates specific input field.
    });
  };

  /* Runs when form submits
  Why async ? :Because API calls take time.*/
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData);

    //   console.log(response);

      toast.success("Login Successful");

      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.role);
      localStorage.setItem("email", response.email);

      // Redirect based on role
      if (response.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (response.role === "DOCTOR") {
        navigate("/doctor/dashboard");
      } else if (response.role === "PATIENT") {
        navigate("/patient/dashboard");
      }
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          MediAI Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

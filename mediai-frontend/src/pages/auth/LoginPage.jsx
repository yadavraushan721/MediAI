import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../services/authService";

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
    e.preventDefault(); // This stops reload.

    try {
      const response = await loginUser(formData); // api call to backend with form data. It returns response which contains token, role, and email.

      //   localStorage.setItem("token", response);

      localStorage.setItem("token", response.token); // Saves JWT token in browser storage for later use in authenticated API requests.

      localStorage.setItem("role", response.role);

      localStorage.setItem("email", response.email);

      console.log(response);

      alert("Login Successful");

      if (response.role === "ADMIN") {
        navigate("/admin/dashboard"); // Navigates to admin dashboard if user is an admin.
      } else if (response.role === "DOCTOR") {
        navigate("/doctor/dashboard"); // Navigates to doctor dashboard if user is a doctor.
      } else if (response.role === "PATIENT") {
        navigate("/patient/dashboard"); // Navigates to patient dashboard if user is a patient.
      }
    } catch (error) {
      console.error(error);

      alert("Invalid Credentials");
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

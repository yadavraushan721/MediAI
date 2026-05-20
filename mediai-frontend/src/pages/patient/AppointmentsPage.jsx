import { useEffect, useState } from "react";

import {
  getAppointments,
  bookAppointment,
  cancelAppointment,
} from "../../services/appointmentService";

import { getPublicDoctors } from "../../services/doctorService";

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);

  const [doctors, setDoctors] = useState([]);

  const [formData, setFormData] = useState({
    patientName: "",

    doctorId: "",

    appointmentDate: "",

    appointmentTime: "",
  });

  useEffect(() => {
    fetchAppointments();

    fetchDoctors();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await getAppointments();

      setAppointments(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const data = await getPublicDoctors();

      setDoctors(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await bookAppointment(formData);

      alert("Appointment Booked Successfully");

      setFormData({
        patientName: "",

        doctorId: "",

        appointmentDate: "",

        appointmentTime: "",
      });

      fetchAppointments();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelAppointment(id);

      alert("Appointment Cancelled");

      fetchAppointments();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Appointments</h1>

      {/* Appointment Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
      >
        <input
          type="text"
          name="patientName"
          placeholder="Patient Name"
          value={formData.patientName}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <select
          name="doctorId"
          value={formData.doctorId}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        >
          <option value="">Select Doctor</option>

          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.fullName}
              {" - "}
              {doctor.specialization}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="appointmentDate"
          value={formData.appointmentDate}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="time"
          name="appointmentTime"
          value={formData.appointmentTime}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          Book Appointment
        </button>
      </form>

      {/* Appointments Table */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Patient</th>

              <th className="p-4 text-left">Doctor</th>

              <th className="p-4 text-left">Date</th>

              <th className="p-4 text-left">Time</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="border-t">
                <td className="p-4">{appointment.patientName}</td>

                <td className="p-4">{appointment.doctor?.fullName}</td>

                <td className="p-4">{appointment.appointmentDate}</td>

                <td className="p-4">{appointment.appointmentTime}</td>

                <td className="p-4">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                    {appointment.status}
                  </span>
                </td>

                <td className="p-4">
                  <button
                    onClick={() => handleCancel(appointment.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentsPage;

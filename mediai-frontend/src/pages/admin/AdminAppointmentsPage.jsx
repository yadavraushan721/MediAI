import { useEffect, useState } from "react";

import { getAllAppointmentsForAdmin } from "../../services/appointmentService";

const AdminAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await getAllAppointmentsForAdmin();

      setAppointments(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Appointments Management</h1>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Patient</th>

              <th className="p-4 text-left">Doctor</th>

              <th className="p-4 text-left">Date</th>

              <th className="p-4 text-left">Time</th>

              <th className="p-4 text-left">Status</th>
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
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    {appointment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {appointments.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No appointments found
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAppointmentsPage;

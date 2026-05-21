import { useEffect, useState } from "react";

import { getPatients } from "../../services/patientService";

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await getPatients();

      setPatients(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Patients Management</h1>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Patient Name</th>

              <th className="p-4 text-left">Doctor</th>

              <th className="p-4 text-left">Date</th>

              <th className="p-4 text-left">Time</th>

              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="border-t">
                <td className="p-4">{patient.patientName}</td>

                <td className="p-4">{patient.doctor?.fullName}</td>

                <td className="p-4">{patient.appointmentDate}</td>

                <td className="p-4">{patient.appointmentTime}</td>

                <td className="p-4">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {patient.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {patients.length === 0 && (
          <div className="p-6 text-center text-gray-500">No patients found</div>
        )}
      </div>
    </div>
  );
};

export default PatientsPage;

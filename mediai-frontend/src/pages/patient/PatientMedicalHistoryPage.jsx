import { useEffect, useState } from "react";

import { getPatientMedicalHistory } from "../../services/patientMedicalHistoryService";

const PatientMedicalHistoryPage = () => {
  const [records, setRecords] = useState([]);

  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await getPatientMedicalHistory();

      setRecords(data);
    } catch (error) {
      alert("Failed to load history");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Medical History</h1>

      {/* History Table */}
      <div className="bg-white rounded-3xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Appointment ID</th>

              <th className="p-4 text-left">Symptoms</th>

              <th className="p-4 text-left">Doctor</th>

              <th className="p-4 text-left">Date</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-left">Diagnosis</th>

              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-10 text-gray-500">
                  No medical history found
                </td>
              </tr>
            ) : (
              records.map((record) => (
                <tr
                  key={record.id}
                  className="border-t hover:bg-gray-100 transition"
                >
                  <td className="p-4">{record.appointment?.id}</td>

                  <td className="p-4">{record.symptoms}</td>

                  <td className="p-4">
                    {record.appointment?.doctor?.fullName}
                  </td>

                  <td className="p-4">{record.appointment?.appointmentDate}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm

                      ${
                        record.appointment?.status === "COMPLETED"
                          ? "bg-green-500"
                          : record.appointment?.status === "PENDING"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                    >
                      {record.appointment?.status}
                    </span>
                  </td>

                  <td className="p-4">{record.diagnosis}</td>

                  <td className="p-4">
                    <button
                      onClick={() => setSelectedRecord(record)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white border border-gray-200 rounded-3xl shadow-2xl w-[90%] max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative">
            {/* Close */}
            <button
              onClick={() => setSelectedRecord(null)}
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
            >
              X
            </button>

            <h2 className="text-3xl font-bold mb-8">Medical Record Details</h2>

            {/* Details */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-gray-500">Symptoms</p>

                <h3 className="text-xl font-semibold">
                  {selectedRecord.symptoms}
                </h3>
              </div>

              <div>
                <p className="text-gray-500">Diagnosis</p>

                <h3 className="text-xl font-semibold">
                  {selectedRecord.diagnosis}
                </h3>
              </div>

              <div>
                <p className="text-gray-500">Treatment Notes</p>

                <h3 className="text-xl font-semibold">
                  {selectedRecord.treatmentNotes}
                </h3>
              </div>

              <div>
                <p className="text-gray-500">Doctor</p>

                <h3 className="text-xl font-semibold">
                  {selectedRecord.appointment?.doctor?.fullName}
                </h3>
              </div>

              <div>
                <p className="text-gray-500">Appointment Date</p>

                <h3 className="text-xl font-semibold">
                  {selectedRecord.appointment?.appointmentDate}
                </h3>
              </div>

              <div>
                <p className="text-gray-500">Appointment Time</p>

                <h3 className="text-xl font-semibold">
                  {selectedRecord.appointment?.appointmentTime}
                </h3>
              </div>
            </div>

            {/* Prescriptions */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Prescriptions</h2>

              <table className="w-full border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-4 text-left">Medicine</th>

                    <th className="p-4 text-left">Dosage</th>

                    <th className="p-4 text-left">Instructions</th>
                  </tr>
                </thead>

                <tbody>
                  {selectedRecord.prescriptions?.map((prescription, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-4">{prescription.medicineName}</td>

                      <td className="p-4">{prescription.dosage}</td>

                      <td className="p-4">{prescription.instructions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientMedicalHistoryPage;

import { useEffect, useState } from "react";

import {
  createMedicalRecord,
  getMedicalRecords,
  updateMedicalRecord,
  deleteMedicalRecord,
} from "../../services/medicalRecordService";

const MedicalRecordsPage = () => {
  const [records, setRecords] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [selectedRecord, setSelectedRecord] = useState(null);

  const [formData, setFormData] = useState({
    appointmentId: "",

    symptoms: "",

    diagnosis: "",

    treatmentNotes: "",

    prescriptions: [
      {
        medicineName: "",

        dosage: "",

        instructions: "",
      },
    ],
  });

  useEffect(() => {
    fetchRecords();
  }, []);

  // Fetch Records
  const fetchRecords = async () => {
    try {
      const data = await getMedicalRecords();

      setRecords(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle Main Inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // Handle Prescription Inputs
  const handlePrescriptionChange = (index, event) => {
    const values = [...formData.prescriptions];

    values[index][event.target.name] = event.target.value;

    setFormData({
      ...formData,

      prescriptions: values,
    });
  };

  // Add Prescription
  const addPrescription = () => {
    setFormData({
      ...formData,

      prescriptions: [
        ...formData.prescriptions,

        {
          medicineName: "",

          dosage: "",

          instructions: "",
        },
      ],
    });
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //   await createMedicalRecord(formData);
      if (editingId) {
        await updateMedicalRecord(editingId, formData);

        alert("Medical Record Updated");
      } else {
        await createMedicalRecord(formData);

        alert("Medical Record Created");
      }

      alert("Medical Record Created");

      setFormData({
        appointmentId: "",

        symptoms: "",

        diagnosis: "",

        treatmentNotes: "",

        prescriptions: [
          {
            medicineName: "",

            dosage: "",

            instructions: "",
          },
        ],
      });

      fetchRecords();
    } catch (error) {
      console.error(error);

      if (error.response?.data) {
        alert(error.response.data);
      } else {
        alert("Something went wrong");
      }
    }
  };

  // Edit Record
  const handleEdit = (record) => {
    setEditingId(record.id);

    setFormData({
      appointmentId: record.appointment?.id,

      symptoms: record.symptoms,

      diagnosis: record.diagnosis,

      treatmentNotes: record.treatmentNotes,

      prescriptions: record.prescriptions,
    });

    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  };

  // Delete Record
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this medical record?");

    if (!confirmDelete) return;

    try {
      await deleteMedicalRecord(id);

      alert("Medical Record Deleted");

      fetchRecords();
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Medical Records</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow p-6 mb-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            name="appointmentId"
            placeholder="Appointment ID"
            value={formData.appointmentId}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="symptoms"
            placeholder="Symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="diagnosis"
            placeholder="Diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="treatmentNotes"
            placeholder="Treatment Notes"
            value={formData.treatmentNotes}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />
        </div>

        {/* Prescriptions */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Prescriptions</h2>

          {formData.prescriptions.map((prescription, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
            >
              <input
                type="text"
                name="medicineName"
                placeholder="Medicine Name"
                value={prescription.medicineName}
                onChange={(event) => handlePrescriptionChange(index, event)}
                className="border p-3 rounded-lg"
                required
              />

              <input
                type="text"
                name="dosage"
                placeholder="Dosage"
                value={prescription.dosage}
                onChange={(event) => handlePrescriptionChange(index, event)}
                className="border p-3 rounded-lg"
                required
              />

              <input
                type="text"
                name="instructions"
                placeholder="Instructions"
                value={prescription.instructions}
                onChange={(event) => handlePrescriptionChange(index, event)}
                className="border p-3 rounded-lg"
                required
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addPrescription}
            className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg"
          >
            + Add Prescription
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg mt-8"
        >
          {editingId ? "Update Medical Record" : "Save Medical Record"}{" "}
        </button>
      </form>

      {/* Records Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Appointment ID</th>

              <th className="p-4 text-left">Symptoms</th>

              <th className="p-4 text-left">Diagnosis</th>
            </tr>
          </thead>

          <tbody>
            {records.map((record) => (
              <tr key={record.id} className="border-t">
                <td className="p-4">{record.appointment?.id}</td>

                <td className="p-4">{record.symptoms}</td>

                <td className="p-4">{record.diagnosis}</td>

                <td className="p-4 flex gap-3">
                  <button
                    onClick={() => setSelectedRecord(record)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleEdit(record)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(record.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-4xl p-8 relative">
            {/* Close Button */}
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
                <p className="text-gray-500">Appointment ID</p>

                <h3 className="text-xl font-semibold">
                  {selectedRecord.appointment?.id}
                </h3>
              </div>

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
            </div>

            {/* Prescriptions */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Prescriptions</h2>

              <div className="overflow-x-auto">
                <table className="w-full border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-4 text-left">Medicine</th>

                      <th className="p-4 text-left">Dosage</th>

                      <th className="p-4 text-left">Instructions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {selectedRecord.prescriptions?.map(
                      (prescription, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-4">{prescription.medicineName}</td>

                          <td className="p-4">{prescription.dosage}</td>

                          <td className="p-4">{prescription.instructions}</td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalRecordsPage;

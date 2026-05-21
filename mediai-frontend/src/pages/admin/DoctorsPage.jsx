import { useEffect, useState } from "react";

import {
  getAllDoctors,
  deleteDoctor,
  addDoctor,
  updateDoctor,
  searchDoctors,
  getDoctorsPagination,
} from "../../services/doctorService";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const [searchText, setSearchText] = useState("");

  const [currentPage, setCurrentPage] = useState(0);

  const [totalPages, setTotalPages] = useState(0);

  const [doctorData, setDoctorData] = useState({
    fullName: "",

    specialization: "",

    experience: "",

    qualification: "",

    availableDays: "",

    consultationFee: "",

    available: true,
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async (page = 0) => {
    try {
      const data = await getDoctorsPagination(page, 5);

      setDoctors(data.content);

      setTotalPages(data.totalPages);

      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Delete Doctor
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");

    if (!confirmDelete) return;

    try {
      await deleteDoctor(id);

      alert("Doctor Deleted Successfully");

      fetchDoctors();
    } catch (error) {
      console.error(error);
    }
  };

  // Add & Edit Doctor Logic
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setDoctorData({
      ...doctorData,

      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Add Doctor
  const handleAddDoctor = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
        await updateDoctor(selectedDoctorId, doctorData);

        alert("Doctor Updated Successfully");
      } else {
        await addDoctor(doctorData);

        alert("Doctor Added Successfully");
      }

      setShowModal(false);

      fetchDoctors();

      setEditMode(false);

      setSelectedDoctorId(null);

      setDoctorData({
        fullName: "",

        specialization: "",

        experience: "",

        qualification: "",

        availableDays: "",

        consultationFee: "",

        available: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setEditMode(false);

    setSelectedDoctorId(null);

    setDoctorData({
      fullName: "",

      specialization: "",

      experience: "",

      qualification: "",

      availableDays: "",

      consultationFee: "",

      available: true,
    });
  };

  // Edit Doctor
  const handleEditClick = (doctor) => {
    setEditMode(true);

    setSelectedDoctorId(doctor.id);

    setDoctorData({
      fullName: doctor.fullName,

      specialization: doctor.specialization,

      experience: doctor.experience,

      qualification: doctor.qualification,

      availableDays: doctor.availableDays,

      consultationFee: doctor.consultationFee,

      available: doctor.available,
    });

    setShowModal(true);
  };

  const handleSearch = async () => {
    if (!searchText.trim()) {
      fetchDoctors();

      return;
    }

    try {
      const data = await searchDoctors(searchText);

      setDoctors(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  if (loading) {
    return <div className="text-2xl font-semibold">Loading Doctors...</div>;
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">Doctors Management</h1>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search Specialization"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border px-4 py-2 rounded-lg"
          />

          <button
            onClick={handleSearch}
            className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg"
          >
            Search
          </button>

          <button
            onClick={() => {
              resetForm();

              setShowModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            Add Doctor
          </button>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        {/* table data */}
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Specialization</th>

              <th className="p-4 text-left">Experience</th>

              <th className="p-4 text-left">Fee</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id} className="border-t">
                <td className="p-4">{doctor.fullName}</td>

                <td className="p-4">{doctor.specialization}</td>

                <td className="p-4">{doctor.experience} Years</td>

                <td className="p-4">₹ {doctor.consultationFee}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm text-white
                    ${doctor.available ? "bg-green-500" : "bg-red-500"}`}
                  >
                    {doctor.available ? "Available" : "Unavailable"}
                  </span>
                </td>

                <td className="p-4 flex gap-3">
                  <button
                    onClick={() => handleEditClick(doctor)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(doctor.id)}
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

      <div className="flex justify-center items-center gap-4 p-5">
        <button
          disabled={currentPage === 0}
          onClick={() => fetchDoctors(currentPage - 1)}
          className="bg-gray-700 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Previous
        </button>

        <span className="font-semibold">
          Page {currentPage + 1} of {totalPages}
        </span>

        <button
          disabled={currentPage + 1 === totalPages}
          onClick={() => fetchDoctors(currentPage + 1)}
          className="bg-gray-700 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
      {/* Add Doctor Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {editMode ? "Edit Doctor" : "Add Doctor"}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);

                  resetForm();
                }}
                className="text-red-500 text-xl"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleAddDoctor}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={doctorData.fullName}
                onChange={handleChange}
                className="border p-3 rounded-lg"
                required
              />

              <input
                type="text"
                name="specialization"
                placeholder="Specialization"
                value={doctorData.specialization}
                onChange={handleChange}
                className="border p-3 rounded-lg"
                required
              />

              <input
                type="number"
                name="experience"
                placeholder="Experience"
                value={doctorData.experience}
                onChange={handleChange}
                className="border p-3 rounded-lg"
                required
              />

              <input
                type="text"
                name="qualification"
                placeholder="Qualification"
                value={doctorData.qualification}
                onChange={handleChange}
                className="border p-3 rounded-lg"
                required
              />

              <input
                type="text"
                name="availableDays"
                placeholder="Available Days"
                value={doctorData.availableDays}
                onChange={handleChange}
                className="border p-3 rounded-lg"
                required
              />

              <input
                type="number"
                name="consultationFee"
                placeholder="Consultation Fee"
                value={doctorData.consultationFee}
                onChange={handleChange}
                className="border p-3 rounded-lg"
                required
              />

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="available"
                  checked={doctorData.available}
                  onChange={handleChange}
                />

                <label>Available</label>
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
              >
                {editMode ? "Update Doctor" : "Add Doctor"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsPage;

import { useEffect, useState } from "react";

import { getProfile, updateProfile } from "../../services/profileService";

import { toast } from "react-toastify";

import { FaUserCircle } from "react-icons/fa";

const DoctorProfilePage = () => {
  const [profile, setProfile] = useState({});

  const [editMode, setEditMode] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();

      setProfile(data);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await updateProfile(profile);

      toast.success("Profile updated successfully");

      setEditMode(false);
    } catch (error) {
      console.error(error);

      toast.error("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="text-3xl font-bold text-blue-600 animate-pulse">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-10 text-white text-center">
          <FaUserCircle className="text-8xl mx-auto mb-4 opacity-90" />

          <h1 className="text-4xl font-bold">{profile.fullName}</h1>

          <p className="mt-2 opacity-90">{profile.role}</p>
        </div>

        {/* Body */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-gray-600 mb-2">Full Name</label>

            <input
              type="text"
              name="fullName"
              value={profile.fullName || ""}
              onChange={handleChange}
              disabled={!editMode}
              className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 mb-2">Email</label>

            <input
              type="email"
              name="email"
              value={profile.email || ""}
              onChange={handleChange}
              disabled={!editMode}
              className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-gray-600 mb-2">Role</label>

            <input
              type="text"
              value={profile.role || ""}
              disabled
              className="w-full border rounded-xl p-4 bg-gray-100"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 border-t flex justify-end gap-4">
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-300 hover:bg-gray-400 px-6 py-3 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
              >
                Save Changes
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePage;

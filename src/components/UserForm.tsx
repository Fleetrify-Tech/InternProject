import { useState, useEffect } from "react";
import type { User } from "../types/user";

interface Props {
  onSubmit: (user: User) => void;
  editingUser: User | null;
}

export default function UserForm({ onSubmit, editingUser }: Props) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    role: "Support",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    role: "",
  });

  //Load saved form data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("userFormData");
    if (savedData && !editingUser) {
      setFormData(JSON.parse(savedData));
    }
  }, [editingUser]);

  useEffect(() => {
    if (editingUser) {
      setFormData({
        firstName: editingUser.firstName,
        lastName: editingUser.lastName,
        dob: editingUser.dob,
        role: editingUser.role,
      });
    }
  }, [editingUser]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear field error on change

    localStorage.setItem("userFormData", JSON.stringify(newFormData));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {
      firstName:
        formData.firstName.trim() === "" ? "First name is required" : "",
      lastName: formData.lastName.trim() === "" ? "Last name is required" : "",
      dob: formData.dob.trim() === "" ? "Date of birth is required" : "",
      role: formData.role.trim() === "" ? "Role is required" : "",
    };

    setErrors(newErrors);

    // If any error exists, don't submit
    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasErrors) return;

    onSubmit({ ...formData, id: editingUser ? editingUser.id : Date.now() });
    setFormData({ firstName: "", lastName: "", dob: "", role: "Support" });
    localStorage.removeItem("userFormData");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        {editingUser ? "Edit User" : "Add User"}
      </h2>
      <div className="flex flex-col gap-4">
        <div>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full p-3 border border-gray-300 rounded"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full p-3 border border-gray-300 rounded"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>

        <div>
          <input
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded"
          />
          {errors.dob && (
            <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
          )}
        </div>

        <div>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded"
          >
            <option value="">Select Role</option>
            <option>Super Admin</option>
            <option>Admin</option>
            <option>Support</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition"
        >
          {editingUser ? "Update User" : "Add User"}
        </button>
      </div>
    </form>
  );
}

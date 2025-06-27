// components/UserForm.tsx
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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.dob ||
      !formData.role
    )
      return;

    onSubmit({ ...formData, id: editingUser ? editingUser.id : Date.now() });
    setFormData({ firstName: "", lastName: "", dob: "", role: "Support" });
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
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="p-3 border border-gray-300 rounded"
        />
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="p-3 border border-gray-300 rounded"
        />
        <input
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded"
        >
          <option>Super Admin</option>
          <option>Admin</option>
          <option>Support</option>
        </select>
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

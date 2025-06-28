// src/App.tsx
import { useState, useEffect } from "react";
import "./App.css";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import type { User } from "./types/user";

function App() {
  //Load initial users from localStorage if available
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : [];
  });

  const [editingUser, setEditingUser] = useState<User | null>(null);

  //Whenever users change, save to localStorage
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleAddOrUpdateUser = (user: User) => {
    if (editingUser) {
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
      setEditingUser(null);
    } else {
      setUsers([...users, user]);
    }
  };

  // function for handling user edit data across all inputs //
  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  // function for handling user data deletion //
  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row items-center m-0 px-4 justify-evenly gap-4 bg-gradient-to-br from-blue-100 to-blue-500">
      <UserForm onSubmit={handleAddOrUpdateUser} editingUser={editingUser} />
      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App;

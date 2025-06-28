import { useState } from "react";
import "./App.css";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import type { User } from "./types/user";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const addUser = (user: User) => {
    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser.id ? { ...user, id: u.id } : u))
      );
      setEditingUser(null);
    } else {
      setUsers((prev) => [...prev, { ...user, id: Date.now() }]);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user)
  }

  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id))
    if(editingUser?.id === id) {
      setEditingUser(null)
    }
  }

  return (
    <div className="min-h-screen flex flex-col sm:flex-row items-center m-0 px-4 justify-evenly gap-4 bg-gradient-to-br from-blue-100 to-blue-500">
      <UserForm onSubmit={addUser} editingUser={editingUser} />
      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App;

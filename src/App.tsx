import { useState } from "react";
import "./App.css";
import UserForm from "./components/UserForm";
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100  to-blue-500">
      <UserForm onSubmit={addUser} editingUser={editingUser} />
    </div>
  );
}

export default App;

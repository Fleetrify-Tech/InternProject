import type { User } from "./types/user";
import UserForm from "../components/UserForm.tsx";

interface Props {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export default function UserTable({ users, onEdit, onDelete }: Props) {
  return (
    <div className="flex flex-col sm:flex-row">
      <table className="min-w-full  bg-white">
        <thead>
          <tr>
            <th className=" px-4 py-2">First Name</th>
            <th className=" px-4 py-2">Last Name</th>
            <th className=" px-4 py-2">Date of Birth</th>
            <th className=" px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className=" px-2">{user.firstName}</td>
              <td className=" px-2">{user.lastName}</td>
              <td className=" px-2">{user.dob}</td>
              <td className="flex gap-1 py-2 px-2">
                <button
                  className=" p-1 rounded-md hover:bg-blue-600 hover:text-white"
                  onClick={() => onEdit(user)}
                >
                  Edit
                </button>
                <button
                  className=" p-1 rounded-md hover:bg-blue-600 hover:text-white"
                  onClick={() => onDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

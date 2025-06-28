import React from "react";
import type { User, EditData } from "../../types/userTyps";

interface UserTableProps {
  users: User[];
  handleDelete: (id: string) => void;
  handleEdit: (id: string, data: EditData) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, handleDelete, handleEdit }) => {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg mx-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100 border-b-0">
            <th className="text-left px-6 py-3 text-gray-600 font-medium">Email</th>
            <th className="text-left px-6 py-3 text-gray-600 font-medium">First Name</th>
            <th className="text-left px-6 py-3 text-gray-600 font-medium">Last Name</th>
            <th className="text-left px-6 py-3 text-gray-600 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-6 text-gray-500">
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className="border-b bg-white border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 flex items-center space-x-3">
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-blue-600 text-sm font-medium">{user.email}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{user.first_name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{user.last_name}</td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() =>
                      handleEdit(user.id, {
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        avatar: user.avatar
                      })
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

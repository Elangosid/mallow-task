import React from "react";
import { Edit, Trash } from "lucide-react";
import type { User, EditData } from "../../types/userTyps";

interface UserTableProps {
    users: User[];
    handleDelete: (id: string) => void;
    handleEdit: (id: string, data: EditData) => void;
}

const UserCard: React.FC<UserTableProps> = ({ users, handleDelete, handleEdit }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {users.map((user) => (
                <div
                    key={user.id}
                    className="bg-white shadow rounded-lg p-6 flex flex-col items-center relative group hover:bg-gray-100 transition"
                >
                    <img
                        src={user.avatar}
                        alt="avatar"
                        className="w-24 h-24 rounded-full object-cover mb-4"
                    />
                    <h3 className="text-lg font-semibold">{`${user.first_name} ${user.last_name}`}</h3>
                    <p className="text-gray-500">{user.email}</p>

                    <div className="absolute top-20 right-50 flex space-x-2 opacity-0 group-hover:opacity-100 transition">
                        <button
                            onClick={() =>
                                handleEdit(user.id, {
                                    first_name: user.first_name,
                                    last_name: user.last_name,
                                    email: user.email,
                                    avatar: user.avatar
                                })
                            }
                            className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-full cursor-pointer"
                        >
                            <Edit size={20} />
                        </button>
                        <button
                            onClick={() => handleDelete(user.id)}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full cursor-pointer"
                        >
                            <Trash size={22} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserCard;

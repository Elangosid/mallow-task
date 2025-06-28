import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { XCircleIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { createUser, updateUser } from "../../features/userSlice";
import type { AppDispatch } from "../../store/store";
import type { EditData, User } from "../../types/userTyps";
import { toast } from "react-toastify";

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
    editData: { id: string; data: EditData } | null;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, editData }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<User>();

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (editData) {
            reset({
                first_name: editData.data.first_name,
                last_name: editData.data.last_name,
                email: editData.data.email,
                avatar: editData.data.avatar,
            });
        } else {
            reset({
                first_name: "",
                last_name: "",
                email: "",
                avatar: "",
            });
        }
    }, [editData, reset]);

    const onSubmit = (data: User) => {
        if (editData) {
            dispatch(updateUser({ id: editData.id, data })).then((event) => {
                if (event.type === "user/updateUser/fulfilled") {
                    toast.success("Updated Successfully", { position: "bottom-right" });
                }
            });
        } else {
            dispatch(createUser(data)).then((event) => {
                if (event.type === "user/createUser/fulfilled") {
                    toast.success("Created Successfully", { position: "bottom-right" });
                }
            });
        }
        reset();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50"
            role="dialog"
            aria-modal="true"
        >
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/75"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-xl p-6 z-10">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                        {editData ? "Edit User" : "Create User"}
                    </h2>
                    <button onClick={onClose}>
                        <XCircleIcon className="text-gray-500 w-6 h-6 cursor-pointer" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block mb-1">First Name</label>
                        <input
                            type="text"
                            {...register("first_name", { required: "First name is required" })}
                            className="border p-2 rounded w-full"
                        />
                        {errors.first_name && (
                            <p className="text-red-500 text-sm">{errors.first_name.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1">Last Name</label>
                        <input
                            type="text"
                            {...register("last_name", { required: "Last name is required" })}
                            className="border p-2 rounded w-full"
                        />
                        {errors.last_name && (
                            <p className="text-red-500 text-sm">{errors.last_name.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Invalid email address",
                                },
                            })}
                            className="border p-2 rounded w-full"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1">Profile Image URL</label>
                        <input
                            type="text"
                            {...register("avatar", { required: "Avatar URL is required" })}
                            className="border p-2 rounded w-full"
                        />
                        {errors.avatar && (
                            <p className="text-red-500 text-sm">{errors.avatar.message}</p>
                        )}
                    </div>

                    <div className="flex gap-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 cursor-pointer rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white cursor-pointer px-4 py-2 rounded hover:bg-blue-600"
                        >
                            {editData ? "Update" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserModal;

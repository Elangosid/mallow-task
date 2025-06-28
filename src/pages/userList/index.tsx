import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../../features/userSlice";
import type { RootState, AppDispatch } from "../../store/store";
import Layout from '../../Components/layout';
import LoadingSpinner from "../../Components/LoadingSpinner";
import UserTable from "../../Components/table";
import { Table, List } from "lucide-react";
import UserCard from "../../Components/Card";
import UserModal from "../../Components/Model";
import type { EditData } from "../../types/userTyps";
import { toast } from "react-toastify";

const UsersPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [select, setSelect] = useState<'table' | 'card'>('table');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUserData, setEditUserData] = useState<{ id: string; data: EditData } | null>(null);
  const { users, loading, error, pagination } = useSelector(
    (state: RootState) => state.users
  );
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const filteredUsers = users.filter(user =>
    user.first_name.toLowerCase().includes(search.toLowerCase()) ||
    user.last_name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchUsers({ page }));
  }, [dispatch, page]);


  const handleDelete = (id: string) => {
    dispatch(deleteUser(id)).then((event)=>{
      if(event.type==="user/deleteUser/fulfilled"){
        toast.success('Deleted Successfully',{position:"bottom-right"})
      }
    });
  };

  const handleEdit = (id: string, data: EditData) => {
    setEditUserData({ id, data });
    setIsModalOpen(true);
  };

  return (
    <Layout>
      {loading && <LoadingSpinner />}
      <div className="p-4">
        <div className="flex justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setSelect('table')}
              className={`border px-2 py-1 flex items-center gap-x-0.5 cursor-pointer border-e-0 ${select === "table" && "border-blue-400 border-1 text-blue-500"}`}>
              <Table className="w-4 h-4" /> Table
            </button>
            <button
              onClick={() => setSelect('card')}
              className={`border px-2 py-1 flex items-center justify-center cursor-pointer gap-x-0.5 ${select === "card" && "border-1 border-blue-500 text-blue-500"}`}>
              <List className="w-4 h-4" /> Card
            </button>
          </div>

          <div className="flex justify-end mb-3 space-x-2">
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-2 rounded cursor-pointer"
            />
            <button
              onClick={() => {
                setEditUserData(null);
                setIsModalOpen(true);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
            >
              Create user
            </button>
          </div>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="overflow-x-auto">
          {select === "table" ? (
            <UserTable users={filteredUsers} handleDelete={handleDelete} handleEdit={handleEdit} />
          ) : (
            <div className="">
              <UserCard
                users={filteredUsers}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            </div>
          )}
        </div>

        <div className="flex justify-end px-10 mt-4">
          {[...Array(pagination.totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 mx-1 cursor-pointer rounded ${page === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editData={editUserData}
      />
    </Layout>
  );
};

export default UsersPage;

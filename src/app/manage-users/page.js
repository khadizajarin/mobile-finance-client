"use client";
import { useState, useEffect } from "react";
import Navbar from "../homepage/navbar";
import Swal from "sweetalert2";
import Button from "../commoncomps/Button";
import axios from "axios";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://mobile-finance-server-production.up.railway.app/api/users/approved");
  
        setUsers(response.data);
      } catch (error) {
        Swal.fire("Error", error.response?.data?.message || "Failed to fetch users", "error");
      }
    };
  
    fetchUsers();
  }, []);
  
  return (
    <div>
      <Navbar />
      <div className="p-6 text-gray-700">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead className="bg-[#A6F1E0] bg-opacity-50">
              <tr>
                <th className="border px-4 py-2 text-left">User ID</th>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Email</th>
                <th className="border px-4 py-2 text-left">Phone</th>
                <th className="border px-4 py-2 text-left">Account Type</th>
                <th className="border px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td className="border px-4 py-2">{user._id}</td>
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.mobile || "N/A"}</td>
                    <td className="border px-4 py-2">{user.accountType}</td>
                    <td className="border px-4 py-2"><Button className="bg-red-300">Delete</Button></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="border px-4 py-2 text-center">
                    No users available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;

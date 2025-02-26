"use client"
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Navbar from "../homepage/navbar";
import axios from "axios";

const ApprovedAgents = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchApprovedAgents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/agents/approved");
  
        setAgents(response.data); // ✅ Set approved agents
        console.log(response.data); // ✅ Log fetched data
      } catch (error) {
        Swal.fire("Error", error.response?.data?.message || "Failed to fetch approved agents", "error");
      }
    };
  
    fetchApprovedAgents();
  }, []);
  

  return (
    <div>
        <Navbar></Navbar>

        <div className="p-6 text-gray-700">
        <h2 className="text-xl font-semibold mb-4 ">Approved Agents</h2>
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-lg">
            <thead className="bg-[#A6F1E0] bg-opacity-50">
                <tr>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Mobile</th>
                <th className="border px-4 py-2 text-left">Email</th>
                </tr>
            </thead>
            <tbody>
                {agents.length > 0 ? (
                agents.map((agent) => (
                    <tr key={agent._id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{agent.name}</td>
                    <td className="border px-4 py-2">{agent.mobile}</td>
                    <td className="border px-4 py-2">{agent.email}</td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan="3" className="border px-4 py-2 text-center">
                    No approved agents found.
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

export default ApprovedAgents;

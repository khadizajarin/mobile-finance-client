"use client";
import { AuthContext } from "@/lib/AuthProvider";
import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import Button from "../commoncomps/Button";
import axios from "axios";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [agents, setAgents] = useState([]);


  // ✅ Fetch pending agents using Axios
  useEffect(() => {
    axios
      .get("https://mobile-finance-server-production.up.railway.app/api/admin/pending-agents")
      .then((response) => {
        setAgents(response.data); // ✅ Set fetched agents
      })
      .catch((error) => {
        console.error("Error fetching agents:", error);
      });
  }, []);

  // ✅ Approve Agent using Axios
  const approveAgent = async (agentEmail) => {
    const adminEmail = user?.email;

    try {
      const response = await axios.put(
        "https://mobile-finance-server-production.up.railway.app/api/admin/approve-agent",
        { adminEmail, agentEmail }, // ✅ Pass data in request body
        { headers: { "Content-Type": "application/json" } } // ✅ Set headers
      );

      Swal.fire("Success!", "Agent approved successfully!", "success");

      // ✅ Update state to remove approved agent
      setAgents((prevAgents) => prevAgents.filter((agent) => agent.email !== agentEmail));
    } catch (error) {
      console.error("Approval error:", error);
      Swal.fire("Error", error.response?.data?.message || "Something went wrong", "error");
    }
  };

  return (
    <div className=" flex items-center justify-center mb-28 mt-6">
      <div className="w-[40rem]  mx-auto bg-white shadow-lg rounded-lg p-6 ">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Admin Dashboard</h2>
        <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Pending Agents</h3>

        {agents.length === 0 ? (
          <p className="text-gray-600 text-center">No pending agents.</p>
        ) : (
          <ul className="space-y-4">
            {agents.map((agent) => (
              <li key={agent._id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow">
                <span className="text-gray-800 font-medium">{agent.name} ({agent.email})</span>
                <Button
                  className=" px-4 py-2 rounded-md hover:bg-green-600 transition"
                  onClick={() => approveAgent(agent.email)}
                >
                  Approve
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

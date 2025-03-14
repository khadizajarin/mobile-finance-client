"use client";

import { useState } from "react";
import Navbar from "../homepage/navbar";
import Button from "../commoncomps/Button";


export default function BalanceRequests() {
  // Dummy Data for balance requests
  const [requests, setRequests] = useState([
    { id: 1, user: "John Doe", mobile: "01712345678", amount: 500, status: "Pending" },
    { id: 2, user: "Jane Smith", mobile: "01887654321", amount: 1000, status: "Pending" },
    { id: 3, user: "Alice Johnson", mobile: "01911223344", amount: 200, status: "Approved" },
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar/>

      <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Balance Requests</h2>

        {requests.length === 0 ? (
          <p className="text-center text-gray-600">No balance requests at the moment.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-3 text-left">User</th>
                  <th className="p-3 text-left">Mobile</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id} className="border-t">
                    <td className="p-3">{req.user}</td>
                    <td className="p-3">{req.mobile}</td>
                    <td className="p-3">{req.amount} Taka</td>
                    <td className={`p-3 font-semibold ${req.status === "Pending" ? "text-yellow-500" : "text-green-600"}`}>
                      {req.status}
                    </td>
                    <td className="p-3 text-center">
                      {req.status === "Pending" ? (
                        <Button className="bg-green-500 text-white px-4 py-2 rounded-md">Approve</Button>
                      ) : (
                        <span className="text-gray-400">Approved</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

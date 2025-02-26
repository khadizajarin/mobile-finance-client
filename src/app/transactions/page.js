"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/lib/AuthProvider";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Navbar from "../homepage/navbar";
import axios from "axios";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const fetchUserTransactions = async () => {
      if (!user?.email) {
        console.error("User email is missing.");
        return;
      }
  
      console.log("Fetching transactions for email:", user.email);
  
      try {
        const response = await axios.get(`http://localhost:5000/api/your-transactions`, {
          params: { email: user.email },
        });
  
        setTransactions(response.data);
      } catch (error) {
        Swal.fire("Error", error.response?.data?.message || error.message, "error");
      }
    };
  
    fetchUserTransactions();
  }, [user]);
  
   // Dynamically set the table header background color based on user role
   const theadColor =
   user?.accountType === "user"
     ? "bg-[#F7CFD8]"
     : user?.accountType === "agent"
     ? "bg-[#F4F8D3]"
     : "bg-[#A6F1E0]"; // default for admin or others
  
  return (
    <div>
      <Navbar />
      <div className="p-6 text-gray-700">
        <h2 className="text-xl font-semibold mb-4">Transactions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead className={`${theadColor} bg-opacity-50`}>
              <tr>
                <th className="border px-4 py-2 text-left">Transaction ID</th>
                <th className="border px-4 py-2 text-left">Amount</th>
                <th className="border px-4 py-2 text-left">Fee</th>
                <th className="border px-4 py-2 text-left">Transaction Type</th>
                <th className="border px-4 py-2 text-left">Date</th>
                <th className="border px-4 py-2 text-left">Sender</th>
                <th className="border px-4 py-2 text-left">Receiver</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr key={transaction._id}>
                    <td className="border px-4 py-2">{transaction.transactionId}</td>
                    <td className="border px-4 py-2">{transaction.amount} Taka</td>
                    <td className="border px-4 py-2">{transaction.fee} Taka</td>
                    <td className="border px-4 py-2">{transaction.transactionType}</td>
                    <td className="border px-4 py-2">
                      {new Date(transaction.date).toLocaleString()}
                    </td>
                    <td className="border px-4 py-2">
                      {transaction.sender?.mobile || "N/A"}
                    </td>
                    <td className="border px-4 py-2">
                      {transaction.recipient?.mobile || "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No transactions available
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

export default TransactionsPage;

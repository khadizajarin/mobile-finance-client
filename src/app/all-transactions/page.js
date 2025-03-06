"use client"
import { AuthContext } from '@/lib/AuthProvider';
import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../homepage/navbar';
import Swal from 'sweetalert2';
import axios from 'axios';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const { user, isAuthenticated } = useContext(AuthContext);

  
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("https://mobile-finance-server-production.up.railway.app/api/transactions");

        setTransactions(response.data); // ✅ Set transactions state
        console.log(response.data); // ✅ Log fetched transactions
      } catch (error) {
        Swal.fire("Error", error.response?.data?.message || "Failed to fetch transactions", "error");
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='p-6 text-gray-700'>
        <h2 className="text-xl font-semibold mb-4 ">Transactions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-lg">
              <thead className="bg-[#A6F1E0] bg-opacity-50">
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
                      <td className="border px-4 py-2">{transaction.amount}</td>
                      <td className="border px-4 py-2">{transaction.fee}</td>
                      <td className="border px-4 py-2">{transaction.transactionType}</td>
                      <td className="border px-4 py-2">{new Date(transaction.date).toLocaleString()}</td>
                      <td className="border px-4 py-2">{transaction.sender?.mobile || "N/A"}</td>
                      <td className="border px-4 py-2">{transaction.recipient?.mobile || "N/A"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No transactions available</td>
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
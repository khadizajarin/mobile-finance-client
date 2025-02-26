"use client";
import { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Navbar from "../homepage/navbar";
import { AuthContext } from "@/lib/AuthProvider";
import Button from "../commoncomps/Button";
import axios from "axios";

export default function CashIn() {
  const { user } = useContext(AuthContext);
  const [userMobile, setUserMobile] = useState(""); // User's mobile number
  const [agentMobile, setAgentMobile] = useState(""); // Agent's mobile number
  const [amount, setAmount] = useState(""); // Cash-in amount
  const [pin, setPin] = useState(""); // User PIN
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agentPin, setAgentPin] = useState(""); // Store agent PIN from database
  const router = useRouter();

  const senderEmail = user?.email; // Get sender email from AuthContext

  // Fetch the agent's mobile and PIN from the backend
  useEffect(() => {
    if (!senderEmail) return;
  
    const fetchAgentInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/get-agent`, {
          params: { email: senderEmail },
        });
  
        setAgentMobile(response.data.mobile); // ✅ Set agent's mobile number
        setAgentPin(response.data.pin); // ✅ Set agent's PIN from database
      } catch (error) {
        Swal.fire("Error", error.response?.data?.message || "Failed to fetch agent info", "error");
      }
    };
  
    fetchAgentInfo();
  }, [senderEmail]);
  

  const handleCashIn = async (e) => {
    e.preventDefault();

    // ✅ Validate inputs
    if (!userMobile || !amount || amount < 100 || !pin) {
      return Swal.fire("Error", "Please fill in all fields and ensure the amount is at least 100 Taka.", "error");
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post("http://localhost:5000/api/transactions/cash-in", {
        agentMobile,
        userMobile,
        amount: Number(amount),
        pin, // ✅ Send the entered PIN
      }, {
        headers: { "Content-Type": "application/json" }
      });
    
      Swal.fire("Success", response.data.message, "success");
      router.push("/homepage");
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Failed to process cash-in.", "error");
    } finally {
      setIsSubmitting(false);
    }
    
  };

  // Role-based button colors
  const roleColors = {
    user: "bg-[#F7CFD8] hover:bg-[#e7b6c2]",
    agent: "bg-[#F4F8D3] hover:bg-[#e0e8b5]",
  };

  return (
    <div>
      <Navbar />
      <div className=" flex items-center justify-center pt-8">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-7xl">
          <h2 className="text-2xl font-bold text-center text-gray-800">Cash-In</h2>
          <form onSubmit={handleCashIn}>
            {/* Agent Mobile (Disabled) */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-600">Agent Mobile</label>
              <input
                type="text"
                className="input input-bordered w-full mt-1"
                value={agentMobile || "Fetching..."}
                disabled
              />
            </div>

            {/* User Mobile Input */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-600">User Mobile Number</label>
              <input
                type="text"
                className="input input-bordered w-full mt-1"
                placeholder="Enter receiver's mobile number"
                value={userMobile}
                onChange={(e) => setUserMobile(e.target.value)}
                required
              />
            </div>

            {/* Amount Input */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-600">Amount (Taka)</label>
              <input
                type="number"
                className="input input-bordered w-full mt-1"
                placeholder="Minimum 100 Taka"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            {/* PIN Input */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-600">Agent PIN</label>
              <input
                type="password"
                className="input input-bordered w-full mt-1"
                placeholder="Enter agent's PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className={`w-full mt-6 ${roleColors[user?.accountType] || "bg-gray-300"}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Cash-In to User"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

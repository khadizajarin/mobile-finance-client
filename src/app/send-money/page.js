"use client";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/lib/AuthProvider";
import Navbar from "../homepage/navbar";
import Button from "../commoncomps/Button";

export default function SendMoney() {
  const { user } = useContext(AuthContext);
  const [senderMobile, setSenderMobile] = useState(""); // Store sender's mobile number
  const [recipientMobile, setRecipientMobile] = useState("");
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const senderEmail = user?.email; // Retrieve sender's email from AuthContext

  // Fetch sender's mobile number from backend
  useEffect(() => {
    if (!senderEmail) return;

    const fetchSenderMobile = async () => {
      try {
        const response = await fetch(`https://mobile-finance-server-production.up.railway.app/api/users/get-mobile?email=${senderEmail}`,{mode :'no-cors'});
        const data = await response.json();
        if (response.ok) {
          setSenderMobile(data.mobile); // Set sender's mobile number
        } else {
          throw new Error(data.message || "Failed to fetch mobile number");
        }
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    };

    fetchSenderMobile();
  }, [senderEmail]);

  const handleSendMoney = async (e) => {
    e.preventDefault();

    if (!senderMobile || !recipientMobile || !amount || amount < 50) {
      return Swal.fire("Error", "Please fill in all fields and ensure the amount is at least 50 Taka.", "error");
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post("https://mobile-finance-server-production.up.railway.app/api/transactions/send-money", {
        senderMobile,
        recipientMobile,
        amount: Number(amount),
      });
    
      Swal.fire("Success", response.data.message, "success");
      router.push("/homepage");
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || error.message, "error");
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
      <div className="flex items-center justify-center pt-8">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-7xl">
          <h2 className="text-2xl font-bold text-center text-gray-800">Send Money</h2>
          <form onSubmit={handleSendMoney}>
            {/* Sender Mobile Number Display */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-600">Your Mobile Number</label>
              <input
                type="text"
                className="input input-bordered w-full mt-1"
                value={senderMobile || "Fetching..."}
                disabled
              />
            </div>
            {/* Recipient Mobile Input */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-600">Recipient Mobile</label>
              <input
                type="text"
                className="input input-bordered w-full mt-1"
                placeholder="Enter recipient's phone number"
                value={recipientMobile}
                onChange={(e) => setRecipientMobile(e.target.value)}
                required
              />
            </div>
            {/* Amount Input */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-600">Amount (Taka)</label>
              <input
                type="number"
                className="input input-bordered w-full mt-1"
                placeholder="Minimum 50 Taka"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            {/* Submit Button */}
            <Button
              type="submit"
              className={`w-full mt-6 ${roleColors[user?.accountType] || "bg-gray-300"}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Money"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

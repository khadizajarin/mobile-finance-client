"use client";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/lib/AuthProvider";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Navbar from "../homepage/navbar";
import Button from "../commoncomps/Button";
import axios from "axios";

export default function ProfilePage() {
  const { user, logOut, setUser } = useContext(AuthContext);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [userData, setUserData] = useState(null); // Store user details

  useEffect(() => {
    setIsClient(true);
  }, []);

  // ✅ Fetch user details from the backend
  useEffect(() => {
    if (!user?.email) return;
  
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://mfs-3b9bdidim-khadizajarins-projects.vercel.app/api/users`, {
          params: { email: user.email }
        });
  
        setUserData(response.data);
        setUser(response.data); // ✅ Update global user state
      } catch (error) {
        console.error("Error fetching user data:", error.response?.data?.message || error.message);
      }
    };
  
    fetchUserData();
  }, [user?.email]);
  

  if (!isClient || !userData) return <p>Loading...</p>;

  // ✅ Define role-based colors
  const roleColors = {
    user: "bg-[#F7CFD8]", // Light Pink
    agent: "bg-[#F4F8D3]", // Light Green
    admin: "bg-[#A6F1E0]", // Light Teal
  };

  const userRole = userData.accountType || "user"; // Default to user
  const bgColor = roleColors[userRole] || "bg-gray-100"; // Default color

  return (
    <div className="">
      <Navbar />

      <div className="max-w-7xl mx-auto">
        <div className={`w-full mt-10 p-6 rounded-lg shadow-lg ${bgColor}`}>
            <h2 className="text-2xl font-bold text-gray-800 text-center">Profile</h2>

            {/* ✅ User Details */}
            <div className="mt-6 space-y-4">
            <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Name:</span>
                <span className="text-gray-900">{userData.name || "N/A"}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Email:</span>
                <span className="text-gray-900">{userData.email}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Mobile:</span>
                <span className="text-gray-900">{userData.mobile || "N/A"}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Role:</span>
                <span className="text-gray-900 capitalize">{userRole}</span>
            </div>

            {/* ✅ Balance with Blur Effect */}
            <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">
                {userRole === "admin" ? "Income" : "Balance"}:
                </span>
                <button
                onClick={() => setShowBalance(!showBalance)}
                className="px-4 py-1 rounded-md font-semibold bg-white text-gray-700"
                >
                <span
                    className={`transition-all duration-500 ${
                    showBalance ? "blur-0" : "blur-md"
                    }`}
                >
                    {userData.balance || 0} Taka
                </span>
                </button>
            </div>
            </div>

            {/* ✅ Edit & Logout Buttons */}
            <div className="mt-6 flex justify-between">
            <Button
                onClick={() => Swal.fire("Coming Soon!", "Edit profile feature is under development.", "info")}
                className="px-4 py-2 bg-gray-700 text-white rounded-md"
            >
                Edit Profile
            </Button>
            <Button
                onClick={() => {
                logOut().then(() => {
                    router.push("/");
                    Swal.fire("Logged Out!", "You are logged out successfully!", "success");
                });
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
            >
                Logout
            </Button>
            </div>
        </div>
      </div>

      
    </div>
  );
}

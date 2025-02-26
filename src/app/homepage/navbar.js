"use client";
import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/lib/AuthProvider";
import Swal from "sweetalert2";
import Button from "../commoncomps/Button";

export default function Navbar() {
  const { user, loading, logOut } = useContext(AuthContext);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  if (loading) return null; // Prevent flashing incorrect UI

  // Ensure `accountType` is available
  const userRole = user?.accountType || "guest";

  // Background colors for each role
  const bgColors = {
    user: "bg-[#F7CFD8]", // Light Pink
    agent: "bg-[#F4F8D3]", // Light Green
    admin: "bg-[#A6F1E0]", // Light Teal
    guest: "bg-[#C96868]", // Default Blue
  };

  // Logout handler
  const handleLogOut = () => {
    logOut()
      .then(() => {
        router.push("/");
        Swal.fire("Logged Out!", "You are logged out successfully!", "success");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Define menu items based on role
  const navItems = {
    user: [
      { name: "Home", href: "/homepage" },
      { name: "Transactions", href: "/transactions" },
      { name: "Cash-Out", href: "/cash-out" },
      { name: "Send Money", href: "/send-money" },
      { name: "Profile", href: "/profile" },
    ],
    agent: [
      { name: "Home", href: "/homepage" },
      { name: "Cash-In Requests", href: "/cash-in-requests" },
      { name: "Balance Requests", href: "/balance-requests" },
      { name: "Transactions", href: "/transactions" },
      { name: "Profile", href: "/profile" },
    ],
    admin: [
      { name: "Dashboard", href: "/admin" },
      { name: "Manage Users", href: "/manage-users" },
      { name: "Approve Agents", href: "/approved-agents" },
      { name: "Transactions", href: "/all-transactions" },
      { name: "System Reports", href: "/system-reports" },
    ],
    guest: [
      { name: "Login", href: "/" },
      { name: "Register", href: "/register" },
    ],
  };

  return (
    <nav className={`${bgColors[userRole]} shadow-md text-gray-700`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo & Brand Name */}
        <Link href="/" className="text-2xl font-bold flex items-center">
          <span className="ml-2">MFS App</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6">
          {navItems[userRole]?.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className="hover:text-gray-900 text-bold hover:border-2 hover:border-gray-400 rounded-lg px-4 py-2 transition-all duration-300 ">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Logout Button */}
        {user && (
          <div className="flex flex-row justify-center items-center gap-3 text-center">
            <p className="text-sm text-gray-700">Logged in as {userRole.charAt(0).toUpperCase() + userRole.slice(1)}</p>
            <Button onClick={handleLogOut} className=" px-4 py-2 rounded-md ">
              Logout
            </Button>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden px-4 py-2 space-y-2">
          {navItems[userRole]?.map((item) => (
            <Link key={item.name} href={item.href} className="block hover:text-gray-700">
              {item.name}
            </Link>
          ))}
        </div>
      )}

      
    </nav>
  );
}

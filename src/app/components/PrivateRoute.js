/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { useContext, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { AuthContext } from "@/lib/AuthProvider";



const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // Ensure `useRouter` only runs on the client side
  // if (typeof window === "undefined") {
  //   return null;
  // }

  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <span className="loading loading-ball loading-lg"></span>
      </div>
    );
  }

  return user ? children : null;
};

export default PrivateRoute;

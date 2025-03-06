"use client";
import Link from "next/link";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { AuthContext } from "@/lib/AuthProvider";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup"; // For validation (optional)
import Button from "../commoncomps/Button";
import axios from "axios";

export default function RegisterPage() {
  const { createUser } = useContext(AuthContext);
  const router = useRouter();

  const [loading, setLoading] = useState(false); // ✅ Added loading state

  // Validation schema (optional, you can modify this)
  const validationSchema = Yup.object({
    // accountType:Yup.string().required(),
    name: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    pin: Yup.string().matches(/^\d{5}$/, "PIN must be exactly 5 digits").required("PIN is required"),
    mobile: Yup.string().matches(/^\d{11}$/, "Mobile number must be exactly 11 digits").required("Mobile is required"),
    nid: Yup.string().required("NID is required"),
  });

  const handleSignup = async (values) => {
    setLoading(true); // Disable button while processing
    try {
      // Call the createUser function from AuthContext
      await createUser(values.email, values.password); // Pass email and password correctly
  
      const response = await axios.post("https://mobile-finance-server-production.up.railway.app/api/auth/register", {
        ...values,
        accountType: values.accountType,
      });
  
      router.push("/homepage");
      Swal.fire("Success!", "Account created successfully!", "success");
  
    } catch (error) {
      console.error("Signup error:", error.response?.data?.message || error.message);
      Swal.fire("Error", error.response?.data?.message || error.message, "error");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100"> 
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>

        <Formik
            initialValues={{
                name: "",
                pin: "",
                mobile: "",
                email: "",
                password: "",
                nid: "",
                accountType: "user", // Default value
            }}
            validationSchema={validationSchema}
            onSubmit={handleSignup}
            >
            {({ values, errors, touched, isSubmitting }) => (
                <Form>
                {/* Account Type */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-600">Account Type</label>
                    <Field
                    as="select"
                    name="accountType"
                    className="select select-bordered w-full mt-1"
                    >
                    <option value="user" className="bg-[#F7CFD8] text-gray-700 w-full mt-1">User</option>
                    <option value="agent" className="bg-[#F4F8D3] text-gray-700 w-full mt-1">Agent</option>
                    </Field>
                </div>

                {/* Name */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-600">Full Name</label>
                    <Field
                    type="text"
                    name="name"
                    className="input input-bordered w-full mt-1"
                    placeholder="Enter your full name"
                    />
                    {errors.name && touched.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                </div>

                {/* PIN */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-600">5-Digit PIN</label>
                    <Field
                    type="text"
                    name="pin"
                    maxLength="5"
                    className="input input-bordered w-full mt-1"
                    placeholder="Enter 5-digit PIN"
                    />
                    {errors.pin && touched.pin && <div className="text-red-500 text-sm">{errors.pin}</div>}
                </div>

                {/* Mobile Number */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-600">Mobile Number</label>
                    <Field
                    type="tel"
                    name="mobile"
                    maxLength="11"
                    className="input input-bordered w-full mt-1"
                    placeholder="Enter your mobile number"
                    />
                    {errors.mobile && touched.mobile && <div className="text-red-500 text-sm">{errors.mobile}</div>}
                </div>

                {/* Email */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-600">Email</label>
                    <Field
                    type="email"
                    name="email"
                    className="input input-bordered w-full mt-1"
                    placeholder="Enter your email"
                    />
                    {errors.email && touched.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                </div>

                {/* Password */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-600">Password</label>
                    <Field
                    type="password"
                    name="password"
                    className="input input-bordered w-full mt-1"
                    placeholder="Enter your password"
                    />
                    {errors.password && touched.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                </div>

                {/* NID */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-600">NID Number</label>
                    <Field
                    type="text"
                    name="nid"
                    className="input input-bordered w-full mt-1"
                    placeholder="Enter your NID"
                    />
                    {errors.nid && touched.nid && <div className="text-red-500 text-sm">{errors.nid}</div>}
                </div>

                {/* Agent Verification Notice */}
                {values.accountType === "agent" && (
                    <p className="text-sm text-yellow-600 mt-2">
                    Agents require admin approval before activation.
                    </p>
                )}

                {/* Register Button */}
                <Button
                    type="submit"
                    className={`bg-[#c66565] text-white w-full mt-6 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={isSubmitting || loading} // Disable while submitting
                >
                    {loading || isSubmitting ? "Registering..." : `Register as ${values.accountType.charAt(0).toUpperCase() + values.accountType.slice(1)}`}
                </Button>
                </Form>
            )}
            </Formik>


        {/* Login Link */}
        <p className="text-sm text-center mt-4">
          Already have an account? <Link href="/" className="text-[#C96868]">Login</Link>
        </p>
      </div>
    </div>
      
  );
}


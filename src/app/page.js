"use client";

import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/lib/AuthProvider";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "./commoncomps/Button";

export default function Home() {
  const [message, setMessage] = useState("");
  const { signIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Validation Schema
  const validationSchema = Yup.object().shape({
    role: Yup.string().oneOf(["user", "agent", "admin"]).required("Role is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    if (!values.email || !values.password) {
      Swal.fire({
        title: "Warning!",
        text: "Please enter email and password",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      return;
    }

    try {
      await signIn(values.email, values.password);
      router.push("/homepage");
      Swal.fire({
        title: "Success!",
        text: "Successfully logged in!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (error) {
      console.error(error);
      let errorMessage = "An error occurred. Please try again.";

      if (error.code === "auth/invalid-credential") {
        errorMessage = "Invalid email or password!";
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "User not found. Please sign up.";
      }

      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Ok",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

          {/* Formik Form */}
          <Formik
            initialValues={{ role: "user", email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form>
                {/* Role Selection */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-600">Select Role</label>
                  <Field as="select" name="role" className="select select-bordered w-full mt-1">
                    <option value="user">User</option>
                    <option value="agent">Agent</option>
                    <option value="admin">Admin</option>
                  </Field>
                  <ErrorMessage name="role" component="p" className="text-red-500 text-xs mt-1" />
                </div>

                {/* Email Input */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-600">Email</label>
                  <Field
                    type="email"
                    name="email"
                    className="input input-bordered w-full mt-1"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage name="email" component="p" className="text-red-500 text-xs mt-1" />
                </div>

                {/* Password Input */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-600">Password</label>
                  <Field
                    type="password"
                    name="password"
                    className="input input-bordered w-full mt-1"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage name="password" component="p" className="text-red-500 text-xs mt-1" />
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full mt-6 bg-[#C96868]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </Form>
            )}
          </Formik>

          {/* Register Link */}
          <p className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <Link href="/register" className="text-[#C96868]">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
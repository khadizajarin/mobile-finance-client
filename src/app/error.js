"use client";
import Image from "next/image";

 // Error components must be client-side

export default function ErrorPage({ error, reset }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-red-600">Something went wrong!</h1>
      <p className="text-lg text-gray-700 mt-4">{error?.message || "An unexpected error occurred."}</p>
      <Image height={"300px"} width={"200px"} src={"https://i.pinimg.com/originals/0e/c0/db/0ec0dbf1e9a008acb9955d3246970e15.gif"}>

      </Image>
      <button
        onClick={() => reset()} 
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg"
      >
        Try Again
      </button>
    </div>
  );
}

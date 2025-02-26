// "use client";
// import React from "react";

// export default function Button({ children, onClick, size = "md", full = false, className = "" }) {
//   const sizeClasses = {
//     sm: "px-3 py-1 text-sm",
//     md: "px-4 py-2 text-base",
//     lg: "px-6 py-3 text-lg",
//   };

//   return (
//     <button
//       onClick={onClick}
//       className={`bg-[#73C7C7] text-white font-semibold rounded-lg shadow-md hover:bg-[#5fb2b2] transition-all duration-300 ${
//         sizeClasses[size]
//       } ${full ? "w-full" : ""} ${className}`}
//     >
//       {children}
//     </button>
//   );
// }
"use client";
import React, { useState } from "react";

export default function Button({
  children,
  onClick,
  size = "md",
  full = false,
  className = "", // Default hover background color
}) {

  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
    //   style={{ backgroundColor: currentBg }}
      className={`text-gray-500 hover:text-gray-300 font-semibold rounded-lg shadow-md hover:bg-[rgba(58,56,56,0.9)] transition-all duration-300 ${sizeClasses[size]} ${
        full ? "w-full" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
}

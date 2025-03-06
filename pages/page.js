"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("https://mobile-finance-server-production.up.railway.app/")
      .then((response) => setMessage(response.data.message))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1>React + Node.js Connection</h1>
      <p>{message}</p>
    </div>
  );
}

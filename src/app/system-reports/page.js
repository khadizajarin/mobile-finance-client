"use client"
import { useEffect, useState } from "react";
import Navbar from "../homepage/navbar";

export default function SystemReport() {
    const [report, setReport] = useState(null);
    
    useEffect(() => {
        // Simulated API call to fetch system report data
        fetch("/api/system-report")
            .then((res) => res.json())
            .then((data) => setReport(data))
            .catch((err) => console.error("Error fetching report:", err));
    }, []);

    return (
        <div >
            <Navbar></Navbar>
            <div className="flex  justify-center">
                <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-semibold mb-4">System Report</h1>
                {report ? (
                    <div className="space-y-4">
                        <div>
                            <h2 className="text-lg font-medium">Total Users</h2>
                            <p className="text-gray-700">{report.totalUsers}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-medium">Approved Users</h2>
                            <p className="text-gray-700">{report.approvedUsers}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-medium">System Uptime</h2>
                            <p className="text-gray-700">{report.systemUptime}</p>
                        </div>
                    </div>
                ) : (
                    <p>Loading report...</p>
                )}
            </div>
            </div>
            
        </div>
    );
}

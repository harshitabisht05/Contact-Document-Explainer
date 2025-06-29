"use client";

import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";


export default function ExportButtons({ fileId }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDownloadPDF = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("❌ User not authenticated");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/export/pdf/${fileId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Download failed");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `meeting_${fileId}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);

      setMessage("✅ PDF downloaded successfully!");
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="flex flex-col items-center justify-center mt-4">
    <button
      onClick={handleDownloadPDF}
      disabled={loading}
      style={{ fontFamily: "var(--font-manrope)" }}
      className={`w-48 bg-blue-600 text-white py-2 rounded transition text-center ${
        loading ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700"
      }`}
    >
      {loading ? <LoadingSpinner message="Downloading..." /> : "Export to PDF"}

    </button>

    {message && <p className="text-white pt-2 text-center">{message}</p>}
  </div>
);

}

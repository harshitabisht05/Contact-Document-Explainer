"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import TranscriptSummary from "@/app/components/TranscriptSummary";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import ExportButtons from "@/app/components/ExportButtons";


export default function FileDetailPage() {
  const { file_id } = useParams(); // ✅ Correct usage
  const [summaryData, setSummaryData] = useState(null);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);


  // Fetch token on load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setError("❌ User not authenticated. Please log in.");
    } else {
      setToken(storedToken);
    }
  }, []);

  // Fetch summary once token & file_id are available
  useEffect(() => {
    if (token && file_id) {
      handleSummarize();
    }
  }, [token, file_id]);

  const handleSummarize = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/summarize/${file_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Summarization failed");

      setSummaryData(data);
    } catch (err) {
      setError(`❌ ${err.message}. Login again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <video
        className="fixed inset-0 w-full h-full object-cover z-0 brightness-50"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/images/background.mp4" type="video/mp4" />
      </video>

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 pt-10">
        <div className="max-w-4xl w-full bg-white/20 backdrop-blur-md p-8 rounded-xl shadow-xl">
          <button
            onClick={() => window.history.back()}
            style={{ fontFamily: 'var(--font-manrope)' }}
            className="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            ← Back
          </button>

          {loading && <LoadingSpinner message="Summarizing your document..." />}

          {error && <p className="text-red-300">{error}</p>}

          {summaryData && (
            <div className="space-y-6">
              <TranscriptSummary
                transcript={summaryData.transcribed_text}
                summary={summaryData.processed_output?.summary}
                clauses={summaryData.processed_output?.clauses}
              />
              <ExportButtons fileId={file_id} />
            </div>
            
          )}
        </div>
      </div>
    </div>
  );
}

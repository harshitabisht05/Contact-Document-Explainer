"use client";

import { useState, useEffect } from "react";
import TranscriptSummary from "../components/TranscriptSummary";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";
import ExportButtons from "../components/ExportButtons";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingSummarize, setLoadingSummarize] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setError("❌ User not authenticated. Please log in.");
    } else {
      setToken(storedToken);
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setSummaryData(null);
      setError("");
      setFileId(null);
    } else {
      setFile(null);
      setError("❌ Please upload a valid PDF file.");
    }
  };

  const handleUpload = async () => {
    if (!file || !token) return;

    try {
      setLoadingUpload(true);
      setError("");

      const formData = new FormData();
      formData.append("document", file);

      const uploadRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/file/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.detail || "Upload failed");

      setFileId(uploadData.id);
      setSuccessMessage("✅ File uploaded successfully!");
    } catch (err) {
      setError(`❌ ${err.message}. Login again.`);
      setSuccessMessage("");
    } finally {
      setLoadingUpload(false);
    }
  };

  const handleSummarize = async () => {
    if (!fileId || !token) return;

    try {
      setLoadingSummarize(true);
      setError("");

      const summarizeRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/summarize/${fileId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const summary = await summarizeRes.json();
      if (!summarizeRes.ok) throw new Error(summary.detail || "Summarization failed");

      setSummaryData(summary);
    } catch (err) {
      setError(`❌ ${err.message}. Login again.`);
    } finally {
      setLoadingSummarize(false);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="relative min-h-screen overflow-hidden text-white">
     <div className="fixed inset-0 z-0">
  <video
    className="w-full h-full object-cover brightness-50"
    autoPlay
    muted
    loop
    playsInline
  >
    <source src="/images/background.mp4" type="video/mp4" />
  </video>
</div>

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="max-w-md w-full bg-white/20 backdrop-blur-md p-8 rounded-xl shadow-xl mb-8 mt-10">
          <h1 style={{ fontFamily: 'var(--font-manrope)' }} className="text-3xl font-bold text-center text-white mb-6">
            Upload Your PDF
          </h1>

          <div className="mb-4">
            <label
              htmlFor="pdf-upload"
              style={{ fontFamily: 'var(--font-nunito)' }}
              className="cursor-pointer bg-white text-black px-4 py-2 rounded font-medium hover:bg-gray-200 transition"
            >
              Choose File
            </label>
            <input
              id="pdf-upload"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <p style={{ fontFamily: 'var(--font-nunito)' }} className="mt-2 text-sm">
              {file ? `Selected: ${file.name}` : "No file chosen"}
            </p>
          </div>

          <div style={{ fontFamily: 'var(--font-manrope)' }} className="flex flex-row gap-4 justify-between">
            <button
              onClick={handleUpload}
              disabled={!file || loadingUpload}
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center"
            >
              <span className="flex items-center justify-center h-5">
  {loadingUpload ? (
    <LoadingSpinner message="Uploading..." />
  ) : (
    "Upload File"
  )}
</span>            </button>

            <button
              onClick={handleSummarize}
              disabled={!fileId || loadingSummarize}
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center"
            >
             <span className="flex items-center justify-center h-5">
  {loadingSummarize ? (
    <LoadingSpinner message="Summarizing..." />
  ) : (
    "Summarize"
  )}
</span>
            </button>
          </div>

          {error && (
            <p style={{ fontFamily: 'var(--font-nunito)' }} className="text-sm mt-4 text-red-300 whitespace-pre-wrap">
              {error}
            </p>
          )}

          {successMessage && (
  <p style={{ fontFamily: 'var(--font-nunito)' }} className="text-sm mt-4 text-green-300 whitespace-pre-wrap">
    {successMessage}
  </p>
)}
        </div>

        {summaryData && (
          <div className="max-w-4xl w-full bg-white/20 backdrop-blur-md p-8 rounded-xl shadow-xl">
            <TranscriptSummary
              transcript={summaryData.transcribed_text}
              summary={summaryData.processed_output?.summary}
              clauses={summaryData.processed_output?.clauses}
            />
            <ExportButtons fileId={fileId} />
          </div>
        )}
      </div>
    </div>
    </>
  );
}

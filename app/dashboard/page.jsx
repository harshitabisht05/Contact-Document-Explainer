"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function UploadPage() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getToken = () => localStorage.getItem("token");

  const loadFiles = async () => {
    const token = getToken();
    if (!token) return setError("❌ Unauthorized. Login First.");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/file`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch files");

      const data = await res.json();
      setFiles(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      setError("❌ Error loading files");
      console.error(err);
    }
  };

const handleDelete = async (fileId) => {
  const token = getToken();

  if (!window.confirm("Are you sure you want to delete this file?")) return;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/file/${fileId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Delete failed");

    setSuccess("✅ File deleted");
    await loadFiles(); // Refresh the file list
  } catch (err) {
    setError("❌ Failed to delete file");
  }
};

  const handleView = (fileId) => {
    window.location.href = `/summary/${fileId}`;
  };

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <>
    <Navbar />
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


      {/* Main Content */}
      <div className="relative z-20 min-h-screen px-4 py-10 flex flex-col items-center justify-start text-white">
        <h1
          className="text-3xl font-bold mb-6"
          style={{ fontFamily: 'var(--font-eurostile)' }}
        >
          Uploaded Files Dashboard
        </h1>


        {/* 📋 File Table */}
        <div className="w-full max-w-5xl overflow-x-auto bg-white/10 backdrop-blur-xl rounded-lg shadow-lg border border-white/30">
          <table className="min-w-full text-sm text-white" style={{ fontFamily: 'var(--font-manrope)' }}>
            <thead className="bg-white/20">
              <tr>
                <th className="px-4 py-3 text-left">Filename</th>
                <th className="px-4 py-3 text-left">Uploaded On</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.filename} className="border-t border-white/20">
                  <td className="px-4 py-2">{file.filename}</td>
                  <td className="px-4 py-2">{new Date(file.uploaded_at).toLocaleString()}</td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <a
                      onClick={() => handleView(file.id)}
                      className="bg-white/30 text-black px-3 py-1 rounded hover:bg-white/50"
                    >
                      View
                    </a>
                    <button
                       onClick={() => handleDelete(file.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {files.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-300">
                    No files found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default function InciSend() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (f: File) => {
    if (f.size > MAX_FILE_SIZE) {
      setMessage("Max file size is 50MB");
      return;
    }
    setFile(f);
    setMessage("");
  };

  const handleSend = async () => {
    if (!file || !password) {
      setMessage("Select file and password");
      return;
    }

    setUploading(true);
    setMessage("");

    const generatedCode = generateCode();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("code", generatedCode);
    formData.append("password", password);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const json = await res.json();
    setUploading(false);

    if (!json.success) {
      setMessage(json.error || "Upload failed");
      return;
    }

    setCode(generatedCode);
    setMessage("File uploaded successfully");
  };

  return (
    <div className="mx-auto max-w-lg">
      {/* HEADER */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Send a File Securely</h1>
        <p className="text-sm text-slate-500">
          Your file is encrypted locally. We never store passwords.
        </p>
      </div>

      {/* CARD */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        {/* SECURITY INFO */}
        <div className="mb-4 rounded-lg bg-indigo-50 p-3 text-sm text-indigo-700 flex gap-2">
          <span>🛡️</span>
          <span>AES-256 encryption · Auto-deletes after 1 hour</span>
        </div>
  <p className="mt-4 text-center text-sm text-gray-500">
  Need larger files or longer expiry?{" "}
  <Link href="/pricing" className="text-[#8c52ff] font-medium underline">
    View pricing
  </Link>
</p>

        {/* DROP ZONE */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            const droppedFile = e.dataTransfer.files?.[0];
            if (droppedFile) handleFile(droppedFile);
          }}
          className={`mb-4 cursor-pointer rounded-xl border-2 border-dashed p-6 text-center text-sm transition ${
            dragActive ? "border-indigo-500 bg-indigo-50" : "border-slate-300"
          }`}
        >
          <input
            type="file"
            className="hidden"
            id="fileInput"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />

          <label htmlFor="fileInput" className="cursor-pointer">
            {file ? (
              <span className="font-medium text-slate-700">
                Selected: {file.name}
              </span>
            ) : (
              <span>Drag & drop file here or click to choose</span>
            )}
          </label>

          <div className="mt-2 text-xs text-slate-400">
            Max file size: 50MB
          </div>
        </div>

        {/* PASSWORD */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Set password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border px-4 py-2 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.7 text-sm text-slate-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* ACTION */}
        <button
          onClick={handleSend}
          disabled={uploading}
          className="w-full rounded-lg bg-indigo-600 py-2 font-medium text-white hover:bg-indigo-700 transition disabled:opacity-60"
        >
          {uploading ? "Uploading..." : "Generate Secure Code"}
        </button>

       
        {/* PROGRESS */}
        {uploading && (
          <div className="mt-3 h-2 w-full overflow-hidden rounded bg-slate-200">
            <div className="h-full w-2/3 animate-pulse bg-indigo-600" />
          </div>
        )}

        {/* RESULT */}
        {code && (
  <>
    <div className="mt-6 rounded-xl bg-indigo-600 px-6 py-5 text-center text-white">
      <p className="text-xs uppercase tracking-widest text-indigo-200">
        Secure Code
      </p>

      <div className="mt-2 text-4xl font-mono font-bold tracking-widest">
        {code}
      </div>

      <button
        onClick={() => navigator.clipboard.writeText(code)}
        className="mt-3 text-xs underline opacity-80 hover:opacity-100"
      >
        Copy Code
      </button>

      <p className="mt-2 text-xs text-indigo-200">
        Share this code + password
      </p>
    </div>

    <p className="mt-2 text-xs text-slate-400 text-center">
      File will be permanently deleted after 1 hour
    </p>
  </>
)}

        {message && (
          <p className="mt-4 text-center text-sm text-slate-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

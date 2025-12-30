"use client";

import { useState } from "react";
import {
  Shield,
  UploadCloud,
  Eye,
  EyeOff,
  CheckCircle,
} from "lucide-react";


const MAX_FILE_SIZE = 50 * 1024 * 1024;

function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default function InciSend({ mode }: { mode: "send" | "receive" }) {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [message, setMessage] = useState("");
 const [dragActive, setDragActive] = useState(false);


  /* ================= SEND ================= */
  const handleSend = async () => {
    if (!file || !password) {
      setMessage("Select a file and set a password.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setMessage("File exceeds 50MB limit.");
      return;
    }

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

    if (!json.success) {
      setMessage(json.error || "Upload failed.");
      return;
    }

    setCode(generatedCode);
    setMessage("File uploaded. Share the code & password.");
  };

  /* ================= RECEIVE ================= */
  const handleReceive = async () => {
    if (!inputCode) {
      setMessage("Enter the magic code.");
      return;
    }

    const res = await fetch("/api/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: inputCode.trim(),
        password,
      }),
    });

    if (!res.ok) {
      setMessage("Invalid code or file expired.");
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "downloaded-file";
    a.click();
    window.URL.revokeObjectURL(url);

    setMessage("File downloaded successfully.");
  };

/* ================= SEND UI ================= */

return (
  <div className="space-y-6">

    {/* INFO BAR */}
    <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700 flex items-center gap-2">
      <Shield size={16} />
      Files are encrypted locally and auto-deleted after 1 hour.
    </div>

    {/* TITLE */}
    <div className="text-center">
      <h2 className="text-2xl font-bold">Send a File Securely</h2>
      <p className="mt-1 text-sm text-slate-500">
        No accounts. No permanent storage. Fully private.
      </p>
    </div>

    {/* UPLOAD CARD */}
    <label
      className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center transition cursor-pointer
        ${
          dragActive
            ? "border-indigo-500 bg-indigo-50"
            : "border-slate-300"
        }`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragActive(false);
        setFile(e.dataTransfer.files?.[0] || null);
      }}
    >
      <Upload className="mb-2 text-slate-400" />
      <p className="text-sm text-slate-600">
        Drag & drop a file or click to upload
      </p>
      <p className="mt-1 text-xs text-slate-400">
        Max file size: 50 MB
      </p>

      <input
        type="file"
        className="hidden"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
    </label>

    {/* PASSWORD */}
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Set a password (optional)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-lg border px-4 py-2 pr-10"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>

    {/* EXPIRY NOTE */}
    <p className="text-xs text-slate-500 text-center">
      Your file will expire automatically 1 hour after upload.
    </p>

    {/* ACTION */}
    <button
      onClick={handleSend}
      className="w-full rounded-lg bg-indigo-600 py-2 font-medium text-white transition hover:bg-indigo-700"
    >
      Generate Secure Code
    </button>

    {/* FOOT TRUST */}
    <p className="text-center text-xs text-slate-500">
      We never store passwords. Decryption happens in your browser.
    </p>

    {message && (
      <p className="text-center text-sm text-slate-500">
        {message}
      </p>
    )}

  </div>
);


     /* ================= UI ================= */
  
        return (
        <div className="space-y-6">

            {/* ================= RECEIVE UI ================= */}

              {mode === "receive" && (
      <div className="space-y-5">
        <div className="rounded-lg border border-indigo-100 bg-indigo-50 p-4 text-sm text-indigo-700">
          Ensure you have the correct code. Files expire after 1 hour.
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold">Receive File</h2>
          <p className="mt-1 text-sm text-slate-500">
            Enter your unique Secure code to decrypt and download.
          </p>
        </div>

        <input
          placeholder="Enter secure magic code"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value.toUpperCase())}
          className="w-full rounded-lg border px-4 py-2"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password (only if sender set one)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border px-4 py-2 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button
          onClick={handleReceive}
          className="w-full rounded-lg bg-indigo-600 py-2 font-medium text-white transition hover:bg-indigo-700"
        >
          Decrypt & Download
        </button>

        <p className="text-center text-xs text-slate-500">
          Files are decrypted locally in your browser.
        </p>
      </div>
    )}

    {message && (
      <p className="mt-4 text-center text-sm text-slate-500">
        {message}
      </p>
    )}

  </div>
);
}


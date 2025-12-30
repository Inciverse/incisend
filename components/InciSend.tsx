"use client";

import { useState } from "react";
import {
  Eye,
  EyeOff,
  UploadCloud,
  Shield,
  CheckCircle,
} from "lucide-react";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

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
  const [loading, setLoading] = useState(false);

  // ================= SEND =================
  const handleSend = async () => {
    if (!file || !password) {
      setMessage("❌ Select a file and set a password.");
      return;
    }

    setLoading(true);
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

    setLoading(false);

    if (!json.success) {
      setMessage("❌ Upload failed. Try again.");
      return;
    }

    setCode(generatedCode);
    setMessage("✅ File uploaded successfully. Share the code & password.");
  };

  // ================= RECEIVE =================
  const handleReceive = async () => {
    if (!inputCode) {
      setMessage("❌ Enter the magic code.");
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
      setMessage("❌ Invalid code or file expired.");
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "downloaded-file";
    a.click();

    window.URL.revokeObjectURL(url);
    setMessage("✅ File downloaded successfully.");
  };

  // ================= UI =================
  return (
    <div className="space-y-6">
      {/* ================= SEND UI ================= */}
      {mode === "send" && (
        <div className="space-y-5">
          {/* Security Info */}
          <div className="flex items-center gap-2 rounded-lg border border-indigo-100 bg-indigo-50 p-4 text-sm text-indigo-800">
            <Shield size={16} />
            Files are encrypted locally. We never store passwords.
          </div>

          {/* Drag & Drop */}
          <div
            className={`cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition
              ${
                file
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-slate-300 hover:border-indigo-400 hover:bg-indigo-50"
              }`}
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            {file ? (
              <div className="flex flex-col items-center gap-2">
                <CheckCircle className="h-8 w-8 text-emerald-600" />
                <p className="text-sm font-semibold text-emerald-700">
                  {file.name}
                </p>
                <p className="text-xs text-emerald-600">
                  {(file.size / 1024 / 1024).toFixed(2)} MB selected
                </p>
              </div>
            ) : (
              <>
                <UploadCloud className="mx-auto h-8 w-8 text-indigo-600" />
                <p className="mt-2 text-sm font-medium">
                  Drag & drop your file here
                </p>
                <p className="text-xs text-slate-500">
                  or click to browse (Max 50MB)
                </p>
              </>
            )}

            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (!selectedFile) return;

                if (selectedFile.size > MAX_FILE_SIZE) {
                  setMessage("❌ Max file size is 50MB");
                  return;
                }

                setFile(selectedFile);
              }}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Set password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Meta Info */}
          <p className="text-xs text-slate-500">
            Max file size: 50MB · Files auto-delete after 1 hour
          </p>

          {/* Action */}
          <button
            onClick={handleSend}
            disabled={loading}
            className={`w-full rounded-lg py-2 font-medium text-white transition
              ${
                loading
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
          >
            {loading ? "Uploading..." : "Generate Secure Code"}
          </button>

          {/* Code Output */}
          {code && (
            <div className="mt-6 rounded-xl bg-indigo-700 p-5 text-center shadow-xl">
              <p className="text-xs uppercase tracking-widest text-white/80">
                Your Magic Code
              </p>
              <p className="mt-2 text-4xl font-mono font-extrabold tracking-widest text-white">
                {code}
              </p>
              <p className="mt-3 text-xs text-white/90">
                Share this code + password securely
              </p>
            </div>
          )}
        </div>
      )}

      {/* ================= RECEIVE UI ================= */}
      {mode === "receive" && (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
    <div className="w-full max-w-md">

      {/* White Card */}
      <div className="rounded-2xl bg-white p-6 shadow-xl space-y-5">

        {/* Info Box (Consistency with Send Page) */}
        <div className="flex items-center gap-2 rounded-lg bg-indigo-50 border border-indigo-100 p-4 text-sm text-indigo-700">
          <Shield size={16} />
          Ensure you have the correct code. Files expire after 1 hour.
        </div>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
            <Lock size={18} className="text-indigo-600" />
          </div>

          <h2 className="text-2xl font-bold">Receive File</h2>

          <p className="text-sm text-slate-500">
            Enter your unique magic code to decrypt and download the file.
          </p>
        </div>

        {/* Magic Code */}
        <input
          placeholder="Enter secure magic code"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value.toUpperCase())}
          className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password (only if sender set one)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Action */}
        <button
          onClick={handleReceive}
          className="w-full rounded-lg bg-indigo-600 py-2.5 font-medium text-white hover:bg-indigo-700 transition"
        >
          Decrypt & Download
        </button>

        {/* Trust Micro-copy */}
        <p className="text-center text-xs text-slate-500">
          Files are decrypted locally in your browser.
        </p>
      </div>

      {/* Status Message */}
      {message && (
        <p className="mt-4 text-center text-sm text-slate-600">
          {message}
        </p>
      )}
    </div>
  </div>
)}

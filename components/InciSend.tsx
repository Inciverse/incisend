"use client";

import { useState } from "react";
import {
  Eye,
  EyeOff,
  UploadCloud,
  Shield,
  Lock,
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

  // ================= SEND =================
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

  // ================= RECEIVE =================
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

  // ================= UI =================
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* ================= SEND UI ================= */}
        {mode === "send" && (
          <div className="rounded-2xl bg-white p-6 shadow-xl space-y-5">
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-bold">Send a File Securely</h2>
              <p className="text-sm text-slate-500">
                Upload a file, set a password, and share the magic code.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-indigo-50 border border-indigo-100 p-4 text-sm text-indigo-700">
              <Shield size={16} />
              Files are encrypted locally. We never store passwords.
            </div>

            <div
              className="cursor-pointer rounded-xl border-2 border-dashed border-slate-300 p-6 text-center transition hover:border-indigo-400 hover:bg-indigo-50"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              <UploadCloud className="mx-auto h-8 w-8 text-indigo-600" />
              <p className="mt-2 text-sm font-medium">
                {file ? file.name : "Drag & drop your file here"}
              </p>
              <p className="text-xs text-slate-500">
                or click to browse (Max 50MB)
              </p>

              <input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={(e) => {
                  const selected = e.target.files?.[0];
                  if (!selected) return;

                  if (selected.size > MAX_FILE_SIZE) {
                    setMessage("Max file size is 50MB");
                    return;
                  }

                  setFile(selected);
                }}
              />
            </div>

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

            <p className="text-xs text-slate-500">
              Max file size: 50MB · Files auto-delete after 1 hour
            </p>

            <button
              onClick={handleSend}
              className="w-full rounded-lg bg-indigo-600 py-2 font-medium text-white hover:bg-indigo-700 transition"
            >
              Generate Secure Code
            </button>

            {code && (
              <div className="rounded-xl bg-indigo-600 p-5 text-center text-white shadow-lg">
                <p className="text-xs uppercase tracking-widest">
                  Your Magic Code
                </p>
                <p className="mt-2 text-3xl font-mono font-extrabold tracking-widest text-white">
                  {code}
                </p>
                <p className="mt-3 text-xs text-indigo-100">
                  Share this code + password securely
                </p>
              </div>
            )}
          </div>
        )}

        {/* ================= RECEIVE UI ================= */}
        {mode === "receive" && (
          <div className="rounded-2xl bg-white p-6 shadow-xl space-y-5">
            <div className="flex items-center gap-2 rounded-lg bg-indigo-50 border border-indigo-100 p-4 text-sm text-indigo-700">
              <Shield size={16} />
              Ensure you have the correct code. Files expire after 1 hour.
            </div>

            <div className="text-center space-y-2">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
                <Lock className="text-indigo-600" size={18} />
              </div>
              <h2 className="text-2xl font-bold">Receive File</h2>
              <p className="text-sm text-slate-500">
                Enter your unique magic code to decrypt and download the file.
              </p>
            </div>

            <input
              autoFocus
              placeholder="Enter secure magic code"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.toUpperCase())}
              className="w-full rounded-lg border px-4 py-3"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password (only if sender set one)"
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

            <button
              onClick={handleReceive}
              className="w-full rounded-lg bg-indigo-600 py-2 font-medium text-white hover:bg-indigo-700 transition"
            >
              Decrypt & Download
            </button>

            <p className="text-center text-xs text-slate-500">
              Files are decrypted locally in your browser.
            </p>
          </div>
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





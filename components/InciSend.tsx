"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

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
    <div className="space-y-6">

      {/* ================= SEND UI ================= */}
      {mode === "send" && (
        <div className="space-y-4">

          <input
            type="file"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0] || null;
              if (!selectedFile) return;

              if (selectedFile.size > MAX_FILE_SIZE) {
                alert("Max file size is 50MB");
                e.target.value = "";
                setFile(null);
                return;
              }

              setFile(selectedFile);
            }}
          />

          <div className="relative">
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            onClick={handleSend}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition"
          >
            Generate Secure Code
          </button>

          {code && (
            <div className="mt-6 rounded-xl bg-indigo-600 p-4 text-center text-white">
              <p className="text-xs opacity-80">Your Magic Code</p>
              <p className="text-3xl font-mono font-bold">{code}</p>
              <p className="mt-2 text-xs opacity-80">
                Share this code + password securely
              </p>
            </div>
          )}
        </div>
      )}

      {/* ================= RECEIVE UI ================= */}
      {mode === "receive" && (
        <div className="card space-y-5">

          <div className="rounded-lg border border-indigo-100 bg-indigo-50 p-4 text-sm text-indigo-700">
            🔐 Ensure you have the correct magic code. Files expire after 1 hour.
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold">Receive File</h2>
            <p className="mt-1 text-sm text-slate-500">
              Enter your unique magic code to decrypt and download.
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
        <p className="text-center text-sm text-slate-600">{message}</p>
      )}
    </div>
  );
}

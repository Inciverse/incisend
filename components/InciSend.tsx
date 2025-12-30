"use client";

import { useState } from "react";
import {
  Eye,
  EyeOff,
  UploadCloud,
  Shield,
  CheckCircle,
  Lock,
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
    setMessage("✅ File uploaded successfully.");
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
      {/* ================= RECEIVE UI ================= */}
      {mode === "receive" && (
        <div className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-lg space-y-5">
          {/* Info Box */}
          <div className="flex items-center gap-2 rounded-lg border border-indigo-100 bg-indigo-50 p-4 text-sm text-indigo-800">
            <Shield size={16} />
            Ensure you have the correct code. Files expire after 1 hour.
          </div>

          {/* Header */}
          <div className="text-center space-y-1">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
              <Lock className="text-indigo-600" size={20} />
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
            className="w-full rounded-lg border px-4 py-3"
          />

          {/* Password */}
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

          {/* Action */}
          <button
            onClick={handleReceive}
            className="w-full rounded-lg bg-indigo-600 py-3 font-medium text-white hover:bg-indigo-700 transition"
          >
            Decrypt & Download
          </button>

          {/* Footer Trust */}
          <p className="text-center text-xs text-slate-500">
            Files are decrypted locally in your browser.
          </p>
        </div>
      )}

      {message && (
        <p className="text-center text-sm font-medium text-slate-700">
          {message}
        </p>
      )}
    </div>
  );
}




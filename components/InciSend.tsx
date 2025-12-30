"use client";

import { useState } from "react";
import { Eye, EyeOff, UploadCloud } from "lucide-react";

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
    if (!inputCode || !password) {
      setMessage("Enter code and password.");
      return;
    }

    const res = await fetch("/api/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: inputCode.trim(), password }),
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
      {mode === "send" && (
        <>
          {/* Drag & Drop */}
          <label className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center cursor-pointer hover:border-indigo-500 transition">
            <UploadCloud className="h-8 w-8 text-indigo-600" />
            <p className="text-sm text-slate-600">
              {file ? file.name : "Drag & drop file or click to browse"}
            </p>
            <p className="text-xs text-slate-400">
              Max file size: 50MB · Auto-deletes in 1 hour
            </p>
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                const selected = e.target.files?.[0];
                if (!selected) return;

                if (selected.size > MAX_FILE_SIZE) {
                  setMessage("Max file size is 50MB.");
                  return;
                }
                setFile(selected);
              }}
            />
          </label>

          {/* Password */}
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
            className="w-full rounded-lg bg-indigo-600 py-2 font-medium text-white hover:bg-indigo-700 transition"
          >
            Generate Secure Code
          </button>

          {code && (
            <div className="rounded-2xl bg-indigo-600 px-6 py-5 text-center shadow-xl">
              <p className="text-xs uppercase tracking-widest text-indigo-200">
                Your Secure Code
              </p>
              <div className="mt-2 text-4xl font-mono font-extrabold tracking-widest text-white">
                {code}
              </div>
              <p className="mt-3 text-xs text-indigo-200">
                Share code + password privately
              </p>
            </div>
          )}
        </>
      )}

      {mode === "receive" && (
        <>
          <input
            placeholder="Enter magic code"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value.toUpperCase())}
            className="w-full rounded-lg border px-4 py-2"
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border px-4 py-2"
          />

          <button
            onClick={handleReceive}
            className="w-full rounded-lg bg-indigo-600 py-2 font-medium text-white hover:bg-indigo-700 transition"
          >
            Download File
          </button>
        </>
      )}

      {message && (
        <p className="text-center text-sm text-slate-600">{message}</p>
      )}
    </div>
  );
}

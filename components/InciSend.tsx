"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Incisend() {
  const [mode, setMode] = useState<"send" | "receive">("send");

  // RECEIVE STATES
  const [inputCode, setInputCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  // SEND STATES
  const [file, setFile] = useState<File | null>(null);
  const [sendPassword, setSendPassword] = useState("");

  const handleReceive = () => {
    setMessage("Decrypting file...");
  };

  return (
    <div className="space-y-6">

      {/* MODE SWITCH (optional but useful) */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setMode("send")}
          className={`px-4 py-1 rounded ${
            mode === "send"
              ? "bg-indigo-600 text-white"
              : "border text-slate-600"
          }`}
        >
          Send
        </button>
        <button
          onClick={() => setMode("receive")}
          className={`px-4 py-1 rounded ${
            mode === "receive"
              ? "bg-indigo-600 text-white"
              : "border text-slate-600"
          }`}
        >
          Receive
        </button>
      </div>

      {/* ================= SEND UI ================= */}
      {mode === "send" && (
        <div className="mx-auto w-full max-w-md space-y-5 rounded-xl border bg-white p-6 shadow-sm">

          <div className="rounded-lg border border-indigo-100 bg-indigo-50 p-4 text-sm text-indigo-700">
            Files are encrypted locally and auto-deleted after 1 hour.
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold">Send a File Securely</h2>
            <p className="mt-1 text-sm text-slate-500">
              No signup required. We never store passwords.
            </p>
          </div>

          {/* UPLOAD BOX */}
          <label
            className="
              flex cursor-pointer flex-col items-center justify-center
              rounded-lg border-2 border-dashed border-slate-300
              p-8 text-center transition
              hover:border-indigo-500 hover:bg-indigo-50
            "
          >
            <input
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />

            <p className="text-sm font-medium text-slate-700">
              {file ? file.name : "Drag & drop a file or click to upload"}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Max file size: 50MB
            </p>
          </label>

          <input
            type="password"
            placeholder="Set password (optional)"
            value={sendPassword}
            onChange={(e) => setSendPassword(e.target.value)}
            className="w-full rounded-lg border px-4 py-2"
          />

          <button className="w-full rounded-lg bg-indigo-600 py-2 font-medium text-white transition hover:bg-indigo-700">
            Generate Secure Code
          </button>

          <p className="text-center text-xs text-slate-500">
            Your file will expire 1 hour after upload.
          </p>
        </div>
      )}

      {/* ================= RECEIVE UI ================= */}
      {mode === "receive" && (
        <div className="mx-auto w-full max-w-md space-y-5">

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

          {message && (
            <p className="text-center text-sm text-slate-500">
              {message}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

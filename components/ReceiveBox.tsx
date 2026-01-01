"use client";

import { useState } from "react";

export default function ReceiveBox() {
  const [inputCode, setInputCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);


  const handleReceive = async () => {
    if (!inputCode) {
      setVerified(false);
      setMessage("Enter a valid secure code");
      return;
    }

    setLoading(true);
    setMessage("");
    setVerified(false);

    const res = await fetch("/api/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: inputCode.trim(),
        password,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      setVerified(false);
      setMessage("Invalid code, wrong password, or file expired");
      return;
    }

   setVerified(true)
    
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "downloaded-file";
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);

    setMessage("File downloaded successfully");
  };

  return (
    <div className="mx-auto max-w-lg">
      {/* HEADER */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold flex justify-center gap-2 items-center">
          🔐 Receive File
        </h1>
        <p className="text-sm text-slate-500">
          Enter your secure code to decrypt and download the file.
        </p>
      </div>

      {/* CARD */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        {/* INFO BOX */}
        <div className="mb-4 rounded-lg bg-indigo-50 p-3 text-sm text-indigo-700 flex gap-2">
          <span>ℹ️</span>
          <span>Files expire automatically after 1 hour</span>
        </div>

        {/* CODE INPUT */}
        <input
          placeholder="Enter secure code (ABC123)"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value.toUpperCase())}
          className="mb-4 w-full rounded-lg border px-4 py-2"
        />

        {/* PASSWORD */}
        <div className="relative mb-4">
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
            className="absolute right-3 top-2.5 text-sm text-slate-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* ACTION */}
        <button
          onClick={handleReceive}
          disabled={loading || !inputCode}
          className="w-full rounded-lg bg-indigo-600 py-2 font-medium text-white hover:bg-indigo-700 transition disabled:opacity-60"
        >
          {loading ? "Verifying..." : "Decrypt & Download"}
        </button>

        {/* MICRO COPY */}
        <p className="mt-3 text-center text-xs text-slate-400">
          Files are decrypted locally in your browser
        </p>
        
        {verified && (
  <div className="mt-4 rounded-lg bg-green-50 p-3 text-green-700 text-sm text-center">
    ✅ File verified. Downloading securely…
  </div>
)}

        {/* MESSAGE */}
        {message && (
          <p className="mt-4 text-center text-sm text-slate-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

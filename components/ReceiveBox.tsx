"use client";

import { useState } from "react";

export default function ReceiveBox() {
  const [inputCode, setInputCode] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReceive = async () => {
    if (!inputCode || !password) {
      setMessage("Enter code and password");
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
      setMessage("Invalid code or file expired");
      return;
    }

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
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <input
        placeholder="Enter magic code"
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value.toUpperCase())}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button
        onClick={handleReceive}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition"
      >
        Download File
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

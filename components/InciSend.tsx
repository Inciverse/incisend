"use client";

import { useState } from "react";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default function Incisend({ mode }: { mode: "send" | "receive" }) {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [message, setMessage] = useState("");

  // ================= SEND =================
  const handleSend = async () => {
    if (!file || !password) {
      setMessage("Select file and password");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setMessage("File is larger than 50MB");
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
      setMessage(json.error || "Upload failed");
      return;
    }

    setCode(generatedCode);
    setMessage("File uploaded. Share the code & password.");
  };

  // ================= RECEIVE =================
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

  // ================= UI =================
  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      {mode === "send" && (
  <>
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

    <input
      type="password"
      placeholder="Set password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <br />
    <br />

    <button
      onClick={handleSend}
      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition"
    >
      Generate Magic Code
    </button>

    {code && (
      <div className="mt-8 rounded-2xl bg-indigo-600 px-6 py-5 text-center shadow-xl">
        <p className="text-xs uppercase tracking-widest text-indigo-200">
          Your Magic Code
        </p>

        <div className="mt-2 text-4xl font-mono font-extrabold tracking-widest text-white">
          {code}
        </div>

        <p className="mt-3 text-xs text-indigo-200">
          Share this code + password to download
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

        </>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

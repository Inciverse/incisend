"use client";

import { useState } from "react";
import { Eye, EyeOff, Upload, Shield, Check } from "lucide-react";

export default function Incisend() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [secureCode, setSecureCode] = useState<string | null>(null);

  function generateCode() {
    if (!file || !password) return;
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setSecureCode(code);
  }

  return (
    <section className="max-w-xl mx-auto mt-24">
      {/* TITLE */}
      <h1 className="text-3xl font-bold text-center">
        Send a File Securely
      </h1>
      <p className="text-center text-slate-400 mt-2">
        Files are encrypted locally and auto-deleted after 1 hour.
      </p>

      {/* CARD */}
      <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6">
        {/* SECURITY */}
        <div className="flex items-center gap-2 bg-blue-900/30 text-blue-300 px-4 py-2 rounded-md text-sm">
          <Shield size={16} />
          Zero storage • Temporary by design
        </div>

        {/* FILE INPUT */}
        <label className="border-2 border-dashed border-zinc-700 rounded-lg p-6 cursor-pointer text-center hover:border-blue-500 transition">
          <Upload className="mx-auto mb-2 text-slate-400" />
          <p className="text-slate-300">
            {file ? file.name : "Click to select a file"}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Max file size: 50MB
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
            placeholder="Set a password"
            className="w-full px-4 py-3 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-slate-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* ACTION */}
        <button
          onClick={generateCode}
          disabled={!file || !password}
          className="w-full py-3 rounded-md bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition font-medium"
        >
          Generate Secure Code
        </button>

        {/* RESULT */}
        {secureCode && (
          <div className="bg-zinc-800 border border-zinc-700 rounded-md p-4 text-center">
            <p className="text-sm text-slate-400 mb-1">
              Share this secure code
            </p>
            <div className="text-2xl font-mono tracking-widest text-green-400 flex items-center justify-center gap-2">
              <Check size={18} />
              {secureCode}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

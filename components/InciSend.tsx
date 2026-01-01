"use client";

import { useState } from "react";
import { Eye, EyeOff, Upload, Shield } from "lucide-react";

export default function Incisend() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  return (
    <section className="max-w-xl mx-auto mt-24">
      {/* TITLE */}
      <h1 className="text-3xl font-bold text-center">
        Send a File Securely
      </h1>
      <p className="text-center text-slate-500 mt-2">
        Your file is encrypted locally. We never store passwords.
      </p>

      {/* CARD */}
      <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6">
        {/* SECURITY NOTE */}
        <div className="flex items-center gap-2 bg-blue-900/30 text-blue-300 px-4 py-2 rounded-md text-sm">
          <Shield size={16} />
          Files auto-delete after 1 hour
        </div>

        {/* FILE DROP */}
        <label
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 cursor-pointer transition
          ${
            dragActive
              ? "border-blue-500 bg-blue-500/10"
              : "border-zinc-700"
          }`}
          onDragOver={() => setDragActive(true)}
          onDragLeave={() => setDragActive(false)}
          onDrop={() => setDragActive(false)}
        >
          <Upload className="mb-2 text-slate-400" />
          <span className="text-sm text-slate-400">
            Drag & drop a file or click to select
          </span>
          <span className="text-xs text-slate-500 mt-1">
            Max file size: 50MB
          </span>

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
            className="w-full px-4 py-3 rounded-md bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-blue-500"
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

        {/* EXPIRY INFO */}
        <p className="text-xs text-slate-500">
          Your file will expire 1 hour after upload.
        </p>

        {/* FAKE PROGRESS (SAFE) */}
        {file && (
          <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
            <div className="bg-blue-600 h-full w-2/3 animate-pulse" />
          </div>
        )}

        {/* CTA */}
        <button className="w-full py-3 rounded-md bg-blue-600 hover:bg-blue-700 transition font-medium">
          Generate Secure Code
        </button>
      </div>
    </section>
  );
}

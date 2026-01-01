"use client";

import { useState } from "react";

import { Upload, Eye, EyeOff, Shield, Check } from "lucide-react";

function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default function Incisend() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload() {
    if (!file || !password) {
      setError("File and password required");
      return;
    }

    setLoading(true);
    setError("");

    const secureCode = generateCode();
    const filePath = `${secureCode}/${file.name}`;

    // 1️⃣ Upload to storage
    const { error: uploadError } = await supabase.storage
      .from("files")
      .upload(filePath, file);

    if (uploadError) {
      setError("Upload failed");
      setLoading(false);
      return;
    }

    // 2️⃣ Insert DB record
    const { error: dbError } = await supabase.from("files").insert({
      code: secureCode,
      file_path: filePath,
      password_hash: password,
      orignal_name: file.name,
      mime_type: file.type,
      expires_at: new Date(Date.now() + 60 * 60 * 1000),
    });

    if (dbError) {
      setError("Database insert failed");
      setLoading(false);
      return;
    }

    setCode(secureCode);
    setLoading(false);
  }

  return (
    <section className="max-w-xl mx-auto mt-24">
      <h1 className="text-3xl font-bold text-center">Send a Secure File</h1>

      <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-2 bg-blue-900/30 text-blue-300 px-4 py-2 rounded-md text-sm">
          <Shield size={16} />
          Files auto-delete after 1 hour
        </div>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="text-white"
        />

        {file && (
          <p className="text-green-400 text-sm flex items-center gap-2">
            <Check size={16} /> {file.name}
          </p>
        )}

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Set password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-md text-white"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            type="button"
            className="absolute right-3 top-3 text-slate-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full py-3 bg-blue-600 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Uploading..." : "Generate Secure Code"}
        </button>

        {code && (
          <div className="bg-zinc-800 border border-zinc-700 rounded-md p-4 text-center">
            <p className="text-slate-400 text-sm">Share this code</p>
            <p className="text-2xl font-bold tracking-widest text-green-400">
              {code}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

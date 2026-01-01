"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Eye, EyeOff, Download, Shield } from "lucide-react";

export default function ReceiveBox() {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  async function handleVerify() {
    setError("");
    setDownloadUrl(null);
    setLoading(true);

    // 1️⃣ Fetch file by secure code
    const { data, error } = await supabase
      .from("files")
      .select("*")
      .eq("code", code.trim().toUpperCase())
      .single();

    if (error || !data) {
      setError("Invalid secure code");
      setLoading(false);
      return;
    }

    // 2️⃣ Check password
    if (data.password_hash !== password) {
      setError("Incorrect password");
      setLoading(false);
      return;
    }

    // 3️⃣ Check expiry
    if (new Date(data.expires_at) < new Date()) {
      setError("This file has expired");
      setLoading(false);
      return;
    }

    // 4️⃣ Create signed download URL
    const { data: signed, error: signError } =
      await supabase.storage
        .from("files")
        .createSignedUrl(data.file_path, 60);

    if (signError || !signed) {
      setError("Failed to generate download link");
      setLoading(false);
      return;
    }

    setDownloadUrl(signed.signedUrl);
    setLoading(false);
  }

  return (
    <section className="max-w-xl mx-auto mt-24">
      <h1 className="text-3xl font-bold text-center">
        Receive a Secure File
      </h1>
      <p className="text-center text-slate-400 mt-2">
        Enter the secure code and password to download.
      </p>

      <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6">
        {/* INFO */}
        <div className="flex items-center gap-2 bg-blue-900/30 text-blue-300 px-4 py-2 rounded-md text-sm">
          <Shield size={16} />
          Files auto-delete after 1 hour
        </div>

        {/* CODE INPUT */}
        <input
          type="text"
          placeholder="SECURE CODE"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-md text-white tracking-widest placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
        />

        {/* PASSWORD INPUT */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-slate-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-sm text-red-400 text-center">
            {error}
          </p>
        )}

        {/* VERIFY BUTTON */}
        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full py-3 rounded-md bg-blue-600 hover:bg-blue-700 transition font-medium"
        >
          {loading ? "Verifying..." : "Verify & Download"}
        </button>

        {/* DOWNLOAD */}
        {downloadUrl && (
          <a
            href={downloadUrl}
            className="block text-center py-3 rounded-md bg-green-600 hover:bg-green-700 transition font-medium"
          >
            <Download size={16} className="inline mr-2" />
            Download File
          </a>
        )}
      </div>
    </section>
  );
}

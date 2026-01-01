"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Eye, EyeOff, Download, Shield } from "lucide-react";

export default function ReceiveBox() {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function verifyFile() {
    setError("");
    setLoading(true);
    setFileUrl(null);

    const { data, error } = await supabase
      .from("files")
      .select("*")
      .eq("secure_code", code)
      .single();

    if (error || !data) {
      setError("Invalid secure code");
      setLoading(false);
      return;
    }

    if (data.password !== password) {
      setError("Incorrect password");
      setLoading(false);
      return;
    }

    if (new Date(data.expires_at) < new Date()) {
      setError("File has expired");
      setLoading(false);
      return;
    }

    setFileUrl(data.file_url);
    setLoading(false);
  }

  return (
    <section className="max-w-xl mx-auto mt-24">
      <h1 className="text-3xl font-bold text-center">Receive a File</h1>

      <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-2 bg-blue-900/30 text-blue-300 px-4 py-2 rounded-md text-sm">
          <Shield size={16} />
          Files auto-delete after 1 hour
        </div>

        <input
          placeholder="Secure Code"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-md text-white"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-md text-white"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-slate-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          onClick={verifyFile}
          disabled={loading}
          className="w-full py-3 bg-blue-600 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Verifying..." : "Verify File"}
        </button>

        {fileUrl && (
          <a
            href={fileUrl}
            className="block text-center py-3 bg-green-600 rounded-md hover:bg-green-700 transition"
          >
            <Download className="inline mr-2" size={16} />
            Download File
          </a>
        )}
      </div>
    </section>
  );
}

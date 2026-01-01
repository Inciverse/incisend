"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, Download, Shield, Check, X } from "lucide-react";

export default function ReceiveBox() {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  function verifyFile() {
    setError("");
    setVerified(false);

    // TEMP MOCK — later replace with API response
    const VALID_CODE = "ABC123";
    const VALID_PASSWORD = "secret123";

    if (code === VALID_CODE && password === VALID_PASSWORD) {
      setVerified(true);
    } else {
      setError("Invalid secure code or password");
    }
  }

  return (
    <section className="max-w-xl mx-auto mt-24">
      <h1 className="text-3xl font-bold text-center">
        Receive a Secure File
      </h1>
      <p className="text-center text-slate-400 mt-2">
        Enter the secure code and password to download the file.
      </p>

      <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-2 bg-blue-900/30 text-blue-300 px-4 py-2 rounded-md text-sm">
          <Shield size={16} />
          Files auto-delete after download or 1 hour
        </div>

        {/* CODE */}
        <div>
          <label className="text-sm text-slate-400 mb-1 block">
            Secure Code
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="ABC123"
            className="w-full px-4 py-3 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 tracking-widest"
          />
        </div>

        {/* PASSWORD */}
        <div className="relative">
          <label className="text-sm text-slate-400 mb-1 block">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-3 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-slate-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* ACTION */}
        <button
          onClick={verifyFile}
          disabled={!code || !password}
          className="w-full py-3 rounded-md bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition font-medium flex items-center justify-center gap-2"
        >
          <Lock size={16} />
          Verify File
        </button>

        {/* ERROR */}
        {error && (
          <div className="bg-red-900/30 border border-red-800 text-red-300 rounded-md px-4 py-2 text-sm flex items-center gap-2">
            <X size={16} />
            {error}
          </div>
        )}

        {/* SUCCESS */}
        {verified && (
          <div className="bg-zinc-800 border border-zinc-700 rounded-md p-4 text-center">
            <div className="text-green-400 flex items-center justify-center gap-2 mb-2">
              <Check size={18} />
              File verified successfully
            </div>
            <button className="mt-2 px-6 py-2 rounded-md bg-green-600 hover:bg-green-700 transition flex items-center gap-2 mx-auto">
              <Download size={16} />
              Download File
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

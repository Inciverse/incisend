"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, Download, Shield, Check } from "lucide-react";

const DEMO_CODE = "INCISEND";
const DEMO_PASSWORD = "secure123";

export default function ReceiveBox() {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  function verifyFile() {
    setError("");
    setVerified(false);

    if (
      code.trim() === DEMO_CODE &&
      password === DEMO_PASSWORD
    ) {
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
        {/* SECURITY NOTE */}
        <div className="flex items-center gap-2 bg-blue-900/30 text-blue-300 px-4 py-2 rounded-md text-sm">
          <Shield size={16} />
          Files auto-delete after 1 hour
        </div>

        {/* CODE */}
        <div>
          <label className="text-sm text-slate-400 block mb-1">
            Secure Code
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="INCISEND"
            className="w-full px-4 py-3 rounded-md bg-zinc-800 border border-zinc-700 text-white tracking-widest focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* PASSWORD */}
        <div className="relative">
          <label className="text-sm text-slate-400 block mb-1">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="secure123"
            className="w-full px-4 py-3 rounded-md bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-slate-400"
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
          onClick={verifyFile}
          className="w-full py-3 rounded-md bg-blue-600 hover:bg-blue-700 transition font-medium flex items-center justify-center gap-2"
        >
          <Lock size={16} />
          Verify File
        </button>

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

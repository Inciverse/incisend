"use client";

import { useState } from "react";
import { Shield } from "lucide-react";

export default function ReceivePage() {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  return (
    <section className="max-w-md mx-auto mt-24 px-4">
      {/* TITLE */}
      <h1 className="text-3xl font-bold text-center">
        Receive a File
      </h1>
      <p className="text-center text-slate-500 mt-2">
        Enter the secure code and password to download the file.
      </p>

      {/* CARD */}
      <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6">
        {/* SECURITY NOTE */}
        <div className="flex items-center gap-2 bg-blue-900/30 text-blue-300 px-4 py-2 rounded-md text-sm">
          <Shield size={16} />
          Files are encrypted and auto-deleted
        </div>

        {/* CODE INPUT */}
        <input
          type="text"
          placeholder="Enter secure code"
          className="w-full px-4 py-3 rounded-md bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-blue-500 uppercase tracking-widest text-center"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
        />

        {/* PASSWORD INPUT */}
        <input
          type="password"
          placeholder="Enter password"
          className="w-full px-4 py-3 rounded-md bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* INFO */}
        <p className="text-xs text-slate-500 text-center">
          Files expire automatically after 1 hour.
        </p>

        {/* CTA */}
        <button className="w-full py-3 rounded-md bg-blue-600 hover:bg-blue-700 transition font-medium">
          Download File
        </button>
      </div>
    </section>
  );
}

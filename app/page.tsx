"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, UploadCloud, Download, ShieldCheck, Lock } from "lucide-react";

// Added 'initialMode' prop to control which UI shows up first
export default function InciSend({ initialMode = "send" }: { initialMode?: "send" | "receive" }) {
  const [mode, setMode] = useState<"send" | "receive">(initialMode);

  // Sync mode if initialMode changes
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  // --- AAPKA ORIGINAL LOGIC (UNTOUCHED) ---
  const [inputCode, setInputCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [sendPassword, setSendPassword] = useState("");

  const handleReceive = () => {
    setMessage("Decrypting file...");
  };
  // --- END OF LOGIC ---

  return (
    <div className="flex flex-col items-center w-full">
      
      {/* 1. PROFESSIONAL MODE SWITCHER */}
      <div className="flex bg-gray-100 p-1.5 rounded-2xl mb-8 w-full max-w-[320px]">
        <button
          onClick={() => setMode("send")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
            mode === "send" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <UploadCloud size={16} /> Send
        </button>
        <button
          onClick={() => setMode("receive")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
            mode === "receive" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Download size={16} /> Receive
        </button>
      </div>

      {/* 2. SEND UI */}
      {mode === "send" && (
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-gray-800">Send Securely</h2>
            <p className="text-gray-500 text-sm mt-1">Files are encrypted locally before upload.</p>
          </div>

          <div className="space-y-6">
            <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl flex items-start gap-3">
              <ShieldCheck className="text-indigo-600 shrink-0" size={20} />
              <p className="text-xs text-indigo-900 font-semibold italic">
                Auto-deleted after 1 hour. We never see your data.
              </p>
            </div>

            <label className="group relative flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 transition-all">
              <input type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              <div className="p-3 bg-indigo-100 rounded-full mb-3 group-hover:scale-110 transition-transform">
                <UploadCloud className="text-indigo-600" size={24} />
              </div>
              <p className="text-sm font-bold text-gray-700">{file ? file.name : "Drag & Drop File"}</p>
              <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">Max 50MB</p>
            </label>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Optional Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input
                  type="password"
                  placeholder="Protect your file"
                  value={sendPassword}
                  onChange={(e) => setSendPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-95">
              GENERATE SECURE CODE
            </button>
          </div>
        </div>
      )}

      {/* 3. RECEIVE UI */}
      {mode === "receive" && (
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-gray-800">Receive File</h2>
            <p className="text-gray-500 text-sm mt-1">Enter magic code to decrypt</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Magic Code</label>
              <input
                placeholder="000-000"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-5 text-center text-2xl font-mono font-bold tracking-[0.4em] focus:ring-2 focus:ring-indigo-500 outline-none shadow-inner"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter if required"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button onClick={handleReceive} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-95 flex items-center justify-center gap-2">
              <Download size={20} /> DECRYPT & DOWNLOAD
            </button>

            {message && <div className="bg-green-50 text-green-700 p-3 rounded-lg text-xs font-bold text-center border border-green-100">{message}</div>}
          </div>
        </div>
      )}
    </div>
  );
}

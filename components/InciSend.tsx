"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, UploadCloud, Download, ShieldCheck, Lock } from "lucide-react";

export default function InciSend({ initialMode = "send" }: { initialMode?: "send" | "receive" }) {
  const [mode, setMode] = useState<"send" | "receive">(initialMode);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  // --- AAPKA ORIGINAL LOGIC (SAFE & UNTOUCHED) ---
  const [inputCode, setInputCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [sendPassword, setSendPassword] = useState("");

  const handleReceive = () => {
    setMessage("Decrypting file...");
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      
      {/* 1. THEME-MATCHED TOGGLE (Purple & White) */}
      <div className="flex bg-gray-100 p-1.5 rounded-2xl mb-10 w-full shadow-inner">
        <button
          onClick={() => setMode("send")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black transition-all ${
            mode === "send" ? "bg-white text-purple-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <UploadCloud size={18} /> Send
        </button>
        <button
          onClick={() => setMode("receive")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black transition-all ${
            mode === "receive" ? "bg-white text-purple-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Download size={18} /> Receive
        </button>
      </div>

      {/* 2. SEND UI */}
      {mode === "send" && (
        <div className="w-full bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-8 animate-in fade-in zoom-in duration-500">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-800 tracking-tight">Incisend</h2>
            <p className="text-gray-500 text-sm font-medium mt-1">Privacy-first secure transfer</p>
          </div>

          <div className="space-y-6">
            <div className="bg-purple-50 border border-purple-100 p-4 rounded-2xl flex items-start gap-3">
              <ShieldCheck className="text-purple-600 shrink-0" size={20} />
              <p className="text-[11px] text-purple-900 font-bold leading-relaxed">
                Files are encrypted locally in your browser. Inciverse never sees your data.
              </p>
            </div>

            <label className="group relative flex flex-col items-center justify-center w-full h-52 border-2 border-dashed border-purple-100 bg-purple-50/30 rounded-[1.5rem] cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-all">
              <input type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              <div className="p-4 bg-white rounded-2xl shadow-sm mb-3 group-hover:scale-110 transition-transform">
                <UploadCloud className="text-purple-600" size={28} />
              </div>
              <p className="text-sm font-black text-gray-700 uppercase tracking-wide">
                {file ? file.name : "Select File"}
              </p>
              <p className="text-[10px] text-gray-400 mt-1 font-black tracking-widest uppercase">Max 50MB</p>
            </label>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Optional Protection</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input
                  type="password"
                  placeholder="Password for extra security"
                  value={sendPassword}
                  onChange={(e) => setSendPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                />
              </div>
            </div>

            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-purple-100 transition-all active:scale-95">
              GET MAGIC CODE
            </button>
          </div>
        </div>
      )}

      {/* 3. RECEIVE UI */}
      {mode === "receive" && (
        <div className="w-full bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-8 animate-in fade-in zoom-in duration-500">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-800 tracking-tight">Receive</h2>
            <p className="text-gray-500 text-sm font-medium mt-1">Unlock your encrypted asset</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Enter Magic Code</label>
              <input
                placeholder="000-000"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-6 text-center text-3xl font-mono font-black tracking-[0.5em] text-purple-600 focus:ring-2 focus:ring-purple-500 outline-none shadow-inner"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Security Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter if required"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-4 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button onClick={handleReceive} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-purple-100 transition-all active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider">
              <Download size={20} /> Decrypt & Download
            </button>

            {message && <div className="bg-green-50 text-green-700 p-4 rounded-xl text-xs font-black text-center border border-green-100 animate-pulse">{message}</div>}
          </div>
        </div>
      )}
    </div>
  );
}

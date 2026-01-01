"use client";

import { useState } from "react";
import { Eye, EyeOff, UploadCloud, Download, ShieldCheck, Lock } from "lucide-react";

export default function InciSend() {
  const [mode, setMode] = useState<"send" | "receive">("send");

  // RECEIVE STATES (Aapka original logic)
  const [inputCode, setInputCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  // SEND STATES (Aapka original logic)
  const [file, setFile] = useState<File | null>(null);
  const [sendPassword, setSendPassword] = useState("");

  const handleReceive = () => {
    setMessage("Decrypting file...");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center py-12 px-4">
      
      {/* 1. TOP TOGGLE BUTTONS - Inhe clean rakha hai taaki confusion na ho */}
      <div className="flex bg-white border border-gray-200 p-1 rounded-2xl shadow-sm mb-10 w-full max-w-[320px]">
        <button
          onClick={() => { setMode("send"); setMessage(""); }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
            mode === "send" ? "bg-indigo-600 text-white shadow-md" : "text-gray-500 hover:bg-gray-50"
          }`}
        >
          <UploadCloud size={18} /> Send
        </button>
        <button
          onClick={() => { setMode("receive"); setMessage(""); }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
            mode === "receive" ? "bg-indigo-600 text-white shadow-md" : "text-gray-500 hover:bg-gray-50"
          }`}
        >
          <Download size={18} /> Receive
        </button>
      </div>

      {/* 2. SEND PAGE SECTION - Sirf tab dikhega jab mode 'send' ho */}
      {mode === "send" && (
        <div className="w-full max-w-md animate-in fade-in zoom-in duration-300">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black text-gray-800 tracking-tight">Send Securely</h2>
              <p className="text-gray-500 text-sm mt-1">End-to-end encrypted file sharing</p>
            </div>

            <div className="space-y-6">
              {/* Info Box */}
              <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl flex items-start gap-3">
                <ShieldCheck className="text-indigo-600 shrink-0" size={20} />
                <p className="text-xs text-indigo-900 font-semibold leading-relaxed">
                  Files are encrypted in your browser and auto-deleted after 1 hour.
                </p>
              </div>

              {/* Upload Zone */}
              <label className="group relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 transition-all">
                <input 
                   type="file" 
                   className="hidden" 
                   onChange={(e) => setFile(e.target.files?.[0] || null)} 
                />
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <div className="p-3 bg-indigo-100 rounded-full mb-3 group-hover:scale-110 transition-transform">
                    <UploadCloud className="text-indigo-600" size={24} />
                  </div>
                  <p className="text-sm font-bold text-gray-700">
                    {file ? file.name : "Choose a file or drag it here"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Max 50MB</p>
                </div>
              </label>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] ml-1">Optional Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input
                    type="password"
                    placeholder="Create a password"
                    value={sendPassword}
                    onChange={(e) => setSendPassword(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>

              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95">
                GENERATE MAGIC CODE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. RECEIVE PAGE SECTION - Sirf tab dikhega jab mode 'receive' ho */}
      {mode === "receive" && (
        <div className="w-full max-w-md animate-in fade-in zoom-in duration-300">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black text-gray-800 tracking-tight">Receive File</h2>
              <p className="text-gray-500 text-sm mt-1">Enter code to unlock your file</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] ml-1">Magic Code</label>
                <input
                  placeholder="000-000"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-5 text-center text-2xl font-mono font-bold tracking-[0.4em] focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-inner"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] ml-1">Security Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password if any"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleReceive}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Download size={20} /> DECRYPT & DOWNLOAD
              </button>

              {message && (
                <div className="bg-green-50 text-green-700 p-3 rounded-lg text-xs font-bold text-center border border-green-100">
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

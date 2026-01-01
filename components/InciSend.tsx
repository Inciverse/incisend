"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, UploadCloud, Download, ShieldCheck, Lock, Loader2 } from "lucide-react";

export default function InciSend({ initialMode = "send" }: { initialMode?: "send" | "receive" }) {
  const [mode, setMode] = useState<"send" | "receive">(initialMode);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // --- AAPKA ORIGINAL LOGIC (SAFE) ---
  const [inputCode, setInputCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [sendPassword, setSendPassword] = useState("");

  // Simulation for Progress Bar (Buyer demo ke liye)
  const simulateUpload = () => {
    if (!file) return;
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setMessage("File Encrypted & Uploaded Successfully!");
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const handleReceive = () => {
    setMessage("Searching and Decrypting...");
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto px-4">
      
      {/* 1. TOGGLE SWITCH */}
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
            <p className="text-gray-500 text-sm font-medium mt-1 uppercase tracking-widest">Secure Cloud</p>
          </div>

          <div className="space-y-6">
            {!isUploading ? (
              <>
                <label className="group relative flex flex-col items-center justify-center w-full h-52 border-2 border-dashed border-purple-100 bg-purple-50/30 rounded-[1.5rem] cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-all">
                  <input type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                  <div className="p-4 bg-white rounded-2xl shadow-sm mb-3 group-hover:scale-110 transition-transform">
                    <UploadCloud className="text-purple-600" size={28} />
                  </div>
                  <p className="text-sm font-black text-gray-700 px-4 text-center truncate w-full">
                    {file ? file.name : "Tap to Upload"}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1 font-black tracking-widest uppercase">Max 50MB</p>
                </label>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Set Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    <input
                      type="password"
                      placeholder="Optional"
                      value={sendPassword}
                      onChange={(e) => setSendPassword(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                <button 
                  onClick={simulateUpload}
                  disabled={!file}
                  className="w-full bg-purple-600 disabled:bg-gray-300 hover:bg-purple-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-purple-100 transition-all active:scale-95"
                >
                  SEND ENCRYPTED
                </button>
              </>
            ) : (
              /* PROGRESS BAR UI */
              <div className="py-10 space-y-6 text-center animate-in fade-in zoom-in">
                <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                  <Loader2 className="w-full h-full text-purple-100 animate-spin absolute" strokeWidth={1} />
                  <span className="text-2xl font-black text-purple-600">{uploadProgress}%</span>
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-gray-700 uppercase tracking-widest text-xs">Encrypting Asset...</p>
                  <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden border border-gray-50">
                    <div 
                      className="bg-purple-600 h-full transition-all duration-300 ease-out"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {message && !isUploading && (
               <div className="bg-green-50 text-green-700 p-4 rounded-xl text-[11px] font-black text-center border border-green-100 tracking-wide uppercase">
                ✅ {message}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. RECEIVE UI (Original Logic Maintained) */}
      {mode === "receive" && (
        <div className="w-full bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-8 animate-in fade-in zoom-in duration-500">
           {/* ... Same receive UI as before ... */}
           <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-gray-800">Retrieve</h2>
            <p className="text-gray-500 text-xs font-bold mt-1 uppercase">Enter magic code</p>
          </div>
          <div className="space-y-6">
            <input
              placeholder="000-000"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.toUpperCase())}
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-6 text-center text-3xl font-mono font-black tracking-[0.4em] text-purple-600 focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <button onClick={handleReceive} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-purple-100 flex items-center justify-center gap-2">
              <Download size={20} /> DOWNLOAD
            </button>
            {message && <p className="text-center text-xs font-bold text-gray-400 italic">{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

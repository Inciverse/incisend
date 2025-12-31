"use client";

import { useState } from "react";
import { Eye, EyeOff, UploadCloud, Download, FileText, ShieldCheck } from "lucide-react";

export default function InciSend() {
  const [mode, setMode] = useState<"send" | "receive">("send");

  // RECEIVE STATES
  const [inputCode, setInputCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  // SEND STATES
  const [file, setFile] = useState<File | null>(null);
  const [sendPassword, setSendPassword] = useState("");

  const handleReceive = () => {
    // Logic remains exactly as you wrote it
    setMessage("Decrypting file...");
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      
      {/* ================= MODE SWITCHER (Segmented Control) ================= */}
      <div className="bg-gray-100 p-1.5 rounded-xl flex gap-1 mb-8 shadow-inner w-full max-w-[300px]">
        <button
          onClick={() => setMode("send")}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all duration-200 ${
            mode === "send"
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Send File
        </button>
        <button
          onClick={() => setMode("receive")}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all duration-200 ${
            mode === "receive"
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Receive File
        </button>
      </div>

      {/* ================= MAIN CARD CONTAINER ================= */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* ================= SEND UI ================= */}
        {mode === "send" && (
          <div className="p-8 space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">Secure Transfer</h2>
              <p className="mt-2 text-sm text-gray-500">
                End-to-end encrypted. No signup required.
              </p>
            </div>

            {/* Security Note */}
            <div className="flex items-start gap-3 bg-indigo-50 border border-indigo-100 p-4 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-indigo-800 font-medium leading-relaxed">
                Files are encrypted locally and auto-deleted from servers after 1 hour.
              </p>
            </div>

            {/* Drag & Drop Area */}
            <label className="group flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-indigo-200 bg-indigo-50/30 p-8 text-center transition-all hover:bg-indigo-50 hover:border-indigo-500 cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              
              <div className="bg-white p-3 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                {file ? (
                  <FileText className="w-6 h-6 text-indigo-600" />
                ) : (
                  <UploadCloud className="w-6 h-6 text-indigo-500" />
                )}
              </div>

              <p className="text-sm font-bold text-gray-700">
                {file ? file.name : "Click or Drag File Here"}
              </p>
              <p className="mt-1 text-xs text-gray-400 font-medium uppercase tracking-wide">
                {file ? "Ready to encrypt" : "Max Size: 50MB"}
              </p>
            </label>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Protection (Optional)
              </label>
              <input
                type="password"
                placeholder="Set a password..."
                value={sendPassword}
                onChange={(e) => setSendPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              />
            </div>

            <button className="w-full rounded-xl bg-indigo-600 py-3.5 font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-[0.98]">
              Generate Secure Code
            </button>
          </div>
        )}

        {/* ================= RECEIVE UI ================= */}
        {mode === "receive" && (
          <div className="p-8 space-y-6">
             <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">Receive File</h2>
              <p className="mt-2 text-sm text-gray-500">
                Enter your magic code to download.
              </p>
            </div>

            {/* Warning Note */}
             <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl">
              <p className="text-xs text-orange-800 font-medium leading-relaxed text-center">
                ⚠️ Ensure you have the correct code. Files expire quickly.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Magic Code
                </label>
                <input
                  placeholder="e.g. 123-456"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-lg font-mono tracking-widest text-center uppercase focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Password (If required)
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm pr-10 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleReceive}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-[0.98]"
            >
              <Download size={20} />
              Decrypt & Download
            </button>

            {message && (
              <div className="mt-4 p-3 rounded-lg bg-green-50 text-green-700 text-sm font-medium text-center animate-pulse">
                {message}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Branding */}
      <p className="mt-8 text-xs font-semibold text-gray-400 uppercase tracking-widest">
        Incisend Secure Encrypted Storage
      </p>
    </div>
  );
}

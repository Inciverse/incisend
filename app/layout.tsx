import "./globals.css";

export const metadata = {
  title: "Incisend",
  description: "Secure file sharing with magic code",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
       
        <header className="w-full border-b bg-white">
          <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
            <a
              href="/"
              className="font-bold text-xl text-indigo-600"
            >
              Incisend
            </a>
         
            <span className="text-sm text-slate-500">
              Secure file sharing
            </span>
          
<a
      href="/about"
      className="hover:text-slate-900 transition-colors"
    >
      About Us
    </a>
</div>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-1 max-w-5xl mx-auto px-6 py-12 w-full">
          {children}
        </main>

        {/* FOOTER */}
<footer className="w-full border-t mt-24 py-10 text-sm text-slate-600">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-4">
    <p>© 2025 Incisend. All rights reserved.</p>

    <p className="text-slate-500">
      The future of ephemeral data sharing.
    </p>

    <div className="flex gap-6">
      <a href="/privacy" className="hover:text-black">
        Privacy Policy
      </a>
      <a href="/terms" className="hover:text-black">
        Terms of Service
      </a>
      <a href="/support" className="hover:text-black">
        Support
      </a>
    </div>
  </div>
</footer>
</body>
    </html>

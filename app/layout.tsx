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
        
<footer className="border-t bg-white">
          <div className="max-w-5xl mx-auto px-6 py-6 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} Incisend · No signup required · Built By Inciverse
          </div>
        </footer>
      </body>
    </html>
  );
}

import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
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
            
            <Link href="/" className="flex items-center">
              <Image
                 src="/logo.png"
                  alt="Incisend"
               width={90}
              height={40}
               priority
              />
                </Link>

         
            {/* NAV */}
            <nav className="flex items-center gap-6 text-sm text-slate-500">
              <span>Secure file sharing</span>
              <a
                href="/about"
                className="hover:text-slate-900 transition-colors"
              >
                About Us
              </a>
            </nav>
          </div>
        </header>

        {/* MAIN */}
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
              <a href="/pricing" className="hover:text-[#8c52ff]">
                Pricing
              </a>
              <a href="/about#contact-us" className="hover:text-black">
                Support
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

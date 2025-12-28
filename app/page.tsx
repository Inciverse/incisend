import Link from "next/link";

export default function Home() {
  return (
     <section className="flex flex-col items-center gap-14">
      {/* HERO */}
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold mb-4">
          Secure File Transfer With Auto-Expiry
          <br />
        </h1>
         
        <p className="text-lg text-slate-600">
         Share sensitive documents instantly. No aaccounts required-files are encrypted and permanently deleted after 1 hour
        </p>

        <div className="flex justify-center gap-4 mt-8">
          <Link href="/send">
            <button className="primary">Start Upload</button>
          </Link>

          <Link href="/receive">
            <button className="secondary">Have a Code ? </button>
          </Link>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="max-w-4xl w-full">
        <h2 className="text-center mb-8">How Incisend Works</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="font-semibold mb-2">1. Upload</h3>
            <p>
              Upload a file and set a password. Your file is encrypted in your
              browser.
            </p>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-2">2. Share Code</h3>
            <p>
              Get a short magic code. Send it privately to the recipient.
            </p>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-2">3. Download</h3>
            <p>
              The recipient enters the code and password to securely download
              the file.
            </p>
          </div>
        </div>
      </div>

      {/* TRUST */}
      <div className="max-w-4xl w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="font-semibold mb-2">🔐 Private by design</h3>
          <p>No public links. Files require both code and password.</p>
        </div>

        <div className="card">
          <h3 className="font-semibold mb-2">⚡ Zero friction</h3>
          <p>No signup, no emails, no waiting.</p>
        </div>

        <div className="card">
          <h3 className="font-semibold mb-2">🧱 AES-256 Encryption/h3>
          <p>Your Files are protected by military-grade encryption. We never see your files. Yous hold the keys.</p>
        </div>
      </div>
    </section>
  );
}

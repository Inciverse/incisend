import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center gap-14">
      {/* HERO */}
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold mb-4">
          Secure File Transfer With Auto-Expiry
        </h1>

        <p className="text-lg text-slate-600">
          Share sensitive documents instantly. No accounts required — files are
          encrypted and permanently deleted after 1 hour.
        </p>

        <div className="flex justify-center gap-4 mt-8">
          <Link href="/send">
            <button className="primary">Start Upload</button>
          </Link>

          <Link href="/receive">
            <button className="secondary">Have a Code ?</button>
          </Link>
        </div>
      </div>

{/* HOW IT WORKS */}
<section className="max-w-6xl w-full">
  <h2 className="text-center text-2xl font-semibold mb-12">
    How It Works
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
    {/* STEP 1 */}
    <div className="card text-center relative">
      <div className="mx-auto mb-4 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
        1
      </div>

      <div className="text-3xl mb-3">🔐</div>

      <h3 className="font-semibold mb-2">Secure Upload</h3>
      <p className="text-sm text-slate-600">
        Select your file and optionally set a password. Your data is encrypted
        locally in the browser before it reaches our servers.
      </p>
    </div>

    {/* STEP 2 */}
    <div className="card text-center relative">
      <div className="mx-auto mb-4 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
        2
      </div>

      <div className="text-3xl mb-3">🪄</div>

      <h3 className="font-semibold mb-2">Generate Magic Code</h3>
      <p className="text-sm text-slate-600">
        Receive a unique 6-digit magic code. No long URLs — share the code
        privately with your recipient.
      </p>
    </div>

    {/* STEP 3 */}
    <div className="card text-center relative">
      <div className="mx-auto mb-4 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
        3
      </div>

      <div className="text-3xl mb-3">⏱️</div>

      <h3 className="font-semibold mb-2">Auto-Purge Download</h3>
      <p className="text-sm text-slate-600">
        Recipient enters the code to download. After 60 minutes, the file is
        permanently deleted. No traces left.
      </p>
    </div>
  </div>
</section>


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
          <h3 className="font-semibold mb-2">🧱 AES-256 Encryption</h3>
          <p>
            Your files are protected by military-grade encryption. We never see
            your files. You hold the keys.
          </p>
        </div>
      </div>
    </section>
  );
}

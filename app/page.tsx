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
          Share sensitive (50 MB) of documents instantly. No accounts required — files are 
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

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
  <div className="rounded-xl border p-4">
    <p className="text-2xl font-bold">100+</p>
    <p className="text-sm text-slate-500">Files Shared</p>
  </div>

  <div className="rounded-xl border p-4">
    <p className="text-2xl font-bold">1 Hour</p>
    <p className="text-sm text-slate-500">Auto Expiry</p>
  </div>

  <div className="rounded-xl border p-4">
    <p className="text-2xl font-bold">AES-256</p>
    <p className="text-sm text-slate-500">End-to-End Encryption</p>
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

      <div className="text-3xl mb-3">🔑</div>
       <h3 className="font-semibold mb-2">Generate Secure Code</h3>
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


      {/* WHY CHOOSE INCISEND */}
<section className="max-w-6xl w-full mt-20 rounded-2xl bg-slate-50 p-10">
  <h2 className="text-center text-2xl font-semibold mb-12">
    Why Choose Incisend?
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="card text-center">
      <div className="text-3xl mb-4">🕶️</div>
      <h3 className="font-semibold mb-2">Zero-Knowledge Privacy</h3>
      <p className="text-sm text-slate-600">
        We don’t know what you’re sharing. Files are encrypted on the client-side,
        ensuring only the sender and recipient can access the data.
      </p>
    </div>

    <div className="card text-center">
      <div className="text-3xl mb-4">🚫</div>
      <h3 className="font-semibold mb-2">No Account Friction</h3>
      <p className="text-sm text-slate-600">
        Users don’t want to sign up for one-time transfers. Incisend removes this
        barrier, increasing usability and repeat usage.
      </p>
    </div>

    <div className="card text-center">
      <div className="text-3xl mb-4">📉</div>
      <h3 className="font-semibold mb-2">Low Maintenance, High Efficiency</h3>
      <p className="text-sm text-slate-600">
        Automatic file deletion keeps storage costs low and predictable —
        maximizing profit margins for the owner.
      </p>
    </div>
  </div>
</section>
      <div className="mt-24 rounded-2xl bg-[var(--primary-light)] p-8 text-center">
  <h2 className="text-2xl font-bold">
    Need higher limits or team access?
  </h2>

  <p className="mt-2 text-slate-600">
    Upgrade to unlock larger files, longer expiry, and priority access.
  </p>

  <Link href="/pricing">
    <button className="mt-6 bg-[var(--primary)] text-white px-6 py-3 rounded-lg hover:bg-[var(--primary-hover)] transition">
      View Plans
    </button>
  </Link>
</div>

      {/* BUILT WITH MODERN TECH */}
<section className="max-w-6xl w-full mt-20 text-center">
  <h2 className="text-xl font-semibold mb-4">
    Developer-Friendly & Scalable Stack
  </h2>

  <p className="text-sm text-slate-600 max-w-3xl mx-auto">
    Built with Next.js and Tailwind CSS, using
    <span className="font-medium"> SupaBase Cloud storage</span>. Optimized for
    speed, security, and low-latency file transfers.
  </p>

  <div className="flex justify-center gap-6 mt-6 text-sm text-slate-500">
    <span>⚛️ Next.js</span>
    <span>🎨 Tailwind CSS</span>
    <span>☁️ SupaBase</span>
  </div>
</section>
    </section>




  );
}

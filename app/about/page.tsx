export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">About Incisend</h1>

      <p className="text-lg text-gray-600 mb-6">
        Incisend is a privacy-focused file sharing web app built to make sending
        sensitive files simple and secure.
      </p>

      <p className="text-lg text-gray-600 mb-6">
        Unlike traditional file sharing tools, Incisend does not use public
        links, accounts, or email signups. Files are shared using a one-time
        magic code and a password, ensuring that only the intended recipient
        can access the file.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Why Incisend Exists</h2>

      <p className="text-lg text-gray-600 mb-6">
        Most file sharing platforms prioritize convenience over privacy.
        Incisend was built with the opposite philosophy — privacy first,
        friction second.
      </p>

      <ul className="list-disc list-inside text-lg text-gray-600 mb-6">
        <li>No accounts</li>
        <li>No public links</li>
        <li>No tracking</li>
        <li>No unnecessary data collection</li>
        <li>No File will be saved after 1 hour</li>
      </ul>

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

     <h3 id="contact-us" className="text-xl font-semibold">
  Contact Us
</h3>


  <p className="mt-2 text-slate-600">
    Have questions or feedback? Reach out directly.
  </p>

  <div className="mt-4 space-y-2 text-sm">
    <p>
      📧 Email:{" "}
      <a
        href="mailto:support@incisend.com"
        className="text-indigo-600 hover:underline"
      >
        support@incisend.com
      </a>
    </p>

    <p>
      🌐 Website:{" "}
      <a
        href="https://incisend-og.vercel.app"
        className="text-indigo-600 hover:underline"
        target="_blank"
      >
        incisend-og.vercel.app
      </a>
    </p>
  </div>
</div>



      <h2 className="text-2xl font-semibold mt-10 mb-4">Built With Purpose</h2>

      <p className="text-lg text-gray-600 mb-10">
        Incisend is designed to be minimal, fast, and scalable, focusing on
        doing one thing extremely well — secure file sharing without exposure.
      </p>

      <footer className="border-t pt-6 text-gray-500 text-sm">
        Built by <span className="font-medium">InciVerse</span> • © 2025
      </footer>
    </main>
  );
}

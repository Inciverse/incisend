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

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Why Incisend Exists
      </h2>

      <p className="text-lg text-gray-600 mb-6">
        Most file sharing platforms prioritize convenience over privacy.
        Incisend was built with the opposite philosophy — privacy first,
        friction second.
      </p>

      <ul className="list-disc list-inside text-lg text-gray-600 mb-12">
        <li>No accounts</li>
        <li>No public links</li>
        <li>No tracking</li>
        <li>No unnecessary data collection</li>
        <li>Files auto-delete after 1 hour</li>
      </ul>

      {/* HOW IT WORKS */}
      <section className="max-w-6xl w-full mb-16">
        <h2 className="text-center text-2xl font-semibold mb-12">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="card text-center">
            <div className="mx-auto mb-4 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
              1
            </div>
            <div className="text-3xl mb-3">🔐</div>
            <h3 className="font-semibold mb-2">Secure Upload</h3>
            <p className="text-sm text-slate-600">
              Files are encrypted locally in your browser before upload.
            </p>
          </div>

          <div className="card text-center">
            <div className="mx-auto mb-4 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
              2
            </div>
            <div className="text-3xl mb-3">🪄</div>
            <h3 className="font-semibold mb-2">Magic Code</h3>
            <p className="text-sm text-slate-600">
              Share a short secure code instead of long URLs.
            </p>
          </div>

          <div className="card text-center">
            <div className="mx-auto mb-4 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
              3
            </div>
            <div className="text-3xl mb-3">⏱️</div>
            <h3 className="font-semibold mb-2">Auto Delete</h3>
            <p className="text-sm text-slate-600">
              Files are permanently deleted after 60 minutes.
            </p>
          </div>

        </div>
      </section>

      {/* CONTACT */}
      <h3 id="contact-us" className="text-xl font-semibold mb-2">
        Contact Us
      </h3>

      <p className="text-gray-600 mb-16">
        For support or inquiries, reach out at <b>support@incisend.com</b>
      </p>

      {/* FOOTER */}
      <footer className="border-t pt-6 text-gray-500 text-sm text-center">
        Built by <span className="font-medium">InciVerse</span> • © 2025
      </footer>

    </main>
  );
}


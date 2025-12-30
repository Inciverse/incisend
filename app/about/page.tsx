export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-10">

      {/* HERO */}
      <section>
        <h1 className="text-4xl font-bold mb-4">About Incisend</h1>
        <p className="text-lg text-gray-600">
          Incisend is a privacy-first file sharing web app designed for secure,
          temporary transfers without accounts, tracking, or public links.
        </p>
      </section>

      {/* WHY */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Why Incisend Exists</h2>
        <p className="text-gray-600 mb-4">
          Most file sharing tools optimize for convenience, not privacy.
          Incisend flips that model — privacy first, friction second.
        </p>

        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>No accounts</li>
          <li>No public URLs</li>
          <li>No tracking</li>
          <li>Client-side encryption</li>
          <li>Auto-delete after 1 hour</li>
        </ul>
      </section>

      {/* HOW IT WORKS */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-center">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="text-3xl mb-2">🔐</div>
            <h3 className="font-semibold mb-1">Secure Upload</h3>
            <p className="text-sm text-gray-600">
              Files are encrypted locally before upload.
            </p>
          </div>

          <div className="card text-center">
            <div className="text-3xl mb-2">🪄</div>
            <h3 className="font-semibold mb-1">Magic Code</h3>
            <p className="text-sm text-gray-600">
              Share a short code instead of a public link.
            </p>
          </div>

          <div className="card text-center">
            <div className="text-3xl mb-2">⏱️</div>
            <h3 className="font-semibold mb-1">Auto Delete</h3>
            <p className="text-sm text-gray-600">
              Files self-destruct after 60 minutes.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact-us">
        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
        <p className="text-gray-600">
          For support or inquiries, email us at{" "}
          <b>support@incisend.com</b>
        </p>
      </section>

      {/* FOOTER */}
      <footer className="border-t pt-6 text-center text-sm text-gray-500">
        Built by <span className="font-medium">InciVerse</span> • © 2025
      </footer>

    </main>
  );
}



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
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">How It Works</h2>

      <ol className="list-decimal list-inside text-lg text-gray-600 mb-6">
        <li>Upload a file and set a password</li>
        <li>Receive a one-time magic code</li>
        <li>Share the code privately with the recipient</li>
        <li>Download securely using the code and password</li>
      </ol>

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

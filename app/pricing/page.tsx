export default function Pricing() {
  return (
    <section className="max-w-3xl mx-auto mt-20 text-center space-y-8">
      <h1 className="text-4xl font-bold">Simple Pricing</h1>
      <p className="text-slate-500">
        Pay only when you need higher limits.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="border border-zinc-800 rounded-xl p-6">
          <h2 className="font-semibold mb-2">Free</h2>
          <p className="text-sm text-slate-500">
            50MB files • 1 hour expiry
          </p>
        </div>

        <div className="border border-blue-600 rounded-xl p-6">
          <h2 className="font-semibold mb-2">Pro (Future)</h2>
          <p className="text-sm text-slate-500">
            Larger files • Longer expiry • Team usage
          </p>
        </div>
      </div>
    </section>
  );
}

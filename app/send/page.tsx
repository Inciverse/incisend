import InciSend from "../../components/InciSend";

export default function SendPage() {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xl">
        <div className="card">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">
              Send a File Securely
            </h1>
            


<p className="text-sm text-slate-500">
              Upload a file, set a password, and share the magic code.
            </p>
          </div>

          <div className="mb-6 p-4 rounded-lg bg-indigo-50 border border-indigo-100">
            <p className="text-sm text-indigo-700">
              🔒 Files are encrypted in your browser before upload.
              Incisend never sees your data.
            </p>
          </div>

          <InciSend mode="send" />
        </div>
      </div>
    </div>
  );
}

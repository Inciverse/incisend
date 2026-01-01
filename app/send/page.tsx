import InciSend from "../../components/InciSend";

export default function SendPage() {
  return (
    <main className="min-h-screen bg-[#FDFDFF] py-16 px-4">
      {/* initialMode prop ensures it always opens Send tab */}
      <InciSend initialMode="send" />
    </main>
  );
}

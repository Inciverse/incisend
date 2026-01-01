import InciSend from "../../components/InciSend";

export default function ReceivePage() {
  return (
    <main className="min-h-screen bg-[#FDFDFF] py-16 px-4">
      {/* initialMode prop ensures it always opens Receive tab */}
      <InciSend initialMode="receive" />
    </main>
  );
}

import InciSend from "../../components/Incisend";

export default function SendPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] py-12">
      {/* Explicitly telling the component to start in 'send' mode */}
      <InciSend initialMode="send" />
    </main>
  );
}

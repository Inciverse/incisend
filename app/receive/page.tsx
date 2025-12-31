import InciSend from "../../components/InciSend";

export default function ReceivePage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] py-12">
      {/* Explicitly telling the component to start in 'receive' mode */}
      <InciSend initialMode="receive" />
    </main>
  );
}

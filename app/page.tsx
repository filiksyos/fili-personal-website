import LokiHero from "@/components/LokiHero";
import ChatInterface from "@/components/ChatInterface";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <LokiHero />
      <ChatInterface />
    </main>
  );
}

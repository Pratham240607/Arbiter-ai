import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <Navbar />

      <section className="h-screen flex items-center justify-center">
        <h1 className="text-7xl font-bold">
          Decision AI
        </h1>
      </section>
    </main>
  );
}
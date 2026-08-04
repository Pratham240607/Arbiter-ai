import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Background from "../components/Background";
import Trending from "../components/Trending";
import Features from "../components/Features";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="bg-[#050816] text-white min-h-screen">
      <Background />
      <Navbar />
      <Hero />
      <Trending />
      <Features />
      <Footer />
    </main>
  );
}
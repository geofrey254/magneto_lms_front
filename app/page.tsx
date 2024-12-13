// imports
import Hero from "@/components/landing_page/Hero";
import Jumbotron from "@/components/landing_page/Jumbotron";
import Why from "@/components/landing_page/Why";
import Download from "@/components/landing_page/Download";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Jumbotron />
      <Why />
      <Download />
    </main>
  );
}

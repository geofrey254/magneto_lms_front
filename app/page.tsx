// imports
import Hero from "@/components/landing_page/Hero";
import Jumbotron from "@/components/landing_page/Jumbotron";
import Why from "@/components/navigation/Why";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Jumbotron />
      <Why />
    </main>
  );
}

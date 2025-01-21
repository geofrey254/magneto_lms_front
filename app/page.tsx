// imports
import Hero from "@/components/landing_page/Hero";
import Jumbotron from "@/components/landing_page/Jumbotron";
import Why from "@/components/landing_page/Why";
import Download from "@/components/landing_page/Download";
import FAQ from "@/components/landing_page/FAQ";
import Categories from "@/components/landing_page/Subjects";
import Lessons from "@/components/landing_page/Chapters";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Categories />
      <Lessons />
      <Jumbotron />
      <Why />
      <Download />
      <FAQ />
    </main>
  );
}

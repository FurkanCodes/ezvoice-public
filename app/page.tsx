import CTA from "@/components/landing-page/CTA";
import Features from "@/components/landing-page/Features";
import Footer from "@/components/landing-page/Footer";
import Header from "@/components/landing-page/Header";
import Hero from "@/components/landing-page/Hero";

export default function Home() {
  return (
    <div className="min-h-screen ">
      <Header />
      <main>
        <Hero />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Menu from "@/components/Menu";
import SurveySection from "@/components/Survey";
import Reservation from "@/components/Reservation";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="icerik">
        <Hero />
        <About />
        <Menu />
        <SurveySection />
        <Reservation />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

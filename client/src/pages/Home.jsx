import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Dokumenter from "../components/Dokumenter";
import HeroSection from "../components/HeroSection";
import Pengurus from "../components/Pengurus";
import Event from "../components/Kegiatan";

const Home = () => {
  return (
    <div>
      <Navbar />

      {/* Hero section */}
      <section id="home" className="pt-2 mt-14">
        <HeroSection />
      </section>

      {/* Pengurus Inti */}
      <section id="pengurus" className="pt-32 pb-32">
        <Pengurus />
      </section>

      {/* event */}
      <section id="event pt-36 pb-32">
        <Event />
      </section>

      {/* Dokumenter */}
      <section id="dokumenter" className="pt-36 pb-32">
        <Dokumenter />
      </section>

      <Footer />
    </div>
  );
};

export default Home;

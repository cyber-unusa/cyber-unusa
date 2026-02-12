import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import Dokumenter from "../components/Dokumenter";
import HeroSection from "../components/HeroSection";
import Pengurus from "../components/Pengurus";
import Event from "../components/Kegiatan";
import AIChatWidget from "../components/AIChatWidget";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/Context";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData === false) {
      //? Waiting for data
    } else if (userData && userData.isAccountVerified === false) {
      navigate("/email-verify");
    }
  }, [userData, navigate]);

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

      <AIChatWidget />

      <Footer />
    </div>
  );
};

export default Home;

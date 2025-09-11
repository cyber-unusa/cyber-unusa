import HeroSection, { Mboh } from "../components/HeroSection";
import Navbar from "../components/Navbar";
import Pengurus from "../components/Pengurus";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secbg">
      <div className="pt-2 mt-24 lg:mt-14">
        <Navbar />
        <HeroSection />
      </div>

      <div className="pt-130 pb-32">
        <Pengurus />
      </div>
    </div>
  );
}

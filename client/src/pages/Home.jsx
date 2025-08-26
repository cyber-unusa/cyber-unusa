import Header from "../components/Header";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[url("./bg_img.png")] bg-cover bg-center'>
      <Navbar />
      <Header />
    </div>
  );
}

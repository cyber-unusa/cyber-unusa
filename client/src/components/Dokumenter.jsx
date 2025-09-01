import { dokumenter } from "../../assets/data/dokumenter";
import { Link } from "react-router-dom";

export default function Dokumenter() {

  return (
    <div className="bg-secbg lg:py-8">
      <h2 className="text-3xl lg:text-2xl font-bold text-center mb-16 text-primary pt-8 font-rubik">
        DOKUMENTER
      </h2>

      <div className="container px-6 mx-auto flex flex-wrap gap-8 justify-center">
        {dokumenter.map((item, index) => (
          <div
            key={index}
            className="rounded-lg shadow-md mb-10 bg-white overflow-hidden w-80 lg:w-72"
          >
            <img src={item.src} alt="dokumentasi" className="w-full" />
            <div className="py-6 px-4">
              <h3 className="font-semibold text-xl mb-2 font-nunito">
                {item.title}
              </h3>
              <p className="font-poppin">{item.desc}</p>
              <div className="font-semibold text-xl mb-2 mt-3 text-end text-primary">
                <Link to="/cooming">
                  <p className="w-16 py-1 px-1 mb-4 text-base font-bold rounded-lg hover:shadow-lg hover:opacity-90 transition duration-300 ease-in-out font-poppin">
                    Lihat...
                  </p>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


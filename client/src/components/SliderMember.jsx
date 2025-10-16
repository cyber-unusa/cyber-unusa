import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { mockUp } from "../assets/memberTeam.jsx";

export const SliderMember = (data) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="container grid grid-cols-1 gap-3 p-4">
      <Slider {...sliderSettings}>
        {data.map((item, index) => {
          return (
            <>
              <div key={index} className="membersz mx-3 mt-4 text-center">
                <div className="lg:h-60  drop-shadow-lg sm:px-10">
                  {mockUp(item.foto)}
                </div>
                <p
                  className={
                    item.warna === "hijau"
                      ? "font-medium  text-xl text-primary"
                      : "font-medium  text-xl text-white"
                  }
                >
                  {item.nama}
                </p>
              </div>
            </>
          );
        })}
      </Slider>
    </div>
  );
};

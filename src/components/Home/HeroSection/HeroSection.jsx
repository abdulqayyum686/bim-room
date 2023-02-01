import React from "react";
import "./heroSection.scss";
import Vector2 from "../../../assets/images/home/Vector2.png";
import pic1 from "../../../assets/images/home/pic1.png";

const HeroSection = () => {
  const settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="hero-section">
      <div className="main_box">
        <div className="mai_heading">BIM OBJECTS FOR ARCHITECTS</div>
        <div className="sub_heading">
          Bring your vision to life with the best BIM objects available!
        </div>
        <div className="main_box_button">
          <span>
            <img src={Vector2} alt="" />
          </span>
          <span className="button_text">Browse the library</span>
        </div>
      </div>
      <div className="second_main_box">
        <img src={pic1} alt=""  height="100%" />
      </div>
    </div>
  );
};

export default HeroSection;

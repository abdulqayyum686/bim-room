import React from "react";
import "./footer.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// images & icons
//import bimroomlogoorange from '../../assets/images/home/bimroom-demo-orange.svg'
import bimroomlogoorange from "../../assets/images/home/bimroom-logo-orange 1.png";
import linkedin from "../../assets/images/home/Vector (1).png";
import twitter from "../../assets/images/home/Vector.png";
import arrow from "../../assets/images/home/Vector (2).png";

import logo from "../../assets/images/navbar/logo.png";
import sendIcon from "../../assets/images/footer/send-icon.png";
import { FaFacebookSquare, FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="footer-component">
      <div className="main-wrapper">
        <div className="left">
          <img src={bimroomlogoorange} alt="" />
        </div>

        <div className="center">
          <div className="menu">
            <div className="link" onClick={() => navigate("/")}>
              Bimroom Plugin
            </div>
            <div className="link" onClick={() => navigate("/plugin")}>
              Contact
            </div>
            <div className="link" onClick={() => navigate("/manufacturers")}>
              About us
            </div>
            <div className="link" onClick={() => navigate("/manufacturers")}>
              Help
            </div>
            <div className="link" onClick={() => navigate("/manufacturers")}>
              Terms
            </div>
            {/* <div className="link">About us</div> */}
          </div>

          <div className="menu margin_left">
            <div className="link" onClick={() => navigate("/about")}>
              Guidelines
            </div>
            <div className="link" onClick={() => navigate("/contact")}>
              Testimonials
            </div>
            <div className="link" onClick={() => navigate("/terms")}>
              Advertise
            </div>
            <div className="link" onClick={() => navigate("/contact")}>
              Intergrations
            </div>
            <div className="link" onClick={() => navigate("/terms")}>
              Careers
            </div>
            {/* <div className="link">Guidelines</div> */}
          </div>
        </div>

        <div className="right">
          <div className="socialicons">
            <img src={linkedin} alt="" />
            <img src={twitter} alt="" />
          </div>
          <div className="bottom_wrapper">
            <div className="text">
              Stay in touch with us for the latest updates!
            </div>
            <img src={arrow} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

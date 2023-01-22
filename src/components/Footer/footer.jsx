import React from "react";
import "./footer.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// images & icons
//import bimroomlogoorange from '../../assets/images/home/bimroom-demo-orange.svg'
import bimroomlogoorange from '../../assets/images/home/bimroomlogoorange.svg';
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
          {/* <img src={logo} alt="" /> */}
          <img src={bimroomlogoorange} alt="" /> 

          {/* <div className="para">
            bimroom is a premium BIM object library to supply your project with
            the best digital products available. Our content is exclusively
            composed of fully parametric, carefully curated BIM objects which
            make it easy to bring your vision to life. Bimroom objects meet
            strict quality criteria and possess the features to ensure smooth
            modeling across the entire lifecycle of your project.
          </div> */}
        </div>

        <div className="center">
          <div className="menu">
            <div className="link" onClick={() => navigate("/")}>Home</div>
            <div className="link" onClick={() => navigate("/plugin")}>Plugins</div>
            <div className="link" onClick={() => navigate("/manufacturers")}>Manufacturers</div>
            {/* <div className="link">About us</div> */}
          </div>

          <div className="menu">
            <div className="link" onClick={() => navigate("/about")}>About us</div>
            <div className="link" onClick={() => navigate("/contact")}>Contact</div>
            <div className="link" onClick={() => navigate("/terms")}>Terms of Use</div>
           {/* <div className="link">Guidelines</div> */}
          </div>

          {/* <div className="menu">
            <div className="link">Testimonials</div>
            <div className="link">Advertise</div>
            <div className="link">Integrations</div>e
            <div className="link">Careers</div>
          </div>*/}
        </div> 

        <div className="right">
          <div className="text">
            Stay in touch with us for the latest updates
          </div>

          <div className="email-send">
            <input placeholder="Enter your email address" />
            <div className="send-btn">
              <img src={sendIcon} alt="" />
            </div>
          </div>
          <div className="social-links">
            <FaFacebookSquare className="icon" />
            <AiFillInstagram className="icon" />
            <FaTwitter className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

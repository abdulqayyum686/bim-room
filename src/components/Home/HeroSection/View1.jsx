import React from "react";
import "./view1.scss";
import chair from "../../../assets/wishlist/2.jpg";
import panel from "../../../assets/wishlist/1.jpg";
import brand from "../../../assets/wishlist/brand.png";
import toilet from "../../../assets/wishlist/toilet.png";
import showerUnit from "../../../assets/wishlist/Shower Unit.webp";
import bathroomBasin from "../../../assets/wishlist/Bathroom Basin with Cabin.webp";
import mirrorCabinet from "../../../assets/wishlist/Mirror Cabinet.webp";

import { useDispatch } from "react-redux";
import { setSearch } from "../../../redux/reducers/product-reducer";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const View1 = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (value) => {
    dispatch(setSearch(value));
    navigate("/product");
  };

  const goToPage = (value) => {
    navigate("/product/" + value);
  }

  return (
    // <div className="hero-section-view1">
    //   <div className="main-container">
    //     <div className="content">
    //       <div className="wordCarousel">
    //         <span>BIM Objects from Architects for Architects</span>
    //       </div>

    //       <p className="para">
    //         Find and download fully parametric and carefully curated digital
    //         building products on bimroom. Bring your vision to life with the
    //         best BIM objects available!
    //       </p>

    //       <Link to="/product" className="browse-btn">
    //         {t("home-button.1")}
    //       </Link>
    //     </div>

    //     <div className="pulse1"></div>
    //     <div className="h-show1" onClick={() => handleSearch("Armchair")}>
    //       <div className="p-image">
    //         <img src={chair} alt="" />
    //       </div>

    //       <div className="text">Armchair</div>

    //       <div className="brand">
    //         <img src={brand} alt="" />
    //       </div>
    //     </div>

    //     <div className="pulse2"></div>
    //     <div className="h-show2" onClick={() => handleSearch("Panel")}>
    //       <div className="p-image">
    //         <img src={panel} alt="" />
    //       </div>

    //       <div className="text">Panel</div>

    //       <div className="brand">
    //         <img src={brand} alt="" />
    //       </div>
    //     </div>

      
    //     <div className="pulse3"></div>
    //     <div className="h-show3" onClick={() => handleSearch("Table")}>
    //       <div className="p-image">
    //         <img src={panel} alt="" />
    //       </div>
    //       <div className="text">Panel</div>
    //       <div className="brand">
    //         <img src={brand} alt="" />
    //       </div>
    //     </div>
        

    //     <div className="pulse4"></div>
    //     <div className="h-show4" onClick={() => handleSearch("Armchair")}>
    //       <div className="p-image">
    //         <img src={chair} alt="" />
    //       </div>

    //       <div className="text">Armchair</div>

    //       <div className="brand">
    //         <img src={brand} alt="" />
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="hero-section-view1">
      <div className="main-container">
        <div className="content">
          <div className="wordCarousel">
            <span>{t("home-heading.1")}</span>
            <div>
              <ul className="flip4">
                <li>{t("word-carasoul.1")}</li>
                <li>{t("word-carasoul.2")}</li>
                <li>{t("word-carasoul.3")}</li>
              </ul>
            </div>
          </div>

          <p className="para">{t("home-para.1")}</p>

          <Link to="/product" className="browse-btn">
            {t("home-button.1")}
          </Link>
        </div>

        <div className="pulse1"></div>
        <div className="h-show1" onClick={() => goToPage("bathroom-basin-with-cabin")}>
          <div className="p-image">
            <img src={bathroomBasin} alt="" />
          </div>

          <div className="text">Bathroom Basin with Cabin</div>

          <div className="brand">
            <img src={brand} alt="" />
          </div>
        </div>

        <div className="pulse2"></div>
        <div className="h-show2" onClick={() => goToPage("mirror-cabinet")}>
          <div className="p-image">
            <img src={mirrorCabinet} alt="" />
          </div>

          <div className="text">Mirror Cabinet</div>

          <div className="brand">
            <img src={brand} alt="" />
          </div>
        </div>

        <div className="pulse3"></div>
         <div className="h-show3" onClick={() => goToPage("toilet-seat-wall-mounted-2")}>
          <div className="p-image">
            <img src={toilet} alt="" />
          </div>

          <div className="text">Toilet Seat</div>

          <div className="brand">
            <img src={brand} alt="" />
          </div>
        </div>

        <div className="pulse4"></div>
        <div className="h-show4" onClick={() => goToPage("shower-unit")}>
          <div className="p-image">
            <img src={showerUnit} alt="" />
          </div>

          <div className="text">Shower Unit</div>

          <div className="brand">
            <img src={brand} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default View1;

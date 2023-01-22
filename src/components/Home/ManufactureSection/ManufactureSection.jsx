
// images
// import brands from "../../../assets/images/manufacture/brand.png";

// const ManufactureSection = () => {
//   return (
//     <div className="home-manufacture-section">
//       <div className="main-title">Manufacturers</div>

//       <div className="brand-image-wrapper">
//         <img src={brands} alt="" />
//       </div>

//       <LoadMore text={"Show all manufactures"} down={true} onClick={() => {}} />
//     </div>
//   );
// };

import React, { useState } from "react";
import "./manufactureSection.scss";

// packages
import { useDispatch } from "react-redux";
import { setCategory } from "../../../redux/reducers/product-reducer";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// components
import LoadMore from "../Load More";

// constants
import { brandLogos } from "../../../constants/brands";

const ManufactureSection = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(6);

  const toggleResultShow = () => {
    setShowAll(showAll === brandLogos.length ? 6 : brandLogos.length);
  };

  const handleManufacturer = (name) => {
    
    navigate("/product/search/?brands=" + encodeURIComponent(name));
  };

  return (
    <div className="home-manufacture-section">
      <div className="main-title">Manufacturers</div>
      <div className="brand-image-wrapper">
        <div className="row">
          {brandLogos.slice(0, showAll).map((data, idx) => (
            <div
              className="col-lg-2 col-md-4 col-sm-6 col-xs-12 single-item"
              key={idx}
              onClick={() => handleManufacturer(data.label)}
            >
              <img src={data.icon} alt="" />
              {/* <div className="text">{t(`categoryproduct.${idx + 1}`)}</div> */}
            </div>
          ))}
        </div>
      </div>

      <LoadMore
        text={
          showAll !== brandLogos.length
            ? "Show all manufacturers"
            : "Hide manufacturers"
        }
        down={showAll !== brandLogos.length ? true : false}
        onClick={toggleResultShow}
      />
    </div>
  );
};

export default ManufactureSection;

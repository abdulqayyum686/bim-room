import React from "react";
import "./style.scss";

import {FaArrowLeft} from "react-icons/fa";

// package's
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
  

// image's
import backIcon from "../../assets/images/icons/back-icon.png";

const MoveBack = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="move-back-component">
      {/* <div className="back" onClick={() => navigate(-1)}>
        <img src={backIcon} alt="" />
        <div className="text">Back</div>
      </div> */}

      <div
        className="goback"
        onClick={() => {
          navigate(-1);
        }}
      >
        <FaArrowLeft />
        <span>{t("product.1")}</span>
      </div>

      <div className="line" />
    </div>
  );
};

export default MoveBack;

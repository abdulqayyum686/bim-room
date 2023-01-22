import React from "react";

import projectIcon from "../../assets/images/navbar/building-icon.png";
import projectIconColor from "../../assets/images/navbar/building-icon-full.png";
import collection from '../../assets/images/other/collection-box.svg';

const MenuLink = ({ icon, manage, active, label, onClick }) => {
  let buildingIcon = projectIcon;
  let title = "Add to project";
  if (icon === "full") {
    buildingIcon = projectIconColor;
    title = "Remove from project";
  } 
  
  if (manage === true) {
    buildingIcon = collection;
    title = "Manage Projects";
  }

  return (
    <div
      title={title}
      className={active === label ? "menu-link active" : "menu-link"}
      onClick={onClick}
    >
      <img src={buildingIcon} alt="" />
      <div className="label">{label}</div>
    </div>
  );
};

export default MenuLink;

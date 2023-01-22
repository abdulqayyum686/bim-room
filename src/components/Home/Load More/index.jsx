import React from "react";
import "./style.scss";

// icons
import downicon from "../../../assets/images/navbar/downicon.png";

const LoadMore = ({ text, down, onClick }) => {
  return (
    <div className="load-more-component">
      <div className="show-more" onClick={onClick}>
        <img src={downicon} alt="" className={down ? "down-icon" : "up-icon"} />
        <div className="text">{text}</div>
      </div>
    </div>
  );
};

export default LoadMore;

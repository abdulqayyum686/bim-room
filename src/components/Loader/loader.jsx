import React from "react";
import loaderImg from "../../assets/loader/bimroom-loader.svg";
import "./loader.scss";

const Loader = ({ text }) => {
  return (
    <div
      style={{
        position: "fixed",
        zIndex: "100",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        width: "100%",
        height: "100%",
        background: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img src={loaderImg} alt="" width={50} height={50} />
      {text ? (
              <p class="loading">{text}</p>
            ) : (
              <p class="loading">Loading</p>
            )}
    </div>
  );
};

export default Loader;
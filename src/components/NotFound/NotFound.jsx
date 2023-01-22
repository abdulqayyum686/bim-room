import React, { useState } from "react";
import "./notFound.scss";

const NotFound = () => {


  return (
    <>
      <br />
      <h1 className="not-found-text">Page not found...</h1>
      {/* <p className="zoom-area"><b>CSS</b> animations to make a cool 404 page. </p> */}
      <section className="error-container">
        <span>4</span>
        <span><span className="screen-reader-text">0</span></span>
        <span>4</span>
      </section>
      <div className="link-container">
        <a target="_blank" href="/" className="more-link">Go to home page</a>
      </div>
      <br />
      <br />
      <br />
    </>
  );
};

export default NotFound;

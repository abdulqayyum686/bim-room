import React from "react";
import Navbar from "../Navbar/Navbar";
import "../Manufacture/manu.css";
import arrow from "../../assets/images/menufacture/arrow.png";

const MenuFacture = () => {
  return (
    <>
      <Navbar />
      <div className="menu_container">
        <div className="menu_back_btn">
          <div>
            <img src={arrow} />
          </div>
          Back
        </div>
        <div className="menu_heaing">MANUFACTURERS</div>
        {/* <======sec1=========> */}
        <div className="menu_why_bimroom">
          <div>
            <div className="menu_why_bimrom_point">Why bimroom?</div>
            <div className="menu_why_bim_text">
              In the past decade, building information modeling has widely been
              adapted as the primary method of building design. Currently BIM is
              shifting from best practice to a process compulsory by law in most
              developed countries. If your company’s product catalogue is not
              already available in BIM formats, now is the time to react. Most
              specifications are made based on design, and designers using BIM
              are likely to specify products with high-quality BIM models
              available. There are numerous sources of BIM content online with
              hundreds of thousands of products available – What makes Bimroom
              different from the rest? Most BIM content libraries focus on
              quantity over quality. Product catalogues are filled with non-BIM
              file formats and unnecessarily detailed production models directly
              imported into BIM applications. The content is often created by
              software developers to meet the demands of the manufacturer rather
              than the designers who ultimately use the models.
            </div>
          </div>
        </div>
        {/* <=========sec2==========> */}
        <div className="menu_cutom_feature_box">
          <div>
            <div className="menu_why_bimrom_point">Custom features</div>
            <div className="menu_cutom_text">
              We bring your brand to the spotlight with individual solutions to
              best complement your content. If you feel like designers would
              benefit from a guided and detailed way to specify your products,
              we’ll build a product configurator tailored for the purpose. A
              custom configurator will help the designers make sure that the
              products are specified according to your requirements.
              <br />
              <br />
              If you’d like more exposure to your offering, we’ll highlight your
              brand and products on the Bimroom front page and plugin toolbar.
              All our services are available to integrate in your own channels –
              if you want to make your Bimroom content available on your own
              website, we’ll make it happen.
            </div>
          </div>
        </div>
        {/* <=====sec 3======> */}
        <div className="menu_traing_sec">
          <div className="menu_custom_box">
            <div className="menu_why_bimrom_point">Training</div>
            <div className="menu_why_bim_text">
              Shifting the paradigm from CAD to BIM does not happen overnight.
              If required, we’ll train your product design and sales personnel
              on how to use and benefit from BIM content and Bimroom services.
              We’ll help you highlight your BIM efforts and make sure that your
              clients and other groups of interest find your digital products
              and make the best possible use of them.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuFacture;

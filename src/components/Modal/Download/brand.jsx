import React from "react";
import listOfBrands from "../../../assets/brand-images/brand_logos.json";
// import brand from "../../assets/images/product/brand.png";

const Brand = (brand) => {

  let brandImg = "";

  if (typeof brand.brand !== 'undefined') {
       const index = listOfBrands.map(object => object.brand).indexOf(brand.brand);
       brandImg = listOfBrands[index].image;
  }

  return (
        // <img src={`/brandImages/${brandImg}`} alt=""/>
        <img src={`https://cdn.bimroom.com/brand-images/${brandImg}`} alt=""/>
  );
};

export default Brand;

import React from "react";
import listOfBrands from "../../assets/brand-images/brand_logos.json";
import brand from "../../assets/images/product/brand.png";

const Brand = ({brand}) => {

  let brandImg = "";

  
  if (brand) {
    const index = listOfBrands.map(object => object.brand).indexOf(brand);

    if (index !== -1) {
      brandImg = listOfBrands[index].image;
    }
  }

  return (
    <img src={`https://cdn.bimroom.com/brand-images/${brandImg}`} alt=""/>
  );
};

export default Brand;

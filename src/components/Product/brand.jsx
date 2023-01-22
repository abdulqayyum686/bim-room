import React from "react";
import listOfBrands from "../../assets/brand-images/brand_logos.json";
import brand from "../../assets/images/product/brand.png";

const Brand = ({ product }) => {
  // const brandNameRaw = product?.meta_data?.find(
  //   (ele) => ele?.key === "brand"
  // );

  const brandName = product?.brand_name;
  //const brandName = brandNameRaw.value && JSON?.parse(brandNameRaw?.value);

  // console.log(listOfBrands);
  // console.log(brandNameRaw.value);

  let brandImg = "";
  
  //console.log(listOfBrands.map(object => object.brand).indexOf(brandNameRaw.value));
  //console.log(listOfBrands[index].image);
  
  if (brandName) {
    const index = listOfBrands.map(object => object.brand).indexOf(brandName);
    if (index !== -1) {
      brandImg = listOfBrands[index].image;
     }
  }

  return (
        // <img src={`/brandImages/${brandImg}`} alt=""/>
        <img src={`https://cdn.bimroom.com/brand-images/${brandImg}`} alt=""/>
  );
};

export default Brand;

import React, { useEffect } from "react";
import "./productPage.scss";

// packages
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { setCategory, setBrand, setPreviousSearch } from "../../redux/reducers/product-reducer";

// components
import ProductView from "./product-view";
import ProductDescription from "./product-description";
import ProductInfo from "./product-info";
import ProductReview from "./product-review";
import RelatedProducts from "./related-products";

// images & icons
import brand from "../../assets/images/product/brand.png";
import { FaArrowLeft } from "react-icons/fa";

import Brand from "./brand";



const ProductPage = ({ product }) => {

  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  return (
    <div className="bimroom-product-page">
      <div className="top-back-wrapper">
        <div
          className="goback"
          onClick={() => {
            navigate(-1);
          }}
        >
          <FaArrowLeft />
          <span>{t("catalog.1")}</span>
        </div>

        {/* <div className="catalog">
          <span className="cat1" onClick={() => navigate("/product")}>
            CATALOG
          </span>
          {categories?.reverse().map((data, i) => (
            <span key={i}>
              {"  >  "}{" "}
              <span className="cat2" onClick={() => handleCategory(data.name)}>
                {getCategoryName(data.name)}
              </span>
            </span>
          ))}
        </div> */}

        <div className="extra"></div>
      </div>

      <div className="title-brand-wrapper">
        <div className="title">{product?.name}</div>
        <div className="brand">
          <Brand product={ product }/>
        </div>
      </div>
      <div className="product-view-desc-section">
        <ProductView product={product} />
        <ProductDescription description={product?.description} />
      </div>
        <ProductInfo product={product} />
      <ProductReview productID={product?.id} />
      <RelatedProducts relatedProductIDs={product?.related_ids} />
    </div>
  );
};

export default ProductPage;

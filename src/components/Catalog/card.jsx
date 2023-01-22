import React, { useState } from "react";
import { productToCart, getProductBySlug } from "../../api";
import DownloadModal from "../Modal/Download";
import Brand from "./brand";


// packages
import {
  FaRegHeart,
  FaHeart,
  FaRegStar,
  FaStar,
  FaCloudDownloadAlt,
} from "react-icons/fa";
import { Highlight } from "react-instantsearch-dom";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user-reducer";
import TagManager from "react-gtm-module";
import { useTranslation } from "react-i18next";

// images
import brand from "../../assets/product images/brand.png";
import emptyImage from "../../assets/empty-image.png";
import dlcould7 from "../../assets/images/product/dlcould7.png";
import Line32 from "../../assets/images/other/Line32.png";
import { useEffect } from "react";
import { wait } from "../../utils/wait";

const Card = ({ hit }) => {
  const { t, i18n } = useTranslation();
  const { accounts } = useMsal();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);
  const toggleImage = useSelector((store) => store.product.toggleImage);
  const [showModal, setShowModal] = useState(false);
  const [downloadModalData, setDownloadModalData] = useState({});
  const [selectedProduct, setSelectedProduct] = useState("");
  const [pluginMode, setPluginMode] = useState(false);

  const handleCart = (product) => {
    if (accounts[0]) {

      let brand = "";
      if (typeof(product?.brandName !== "undefined")) {
        brand = product?.brandName;
      }

      
      let payload = {
        id: accounts[0]?.localAccountId,
        name: accounts[0]?.name,
        email: accounts[0]?.username,
        product: {
          id: product?.id,
          slug: product?.slug,
          name: product?.name,
          brand: product?.brandSlug,
          image: product?.pImage[0]
        }
      };

      productToCart(payload)
        .then((data) => {
          dispatch(setUser(data));
        })
        .catch((err) => console.log("product error =>", err.message));
    } else {
      alert("Please login first...");
    }
  };

  useEffect(() => {
    const plugin = JSON.parse(localStorage.getItem("plugin"));
    if (plugin === "true") {
      setPluginMode(true);
    }
  }, [])

  useEffect(() => {
    if(showModal === true) {
      getProductBySlug(selectedProduct)
      .then((data) => {
        const downloads = {
          rfa: data[0]?.rfa,
          rvt: data[0]?.rvt,
          ifc: data[0]?.ifc
        }
        setDownloadModalData(downloads);
      })
      .catch((err) => console.log("product detail page error =>", err.message));
    }
  }, [showModal])

  const checkIfExists = (id) => {
    const index = user?.cart?.findIndex((item) => {
      return item.id === id
    });
    if (index !== -1) {
      return true;
    } else {
      return false;
    }
  }

  const insertObject = (product) => {
    if (product?.rfa?.length > 0) {
      const productName = product?.rfa[0]?.insertName;
      if (productName) {
        navigate("/download-start/?var=" + productName);
      }
    }
  }

  const moveProductDetailPage = (product) => {
    const slug = product.slug;
    navigate(`/product/${slug}`);
  };

  const getImageFromAzureStorage = (image) => {
    return `https://cdn.bimroom.com/images/${image}`;
  };

  const handleModalClose = () => setShowModal(false);

  const handleModalShow = (product) => {
    // TagManager.dataLayer({
    //   dataLayer: {
    //     event: "click",
    //     button: "download",
    //     product: "productID",
    //   },
    // });
    setSelectedProduct(product?.slug);
    setShowModal(true);
  };

  const getRating = (data) => {
    if (typeof(data?.demo_rating) !== "undefined") {
      if (typeof(data?.demo_rating[0]) !== "undefined") {
        return parseInt(data?.demo_rating[0]);
      }
    } else {
      return 0;
    }

  }

  const getStop = (value) => {
    const output = (value / 5 * 100) + "%";
    return (output);
  }

  return (
    <>
      <div className="p_card">
        <div className="p_header">

          <div className="star">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <defs>
                <linearGradient id="half">
                  <stop offset={getStop(getRating(hit))} stopColor="#feb449" />
                  <stop offset={getStop(getRating(hit))} stopColor="white" />
                </linearGradient>   
              </defs>
              <path
                fill="url(#half)"
                fillRule="evenodd"
                stroke="#feb449"
                strokeWidth="0.1em"
                d="M10.472 5.008L16 5.816l-4 3.896.944 5.504L8 12.616l-4.944 2.6L4 9.712 0 5.816l5.528-.808L8 0z"
              />
            </svg>
            <p>{getRating(hit)}</p>
          </div>
        
          <div className="heart" onClick={() => handleCart(hit)}>
            {/* {checkIfExists(hit?.post_id) ? ( */}
            {checkIfExists(hit?.id) ? (
              // <FaHeart color="#337ab7" />
              <FaHeart color="#313133" />
            ) : (
              <FaRegHeart />
            )}
          </div>
        </div>

        <div className="clickable" onClick={() => moveProductDetailPage(hit)}>
          <div className="p_body">
            <div className="thumbnail">
              {toggleImage ? (
                hit?.rImage?.length > 0 && hit?.rImage !== "" ? (
                  <img src={getImageFromAzureStorage(hit?.rImage)} alt="" />
                ) : hit?.pImage?.length > 0 && hit?.pImage !== "" ? (
                  <img src={getImageFromAzureStorage(hit?.pImage)} alt="" />
                ) : null
              ) : hit?.pImage?.length > 0 && hit?.pImage !== "" ? (
                <img src={getImageFromAzureStorage(hit?.pImage)} alt="" />
              ) : hit?.rImage?.length > 0 && hit?.rImage !== "" ? (
                <img src={getImageFromAzureStorage(hit?.rImage)} alt="" />
              ) : null}

              {!hit?.pImage && !hit?.rImage && (
                <img src={emptyImage} alt="" />
              )}
            </div>
          </div>
        </div>

        <div className="under-image-line" onClick={() => moveProductDetailPage(hit)}>
          <img src={Line32} alt="" />
        </div>

        <div className="p_title" onClick={() => moveProductDetailPage(hit)}>
          <Highlight attribute="name" tagName="mark" hit={hit} />
        </div>

        <div className="brand" onClick={() => moveProductDetailPage(hit)}>
          <Brand brandName={hit?.brandSlug} />
        </div>

        <div className="button-wrapper">
          {pluginMode === true
            ?   <div className="download" onClick={() => insertObject(hit)}>
                  <FaCloudDownloadAlt className="icon" />
                  <span>Insert object</span>
                </div>
            :   <div className="download" onClick={() => handleModalShow(hit)}>
                  <FaCloudDownloadAlt className="icon" />
                  <span>{t("product.31")}</span>
                </div>
          }
        </div>
      </div>

      <DownloadModal
        data={downloadModalData}
        name={hit?.name}
        brandName={hit?.brandSlug}
        showModal={showModal}
        downloadObject={hit?.glb}
        modalClose={handleModalClose}
      />
    </>
  );
};

export default Card;

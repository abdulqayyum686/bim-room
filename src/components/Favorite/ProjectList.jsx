import React, { useState, useEffect } from "react";

// image's & icon's
import { FaCloudDownloadAlt } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import brand from "../../assets/wishlist/brand.png";
import Brand from "./brand";

const ProjectList = ({ cart, handleCart, handleModalShow, list }) => {
  const navigate = useNavigate();
  const [pluginMode, setPluginMode] = useState(false);

  const insertObject = (product) => {
    if (product?.rfa?.length > 0) {
      const productName = product?.rfa[0]?.insertName;
      if (productName) {
        navigate("/download-start/?var=" + productName);
      }
    }
  };

  useEffect(() => {
    const plugin = JSON.parse(localStorage.getItem("plugin"));
    if (plugin === "true") {
      setPluginMode(true);
    }
  }, []);

  const goToProduct = (slug) => {
    navigate("/product/" + slug);
  }

  const getImage = (image) => {
    console.log(image);
    if (image) {
      return `https://cdn.bimroom.com/images/${image}`;
    } else {
      console.log("no image found");
    }
  }
  
  //console.log(cart);
  return (
    <div className="favorite-list">
      {cart.length > 0 &&
        cart.map((data, index) => (
          <div className="single-item" key={index}>
            <div className="cross">
              <MdOutlineClose
                onClick={() => {
                  handleCart(data, list);
                }}
                className="icon"
              />
            </div>

            <div className="p-image">
              <img src={getImage(data?.image)} alt="" />
            </div>

            <div className="brand-image">
              {/* <img src={data?.brand} alt="" /> */}
              <Brand brand={data?.brand} />
            </div>

            <div className="p-name">
              <span onClick={() => goToProduct(data?.slug)}>{data.name}</span>
            </div>

            <div className="download">
              {pluginMode === true
                ?   <div className="d-btn" onClick={() => insertObject(data)}>
                      <FaCloudDownloadAlt className="icon" />
                      <span>Insert object</span>
                    </div>
                :   <div className="d-btn" onClick={() => handleModalShow(data)}>
                      <FaCloudDownloadAlt className="icon" />
                      <span>Download</span>
                    </div>
              }
            </div>
          </div>
        ))}

      {cart.length === 0 && (
        <div className="no-result">No products added to the project</div>
      )}
    </div>
  );
};

export default ProjectList;

import React, { useState, useEffect, useRef } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { getProductByIDs, productToCart } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { useMsal } from "@azure/msal-react";
import { setUser } from "../../redux/reducers/user-reducer";
import TagManager from "react-gtm-module";
import ModalComponent from "../Modal/Modal";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const RelatedProducts = ({ relatedProductIDs }) => {
  const { accounts } = useMsal();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user.user);
  const p_rating = useSelector((store) => store.product.productRatingAndReview);

  const [relatedProduct, setRelatedProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState();
  const handleModalClose = () => setShowModal(false);

  const handleModalShow = (data) => {
    TagManager.dataLayer({
      dataLayer: {
        event: "click",
        button: "download",
        product: "productID",
      },
    });
    setModalData(data);
    setShowModal(true);
  };

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

  const getProductImage = (x) => {
    // const getRImage = x?.find((ele) => ele?.key === "r_image");
    // if (getRImage) {
    //   return `https://cdn.bimroom.com/images/${getRImage?.value}`;
    // } else {
    //   return "";
    // }
    const getRImage = x?.rImage[0];
    if (getRImage) {
      return `https://cdn.bimroom.com/images/${getRImage}`;
    } else {
      return "";
    }
  }

  const handleCart = (product) => {
    if (accounts[0]) {
      let payload = {
        //tenantId: accounts[0]?.localAccountId,
        id: accounts[0]?.localAccountId,
        name: accounts[0]?.name,
        email: accounts[0]?.username,
        //productID: product?.id,
        product: {
          // id: product?.wp_id,
          id: product?.id,
          slug: product?.slug,
          name: product?.name,
          brand: product?.brandSlug,
          // image: product?.images[0]?.src
          image: product?.pImage[0]
        }
      };

      productToCart(payload)
        .then((data) => {
          //dispatch(setUser(data.user));
          dispatch(setUser(data));
        })
        .catch((err) =>
          console.log("related product page api error =>", err.message)
        );
    } else {
      alert("Please login first...");
    }
  };

  useEffect(() => {
    let isCancelled = false;

    //getProductByIDs({ productIDs: relatedProductIDs })
    getProductByIDs({ ids: relatedProductIDs })
      .then((data) => {
        if (!isCancelled) setRelatedProducts(data);
      })
      .catch((err) => console.log("related product error =>", err.message));

    return () => {
      isCancelled = true;
    };
  }, [relatedProductIDs]);

  const sliderSettings = {
    slidesToShow: 3.5,
    slidesToScroll: 1,
    infinite: false,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.5,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.1,
        },
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1.2,
        },
      },
    ],
  };

  const slider = React.useRef(null);

  return (
    <>
      {relatedProduct.length > 0 && (
        <div className="related-product-section">
          <div className="headercontainer">
            <div className="tab">Related Objects</div>
            <div className="sliderButton">
              <IoIosArrowBack
                className="backbutton"
                onClick={() => slider?.current?.slickPrev()}
              />
              <IoIosArrowForward
                className="forwardbutton"
                onClick={() => slider?.current?.slickNext()}
              />
            </div>
          </div>

          <Slider ref={slider} {...sliderSettings} className="product-wrapper">
            {relatedProduct.length > 0 &&
              relatedProduct.map((data, i) => {
                return (
                  <div className=" p_card" key={i}>
                    {/* {console.log("MYDATA", data)} */}
                    <div className="p_header">
                      <div className="heart" onClick={() => handleCart(data)}>
                        {/* {checkIfExists(data?.wp_id) ? ( */}
                        {checkIfExists(data?.id) ? (
                          // <FaHeart color="#337ab7" />
                          <FaHeart color="#313133" />
                        ) : (
                          <FaRegHeart />
                        )}
                      </div>
                    </div>
                    <Link to={`/product/${data.slug}`} className="p_body">
                      <div className="p_body">
                        <div className="thumbnail">
                          {/* <img src={data.images[0]?.src} alt="" /> */}
                          <img src={getProductImage(data)} alt="" />
                        </div>

                        <div className="p_title">{data.name}</div>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </Slider>
        </div>
      )}

      <ModalComponent
        name={modalData?.name}
        showModal={showModal}
        modalClose={handleModalClose}
      />
    </>
  );
};

export default RelatedProducts;

import React, { useState, useEffect, Suspense } from "react";

// packages
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import { Canvas } from "@react-three/fiber";
import { PresentationControls, OrbitControls, Stage, Center, Float, Lightformer } from "@react-three/drei";
import Image3D from "./Image3D";
import TagManager from "react-gtm-module";
import { useMsal } from "@azure/msal-react";

// redux
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user-reducer";

//api
import { productToCart } from "../../api";

// components
import DownloadModal from "../Modal/Download";
import ProjectDropDown from "./ProjectDropDown";

// images & icons
import {
  FaRegHeart,
  FaHeart,
  FaRegArrowAltCircleDown,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";
import {IoMdHeartEmpty, IoMdHeart} from 'react-icons/io'
import boxIcon from "../../assets/images/icons/box-icon.png";
import loaderImg from "../../assets/loader/bimroom-loader.svg";
import emptyImage from "../../assets/empty-image.png";
import like from '../../assets/images/other/like.svg'
import collection from '../../assets/images/other/collection.svg'
import { useNavigate } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  
  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }
  
  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <p>Something went wrong.</p>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }  
}


const tabArray = [
  { name: "Render" },
  { name: "3D Viewer" },
  { name: "Product Images" },
];

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div className="right-control" onClick={onClick}>
      <FaChevronRight />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="left-control" onClick={onClick}>
      <FaChevronLeft />
    </div>
  );
}

const settings = {
  dots: false,
  infinite: true,
  autoplay: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

const ProductView = ({ product }) => {
  const { t, i18n } = useTranslation();
  const { accounts } = useMsal();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pluginMode, setPluginMode] = useState(false);

  const user = useSelector((store) => store.user.user);

  const [active, setActive] = useState(tabArray[0].name);
  const [showModal, setShowModal] = useState(false);
  const [show3DImage, setShow3DImage] = useState(false);
  const handleModalClose = () => setShowModal(false);

  const handleModalShow = () => {
    TagManager.dataLayer({
      dataLayer: {
        event: "click",
        button: "download",
        product: "productID",
      },
    });
    setShowModal(true);
  };

  const handleCart = (id) => {
    if (accounts[0]) {
      let payload = {
        //tenantId: accounts[0]?.localAccountId,
        id: accounts[0]?.localAccountId,
        name: accounts[0]?.name,
        email: accounts[0]?.username,
    //    productID: id,
        product: {
          id: id,
          slug: product?.slug,
          name: product?.name,
          brand: product?.brandSlug,
          //image: product?.images[0]?.src
          image: product?.pImage[0]
        }
      };

      productToCart(payload)
        .then((data) => {
          // dispatch(setUser(data.user));
          dispatch(setUser(data));
        })
        .catch((err) => console.log("product error =>", err.message));
    } else {
      alert("Please login first...");
    }
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
  };

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
  }, [])

  const handleActive = (string) => {
    setActive(string);
  };

  const getImageFromAzureStorage = (image) => {
    return `https://cdn.bimroom.com/images/${image}`;
  };

  // const getRImage = product?.meta_data?.find((ele) => ele?.key === "r_image");
  // const get3DImage = product?.meta_data?.find((ele) => ele?.key === "glb");
  // const getPImage = product?.meta_data?.find((ele) => ele?.key === "p_image");

  const getRImage = product?.rImage;
  const get3DImage = product?.glb;
  const getPImage = product?.pImage;

  useEffect(() => {
    let isCancelled = false;
    setTimeout(() => {
      if (!isCancelled) setShow3DImage(true);
    }, 2000);

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <>
      <div className="product-view">
        <div className="tab-wrapper">
          {tabArray.map((data, index) => (
            <div
              className={data.name === active ? "tab active" : "tab"}
              onClick={() => {
                handleActive(data.name);
              }}
              key={index}
            >
              {data.name}
            </div>
          ))}
        </div>

        {tabArray[0].name === active && (
          <div className="image-view">
            <img
              src={
                getRImage !== undefined && getRImage !== ""
                  ? getImageFromAzureStorage(getRImage)
                  : getPImage !== undefined && getPImage !== ""
                  ? getImageFromAzureStorage(getPImage)
                  : emptyImage
              }
              alt=""
            />
          </div>
        )}

        {tabArray[1].name === active && (
          <>
            {show3DImage && get3DImage !== undefined ? (
              <div className="image-view" style={{ alignItems: "flex-start" }}>
                <ErrorBoundary>
                  <div
                    style={{
                      position: "relative",
                      width: 500,
                      height: "100%",
                      //marginTop: "50px",
                    }}
                  >
                    <Canvas>
                      <Suspense fallback={null}>
                        
                      {/* <Center alignTop={false}>
                        <Image3D image={get3DImage?.value} />
                        <OrbitControls />
                      </Center> */}
                        <Center alignTop={false}>
                          <Stage
                            //environment={null}
                            environment="warehouse"
                            intensity={0.2}
                            // preset="rembrandt"
                            //shadows={false}
                            contactShadow={false}
                            adjustCamera={true}
                          >
                            <Image3D image={get3DImage} />
                            <OrbitControls rotation={true}/>
                            {/* <PresentationControls /> */}
                          </Stage>
                        </Center>
                      </Suspense>
                    </Canvas>
                  </div>
                </ErrorBoundary>
              </div>
             
            ) : (
              <div className="image-view">
                <img src={loaderImg} alt="" width={50} height={50} />
              </div>
            )}
          </>
        )}

        {tabArray[2].name === active && (
          <div className="slider">
            <Slider {...settings}>
              {getPImage?.map((data, i) => (
                <div key={i} className="slider-image">
                  <img
                    src={getImageFromAzureStorage(data) }
                    alt=""
                  />
                </div>
              ))}
              
              {/* <div className="slider-image">
                <img
                  src={
                    getPImage !== undefined && getPImage[0] !== ""
                      ? getImageFromAzureStorage(getPImage[0])
                      : getRImage !== undefined && getRImage !== ""
                      ? getImageFromAzureStorage(getRImage)
                      : emptyImage
                  }
                  alt=""
                />
              </div> */}

              {/* <div className="slider-image">
                <img
                  src={
                    getPImage !== undefined && getPImage !== ""
                      ? getImageFromAzureStorage(getPImage)
                      : getRImage !== undefined && getRImage !== ""
                      ? getImageFromAzureStorage(getRImage)
                      : emptyImage
                  }
                  alt=""
                />
              </div> */}
            </Slider>
          </div>
        )}

        <div className="download-save-wrapper">
          {/* <div className="download-btn" onClick={handleModalShow}>
            <span>{t("catalog.16")}</span>
          </div> */}
          {pluginMode === true
            ?   <div className="download-btn" onClick={() => insertObject(product)}>
                  <span>Insert object</span>
                </div>
            : <div className="download-btn" onClick={handleModalShow}>
                <span>{t("catalog.16")}</span>
              </div>
          }

          {/* <div className="heart" onClick={() => handleCart(product?.id)}>
            {user?.cart?.includes(product?.id) ? ( */}
          {/* <div className="heart" title={"Add to wishlist"} onClick={() => handleCart(product?.wp_id)}> */}
          <div className="heart" title={"Add to wishlist"} onClick={() => handleCart(product?.id)}>
            {/* {user?.cart?.includes(product?.wp_id) ? (     */}
            {/* {checkIfExists(product?.wp_id) ? (     */}
            {checkIfExists(product?.id) ? (    
           
              // <IoMdHeart color="#337ab7" className="icon" />
              <IoMdHeart color="#feb449" className="icon" />
            ) : (
              //<img src={like} alt="" className="likeicon"/>
              <IoMdHeartEmpty color="#313133" className="icon" />
            )}
          </div>

          <div className="box" title={"Projects"} >
          {/* <img src={collection} alt="" className="boxicon"/> */}
            <ProjectDropDown product={product} />
          </div>
        </div>
      </div>

      <DownloadModal
        name={product?.name}
        showModal={showModal}
        downloadObject={get3DImage?.value}
        modalClose={handleModalClose}
      />
    </>
  );
};

export default ProductView;

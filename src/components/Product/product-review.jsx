import React, { useState, useMemo, useEffect } from "react";
import { FaRegStar } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { useMsal } from "@azure/msal-react";
import { addReviewAndRating, getReviewAndRating, getReviews } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { setRatingAndReview } from "../../redux/reducers/product-reducer";
import { useTranslation } from "react-i18next";
import Loader from "../Loader";
import { Grid } from "@material-ui/core";
import Line32 from "../../assets/images/other/Line32.png";
import { Line } from "rc-progress";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import ReactTooltip from "react-tooltip";
import Swal from 'sweetalert2'

const MessageBox = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <div className="msg">{t("catalog.10")}</div>
    </>
  );
};

const Review = ({ data }) => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <div className="head">
            <div className="title">{data?.email}</div>
            <div>
              {[1, 2, 3, 4, 5].map((star, index) =>
                star <= data?.rating ? (
                  <AiFillStar className="icon active" key={index} />
                ) : (
                  <FaRegStar className="icon " key={index} />
                )
              )}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <div className="para">{data?.review}</div>
        </Grid>
      </Grid>
    </>
  );
};

const ProductReview = ({ productID }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  // const p_rating_review = useSelector(
  //   (store) => store.product.productRatingAndReview
  // );
  const { accounts } = useMsal();
  const [starHover, setStarHover] = useState();
  const [starActive, setStarActive] = useState(0);
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const Swal = require('sweetalert2')
  const [p_rating_review, setRatingReview] = useState([]);


  // NEW CODE

  useEffect(() => {
    setRatingReview([]);
    getReviews(productID)
      .then((data) => {
       // console.log(data);
        setRatingReview(data);
      })
      .catch((err) => console.log("Review error =>", err.message));
  }, []);

  const reset = () => {
    setReview("");
    setStarActive(0);
  };

  const submit = async () => {
    if (accounts[0]) {
      let payload = {
        email: accounts[0]?.username,
        productId: productID,
        rating: starActive, 
        review,
      };

      try {
        setIsLoading(true);
        await addReviewAndRating(payload);
        //const response = await getReviewAndRating();
        const response = await getReviews(productID);
        //dispatch(setRatingAndReview(response.data));
        //dispatch(setRatingAndReview(response));
        setRatingReview(response);
        setIsLoading(false);
        Swal.fire(
          'Review Submitted',
          'Thank you for the feedback',
          'success'
        )
        reset();
      } catch (err) {
        setIsLoading(false);
        console.log("product-review component api error =>", err.message);
      }
    } else {
      alert("Please login first");
    }
  };

// CHANGE THIS

  // const productStats = useMemo(
  //   () => p_rating_review?.find((id) => id.productID === `${productID}`),
  //   [p_rating_review]
  // );

  const productStats = useMemo(() => p_rating_review, [p_rating_review]);
  
  const rating = (data) => {
    let temp = 0;
    const length = data?.length;

    for (let i = 0; i < data.length; i++) {
      temp += data[i].rating;
    }

    if (length > 0) {
      return (temp/length).toFixed(1);
    } else {
      return null;
    }
    
  };
  

  const reviewsCalculation = (star) => {
    // let temp =
    //   productStats?.reviews?.filter((val) => val?.rating === star)?.length ?? 0;
    let temp =
      productStats?.filter((val) => val?.rating === star)?.length ?? 0;

    // let totalReviews = productStats?.reviews?.length ?? 100;
    let totalReviews = productStats?.length ?? 100;
    if (productStats?.length > 0) {
      return Math.round((temp / totalReviews) * 100);
    } else {
      return 0;
    }
    
    
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="product-review-section">
          {/* SUBMITTING RATING AND REVIEW SECTION */}
          {/* {accounts[0] && ( */}
          <>
            <div className="rr-header">
              <h1>Ratings & Reviews</h1>
            </div>
            <Grid container className="rating-review-wrapper">
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <div className="reviews-show-container">
                  <div className="ratingicons">
                    {[1, 2, 3, 4, 5].map((star, index) =>
                      star <= rating(productStats) ? (
                        <AiFillStar className="icon active" key={index} />
                      ) : (
                        <FaRegStar className="icon " key={index} />
                      )
                    )}
                  </div>
                  <div className="ratingtext">
                    {/* <h1>{productStats?.rating}</h1> */}
                    <h1>{rating(productStats)}</h1>
                    {/* <p>( {productStats?.reviews?.length} Reviews )</p> */}
                    <p>( {productStats?.length} {productStats?.length === 1 ? "review" : "reviews" } )</p>
                  </div>
                  <div className="progress-container">
                    {[5, 4, 3, 2, 1].map((data) => (
                      <div className="progress-bars" key={data}>
                        <div className="progress-bars-text">
                          <p>{data} Star</p>
                        </div>
                        <Line
                          percent={reviewsCalculation(data)}
                          strokeWidth={1}
                          strokeColor="#FEB449"
                          className="line-progress"
                        />
                        <div className="progress-bars-text">
                          <p>{reviewsCalculation(data)}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={7} lg={7}>
                <div className="leave-review">
                  <div className="tab">Leave A Review</div>

                  <div className="wrap-container">
                    <div
                      className="star-wrapper"
                      onMouseOut={() => {
                        setStarHover(-1);
                      }}
                    >
                      {[1, 2, 3, 4, 5].map((data, index) => (
                        <FaRegStar
                          className={
                            starActive
                              ? data <= starActive
                                ? "icon active"
                                : "icon"
                              : data <= starHover
                              ? "icon active"
                              : "icon"
                          }
                          key={index}
                          onMouseOver={() => {
                            setStarHover(data);
                          }}
                          onClick={() => {
                            setStarActive(data);
                          }}
                        />
                      ))}
                    </div>
                    <textarea
                      name="message"
                      rows="6"
                      cols="50"
                      className="textarea"
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                    />

                    <div className="submit-btn-container">
                      <div className="btn-submit" 
                          data-tip 
                          data-for='noDemoAccess'
                          //onClick={submit}
                          onClick={() => {}}>
                        {t("catalog.15")}
                      </div>
                      <ReactTooltip id='noDemoAccess' type='light'>
                        <span>Product reviewing not available in demo mode</span>
                      </ReactTooltip>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </>
          {/* )} */}
          {/* SHOW RATING AND REVIEW LIST SECTION */}
          <div className="product-review" style={{ width: "100%" }}>
            {/* {productStats?.reviews?.length === 0 && ( */}
            {productStats?.length === 0 && (
              <div className="msg-box-wrapper">
                <MessageBox />
              </div>
            )}

            <div className="review-list">
              {/* {productStats?.reviews?.map((data, i) => ( */}
              {productStats?.map((data, i) => (
                <>
                  <Review data={data} key={i} />

                  {/* {i === p_rating_review[0]?.reviews?.length - 1 ? ( */}
                  {i === p_rating_review[0]?.length - 1 ? (
                    <div className="linecontainer">
                      <div className="view-more-line">
                        <div>
                          <img src={Line32} alt="" />
                        </div>
                        <p>View More</p>
                        <span>
                          {" "}
                          <MdOutlineKeyboardArrowDown className="arrow-icon" />
                        </span>
                        <div>
                          <img src={Line32} alt="" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="linecontainer">
                      <img src={Line32} alt="" />
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductReview;

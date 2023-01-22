import React from "react";
import "./contactPage.scss";

// images
import pic1 from "../../assets/images/blog/pic1.png";
import pic2 from "../../assets/images/blog/pic2.png";
import pic3 from "../../assets/images/blog/pic3.png";


const ContactPage = () => {
  return (
    <>
      <div className="blog-page">
        <div className="main-title">ABOUT US</div>

        <div className="blog-containor">
          <div className="main-wrappper">
            <div className="left">
              <img src={pic3} alt="" />
            </div>

            <div className="right">
              <div className="title">BIMROOM</div>

              <div className="para">
                <p>
                Bimroom is a Building Information Modeling (BIM) content library and productivity toolset with an objective of bringing high-quality BIM content of the best real-world building products easily and reliably available to a growing community of AEC industry professionals working with BIM.
                </p>
                <p>
                There are numerous existing sources of BIM content online already, with hundreds of thousands of products available – What makes Bimroom different from the rest?
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="blog-containor">
          <div className="main-wrappper main-wrappper1">
            <div className="left">
              <img src={pic2} alt="" />
            </div>

            <div className="right">
              <div className="title">WHY BIMROOM?</div>

              <div className="para">
                <p>
                  Most BIM content libraries focus on quantity over quality. Product catalogues are filled with outdated products, non-BIM file formats, models with insufficient graphical representations and metadata, as well as unnecessarily detailed production models with non-native geometries directly imported into BIM applications. The content is often created by software developers to meet the possibly uninformed demands of the manufacturer rather than the designers who ultimately use the models.
                </p>
                <p>
                  At Bimroom, all content is created or revised by architects and engineers specializing in BIM – people who are familiar with the requirements of the designers. All our efforts aim to facilitate the work of designers rather than taking shortcuts to make more content available. Every file available in Bimroom meets our precise standards in terms of graphical representations, data content, and documentation, so that neither the user nor the manufacturer will have to worry about faulty or unsuitable content. We believe this approach will attract and engage more designers and bring more favourable attention to manufacturers whose products are featured at Bimroom. High quality models reflect high quality products!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;

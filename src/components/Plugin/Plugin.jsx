import React from "react";
import "./plugin.scss";

// images
import pic1 from "../../assets/images/blog/pic1.png";
import pic2 from "../../assets/images/blog/pic2.png";
import pic3 from "../../assets/images/blog/pic3.png";
import revit from "../../assets/images/blog/revit-plugin.png";

const Plugin = () => {
  return (
    <>
      <div className="blog-page">
        <div className="main-title">PLUGINS</div>

        <div className="blog-containor">
          <div className="main-wrappper">
            <div className="left">
              <img src={revit} alt="" />
            </div>

            <div className="right">
              <div className="title">REVIT</div>

              <div className="para">
                <p>
                The Bimroom object library is available not only in your web browser but also directly in your Revit session. With the plugin Bimroom content can be seamlessly integrated in your design workflow without having to switch between windows. The objects are directly imported in your project file to avoid needlessly clogging up local drives with BIM content. With the plugin, you can keep track of and share Bimroom content in your projects: objects can be found, listed, and replaced if needed in case of updates or product changes, and product libraries specific to a project or an entire company can be shared among colleagues.
                </p>
                <p>
                Additional productivity features to further facilitate BIM design workflows are under development and will be introduced in the Bimroom plugin later on. Stay tuned for updates on how we’ll make your workdays more enjoyable!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="blog-containor">
          <div className="main-wrappper main-wrappper1">
            <div className="left">
              <img src={pic2} alt="" />
            </div>

            <div className="right">
              <div className="title">CUSTOM FEATURES</div>

              <div className="para">
                <p>
                  We bring your brand to the spotlight with individual solutions
                  to best complement your content. If you feel like designers
                  would benefit from a guided and detailed way to specify your
                  products, we’ll build a product configurator tailored for the
                  purpose. A custom configurator will help the designers make
                  sure that the products are specified according to your
                  requirements.
                </p>
                <p>
                  If you’d like more exposure to your offering, we’ll highlight
                  your brand and products on the Bimroom front page and plugin
                  toolbar. All our services are available to integrate in your
                  own channels – if you want to make your Bimroom content
                  available on your own website, we’ll make it happen.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="blog-containor">
          <div className="main-wrappper main-wrappper2">
            <div className="left">
              <img src={pic3} alt="" />
            </div>

            <div className="right">
              <div className="title">TRAINING</div>

              <div className="para">
                <p>
                  Shifting the paradigm from CAD to BIM does not happen
                  overnight. If required, we’ll train your product design and
                  sales personnel on how to use and benefit from BIM content and
                  Bimroom services. We’ll help you highlight your BIM efforts
                  and make sure that your clients and other groups of interest
                  find your digital products and make the best possible use of
                  them.
                </p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Plugin;

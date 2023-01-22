import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import AboutUs from "../components/About";
import Footer from "../components/Footer";
import TagManager from "react-gtm-module";
import { AuthGuard } from "../components/AuthGuard/auth-guard";

const About = () => {
  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        event: "pageview",
        path: "/about",
      },
    });
  }, []);
  return (
    <>
      <AuthGuard>
        <Navbar />
          <AboutUs />
        <Footer />
      </AuthGuard>
    </>
  );
};

export default About;

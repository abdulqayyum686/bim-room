import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
//import ContactPage from "../components/Contact";
import Footer from "../components/Footer";
import TagManager from "react-gtm-module";
import { AuthGuard } from "../components/AuthGuard/auth-guard";

const Terms = () => {
  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        event: "pageview",
        path: "/terms",
      },
    });
  }, []);
  return (
    <>
      <AuthGuard>
        <Navbar />
        {/* <ContactPage /> */}
        <Footer />
      </AuthGuard>
    </>
  );
};

export default Terms;

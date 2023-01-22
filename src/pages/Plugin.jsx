import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import PluginPage from "../components/Plugin";
import Footer from "../components/Footer";
import TagManager from "react-gtm-module";
import { AuthGuard } from "../components/AuthGuard/auth-guard";

const Plugin = () => {
  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        event: "pageview",
        path: "/plugin",
      },
    });
  }, []);
  return (
    <>
      <AuthGuard>
        <Navbar />
          <PluginPage />
        <Footer />
      </AuthGuard>
    </>
  );
};

export default Plugin;

import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import BlogPage from "../components/Blog";
import Footer from "../components/Footer";
import TagManager from "react-gtm-module";
import { AuthGuard } from "../components/AuthGuard/auth-guard";

const Blog = () => {
  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        event: "pageview",
        path: "/manufacturer",
      },
    });
  }, []);
  return (
    <>
      <AuthGuard>
        <Navbar />
        <BlogPage />
        <Footer />
      </AuthGuard>
    </>
  );
};

export default Blog;

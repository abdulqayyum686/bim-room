import React, { useEffect } from "react";
import TagManager from "react-gtm-module";
import Blur from 'react-blur';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useMsal } from "@azure/msal-react";

// components
import Navbar from "../components/Navbar";
import HeroSection from "../components/Home/HeroSection";
import CategorySection from "../components/Home/CategorySection/CategorySection";
import FeaturedObjects from "../components/Home/FeaturedObjects/FeaturedObjects";
import ManufactureSection from "../components/Home/ManufactureSection/ManufactureSection";
import Footer from "../components/Footer";
import UnauthenticatedAccess from "../components/Home/UnauthenticatedAccess";

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";

const Home = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const { accounts } = useMsal();
  
  const navigate = useNavigate();

  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        event: "pageview",
        path: "/home",
      },
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('downloading', JSON.stringify('false'));
  }, []);
  
  useEffect(() => {
    const value = searchParams.getAll("brand");
    if (value.length > 0) {
      // console.log(value[0]);
      //let array = ["Silka","Ytong"];
      sessionStorage.setItem("brand_name", JSON.stringify(value));
    }
  }, []);

  useEffect(() => {
    const value = sessionStorage.getItem("brand_name");
    if (accounts[0] && value) {
      const storedArray = JSON.parse(sessionStorage.getItem("brand_name"));
      let tmp = "/product/search";
      for (let i = 0; i < storedArray.length; i++) {
        if (i === 0) {
          tmp = tmp + "/?brands=" + storedArray[i];
        } else {
          tmp = tmp + "&brands=" + storedArray[i];
        }
      }
      navigate(tmp);
      //navigate("/product/search/?brands=" + value);
      sessionStorage.removeItem("brand_name");
    }
  }, [accounts[0]])


  return (
    <>
      <AuthenticatedTemplate>
        <Navbar />
        <HeroSection />
        <CategorySection />
        <FeaturedObjects />
        <ManufactureSection />
        <Footer />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <UnauthenticatedAccess />
      </UnauthenticatedTemplate>
    </>
  );
};

export default Home;

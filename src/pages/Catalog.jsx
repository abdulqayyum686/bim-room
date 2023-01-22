import React, { useState, useEffect, useRef } from "react";
import qs from 'qs';

// packages
import TagManager from "react-gtm-module";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetAllFilters, setSearchState } from "../redux/reducers/product-reducer";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";

// components
import Navbar from "../components/Navbar";
import CatalogPage from "../components/Catalog";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useNavigate, useLocation, withRouter } from "react-router-dom";
import { AuthGuard } from "../components/AuthGuard/auth-guard";


// URL sync
import withURLSync from '../URLSync';


const searchClient = algoliasearch(
  "MLN6C7QSR3",
  "d5d83c9e0103cbfeef63fcd712daa7e3"
);

const Catalog = (props) => {
  // const navigate = useNavigate();
  // const location = useLocation();
  const [searchKey, setSearchKey] = useState("");
  const dispatch = useDispatch();
  
  //const key = useSelector((store) => store.user.key);
  const key = useSelector((store) => store.user.user.searchKey);
  //const isLoading = useSelector((store) => store.user.userState);
  const isLoading = false;

  
  useEffect(() => {
    const lastURL = props.createURL(props.searchState);
    //console.log(test);
    dispatch(setSearchState(lastURL));
  }, [props.searchState]);

  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        event: "pageview",
        path: "/product",
      },
    });
  }, []);
  

  return (
    <>
    {isLoading ? (
      // <Loader text={"Generating manufacturer page"}/>
      <Loader text={"Loading catalog"}/>
    ) : (
      <>
        <AuthGuard>
          <Navbar isCatalogPage={true}/>
          <InstantSearch
            indexName={"bimroom_demo_test"}
            searchClient={searchClient}
            searchState={props.searchState}
            createURL={props.createURL}
            onSearchStateChange={props.onSearchStateChange}
          >
            <CatalogPage 
              searchState={props.searchState} 
            />
          </InstantSearch>
          <Footer />
        </AuthGuard>
      </>
    )}
    </>
  );
};

export default withURLSync(Catalog);
//export default Catalog;

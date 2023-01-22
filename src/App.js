import React, { useEffect } from "react";
import "./App.css";
import "./Theme.css";
import "bootstrap/dist/css/bootstrap.min.css";

// packages
import { useMsal } from "@azure/msal-react";
import { Routes, Route, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setUser,
  setProjects,
  setUserState,
} from "./redux/reducers/user-reducer";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

// components
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Plugin from "./pages/Plugin";
import About from "./pages/About";
import PageNotFound from "./pages/NotFound";
import DownloadStart from "./pages/DownloadStart";

// api's
// import { getProjects, createUser, getUserDetail, getReviewAndRating, getReviews, getKey } from "./api";

function App() {
  const { instance, accounts } = useMsal();
  let [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const value = searchParams.get("plugin");
    if (value) {
      localStorage.setItem("plugin", JSON.stringify(value));
    }
  }, []);

  //const [key, setKey] = useState([]);

  // useEffect(async () => {
  //   if (accounts[0]) {
  //     try {
  //       let response = await createUser({
  //         id: accounts[0]?.localAccountId,
  //         name: accounts[0]?.name,
  //         email: accounts[0]?.username,
  //         cart: [],
  //         projects: [uuidv4()],
  //         //searchKey: "",
  //       });
  //       dispatch(setUser(response));
  //       if (response) {
  //         let projects = await getProjects({
  //           id: accounts[0]?.localAccountId
  //         });
  //         //console.log(projects);
  //         dispatch(setProjects(projects));
  //       }
  //       dispatch(setUserState(false));
  //     } catch (err) {
  //       dispatch(setUser({}));
  //       //dispatch(setUserState(false));
  //       dispatch(setProjects([]));
  //     }
  //   } else {
  //     dispatch(setUser({}));
  //     //dispatch(setUserState(false));
  //     dispatch(setProjects([]));
  //   }
  // }, [accounts[0]]);

  useEffect(() => {
    const temp = window?.location?.href?.split("/");
    const temp1 = temp[3]?.split("=");

    if (temp1?.length > 0 && temp1[0] === "#id_token") {
      instance.logoutRedirect().catch((e) => {
        console.error(e);
      });
    }
  }, [location?.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Catalog />} />
        <Route path="/product/search/*" element={<Catalog />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/manufacturers" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/plugin" element={<Plugin />} />
        <Route path="/about" element={<About />} />
        <Route path="/download-start" element={<DownloadStart />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;

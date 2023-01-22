import React, { useState, useEffect } from "react";

import TagManager from "react-gtm-module";
import {
  useMsal,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { useSelector, useDispatch } from "react-redux";
import { setProjects, setUser } from "../redux/reducers/user-reducer";

// api's
import { getProductByIDs, getUserDetail, getUser } from "../api";

// component's
import Navbar from "../components/Navbar";
import FavoritePage from "../components/Favorite";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { AuthGuard } from "../components/AuthGuard/auth-guard";

const Favorite = () => {
  const dispatch = useDispatch();
  let { accounts } = useMsal();

  const user = useSelector((store) => store.user.user);
  const projects = useSelector((store) => store.user.projects);
  // const projectLists = useSelector((store) => store.user.projectLists);
  const [cart, setCart] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.cart?.length > 0 && accounts[0]) {
      // getProductByIDs({ productIDs: user?.cart })
      
      setCart(user?.cart);
      setLoading(false);
      // getProductByIDs({ ids: user?.cart })
      //   .then((data) => {
      //     //setCart(data.data);
      //     //console.log(data);
      //     setCart(data);       
      //     setLoading(false);
      //   })
      //   .catch((err) =>
      //     console.log(
      //       "favorite page getting wishlist api error =>",
      //       err.message
      //     )
      //   );
    } else {
      setCart([]);
      setLoading(false);
    }
  }, [accounts[0], user]);

  // useEffect(async () => {
    
  //   if (projects?.length > 0 && accounts[0]) {
  //     let output = [];
  //     let ids = [];

  //     for (let i = 0; i < projects?.length; i++) {
  //       let ids = [];
  //       await getProductByIDs({ ids: projects[i].cart })
  //       .then((data) => {
  //         //setCart(data.data);
  //         console.log(data);
  //         output.push(data);
  //       })
  //       .catch((err) =>
  //         console.log(
  //           "favorite page getting wishlist api error =>",
  //           err.message
  //         )
  //       );
  //     }
  //     // console.log(output);
  //     //console.log(projects);

  //     dispatch(setProjectLists(output));
  //     setLoading(false);
  //   } else {
  //     dispatch(setProjectLists([]));
  //     setLoading(false);
  //   }
  // }, [accounts[0], projects]);

  const fetchUser = async () => {
    // let response = await getUserDetail({ email: accounts[0]?.username });
    let response = await getUser({ id: accounts[0]?.localAccountId });
    // console.log(response);
    dispatch(setUser(response));
  };

  useEffect(() => {
    if (accounts[0]) {
      fetchUser();
    }
  }, [accounts[0]]);

  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        event: "pageview",
        path: "/wishlist",
      },
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <AuthenticatedTemplate>
            <FavoritePage
              cart={cart}
              id={accounts[0]?.localAccountId}
              email={accounts[0]?.username}
              Loading={() => setLoading(true)}
            />
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <div className="unauthorized">
              You are not signed in! Please sign in.
            </div>
          </UnauthenticatedTemplate>
          <Footer />
        </>
      )}
    </>
  );
};

export default Favorite;

import React, { useState, useEffect } from "react";
import "./favorite.scss";

// packages
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactTooltip from "react-tooltip";
import { v4 as uuidv4 } from 'uuid';
import { ImCross } from "react-icons/im";
import { IconContext } from "react-icons";

// functions
import { setUser, setProjects, setOpenProjects } from "../../redux/reducers/user-reducer";

// components
import MoveBack from "../MoveBack";
import FavoriteList from "./FavoriteList";
import ProjectList from "./ProjectList";
import FriendFavoriteList from "./FriendFavoriteList";
import DownloadModal from "../Modal/Download";
import ShareListModal from "../Modal/ShareList";

// apis
import { productToCart, productToProject, addNewProject } from "../../api";

// images & icons
import { GrAdd } from "react-icons/gr";
import { MdOutlineClose } from "react-icons/md";

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const rndInt = randomIntFromInterval(1, 6)

const FavoritePage = ({ cart, id, email, Loading }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  //const [openProjects, setOpenProjects] = useState([]);
  const [view, setView] = useState(1);
  const [shareModal, setShareModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState();
  const [image3D, setImage3D] = useState("");
  const projects = useSelector((store) => store.user.projects);
  const openProjects = useSelector((store) => store.user.openProjects);

  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const projectId = searchParams.get("list");
    //console.log(projectId);
    const tempProjects = JSON.parse(JSON.stringify(openProjects));

    const index = projects.findIndex((item) => {
      return item.id === projectId
    });
    
    
    if (index !== -1) {
      const project = projects[index];
      
      
      const openIndex = openProjects.findIndex((item) => {
        return item.id === projectId
      });
      
      if (openIndex === -1) {
        tempProjects.push(project);
        dispatch(setOpenProjects(tempProjects));
        setView(tempProjects.length + 1)
      } else {
        setView(openIndex + 2)
      }
    } else {
      //console.log("project not selected");
    }
  }, [searchParams]);
  

  const handleModalClose = () => setShowModal(false);

  const handleModalShow = (data) => {
    const image = data?.meta_data?.find((val) => val?.key === "glb");
    setImage3D(image?.value);
    setModalData(data);
    setShowModal(true);
  };

  const handleCart = (product) => {
    Loading();
    
    let payload = {
      id,
      email,
      product: {
        id: product?.id,
        slug: product?.slug,
        name: product?.name,
        brand: product?.brand,
        image: product?.image
      }
    };

    productToCart(payload)
      .then((data) => {
        dispatch(setUser(data));
      })
      .catch((err) => console.log("product error =>", err.message));
  };

  const handleNewProject = async () => {
    const listName = "Project #" + randomIntFromInterval(1, 20000);
    const projectListID = uuidv4();
    let openTemp = JSON.parse(JSON.stringify(openProjects));
    let payload = {
      id,
      listName: listName,
      projectListID: projectListID,
      cart: []
    };

    await addNewProject(payload)
      .then((response) => {
        if (response.status === 200) {
          const tempProjects = JSON.parse(JSON.stringify(projects));
          payload.name = payload.listName;
          delete payload.listName;
          tempProjects.push(payload);
          dispatch(setProjects(tempProjects));

          openTemp.push(payload);
          dispatch(setOpenProjects(openTemp));
          setView(openTemp.length + 1)
        }

      })
      .catch((err) => console.log("product error =>", err.message));



  };

  const handleOptionClick = (event) => {
    
    const projectId = event.target.value;
    const tempProjects = JSON.parse(JSON.stringify(openProjects));

    const index = projects.findIndex((item) => {
      return item.id === projectId
    });
    
    
    if (index !== -1) {
      const project = projects[index];
      
      
      const openIndex = openProjects.findIndex((item) => {
        return item.id === projectId
      });
      

      if (openIndex === -1) {
        tempProjects.push(project);
        dispatch(setOpenProjects(tempProjects));
        setView(tempProjects.length + 1)
      } else {
        setView(openIndex + 2)
      }
    } else {
      console.log("project not found");
    }
  }

  const closeProject = (projectId) => {
    const tempOpenProjects = JSON.parse(JSON.stringify(openProjects));

    const index = tempOpenProjects.findIndex((item) => {
      return item.id === projectId
    });

    if (index !== -1) {
      tempOpenProjects.splice(index, 1);
      if (view > tempOpenProjects.length) {
        setView(view - 1);
      }
    }

    dispatch(setOpenProjects(tempOpenProjects));
  }

  const handleProjectCart = (product, list) => {
    // Loading();

    let payload = {
      id,
      email,
      product: {
        id: product?.id,
        name: product?.name
       // image_url: product?.images[0].src
      },
      projectListID: list
    };

    productToProject(payload)
      .then((response) => { 
        if (response.status === 200) {
          const tempProjects = JSON.parse(JSON.stringify(projects));
          

          for (let i = 0; i < tempProjects.length; i++) {
            let tempId = tempProjects[i].id;

            if (tempId === list) {
              let temp = tempProjects[i].cart;

              if (temp) {

                const newProduct = {
                       id: product?.id,
                       //image_url: product?.images[0]?.src,
                       name: product?.name,
                       brand: ""
                }

                const index = tempProjects[i].cart.findIndex((item) => {
                  return item.id === product?.id
                });

                if (index !== -1) {
                  tempProjects[i].cart.splice(index, 1);
                } else {
                  tempProjects[i].cart.push(newProduct);
                }
              }
            }
          }

          // for open products

          const tempOpenProjects = JSON.parse(JSON.stringify(openProjects));

          for (let i = 0; i < tempOpenProjects.length; i++) {
            let tempId = tempOpenProjects[i].id;

            if (tempId === list) {
              let temp = tempOpenProjects[i].cart;

              if (temp) {
                const newProduct = {
                       id: product?.id,
                       name: product?.name,
                       brand: ""
                }

                const index = tempOpenProjects[i].cart.findIndex((item) => {
                  return item.id === product?.id
                });

                if (index !== -1) {
                  tempOpenProjects[i].cart.splice(index, 1);
                } else {
                  tempOpenProjects[i].cart.push(newProduct);
                }
              }
            }
          }
          dispatch(setProjects(tempProjects));
          dispatch(setOpenProjects(tempOpenProjects));
        }
      })
      .catch((err) => console.log("product error =>", err.message));
  };

  return (
    <>
      <div className="favorite-page">
        <MoveBack />

        <div className="projects">
          <select
            name="openProject"
            placeholder="Open Project"
            value={"DEFAULT"}
            className="open-project-select"
            onChange={handleOptionClick}
          >
            <option value="DEFAULT" disabled>
              Open Project
            </option>

            {projects.map((data, index) => (
            <option value={data.id}>
              {data.name}
            </option>
            ))}
            
          </select>
          <div className="add-project-btn" onClick={handleNewProject}>
            <span>Add new project</span>
            <GrAdd className="icon" />
          </div>
        </div>

        <div className="main-wrapper">
          <div className="tabs-wrapper">
            <div
              className={view === 1 ? "tab tab-active" : "tab"}
              onClick={() => setView(1)}
            >
              <span>Favorites</span>
            </div>
            {openProjects.map((data, index) => (
              <div
                className={view === index + 2 ? "tab tab-active" : "tab"}
              >
                <span onClick={() => setView(index + 2)}>{data.name}</span>
                <GrAdd className="icon to-cross" onClick={() => closeProject(data.id)} />
              </div>
            ))}
          </div>

          {view === 1 && (
            <FavoriteList
              cart={cart}
              handleCart={handleCart}
              handleModalShow={handleModalShow}
            />
          )}

          {openProjects?.map((data, index) => view === index + 2 && ( 
            <ProjectList
              cart={data.cart}
              handleCart={handleProjectCart}
              handleModalShow={handleModalShow}
              list={openProjects[index].id}
            />
          ))}

        </div>
        <div
            className="share-list-btn"
            data-tip 
            data-for='noDemoAccess'
            onClick={() => {}}
          >
          Share project
        </div>
        <ReactTooltip id='noDemoAccess' type='light'>
          <span>Project sharing not available in demo mode</span>
        </ReactTooltip>

      </div>

      <DownloadModal
        name={modalData?.name}
        showModal={showModal}
        downloadObject={image3D}
        modalClose={handleModalClose}
      />

      <ShareListModal
        shareModalOpen={shareModal}
        shareModalClose={() => setShareModal(false)}
      />
    </>
  );
};

export default FavoritePage;

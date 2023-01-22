import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";

// redux
import { useSelector, useDispatch } from "react-redux";
import { setUser, setProjects, setOpenProjects } from "../../redux/reducers/user-reducer";

// components
import MenuLink from "./MenuLink";

// API 
import { productToProject } from "../../api";

// images
import downIcon from "../../assets/images/navbar/down-icon.png";
//import projectIcon from "../../assets/images/navbar/project-icon.png";
// import projectIcon from "../../assets/images/navbar/building-icon.png";
// import projectIconColor from "../../assets/images/navbar/building-icon-full.png";
import boxIcon from "../../assets/images/navbar/box-icon.png";
import heartIcon from "../../assets/images/navbar/heart-icon.png";
import collection from '../../assets/images/other/collection-box.svg';

const ProjectDropDown = ({product}) => {
  const navigate = useNavigate();
  const dropDownRef = useRef(null);
  const [dropDown, setDropDown] = useState(false);
  const projects = useSelector((store) => store.user.projects);
  const openProjects = useSelector((store) => store.user.openProjects);
  const { accounts } = useMsal();
  const dispatch = useDispatch();

  //console.log(product);

  const menuLinkIcon = (projectId) => {
    
    const index = projects.findIndex((item) => {
      return item.id === projectId
    });

    const projectCart = projects[index].cart;
    //console.log(projectCart);

    const prodIndex = projectCart.findIndex((item) => {
      // return item.id === product.wp_id
      return item.id === product.id
    });

    if (prodIndex !== -1) {
      return("full");
    } else {
      return("empty");
    }

  }

  const handleProject = async (listId) => {
    if (accounts[0]) {
      let brand = "";
      const brandNameRaw = product?.meta_data?.find(
        (ele) => ele?.key === "brand"
      );
      
      if (brandNameRaw) {
        brand = brandNameRaw?.value;
      }

      let payload = {
        //tenantId: accounts[0]?.localAccountId,
        id: accounts[0]?.localAccountId,
        // name: accounts[0]?.name,
        // email: accounts[0]?.username,
        // listName: listName,
        product: {
          //id: product?.wp_id,
          id: product?.id,
          brand: product?.brandSlug,
          slug: product?.slug,
          name: product?.name,
          // image: product?.images[0]?.src
          image: product?.pImage[0]
        },
        projectListID: listId
      };
      //console.log(payload);

      await productToProject(payload)
        .then((response) => {
          if (response.status === 200) {
            const tempProjects = JSON.parse(JSON.stringify(projects));
            const tempOpenProjects = JSON.parse(JSON.stringify(openProjects));
            
            // for all projects
            for (let i = 0; i < tempProjects.length; i++) {
              let tempId = tempProjects[i].id;
              
              let brand = "";
              const brandNameRaw = product?.meta_data?.find(
                (ele) => ele?.key === "brand"
              );
              
              if (brandNameRaw) {
                brand = brandNameRaw?.value;
              }

              if (tempId === listId) {
                let temp = tempProjects[i].cart;

                if (temp) {

                  const newProduct = {
                        //  id: product?.wp_id,
                        id: product?.id,
                         //image_url: product?.images[0]?.src,
                         brand: product?.brandSlug,
                         slug: product?.slug,
                         name: product?.name,
                        //  image: product?.images[0]?.src
                        image: product?.pImage[0]
                  }
  
                  const index = tempProjects[i].cart.findIndex((item) => {
                    // return item.id === product?.wp_id
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

            // for open projects
            for (let i = 0; i < tempOpenProjects.length; i++) {
              let tempId = tempOpenProjects[i].id;

              if (tempId === listId) {
                let temp = tempOpenProjects[i].cart;
                
                let brand = "";
                const brandNameRaw = product?.meta_data?.find(
                  (ele) => ele?.key === "brand"
                );
                
                if (brandNameRaw) {
                  brand = brandNameRaw?.value;
                }

                if (temp) {

                  const newProduct = {
                        //  id: product?.wp_id,
                        id: product?.id,
                         //image_url: product?.images[0]?.src,
                         brand: product?.brandSlug,
                         slug: product?.slug,
                         name: product?.name,
                        //  image: product?.images[0]?.src
                        image: product?.pImage[0]
                  }
  
                  const index = tempOpenProjects[i].cart.findIndex((item) => {
                    // return item.id === product?.wp_id
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
            // for all projects
            dispatch(setProjects(tempProjects));
            // for open projects
            dispatch(setOpenProjects(tempOpenProjects));
          }
          // dispatch(setUser(data.user));
          //dispatch(setUser(data));
        })
        .catch((err) => console.log("product error =>", err.message));
    } else {
      alert("Please login first...");
    }
  };

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setDropDown(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDownRef]);

  return (
    <div
      className="projects-wrapper"
      ref={dropDownRef}
      onClick={() => setDropDown(!dropDown)}
    >
      {/* <div className="text">Projects</div> */}
      <img src={collection} alt="" className="down-icon" />

      <div className={dropDown ? "drop-down-open" : "drop-down-close"}>
        {projects.map((data, index) => (
          <MenuLink 
            //icon={projectIcon}
            icon={menuLinkIcon(data?.id)} 
            label={data?.name}
            onClick={() => handleProject(data?.id, data?.name)}
            key={index}
          />
        ))}

        {/* <MenuLink icon={projectIcon} label="Project #4241" />
        <MenuLink icon={projectIcon} label="My Project" />
        <MenuLink icon={projectIcon} label="Company Project" /> */}
        
        <div
          style={{
            border: "1px solid rgba(49, 49, 51, .12)",
            margin: "5px 0",
          }}
        />

        <MenuLink 
          icon={boxIcon} 
          label="Manage Projects"
          manage={true}
          onClick={() => navigate("/favorite")}
        />
        {/* <MenuLink
          icon={heartIcon}
          label="Favourites"
          onClick={() => navigate("/favorite")}
        /> */}
      </div>
    </div>
  );
};

export default ProjectDropDown;

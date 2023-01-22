import axios from "axios";
import { API } from "./api-routes";
const qs = require('qs');

const getUserDetail = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(API.getUserDetail, payload)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

const getUser = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(API.getUser, payload)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

const productToCart = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(API.addToWishlist, payload)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

const productToProject = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(API.addToProject, payload)
      .then((res) => {
        //resolve(res.data);
        resolve(res);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

const addNewProject = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(API.addNewProject, payload)
      .then((res) => {
        console.log(res);
        //resolve(res.data);
        resolve(res);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

const getProjects = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(API.getProjects, payload)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

const getProductBySlug = (slug) => {
  const query = API.getProductBySlug + "/" + slug;
  return new Promise((resolve, reject) => {
    axios
      .get(query)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

const getProductByIDs = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(API.getProductByIDs, payload)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

// const getProductByIDs = (payload) => {
  
//   const idArray = payload.productIDs;
//   //console.log(idArray);
//   const getIds = () => {
//     let temp = [];
//     let promises = [];
  
//     if (idArray) {
//       for (let i = 0; i < idArray.length; i++) {
//         const id = { id: idArray[i] };
//         promises.push(
//           axios
//             .post(API.getProductByIDs, id)
//             .then(response => {
//               temp.push(response.data[0]);
//             })
//         )
//       }
//     }
//     return temp;
//   }

//   return new Promise((resolve, reject) => {
//     resolve(getIds);
//   });
// };

const getRelated = (payload) => {
  const body = {related: payload};
  return new Promise((resolve, reject) => {
    axios
      .post(API.getRelated, body)
      .then((res) => {
        console.log(res);
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
}

const addReviewAndRating = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(API.addReviewAndRating, payload)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

const getReviewAndRating = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .get(API.getReviewAndRating, payload)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

const getReviews = (id) => {
  const query = API.getReviews + "/" + id;
  return new Promise((resolve, reject) => {
    axios
      .get(query)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

const createUser = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(API.createUser, payload)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

const getKey = (payload) => {
  //const body = {objectId: payload};
  return new Promise((resolve, reject) => {
    axios
      .post(API.getAlgolia, payload)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

const shareListToFriend = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(API.SHARE_LIST_TO_FRIEND, payload)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

export {
  createUser,
  getUserDetail,
  productToCart,
  productToProject,
  getProductBySlug,
  getProductByIDs,
  addReviewAndRating,
  getReviewAndRating,
  getReviews,
  getRelated,
  getKey,
  getUser,
  shareListToFriend,
  getProjects,
  addNewProject
};

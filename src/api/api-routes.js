
  const SERVER_URL = "http://localhost:7071";
// const SERVER_URL = "https://plugin.bimroom.com";

export const API = {

  createUser: SERVER_URL + "/api/user/create-user",
  getUser: SERVER_URL + "/api/user/get-user",
  addToWishlist: SERVER_URL + "/api/user/add-to-wishlist",
  shareListToFriend: SERVER_URL + "/api/user/friend-list",
  addToProject: SERVER_URL + "/api/user/add-to-project",
  getProjects: SERVER_URL + "/api/user/get-projects",
  addNewProject: SERVER_URL + "/api/user/add-new-project",

  // products
  addReviewAndRating: SERVER_URL + "/api/add-review",
  getReviewAndRating: SERVER_URL + "/api/product/get-review-and-rating",
  getReviews: SERVER_URL + "/api/get-reviews",
  getProductBySlug: SERVER_URL + "/api/get-product",
  getProductByIDs: SERVER_URL + "/api/get-product-by-id",
  getRelated: SERVER_URL + "/api/get-related",

  // FOR ALGOLIA
  getAlgolia: SERVER_URL + "/api/get-algolia",
};

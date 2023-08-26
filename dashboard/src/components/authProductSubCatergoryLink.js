import axios from "./api/baseUrl";
import authHeader from "./authHeaders";

const getAllProductSubCategory = () => {
  return axios.get("product-sub-categories/filter_index?", {
    headers: {
      Authorization: authHeader()
    }
  });
};

const getSingleProductSubCategory = ({ productSubCategory }) => {
    return axios.get(`/${productSubCategory.id}`,
      { headers: authHeader() }
    )
  };

const authProductSubCategoryLink = {
  getAllProductSubCategory,getSingleProductSubCategory
};

export default authProductSubCategoryLink;
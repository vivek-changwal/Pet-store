import axios from "./api/baseUrl";
import authHeader from "./authHeaders";

const getAllProductCategory = () => {
  return axios.get("product-categories/filter_index?", {
    headers: {
      Authorization: authHeader()
    }
  });
};

const getSingleProductCategory = ({ productCategory }) => {
    return axios.get(`/${productCategory.id}`,
      { headers: authHeader() }
    )
  };

const authProductCategoryLink = {
  getAllProductCategory,getSingleProductCategory
};

export default authProductCategoryLink;
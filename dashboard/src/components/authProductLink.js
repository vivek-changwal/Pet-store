import axios from "./api/baseUrl";
import authHeader from "./authHeaders";

const getAllProducts = () => {
  return axios.get("admin/products", {
    headers: {
      "Authorization": authHeader()
    }
  }
  );
};

const getSingleProduct = ({ product }) => {
  return axios.get(`/${product.id}`,
    { headers: authHeader() }
  )
};

const addProduct = () => {
  return axios.post('admin/products', {
    headers: {
      "Content-Type": "application/json",
      "Authorization": authHeader(),
    },
  });
};

const deleteProduct = ({ product }) => {
  console.log(product)
  return axios.delete(`admin/products/${product.id}`,
    { headers: authHeader() }
  )
};

const authProductLink = {
    getAllProducts, getSingleProduct, addProduct,deleteProduct
};

export default authProductLink;
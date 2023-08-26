import axios from "./api/baseUrl";
import authHeader from "./authHeaders";

const getAllCart= () => {
  return axios.get("carts/", {
    headers: {
      Authorization: authHeader()
    }
  });
};

const getSingleCart= ({ carts }) => {
    return axios.get(`/${carts.id}`,
      { headers: authHeader() }
    )
  };

const authOrderLink = {
    getAllCart,getSingleCart
};

export default authOrderLink;
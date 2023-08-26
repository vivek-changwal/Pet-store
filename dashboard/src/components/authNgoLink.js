import axios from "./api/baseUrl";
import authHeader from "./authHeaders";

const getAllNgos = () => {
  return axios.get("ngos/filter_index?", {
    headers: {
      "Authorization": authHeader()
    }
  }
  );
};


const authNgoLink = {
    getAllNgos, 
};

export default authNgoLink;
import axios from "./api/baseUrl";
import authHeader from "./authHeaders";

const getAllPets = () => {
  return axios.get("pets/filter_index?", {
    headers: {
      "Authorization": authHeader()
    }
  }
  );
};


const authPetLink = {
    getAllPets, 
};

export default authPetLink;
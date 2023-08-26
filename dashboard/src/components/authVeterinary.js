import axios from "./api/baseUrl";
import authHeader from "./authHeaders";

const getAllVeterinaries = () => {
  return axios.get("veterinaries/filter_index?", {
    headers: {
      "Authorization": authHeader()
    }
  }
  );
};


const authVeterinaryLink = {
    getAllVeterinaries, 
};

export default authVeterinaryLink;
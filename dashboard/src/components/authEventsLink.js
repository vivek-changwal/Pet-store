import axios from "./api/baseUrl";
import authHeader from "./authHeaders";

const getAllEvents = () => {
  return axios.get("events/filter_index?", {
    headers: {
      "Authorization": authHeader()
    }
  }
  );
};


const authEventsLink = {
    getAllEvents, 
};

export default authEventsLink;